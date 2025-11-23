"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, Target, Users, Settings, LogOut, ClipboardCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Missions", href: "/admin/tasks", icon: Target },
    { name: "Reviews", href: "/admin/tasks/reviews", icon: ClipboardCheck },
    { name: "Users", href: "/admin/users", icon: Users },
];

export function AdminSideNav() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-16 fixed inset-y-0 left-0 bg-zinc-950 border-r border-zinc-800 z-50 items-center py-6">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center mb-6 shrink-0">
                <Settings className="text-white w-6 h-6" />
            </div>

            <nav className="flex-1 w-full px-2 space-y-4 flex flex-col items-center">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={item.name}
                            className={cn(
                                "w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 group relative",
                                isActive
                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                            )}
                        >
                            <item.icon size={20} className={cn("transition-colors", isActive ? "text-red-400" : "text-zinc-500 group-hover:text-white")} />
                            {/* Tooltip on hover */}
                            <span className="absolute left-14 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800 pointer-events-none z-50">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-4 border-t border-zinc-800 w-full flex justify-center">
                <Link
                    href="/dashboard"
                    title="Exit to App"
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all group relative"
                >
                    <LogOut size={20} />
                    <span className="absolute left-14 bg-zinc-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800 pointer-events-none z-50">
                        Exit to App
                    </span>
                </Link>
            </div>
        </aside>
    );
}
