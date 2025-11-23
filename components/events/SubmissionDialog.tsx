"use client";

import { useState, useTransition } from "react";
import { submitProject } from "@/lib/actions/events";
import { X, Link as LinkIcon, Upload, ExternalLink } from "lucide-react";

interface SubmissionDialogProps {
    eventId: string;
    userId: string;
    currentSubmission?: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SubmissionDialog({
    eventId,
    userId,
    currentSubmission,
    isOpen,
    onClose,
}: SubmissionDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [url, setUrl] = useState(currentSubmission || "");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            const result = await submitProject(eventId, userId, url);

            if (result.success) {
                alert("✅ " + result.message);
                onClose();
            } else {
                alert("❌ " + result.message);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-bauyesDark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-bauyesLime border border-bauyesDark rounded-2xl max-w-lg w-full p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-bauyesDark/60 hover:text-bauyesDark transition-colors"
                    disabled={isPending}
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Upload className="text-bauyesDark" size={24} />
                        <h2 className="text-2xl font-display font-bold text-bauyesDark">
                            {currentSubmission ? "Update Submission" : "Submit Your Project"}
                        </h2>
                    </div>
                    <p className="text-bauyesDark/80 text-sm">
                        Share your project link (Canva, GitHub, Google Drive, etc.)
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* URL Input */}
                    <div>
                        <label htmlFor="projectUrl" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Project URL *
                        </label>
                        <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-bauyesDark/60" size={18} />
                            <input
                                id="projectUrl"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                placeholder="https://your-project-link.com"
                                required
                            />
                        </div>
                        <p className="text-xs text-bauyesDark/60 mt-1">
                            Examples: Canva designs, GitHub repo, Google Drive folder
                        </p>
                    </div>

                    {/* Current Submission Preview */}
                    {currentSubmission && (
                        <div className="p-3 bg-white/50 border border-bauyesDark/20 rounded-lg">
                            <p className="text-xs text-bauyesDark/60 mb-1">Current submission:</p>
                            <a
                                href={currentSubmission}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-bauyesDark font-medium hover:underline flex items-center gap-1 break-all"
                            >
                                {currentSubmission}
                                <ExternalLink size={12} />
                            </a>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white/50 text-bauyesDark rounded-lg font-medium hover:bg-white/80 transition-colors"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-bauyesDark text-bauyesLime rounded-lg font-bold hover:bg-bauyesDark/90 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isPending ? "Submitting..." : currentSubmission ? "Update" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
