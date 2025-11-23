"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Event } from "@/types";

export interface AdminActionResponse {
    success: boolean;
    message: string;
}

/**
 * Verify admin status - used as double security in server actions
 */
async function verifyAdmin(): Promise<boolean> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return false;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    return profile?.role === "admin";
}

/**
 * Create a new event (Admin only)
 */
export async function createEvent(formData: FormData): Promise<AdminActionResponse> {
    // Double security check
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "Unauthorized: Admin access required",
        };
    }

    try {
        const supabase = await createClient();

        // Extract and validate form data
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const location = formData.get("location") as string;
        const xpReward = parseInt(formData.get("xpReward") as string);
        const category = formData.get("category") as string;

        // Validation
        if (!title || !description || !date || !location) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        if (isNaN(xpReward) || xpReward < 0) {
            return {
                success: false,
                message: "Invalid XP reward value",
            };
        }

        // Insert event
        const { error } = await supabase
            .from("events")
            .insert({
                title: title.trim(),
                description: description.trim(),
                date: new Date(date).toISOString(),
                location: location.trim(),
                xp_reward: xpReward,
                category: category as Event['category'],
            });

        if (error) {
            console.error("Event creation error:", error);
            return {
                success: false,
                message: "Failed to create event. Please try again.",
            };
        }

        // Revalidate events pages
        revalidatePath("/dashboard/events");
        revalidatePath("/admin/events");

        return {
            success: true,
            message: "Event created successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during event creation:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}

/**
 * Delete an event (Admin only)
 */
export async function deleteEvent(eventId: string): Promise<AdminActionResponse> {
    // Double security check
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "Unauthorized: Admin access required",
        };
    }

    try {
        const supabase = await createClient();

        if (!eventId) {
            return {
                success: false,
                message: "Invalid event ID",
            };
        }

        // Delete event
        const { error } = await supabase
            .from("events")
            .delete()
            .eq("id", eventId);

        if (error) {
            console.error("Event deletion error:", error);
            return {
                success: false,
                message: "Failed to delete event. Please try again.",
            };
        }

        // Revalidate events pages
        revalidatePath("/dashboard/events");
        revalidatePath("/admin/events");

        return {
            success: true,
            message: "Event deleted successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during event deletion:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}

/**
 * Mark a user as attended for an event and award XP (Admin only)
 */
export async function markUserAttended(
    eventId: string,
    userId: string,
    xpReward: number
): Promise<AdminActionResponse> {
    // Double security check
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        return {
            success: false,
            message: "Unauthorized: Admin access required",
        };
    }

    try {
        const supabase = await createClient();

        // 1. Check current status (Idempotency)
        const { data: registration, error: fetchError } = await supabase
            .from("registrations")
            .select("status")
            .eq("event_id", eventId)
            .eq("user_id", userId)
            .single();

        if (fetchError || !registration) {
            return {
                success: false,
                message: "Registration not found",
            };
        }

        if (registration.status === "attended") {
            return {
                success: false,
                message: "User already verified!",
            };
        }

        // 2. Update Registration Status
        const { error: updateRegError } = await supabase
            .from("registrations")
            .update({ status: "attended" })
            .eq("event_id", eventId)
            .eq("user_id", userId);

        if (updateRegError) {
            console.error("Error updating registration:", updateRegError);
            return {
                success: false,
                message: "Failed to update registration status",
            };
        }

        // 3. Award XP to User Profile
        // Fetch current stats first
        const { data: profile } = await supabase
            .from("profiles")
            .select("total_xp, events_attended")
            .eq("id", userId)
            .single();

        if (profile) {
            await supabase
                .from("profiles")
                .update({
                    total_xp: (profile.total_xp || 0) + xpReward,
                    events_attended: (profile.events_attended || 0) + 1
                })
                .eq("id", userId);
        }

        // Revalidate the event war room
        revalidatePath(`/admin/events/${eventId}`);

        return {
            success: true,
            message: "XP Awarded & Verified!",
        };
    } catch (error) {
        console.error("Unexpected error during attendance marking:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
