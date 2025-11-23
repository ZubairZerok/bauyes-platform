import { DashboardShell } from "@/components/layout/DashboardShell";
import { XPBar } from "@/components/dashboard/XPBar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Flame, Trophy, Calendar } from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    const currentXP = profile?.total_xp || 0;
    const currentLevel = profile?.current_level || 1;
    const currentStreak = profile?.current_streak || 0;

    return (
        <DashboardShell>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                        Welcome back, {profile?.full_name?.split(' ')[0] || profile?.username || "Student"}
                    </h2>
                    <p className="text-gray-400">Ready to make an impact today?</p>
                </div>

                {/* XP Progress */}
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                    <XPBar currentXP={currentXP} currentLevel={currentLevel} />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total XP Card */}
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Trophy size={80} />
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Trophy size={20} className="text-yellow-500" />
                            <span className="text-sm font-medium uppercase tracking-wider">Total XP</span>
                        </div>
                        <div className="text-4xl font-display font-bold text-white">
                            {currentXP.toLocaleString()}
                        </div>
                    </div>

                    {/* Streak Card */}
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Flame size={80} />
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Flame size={20} className="text-orange-500" />
                            <span className="text-sm font-medium uppercase tracking-wider">Current Streak</span>
                        </div>
                        <div className="text-4xl font-display font-bold text-white">
                            {currentStreak} <span className="text-xl text-gray-500 font-normal">Days</span>
                        </div>
                    </div>

                    {/* Next Event Card */}
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar size={80} />
                        </div>
                        <div className="flex items-center gap-3 text-gray-400 mb-2">
                            <Calendar size={20} className="text-bauyes-green" />
                            <span className="text-sm font-medium uppercase tracking-wider">Next Event</span>
                        </div>
                        <div>
                            <div className="text-xl font-bold text-white mb-1">Deckathon</div>
                            <div className="text-sm text-bauyes-green">In 2 days</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity (Placeholder) */}
                <div>
                    <h3 className="text-xl font-display font-bold text-white mb-4">Recent Activity</h3>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center text-gray-500">
                        No recent activity to show.
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
