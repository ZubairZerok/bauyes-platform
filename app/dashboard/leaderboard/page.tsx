import { DashboardShell } from "@/components/layout/DashboardShell";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Profile } from "@/types";
import { Crown, Trophy, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function LeaderboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch top 50 profiles ordered by XP
    const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("total_xp", { ascending: false })
        .limit(50);

    const leaderboard = (profiles || []) as Profile[];

    // Get current user's profile for highlighting


    // Split into podium (top 3) and list (rest)
    const podium = leaderboard.slice(0, 3);
    const list = leaderboard.slice(3);

    return (
        <DashboardShell>
            <div className="p-8 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-bauyesLime mb-2">
                        Leaderboard
                    </h2>
                    <p className="text-bauyesDark">Top Hustlers at BAU</p>
                </div>

                {leaderboard.length === 0 ? (
                    /* Empty State */
                    <div className="text-center py-20 bg-card border border-border rounded-2xl">
                        <Trophy className="mx-auto w-16 h-16 text-bauyesDark mb-4" />
                        <h3 className="text-xl font-bold text-bauyesDark mb-2">Be the First Legend</h3>
                        <p className="text-muted-foreground">Start earning XP to claim your spot on the leaderboard!</p>
                    </div>
                ) : (
                    <>
                        {/* Podium - Top 3 */}
                        {podium.length > 0 && (
                            <div className="flex items-end justify-center gap-4 md:gap-8 mb-12">
                                {/* #2 - Silver (Left) */}
                                {podium[1] && (
                                    <div className="flex flex-col items-center w-32 md:w-40">
                                        <div className="relative mb-3">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-bauyesDark/10 flex items-center justify-center border-2 border-border overflow-hidden">
                                                {podium[1].avatar_url ? (
                                                    <Image src={podium[1].avatar_url} alt={podium[1].full_name || "User"} width={96} height={96} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon size={32} className="text-bauyesDark" />
                                                )}
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-bauyesDark/60 rounded-full flex items-center justify-center text-voidBlack font-bold text-sm shadow-lg">
                                                2
                                            </div>
                                        </div>
                                        <div className="bg-card border-2 border-border rounded-xl p-4 w-full text-center h-32 flex flex-col justify-center">
                                            <p className="text-sm font-bold text-bauyesDark truncate mb-1">
                                                {podium[1].full_name || podium[1].username || "User"}
                                            </p>
                                            <p className="text-bauyesLime font-bold text-lg">
                                                {podium[1].total_xp.toLocaleString()} XP
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">Level {podium[1].current_level}</p>
                                        </div>
                                    </div>
                                )}

                                {/* #1 - Gold (Center, Bigger) */}
                                {podium[0] && (
                                    <div className="flex flex-col items-center w-36 md:w-48">
                                        <Crown className="w-8 h-8 md:w-10 md:h-10 text-bauyesLime mb-2 animate-pulse" />
                                        <div className="relative mb-3">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-bauyesLime/20 flex items-center justify-center border-4 border-bauyesLime shadow-[0_0_30px_rgba(74,222,128,0.4)] overflow-hidden">
                                                {podium[0].avatar_url ? (
                                                    <Image src={podium[0].avatar_url} alt={podium[0].full_name || "User"} width={128} height={128} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon size={40} className="text-bauyesLime" />
                                                )}
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-10 h-10 bg-bauyesLime rounded-full flex items-center justify-center text-voidBlack font-bold text-lg shadow-lg shadow-bauyesLime/50">
                                                1
                                            </div>
                                        </div>
                                        <div className="bg-bauyesLime/10 border-2 border-bauyesLime rounded-xl p-4 w-full text-center h-36 flex flex-col justify-center shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                                            <p className="text-base font-bold text-bauyesDark truncate mb-1">
                                                {podium[0].full_name || podium[0].username || "User"}
                                            </p>
                                            <p className="text-bauyesLime font-bold text-2xl drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                                                {podium[0].total_xp.toLocaleString()} XP
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">Level {podium[0].current_level}</p>
                                        </div>
                                    </div>
                                )}

                                {/* #3 - Bronze (Right) */}
                                {podium[2] && (
                                    <div className="flex flex-col items-center w-32 md:w-40">
                                        <div className="relative mb-3">
                                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-bauyesDark/10 flex items-center justify-center border-2 border-border overflow-hidden">
                                                {podium[2].avatar_url ? (
                                                    <Image src={podium[2].avatar_url} alt={podium[2].full_name || "User"} width={96} height={96} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon size={32} className="text-bauyesDark" />
                                                )}
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-bauyesDark/60 rounded-full flex items-center justify-center text-voidBlack font-bold text-sm shadow-lg">
                                                3
                                            </div>
                                        </div>
                                        <div className="bg-card border-2 border-border rounded-xl p-4 w-full text-center h-32 flex flex-col justify-center">
                                            <p className="text-sm font-bold text-bauyesDark truncate mb-1">
                                                {podium[2].full_name || podium[2].username || "User"}
                                            </p>
                                            <p className="text-bauyesLime font-bold text-lg">
                                                {podium[2].total_xp.toLocaleString()} XP
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">Level {podium[2].current_level}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* List - Rank 4-50 */}
                        {list.length > 0 && (
                            <div className="bg-card border border-border rounded-2xl overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-card border-b border-border">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                    Rank
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                    Level
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">
                                                    Total XP
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {list.map((profile, index) => {
                                                const rank = index + 4; // Starts at 4
                                                const isCurrentUser = profile.id === user.id;

                                                return (
                                                    <tr
                                                        key={profile.id}
                                                        className={cn(
                                                            "transition-colors",
                                                            isCurrentUser
                                                                ? "bg-bauyesLime/10 border-l-4 border-l-bauyesLime"
                                                                : "hover:bg-white/5"
                                                        )}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <span className={cn(
                                                                    "text-lg font-bold",
                                                                    isCurrentUser ? "text-bauyesLime" : "text-muted-foreground"
                                                                )}>
                                                                    #{rank}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-bauyesDark/10 flex items-center justify-center border border-border overflow-hidden flex-shrink-0">
                                                                    {profile.avatar_url ? (
                                                                        <Image src={profile.avatar_url} alt={profile.full_name || "User"} width={40} height={40} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <UserIcon size={20} className="text-bauyesDark" />
                                                                    )}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className={cn(
                                                                        "text-sm font-bold truncate",
                                                                        isCurrentUser ? "text-bauyesLime" : "text-bauyesDark"
                                                                    )}>
                                                                        {profile.full_name || profile.username || "User"}
                                                                        {isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <span className="text-sm text-gray-300">
                                                                {profile.current_level}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-1">
                                                                <Trophy size={16} className="text-bauyesLime" />
                                                                <span className={cn(
                                                                    "text-sm font-bold",
                                                                    isCurrentUser ? "text-bauyesLime" : "text-muted-foreground"
                                                                )}>
                                                                    {profile.total_xp.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardShell>
    );
}
