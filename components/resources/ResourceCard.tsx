"use client";

import { motion } from "framer-motion";
import { Resource } from "@/types";
import Image from "next/image";
import { Download, Lock } from "lucide-react";
import confetti from "canvas-confetti";
import { createClient } from "@/lib/supabase/client";

interface ResourceCardProps {
    resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
    const supabase = createClient();

    const handleDownload = async () => {
        if (resource.is_locked) return;

        // Trigger confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#bef264', '#ffffff', '#064e3b']
        });

        // Increment download count
        await supabase.rpc('increment_download_count', { resource_id: resource.id });

        // Open link
        if (resource.download_url) {
            window.open(resource.download_url, '_blank');
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-bauyesLime/50 transition-colors"
        >
            {/* Thumbnail */}
            <div className="relative h-48 w-full bg-bauyesDark/6">
                {resource.thumbnail_url ? (
                    <Image
                        src={resource.thumbnail_url}
                        alt={resource.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-bauyesLime/10">
                        <span className="text-4xl">📦</span>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-bauyesLime/10 backdrop-blur-sm border border-border text-xs font-bold text-bauyesDark uppercase tracking-wider">
                    {resource.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-display font-bold bg-[#bef264] text-[#022c22] px-2 py-1 rounded mb-2 line-clamp-1 inline-block">
                    {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
                    {resource.description || "No description available."}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground font-mono">
                        {resource.download_count} downloads
                    </span>

                    <button
                        onClick={handleDownload}
                        disabled={resource.is_locked}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${resource.is_locked
                            ? "bg-white/5 text-gray-500 cursor-not-allowed"
                            : "bg-bauyesLime text-bauyesDark hover:bg-bauyesLime/90 hover:shadow-[0_0_15px_rgba(190,242,100,0.3)]"
                            }`}
                    >
                        {resource.is_locked ? (
                            <>
                                <Lock size={16} />
                                Locked
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                Get It
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
