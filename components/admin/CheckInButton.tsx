"use client";

import { useTransition } from "react";
import { markUserAttended } from "@/lib/actions/admin";
import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckInButtonProps {
    eventId: string;
    userId: string;
    xpReward: number;
    currentStatus: string;
}

export function CheckInButton({ eventId, userId, xpReward, currentStatus }: CheckInButtonProps) {
    const [isPending, startTransition] = useTransition();
    const isAttended = currentStatus === "attended";

    const handleCheckIn = () => {
        if (isAttended) return;

        startTransition(async () => {
            const result = await markUserAttended(eventId, userId, xpReward);

            if (result.success) {
                // Optional: could use sonner/toast here
                // alert("✅ " + result.message);
            } else {
                alert("❌ " + result.message);
            }
        });
    };

    if (isAttended) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-bauyesGreen/10 border border-bauyesGreen/30 text-bauyesGreen rounded-full text-sm font-medium">
                <CheckCircle size={16} />
                Verified
            </div>
        );
    }

    return (
        <button
            onClick={handleCheckIn}
            disabled={isPending}
            className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                "border border-bauyesGreen/50 text-bauyesGreen hover:bg-bauyesGreen hover:text-bauyesDark",
                isPending && "opacity-50 cursor-wait"
            )}
        >
            {isPending ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Verifying...
                </>
            ) : (
                <>
                    <CheckCircle size={16} />
                    Check In
                </>
            )}
        </button>
    );
}
