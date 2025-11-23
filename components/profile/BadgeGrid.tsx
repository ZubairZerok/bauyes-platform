import { Badge, UserBadge } from "@/types";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Lock, LucideIcon } from "lucide-react";

interface BadgeGridProps {
    allBadges: Badge[];
    userBadges: UserBadge[];
}

export function BadgeGrid({ allBadges, userBadges }: BadgeGridProps) {
    // Create a Set of badge IDs the user has unlocked
    const unlockedBadgeIds = new Set(userBadges.map(ub => ub.badge_id));

    return (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-2xl font-display font-bold text-white mb-6">
                Trophy Case
            </h3>

            {allBadges.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No badges available yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {allBadges.map((badge) => {
                        const isUnlocked = unlockedBadgeIds.has(badge.id);

                        // Dynamically get the Lucide icon
                        const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[badge.icon_name] || LucideIcons.Award;

                        return (
                            <div
                                key={badge.id}
                                className={cn(
                                    "relative group p-4 rounded-xl border-2 transition-all cursor-pointer",
                                    isUnlocked
                                        ? "bg-zinc-800/50 border-bauyesGreen/50 hover:border-bauyesGreen hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                                        : "bg-zinc-900/30 border-zinc-800 opacity-50 grayscale"
                                )}
                                title={isUnlocked ? badge.description : "🔒 Locked"}
                            >
                                {/* Lock Overlay for locked badges */}
                                {!isUnlocked && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-bauyesDark/40 rounded-xl">
                                        <Lock size={24} className="text-zinc-600" />
                                    </div>
                                )}

                                {/* Badge Icon */}
                                <div className={cn(
                                    "w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center",
                                    isUnlocked
                                        ? "bg-bauyesGreen/20 text-bauyesGreen"
                                        : "bg-zinc-800 text-zinc-600"
                                )}>
                                    <IconComponent size={32} />
                                </div>

                                {/* Badge Name */}
                                <p className={cn(
                                    "text-sm font-bold text-center mb-1",
                                    isUnlocked ? "text-white" : "text-gray-600"
                                )}>
                                    {badge.name}
                                </p>

                                {/* XP Bonus */}
                                {isUnlocked && badge.xp_bonus > 0 && (
                                    <p className="text-xs text-bauyesGreen text-center">
                                        +{badge.xp_bonus} XP
                                    </p>
                                )}

                                {/* Tooltip on Hover */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-10">
                                    {badge.description}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
