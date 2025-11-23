import { createClient } from "@/lib/supabase/server";
import { MembersGrid } from "@/components/members/MembersGrid";
import { TeamMember } from "@/types";

export const revalidate = 3600; // Revalidate every hour

export default async function MembersPage() {
    const supabase = await createClient();

    const { data: members, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("status", "active")
        .order("priority", { ascending: true });

    if (error) {
        console.error("Error fetching members:", error);
        return <div>Error loading members</div>;
    }

    return (
        <div className="min-h-screen bg-void-black pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
                        THE <span className="text-primary">SQUAD</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Meet the architects, builders, and visionaries behind BAUYES.
                        A collective of cyber-agrarian pioneers.
                    </p>
                </div>

                {/* Grid */}
                <MembersGrid members={members as TeamMember[]} />
            </div>
        </div>
    );
}
