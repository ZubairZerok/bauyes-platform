import { DashboardShell } from "@/components/layout/DashboardShell";
import { EventCard } from "@/components/events/EventCard";
import { EventSegmentedControl } from "@/components/events/EventSegmentedControl";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Event } from "@/types";
import { Suspense } from "react";

// NUCLEAR CACHE FIX
export const dynamic = "force-dynamic";
export const revalidate = 0;

interface EventsPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const params = await searchParams;
    const category = params.category;

    // 1. Fetch Events with optional category filter
    let queryBuilder = supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

    if (category && category !== "all") {
        queryBuilder = queryBuilder.eq("category", category);
    }

    const { data: events } = await queryBuilder;

    // 2. Fetch User Registrations
    const { data: registrations } = await supabase
        .from("registrations")
        .select("event_id")
        .eq("user_id", user.id);

    console.log("🔍 USER ID:", user.id);
    console.log("🔍 FOUND REGISTRATIONS:", registrations);

    const registeredEventIds = new Set(registrations?.map(r => r.event_id));

    return (
        <DashboardShell>
            <div className="p-8 max-w-7xl mx-auto pb-20">
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                        Mission Log
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Participate in events, workshops, and competitions to earn XP and level up.
                    </p>

                    {/* Segmented Control */}
                    <Suspense fallback={<div className="h-10 bg-white/5 rounded-lg animate-pulse" />}>
                        <EventSegmentedControl />
                    </Suspense>
                </div>

                {!events || events.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
                        <h3 className="text-xl font-bold text-white mb-2">No Active Missions</h3>
                        <p className="text-gray-500">Check back later for new events.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <EventCard
                                key={event.id}
                                event={event as Event}
                                userId={user.id}
                                isRegistered={registeredEventIds.has(event.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardShell>
    );
}
