"use client";

import { useState } from "react";
import { SubmissionDialog } from "@/components/events/SubmissionDialog";

interface SubmissionDialogWrapperProps {
    eventId: string;
    userId: string;
    currentSubmission: string | null;
}

export function SubmissionDialogWrapper({
    eventId,
    userId,
    currentSubmission,
}: SubmissionDialogWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 bg-bauyes-green text-bauyesDark font-bold rounded-lg hover:bg-bauyes-green/90 transition-colors"
            >
                {currentSubmission ? "Update Submission" : "Submit Project"}
            </button>

            <SubmissionDialog
                eventId={eventId}
                userId={userId}
                currentSubmission={currentSubmission}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
