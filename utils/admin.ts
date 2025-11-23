import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Security gate for admin-only pages
 * Checks if the current user has admin role
 * Redirects to dashboard if not authorized
 */
export async function checkAdmin(): Promise<boolean> {
    const supabase = await createClient();

    // Get current user session
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user's profile to check role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    // If not admin, redirect to regular dashboard
    if (!profile || profile.role !== "admin") {
        redirect("/dashboard");
    }

    return true;
}
