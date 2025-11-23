import { createClient } from "@/utils/supabase/server";
import { LayoutDashboard, Calendar, Users, Award } from "lucide-react";
import Link from "next/link";

export default async function AdminOverviewPage() {
    const supabase = await createClient();

    // Fetch statistics
    const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

    const { count: totalEvents } = await supabase
        .from("events")
        .select("*", { count: "exact", head: true });

    const { count: totalRegistrations } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });

    const { data: recentEvents } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-400">Welcome to the control center</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Users */}
                <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                        <Users size={20} className="text-red-400" />
                        <span className="text-sm font-medium uppercase tracking-wider">Total Users</span>
                    </div>
                    <div className="text-4xl font-display font-bold text-white">
                        {totalUsers || 0}
                    </div>
                </div>

                {/* Total Events */}
                <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                        <Calendar size={20} className="text-orange-400" />
                        <span className="text-sm font-medium uppercase tracking-wider">Total Events</span>
                    </div>
                    <div className="text-4xl font-display font-bold text-white">
                        {totalEvents || 0}
                    </div>
                </div>

                {/* Total Registrations */}
                <div className="bg-zinc-900/50 border border-red-900/30 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-gray-400 mb-3">
                        <Award size={20} className="text-yellow-400" />
                        <span className="text-sm font-medium uppercase tracking-wider">Registrations</span>
                    </div>
                    <div className="text-4xl font-display font-bold text-white">
                        {totalRegistrations || 0}
                    </div>
                </div>
            </div>

            {/* Recent Events */}
            <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold text-white mb-4">
                    Recent Events
                </h2>
                {!recentEvents || recentEvents.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No events created yet</p>
                ) : (
                    <div className="space-y-3">
                        {recentEvents.map((event) => (
                            <div
                                key={event.id}
                                className="p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-sm font-bold text-white">{event.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(event.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                    {event.category}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-6">
                <h2 className="text-xl font-display font-bold text-white mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/admin/events"
                        className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-colors group"
                    >
                        <Calendar className="w-8 h-8 text-red-400 mb-2" />
                        <p className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                            Manage Events
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Create, edit, or delete events</p>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors group"
                    >
                        <Users className="w-8 h-8 text-orange-400 mb-2" />
                        <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                            View Users
                        </p>
                        <p className="text-xs text-gray-500 mt-1">See all registered users</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
