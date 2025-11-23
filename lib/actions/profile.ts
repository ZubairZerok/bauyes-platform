"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
}

export async function updateProfile(formData: FormData): Promise<UpdateProfileResponse> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return {
                success: false,
                message: "Not authenticated",
            };
        }

        // Extract form data
        const fullName = formData.get("fullName") as string;
        const username = formData.get("username") as string;
        const bio = formData.get("bio") as string;

        // Validate inputs
        if (!fullName || fullName.trim().length === 0) {
            return {
                success: false,
                message: "Full name is required",
            };
        }

        if (!username || username.trim().length === 0) {
            return {
                success: false,
                message: "Username is required",
            };
        }

        // Check if username is already taken by another user
        if (username) {
            const { data: existingUser } = await supabase
                .from("profiles")
                .select("id")
                .eq("username", username)
                .neq("id", user.id)
                .single();

            if (existingUser) {
                return {
                    success: false,
                    message: "Username already taken",
                };
            }
        }

        // Update profile
        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: fullName.trim(),
                username: username.trim(),
                bio: bio?.trim() || null,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);

        if (error) {
            console.error("Profile update error:", error);
            return {
                success: false,
                message: "Failed to update profile. Please try again.",
            };
        }

        // Revalidate the profile page to show updated data
        revalidatePath("/dashboard/profile");

        return {
            success: true,
            message: "Profile updated successfully!",
        };
    } catch (error) {
        console.error("Unexpected error during profile update:", error);
        return {
            success: false,
            message: "An unexpected error occurred.",
        };
    }
}
