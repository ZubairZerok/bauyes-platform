"use client";

import { Event } from "@/types";
import { Calendar, MapPin, Trophy, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RegisterButton } from "./RegisterButton";
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
    event: Event;
    userId: string;
    isRegistered: boolean;
}

export function EventCard({ event, userId, isRegistered }: EventCardProps) {
    const eventDate = new Date(event.date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });

    return (
        <div className="bg-[#022c22] border border-border rounded-xl overflow-hidden hover:border-[#bef264]/50 transition-colors group flex flex-col h-full">
            {/* Header / Image Placeholder */}
            <div className="h-32 bg-[#022c22]/50 relative overflow-hidden">
                {event.image_url ? (
                    <Image src={event.image_url} alt={event.title} fill className="object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center relative">
                        {/* Placeholder SVG Pattern */}
                        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                            <pattern id="eventGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <circle cx="1" cy="1" r="1" fill="#bef264" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#eventGrid)" />
                            <circle cx="50%" cy="50%" r="40" fill="#bef264" opacity="0.1" />
                        </svg>
                        <Trophy className="text-[#bef264] opacity-80 w-12 h-12 relative z-10" />
                    </div>
                )}
                <div className="absolute top-4 left-4 z-10">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                        event.category === 'competition' ? "bg-[#bef264] text-[#022c22]" : "bg-[#022c22] text-[#bef264]"
                    )}>
                        {event.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#bef264] transition-colors">
                    {event.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                    {event.description}
                </p>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={16} className="text-[#bef264]" />
                        <span className="text-gray-300">{eventDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin size={16} className="text-[#bef264]" />
                        <span className="text-gray-300">{event.location}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-1 text-white font-bold text-sm">
                        <Trophy size={16} className="text-[#bef264]" />
                        <span className="text-white">+{event.xp_reward} XP</span>
                    </div>

                    {isRegistered ? (
                        // STATE 1: ALREADY REGISTERED -> SHOW LINK TO DETAILS PAGE
                        <Link
                            href={`/dashboard/events/${event.id}`}
                            className="px-4 py-2 bg-transparent border-2 border-bauyesLime text-bauyesLime rounded-lg text-sm font-bold hover:bg-bauyesLime hover:text-bauyesDark transition-colors flex items-center gap-2"
                        >
                            Open Mission
                            <ArrowRight size={16} />
                        </Link>
                    ) : (
                        // STATE 2: NOT REGISTERED -> SHOW REGISTER BUTTON
                        <RegisterButton
                            eventId={event.id}
                            userId={userId}
                            isRegistered={false}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
