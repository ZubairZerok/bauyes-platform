"use client";

import { useState } from "react";
import { SubmissionDialog } from "./SubmissionDialog";

interface SubmissionDialogClientProps {
    eventId: string;
    userId: string;
    currentSubmission: string | null;
}

export function SubmissionDialogClient({
    eventId,
    userId,
    currentSubmission,
}: SubmissionDialogClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-bauyesGreen text-voidBlack rounded-lg font-bold hover:bg-green-400 transition-colors"
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
