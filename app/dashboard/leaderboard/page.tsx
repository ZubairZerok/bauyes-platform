import { DashboardShell } from "@/components/layout/DashboardShell";
import { LeaderboardClient } from "@/components/leaderboard/LeaderboardClient";
import { createClient } from "@/utils/supabase/server";

export default async function LeaderboardPage() {
    const supabase = await createClient();

    // Fetch initial leaderboard data
    const { data } = await supabase
        .from("profiles")
        .select("id, full_name, username, avatar_url, total_xp, current_level")
        .order("total_xp", { ascending: false })
        .limit(50);

    const initialData = (data || []).map((entry, index) => ({
        ...entry,
        rank: index + 1,
    }));

    return (
        <DashboardShell>
            <LeaderboardClient initialData={initialData} />
        </DashboardShell>
    );
}
