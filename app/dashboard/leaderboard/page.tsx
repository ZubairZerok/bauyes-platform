"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { MonthPicker } from "@/components/leaderboard/MonthPicker";
import { Trophy, Medal, Crown, Flame } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LeaderboardEntry {
    id: string;
    full_name: string;
    username: string;
    avatar_url: string | null;
    total_xp: number;
    current_level: number;
    rank: number;
}

export default function LeaderboardPage() {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, [selectedMonth]);

    async function fetchLeaderboard() {
        setLoading(true);
        const supabase = createClient();

        // For now, we'll show all-time leaderboard
        // In future, you can filter by month using XP transaction timestamps
        const { data, error } = await supabase
            .from("profiles")
            .select("id, full_name, username, avatar_url, total_xp, current_level")
            .order("total_xp", { ascending: false })
            .limit(50);

        if (data && !error) {
            const rankedData = data.map((entry, index) => ({
                ...entry,
                rank: index + 1,
            }));
            setLeaderboard(rankedData);
        }
        setLoading(false);
    }

    const getMedalForRank = (rank: number) => {
        if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
        if (rank === 2) return <Medal className="w-6 h-6 text-zinc-300" />;
        if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
        return null;
    };

    return (
        <DashboardShell>
            <div className="p-8 max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="flex justify-center mb-4">
                        <Trophy className="w-16 h-16 text-lime-400" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                        Top Performers
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Compete with the best and climb to the top!
                    </p>
                </div>

                {/* Month Picker */}
                <div className="max-w-md mx-auto">
                    <MonthPicker selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
                </div>

                {/* Leaderboard */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-zinc-500">Loading leaderboard...</div>
                    ) : leaderboard.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500">No entries found for this month.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-zinc-950/50 border-b border-zinc-800">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider w-20">
                                            Rank
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                            Agent
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                            Level
                                        </th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                                            Total XP
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {leaderboard.map((entry) => (
                                        <tr
                                            key={entry.id}
                                            className={cn(
                                                "transition-colors hover:bg-zinc-800/30",
                                                entry.rank === 1 && "bg-gradient-to-r from-yellow-500/5 to-transparent",
                                                entry.rank === 2 && "bg-gradient-to-r from-zinc-400/5 to-transparent",
                                                entry.rank === 3 && "bg-gradient-to-r from-orange-600/5 to-transparent"
                                            )}
                                        >
                                            {/* Rank */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center">
                                                    {getMedalForRank(entry.rank)}
                                                    {!getMedalForRank(entry.rank) && (
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm",
                                                            entry.rank <= 10
                                                                ? "bg-lime-500/10 text-lime-400 border border-lime-500/20"
                                                                : "text-zinc-500"
                                                        )}>
                                                            #{entry.rank}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Agent */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 overflow-hidden border-2 border-zinc-700">
                                                        {entry.avatar_url ? (
                                                            <Image
                                                                src={entry.avatar_url}
                                                                alt={entry.full_name || entry.username}
                                                                width={48}
                                                                height={48}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-xl font-bold text-zinc-500">
                                                                {(entry.full_name || entry.username || "?")[0].toUpperCase()}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-lg">
                                                            {entry.full_name || entry.username || "Unknown Agent"}
                                                        </p>
                                                        {entry.full_name && entry.username && (
                                                            <p className="text-xs text-zinc-500">@{entry.username}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Level */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                                                    <Flame className="w-4 h-4 text-orange-500" />
                                                    <span className="font-mono font-bold text-white">
                                                        L{entry.current_level}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* XP */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-2xl font-mono font-bold text-lime-400">
                                                        {entry.total_xp.toLocaleString()}
                                                    </span>
                                                    <span className="text-xs text-zinc-500 uppercase tracking-wider">XP</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
                        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Total Agents</p>
                        <p className="text-3xl font-bold text-white">{leaderboard.length}</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
                        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Top XP</p>
                        <p className="text-3xl font-bold text-lime-400">
                            {leaderboard[0]?.total_xp.toLocaleString() || 0}
                        </p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 text-center">
                        <p className="text-sm text-zinc-500 uppercase tracking-wider mb-2">Highest Level</p>
                        <p className="text-3xl font-bold text-orange-500">
                            L{leaderboard[0]?.current_level || 0}
                        </p>
                    </div>
                </div>
            </div>
        </DashboardShell>
    );
}
