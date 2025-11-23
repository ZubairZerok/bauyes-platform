import { createClient } from "@/utils/supabase/server";
import { SideNav } from "./SideNav";
import { redirect } from "next/navigation";
import { Profile } from "@/types";

export async function DashboardShell({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="min-h-screen bg-voidBlack">
            <SideNav profile={profile as Profile} />
            <main className="md:pl-14 min-h-screen pb-20 md:pb-0">
                {children}
            </main>
        </div>
    );
}
