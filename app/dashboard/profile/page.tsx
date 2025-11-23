import { DashboardShell } from "@/components/layout/DashboardShell";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { BadgeGrid } from "@/components/profile/BadgeGrid";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Profile, Badge, UserBadge } from "@/types";
import { Trophy, Flame, Calendar } from "lucide-react";

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch user profile
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) {
        redirect("/login");
    }

    // Fetch all badges
    const { data: allBadges } = await supabase
        .from("badges")
        .select("*")
        .order("name", { ascending: true });

    // Fetch user's earned badges
    const { data: userBadges } = await supabase
        .from("user_badges")
        .select("*")
        .eq("user_id", user.id);

    // Fetch events attended count and details
    const { data: registrations } = await supabase
        .from("registrations")
        .select(`
            id,
            event_id,
            status,
            created_at,
            event:events(
                id,
                title,
                date,
                location,
                category,
                xp_reward
            )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    const eventsAttended = registrations?.length || 0;

    return (
        <DashboardShell>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Profile Header */}
                <ProfileHeader profile={profile as Profile} />

                {/* Stats Row */}
                <div className="px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Total XP Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
                            <div className="flex items-center gap-3 text-gray-400 mb-3">
                                <Trophy size={20} className="text-yellow-500" />
                                <span className="text-sm font-medium uppercase tracking-wider">Total XP</span>
                            </div>
                            <div className="text-4xl font-display font-bold text-white">
                                {profile.total_xp.toLocaleString()}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Level {profile.current_level}</p>
                        </div>

                        {/* Streak Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
                            <div className="flex items-center gap-3 text-gray-400 mb-3">
                                <Flame size={20} className="text-orange-500" />
                                <span className="text-sm font-medium uppercase tracking-wider">Current Streak</span>
                            </div>
                            <div className="text-4xl font-display font-bold text-white">
                                {profile.current_streak} <span className="text-xl text-gray-500 font-normal">Days</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Keep it going! 🔥</p>
                        </div>

                        {/* Events Attended Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
                            <div className="flex items-center gap-3 text-gray-400 mb-3">
                                <Calendar size={20} className="text-bauyes-green" />
                                <span className="text-sm font-medium uppercase tracking-wider">Events Attended</span>
                            </div>
                            <div className="text-4xl font-display font-bold text-white">
                                {eventsAttended}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Registered events</p>
                        </div>
                    </div>
                </div>

                {/* Registered Events */}
                {registrations && registrations.length > 0 && (
                    <div className="px-8">
                        <h3 className="text-2xl font-display font-bold text-white mb-6">Registered Events</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {registrations.map((reg: any) => (
                                <div key={reg.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-lime-500/50 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white mb-1">{reg.event.title}</h4>
                                            <p className="text-sm text-zinc-500">{reg.event.category}</p>
                                        </div>
                                        <div className="px-2 py-1 bg-lime-500/10 text-lime-400 text-xs rounded border border-lime-500/20">
                                            {reg.event.xp_reward} XP
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-sm text-zinc-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(reg.event.date).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="w-4 h-4" />
                                            {reg.event.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Badge Grid - Trophy Case */}
                <div className="px-8 pb-8">
                    <BadgeGrid
                        allBadges={(allBadges || []) as Badge[]}
                        userBadges={(userBadges || []) as UserBadge[]}
                    />
                </div>
            </div>
        </DashboardShell>
    );
}
