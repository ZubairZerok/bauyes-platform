"use client";

import { useEffect, useState } from "react";
import { NotificationsPanel } from "./NotificationsPanel";
import { fetchNotifications } from "@/lib/actions/notifications";

export function NotificationsWrapper() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadNotifications() {
            try {
                const data = await fetchNotifications();
                setNotifications(data.notifications);
                setUnreadCount(data.unreadCount);
            } catch (error) {
                console.error("Failed to load notifications:", error);
            } finally {
                setLoading(false);
            }
        }

        loadNotifications();
    }, []);

    if (loading) {
        return <div className="w-9 h-9" />;
    }

    return <NotificationsPanel notifications={notifications} unreadCount={unreadCount} />;
}
