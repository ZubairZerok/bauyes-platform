import { AdminSideNav } from "@/components/admin/AdminSideNav";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Verify admin role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-black">
            <AdminSideNav />
            <main className="md:pl-16 min-h-screen">
                {children}
            </main>
        </div>
    );
}
