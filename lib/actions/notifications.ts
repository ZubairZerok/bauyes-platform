"use server";

import { createClient } from "@/utils/supabase/server";

export async function fetchNotifications() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { notifications: [], unreadCount: 0 };
    }

    const notifications: any[] = [];
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    // 1. Fetch upcoming events (next 30 days)
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    const { data: upcomingEvents } = await supabase
        .from("events")
        .select("id, title, event_date")
        .gte("event_date", now.toISOString())
        .lte("event_date", thirtyDaysFromNow.toISOString())
        .order("event_date", { ascending: true })
        .limit(3);

    if (upcomingEvents) {
        upcomingEvents.forEach((event) => {
            notifications.push({
                id: `event-${event.id}`,
                type: "event",
                title: "Upcoming Event",
                message: `${event.title} is coming up soon!`,
                link: `/dashboard/events/${event.id}`,
                timestamp: new Date(event.event_date),
                isNew: new Date(event.event_date) > now && new Date(event.event_date) < new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            });
        });
    }

    // 2. Fetch user's pending/in-progress tasks
    const { data: userTasks } = await supabase
        .from("user_tasks")
        .select(`
            id,
            status,
            task_id,
            tasks (
                id,
                title,
                xp_reward,
                created_at
            )
        `)
        .eq("user_id", user.id)
        .in("status", ["pending", "in_progress"])
        .order("created_at", { ascending: false })
        .limit(5);

    if (userTasks) {
        userTasks.forEach((userTask: any) => {
            if (userTask.tasks) {
                const isNew = new Date(userTask.tasks.created_at) > sevenDaysAgo;
                notifications.push({
                    id: `task-${userTask.id}`,
                    type: "task",
                    title: userTask.status === "pending" ? "New Task Available" : "Task In Progress",
                    message: `${userTask.tasks.title} (${userTask.tasks.xp_reward} XP)`,
                    link: `/dashboard/tasks`,
                    timestamp: new Date(userTask.tasks.created_at),
                    isNew,
                });
            }
        });
    }

    // 3. Fetch user's registered events
    const { data: registrations } = await supabase
        .from("registrations")
        .select(`
            id,
            event_id,
            created_at,
            events (
                id,
                title,
                event_date
            )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);

    if (registrations) {
        registrations.forEach((reg: any) => {
            if (reg.events) {
                const isNew = new Date(reg.created_at) > sevenDaysAgo;
                notifications.push({
                    id: `reg-${reg.id}`,
                    type: "registration",
                    title: "Event Registration Confirmed",
                    message: `You're registered for ${reg.events.title}`,
                    link: `/dashboard/events/${reg.event_id}`,
                    timestamp: new Date(reg.created_at),
                    isNew,
                });
            }
        });
    }

    // 4. Fetch user's profile to show recent XP gains
    const { data: profile } = await supabase
        .from("profiles")
        .select("total_xp, current_level")
        .eq("id", user.id)
        .single();

    if (profile && profile.total_xp > 0) {
        // Add a notification about current XP status
        notifications.push({
            id: "xp-status",
            type: "xp",
            title: "Your XP Progress",
            message: `You have ${profile.total_xp} XP and are at Level ${profile.current_level}!`,
            link: "/dashboard/profile",
            timestamp: new Date(), // Current time
            isNew: false,
        });
    }

    // Sort notifications by timestamp (newest first)
    notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    // Calculate unread count (notifications marked as "new")
    const unreadCount = notifications.filter(n => n.isNew).length;

    return {
        notifications,
        unreadCount,
    };
}
