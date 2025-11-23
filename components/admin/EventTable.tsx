"use client";

import { useState, useTransition } from "react";
import { Event } from "@/types";
import { deleteEvent } from "@/lib/actions/admin";
import { Trash2, Calendar, MapPin, Trophy, Users } from "lucide-react";
import Link from "next/link";

interface EventTableProps {
    events: Event[];
    registrationCounts: Record<string, number>;
}

export function EventTable({ events, registrationCounts }: EventTableProps) {
    const [isPending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = (eventId: string, eventTitle: string) => {
        if (!confirm(`Are you sure you want to delete "${eventTitle}"? This cannot be undone.`)) {
            return;
        }

        setDeletingId(eventId);
        startTransition(async () => {
            const result = await deleteEvent(eventId);

            if (result.success) {
                alert("✅ " + result.message);
            } else {
                alert("❌ " + result.message);
            }
            setDeletingId(null);
        });
    };

    if (events.length === 0) {
        return (
            <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-12 text-center">
                <Calendar className="mx-auto w-16 h-16 text-gray-700 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Events Yet</h3>
                <p className="text-gray-500">Create your first event to get started!</p>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-zinc-900 border-b border-red-900/30">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Event
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                XP
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Registrations
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {events.map((event) => {
                            const registrationCount = registrationCounts[event.id] || 0;
                            const eventDate = new Date(event.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                            });

                            return (
                                <tr key={event.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <Link
                                                href={`/admin/events/${event.id}`}
                                                className="text-sm font-bold text-white hover:text-red-400 hover:underline transition-colors"
                                            >
                                                {event.title}
                                            </Link>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                                                {event.description}
                                            </p>
                                            <span className="inline-block mt-2 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                                                {event.category}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <Calendar size={14} className="text-gray-500" />
                                            {eventDate}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <MapPin size={14} className="text-gray-500" />
                                            {event.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-sm font-bold text-yellow-400">
                                            <Trophy size={14} />
                                            {event.xp_reward}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-sm text-gray-300">
                                            <Users size={14} className="text-gray-500" />
                                            <span className="font-bold">{registrationCount}</span>
                                            <span className="text-gray-500">registered</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleDelete(event.id, event.title)}
                                            disabled={isPending && deletingId === event.id}
                                            className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"
                                        >
                                            <Trash2 size={14} />
                                            {deletingId === event.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
