"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, User as UserIcon, Target } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Profile } from "@/types";

interface SideNavProps {
    profile: Profile | null;
}

const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Events", href: "/dashboard/events", icon: Calendar },
    { name: "Missions", href: "/dashboard/tasks", icon: Target },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
];

export function SideNav({ profile }: SideNavProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Desktop Sidebar - collapsed icons-only */}
            <aside className="hidden md:flex flex-col w-14 fixed inset-y-0 left-0 bg-zinc-950 border-r border-zinc-800 z-50">
                <div className="p-2 flex items-center justify-center">
                    <Link href="/" aria-label="BAUYES" title="BAUYES" className="p-2 rounded-full hover:bg-white/5">
                        <Image
                            src="/bauyes-logo.png"
                            alt="BAUYES Logo"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                    </Link>
                </div>

                <nav className="flex-1 px-0 mt-4 space-y-2 flex flex-col items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                title={item.name}
                                aria-label={item.name}
                                className={cn(
                                    "flex items-center justify-center p-3 rounded-lg transition-all duration-200",
                                    isActive
                                        ? "bg-bauyesGreen/10 text-bauyesGreen shadow-[0_0_12px_rgba(74,222,128,0.08)]"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon size={20} />
                            </Link>
                        );
                    })}
                </nav>

                {/* User Avatar (icons-only) */}
                <div className="p-3 border-t border-zinc-800 flex items-center justify-center">
                    <div title={profile?.full_name || profile?.username || "User"} className="w-10 h-10 rounded-full bg-zinc-900/60 flex items-center justify-center border border-zinc-800 overflow-hidden">
                        {profile?.avatar_url ? (
                            <Image src={profile.avatar_url} alt={profile.full_name || "User"} width={40} height={40} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <UserIcon size={18} className="text-bauyesGreen" />
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-bauyesDark/90 backdrop-blur-xl border-t border-zinc-800 z-50 pb-safe">
                <nav className="flex justify-around items-center h-16 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center w-full h-full space-y-1",
                                    isActive ? "text-bauyesGreen" : "text-gray-500"
                                )}
                            >
                                <item.icon size={20} />
                                <span className="text-[10px] font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}
