"use client";

import { useState, useTransition } from "react";
import { createEvent } from "@/lib/actions/admin";
import { X, Plus } from "lucide-react";

export function CreateEventForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. CAPTURE THE FORM ELEMENT HERE (Before async starts)
        const form = e.currentTarget;
        const formData = new FormData(form);

        startTransition(async () => {
            const result = await createEvent(formData);

            if (result.success) {
                alert("✅ " + result.message);
                setIsOpen(false);

                // 2. USE THE CAPTURED VARIABLE, NOT 'e.currentTarget'
                form.reset();
            } else {
                alert("❌ " + result.message);
            }
        });
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-bauyesDark hover:bg-bauyesDark/90 text-bauyesLime rounded-lg font-bold transition-colors flex items-center gap-2"
            >
                <Plus size={20} />
                Create Event
            </button>

            {/* Modal Dialog */}
            {isOpen && (
                <div className="fixed inset-0 bg-bauyesDark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-bauyesLime border border-bauyesDark rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-bauyesDark/60 hover:text-bauyesDark transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <h2 className="text-2xl font-display font-bold text-bauyesDark mb-6">
                            🚀 Launch New Event
                        </h2>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                    Event Title *
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                    placeholder="e.g., Deckathon 2025"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors resize-none"
                                    placeholder="Describe the event..."
                                />
                            </div>

                            {/* Date & Location Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Date */}
                                <div>
                                    <label htmlFor="date" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                        Date & Time *
                                    </label>
                                    <input
                                        id="date"
                                        name="date"
                                        type="datetime-local"
                                        required
                                        className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark focus:outline-none focus:border-bauyesDark transition-colors"
                                    />
                                </div>

                                {/* Location */}
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                        placeholder="e.g., Main Auditorium"
                                    />
                                </div>
                            </div>

                            {/* XP Reward & Category Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* XP Reward */}
                                <div>
                                    <label htmlFor="xpReward" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                        XP Reward *
                                    </label>
                                    <input
                                        id="xpReward"
                                        name="xpReward"
                                        type="number"
                                        min="0"
                                        defaultValue={50}
                                        required
                                        className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark focus:outline-none focus:border-bauyesDark transition-colors"
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark focus:outline-none focus:border-bauyesDark transition-colors"
                                    >
                                        <option value="competition">Competition</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="hackathon">Hackathon</option>
                                        <option value="meetup">Meetup</option>
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
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
                                    {isPending ? "Creating..." : "Create Event"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
