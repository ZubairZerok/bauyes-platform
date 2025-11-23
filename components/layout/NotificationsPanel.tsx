"use client";

import { useState } from "react";
import { Bell, Calendar, Target, Zap, TrendingUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Notification {
    id: string;
    type: "event" | "task" | "xp" | "registration";
    title: string;
    message: string;
    link?: string;
    timestamp: Date;
    isNew: boolean;
}

interface NotificationsPanelProps {
    notifications: Notification[];
    unreadCount: number;
}

export function NotificationsPanel({ notifications, unreadCount }: NotificationsPanelProps) {
    const [isOpen, setIsOpen] = useState(false);

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "event":
                return <Calendar className="w-4 h-4" />;
            case "task":
                return <Target className="w-4 h-4" />;
            case "xp":
                return <Zap className="w-4 h-4" />;
            case "registration":
                return <TrendingUp className="w-4 h-4" />;
        }
    };

    const getIconColor = (type: Notification["type"]) => {
        switch (type) {
            case "event":
                return "text-blue-400 bg-blue-500/10";
            case "task":
                return "text-lime-400 bg-lime-500/10";
            case "xp":
                return "text-yellow-400 bg-yellow-500/10";
            case "registration":
                return "text-purple-400 bg-purple-500/10";
        }
    };

    return (
        <div className="relative">
            {/* Bell Icon Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.span>
                )}
            </motion.button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50"
                        >
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                                <h3 className="text-white font-bold text-lg">Notifications</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-[500px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="px-4 py-12 text-center text-zinc-500">
                                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>No notifications yet</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-zinc-800">
                                        {notifications.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onClick={() => setIsOpen(false)}
                                                getIcon={getIcon}
                                                getIconColor={getIconColor}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {notifications.length > 0 && (
                                <div className="px-4 py-3 border-t border-zinc-800 bg-zinc-950">
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm text-lime-400 hover:text-lime-300 font-semibold transition-colors"
                                    >
                                        View Dashboard →
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

function NotificationItem({
    notification,
    onClick,
    getIcon,
    getIconColor,
}: {
    notification: Notification;
    onClick: () => void;
    getIcon: (type: Notification["type"]) => JSX.Element;
    getIconColor: (type: Notification["type"]) => string;
}) {
    const content = (
        <div
            className={`px-4 py-3 hover:bg-zinc-800/50 transition-colors cursor-pointer ${notification.isNew ? "bg-zinc-800/30" : ""
                }`}
        >
            <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm mb-1">
                        {notification.title}
                        {notification.isNew && (
                            <span className="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                New
                            </span>
                        )}
                    </p>
                    <p className="text-zinc-400 text-sm line-clamp-2">
                        {notification.message}
                    </p>
                    <p className="text-zinc-600 text-xs mt-1">
                        {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                </div>
            </div>
        </div>
    );

    if (notification.link) {
        return (
            <Link href={notification.link} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return content;
}
