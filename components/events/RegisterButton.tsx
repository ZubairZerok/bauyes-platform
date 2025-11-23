"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RegisterButtonProps {
    eventId: string;
    userId: string;
    isRegistered: boolean;
}

export function RegisterButton({ eventId, userId, isRegistered }: RegisterButtonProps) {
    // If already registered (passed from parent), show static state
    if (isRegistered) {
        return (
            <button
                disabled
                className="px-4 py-2 bg-zinc-800 text-bauyesLime font-bold rounded-lg border border-zinc-700 opacity-50 cursor-not-allowed text-sm"
            >
                Registered ✓
            </button>
        );
    }

    return (
        <Link
            href={`/dashboard/events/${eventId}/register`}
            className="px-4 py-2 bg-bauyesLime hover:bg-bauyesLime/90 text-bauyesDark font-bold rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
        >
            Register Now
            <ArrowRight className="w-4 h-4" />
        </Link>
    );
}
