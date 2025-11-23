"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResourceFiltersProps {
    activeCategory: string | null;
    onSelect: (category: string | null) => void;
}

const categories = [
    { id: "all", label: "All Resources" },
    { id: "deck", label: "Pitch Decks" },
    { id: "template", label: "Templates" },
    { id: "video", label: "Workshops" },
    { id: "merch", label: "Merch" },
];

export function ResourceFilters({ activeCategory, onSelect }: ResourceFiltersProps) {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((category) => {
                const isActive = (activeCategory === category.id) || (activeCategory === null && category.id === "all");

                return (
                    <button
                        key={category.id}
                        onClick={() => onSelect(category.id === "all" ? null : category.id)}
                        className={cn(
                            "relative px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                            isActive
                                ? "text-bauyesDark font-bold"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeFilter"
                                className="absolute inset-0 bg-[#bef264] rounded-full"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{category.label}</span>
                    </button>
                );
            })}
        </div>
    );
}
