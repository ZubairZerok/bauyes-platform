"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Resource } from "@/types";
import { ResourceFilters } from "@/components/resources/ResourceFilters";
import { ResourceSearch } from "@/components/resources/ResourceSearch";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { motion, AnimatePresence } from "framer-motion";

export default function ResourcesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const supabase = createClient();

    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    const category = searchParams.get("category");
    const query = searchParams.get("q");

    const fetchResources = useCallback(async () => {
        setLoading(true);

        let queryBuilder = supabase
            .from("resources")
            .select("*")
            .order("created_at", { ascending: false });

        if (category) {
            queryBuilder = queryBuilder.eq("category", category);
        }

        if (query) {
            queryBuilder = queryBuilder.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
        }

        const { data, error } = await queryBuilder;

        if (error) {
            console.error("Error fetching resources:", error);
        } else {
            setResources(data || []);
        }

        setLoading(false);
    }, [category, query, supabase]);

    useEffect(() => {
        // eslint-disable-next-line
        fetchResources();
    }, [fetchResources]);

    const updateSearchParams = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`/resources?${params.toString()}`);
    };

    return (
        <div className="min-h-screen bg-void-black pt-24 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
                        THE <span className="text-primary">ARMORY</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Tools, templates, and resources to fuel your missions. Download, learn, and conquer.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <ResourceFilters
                        activeCategory={category}
                        onSelect={(cat) => updateSearchParams("category", cat)}
                    />
                    <ResourceSearch
                        onSearch={(q) => updateSearchParams("q", q || null)}
                    />
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-primary text-lg font-display">Loading armory...</div>
                    </div>
                ) : resources.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg">No resources found. Check back soon.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {resources.map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
