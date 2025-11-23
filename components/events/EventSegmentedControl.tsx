"use client";

import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const categories = [
    { id: "all", label: "All Missions" },
    { id: "competition", label: "Competitions" },
    { id: "workshop", label: "Workshops" },
    { id: "hackathon", label: "Hackathons" },
];

export function EventSegmentedControl() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCategory = searchParams.get("category") || "all";

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoryId === "all") {
            params.delete("category");
        } else {
            params.set("category", categoryId);
        }

        router.push(`/dashboard/events?${params.toString()}`);
    };

    return (
        <div className="bg-white/5 p-1 rounded-lg inline-flex gap-1 mb-8">
            {categories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={cn(
                            "relative px-5 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                            isActive ? "text-bauyesDark font-bold" : "text-white/70 hover:text-white"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-[#bef264] rounded-md"
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
