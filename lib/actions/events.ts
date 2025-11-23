"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface SubmitProjectResponse {
    success: boolean;
    message: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
}

/**
 * Register a user for an event
 */
/**
 * Register a user for an event
 */
export async function registerForEvent(
    eventId: string,
    userId: string,
    teamName?: string,
    projectLink?: string
): Promise<RegisterResponse> {
    try {
        const supabase = await createClient();

        // Validate inputs
        if (!eventId || !userId) {
            return {
                success: false,
                message: "Event ID and User ID are required",
            };
        }

        // Check if already registered
        const { data: existingRegistration } = await supabase
            .from("registrations")
            .select("id")
            .eq("event_id", eventId)
            .eq("user_id", userId)
            .single();

        if (existingRegistration) {
            return {
                success: false,
                message: "You are already registered for this event",
            };
        }

        // Register user
        const { error } = await supabase
            .from("registrations")
            .insert({
                event_id: eventId,
                user_id: userId,
                status: "registered",
                team_name: teamName || null,
                submission_url: projectLink || null,
            });

        if (error) {
            console.error("Registration error:", error);
            return {
                success: false,
                message: "Failed to register. Please try again.",
            };
        }

        // Revalidate the events page
        revalidatePath("/dashboard/events");
        revalidatePath(`/dashboard/events/${eventId}`);

        return {
            success: true,
            message: "Registration successful!",
        };
    } catch (error) {
        console.error("Unexpected error during registration:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}

/**
 * Submit a project URL for an event (Student action)
 */
export async function submitProject(
    eventId: string,
    userId: string,
    url: string
): Promise<SubmitProjectResponse> {
    try {
        const supabase = await createClient();

        // Validate inputs
        if (!eventId || !userId || !url) {
            return {
                success: false,
                message: "All fields are required",
            };
        }

        // Basic URL validation
        const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        if (!urlPattern.test(url)) {
            return {
                success: false,
                message: "Please enter a valid URL",
            };
        }

        // Check if registration exists
        const { data: registration, error: fetchError } = await supabase
            .from("registrations")
            .select("id")
            .eq("event_id", eventId)
            .eq("user_id", userId)
            .single();

        if (fetchError || !registration) {
            return {
                success: false,
                message: "You must register for this event first",
            };
        }

        // Update submission
        const { error: updateError } = await supabase
            .from("registrations")
            .update({
                submission_url: url.trim(),
                submitted_at: new Date().toISOString(),
            })
            .eq("event_id", eventId)
            .eq("user_id", userId);

        if (updateError) {
            console.error("Submission error:", updateError);
            return {
                success: false,
                message: "Failed to submit project. Please try again.",
            };
        }

        // Revalidate the events page
        revalidatePath("/dashboard/events");

        return {
            success: true,
            message: "Project submitted successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during project submission:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}

export async function updateEventScore(
    registrationId: string,
    score: number,
    awardGlobalXp: boolean
) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Unauthorized');
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (profile?.role !== 'admin') {
        throw new Error('Unauthorized: Admin access required');
    }

    // 1. Update event score
    const { data: registration, error: regError } = await supabase
        .from('registrations')
        .update({ event_score: score })
        .eq('id', registrationId)
        .select('user_id')
        .single();

    if (regError || !registration) {
        console.error('Error updating event score:', regError);
        throw new Error('Failed to update event score');
    }

    // 2. Award Global XP if requested
    if (awardGlobalXp) {
        const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('total_xp')
            .eq('id', registration.user_id)
            .single();

        if (profileError) {
            console.error('Error fetching user profile:', profileError);
        } else {
            const newXp = (userProfile?.total_xp || 0) + score;
            const { error: xpError } = await supabase
                .from('profiles')
                .update({ total_xp: newXp })
                .eq('id', registration.user_id);

            if (xpError) {
                console.error('Error updating global XP:', xpError);
            }
        }
    }

    revalidatePath('/dashboard/events');
    return { success: true };
}
