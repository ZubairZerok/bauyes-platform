"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroSVGBackground } from "@/components/ui/HeroSVGBackground";
import { useState, useEffect } from "react";
import Link from "next/link";

const coreValues = [
    "Guts & Grit",
    "Harvest to Hustle",
    "Radical Collaboration",
    "Zero to One",
    "Extreme Ownership"
];

export function Hero() {
    const [valueIndex, setValueIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = coreValues[valueIndex];
        const typeSpeed = isDeleting ? 30 : 80; // Faster typing/deleting
        const pauseTime = 1500; // Pause before deleting

        const handleTyping = () => {
            if (!isDeleting) {
                // Typing
                if (displayedText.length < currentFullText.length) {
                    setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
                } else {
                    // Finished typing, wait then delete
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (displayedText.length > 0) {
                    setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
                } else {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setValueIndex((prev) => (prev + 1) % coreValues.length);
                }
            }
        };

        const timer = setTimeout(handleTyping, typeSpeed);
        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, valueIndex]);

    return (
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-32 overflow-hidden">
            {/* SVG Background Pattern */}
            <HeroSVGBackground />

            {/* Removed Dark Overlay as per user request */}

            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                <div className="h-[180px] sm:h-[220px] md:h-[280px] flex items-center justify-center flex-col">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
                        We Believe in
                    </h1>
                    <div className="h-24 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#bef264] underline decoration-[#bef264]/50 underline-offset-8">
                            {displayedText}
                            <span className="animate-pulse text-[#bef264]">|</span>
                        </span>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]"
                >
                    The first student-led startup incubator at Bangladesh Agricultural University. We bridge the gap between the lab and the market.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <Link href="/login">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-bauyesLime text-bauyesDark font-bold rounded-full text-lg flex items-center gap-2 shadow-[0_0_30px_rgba(190,242,100,0.4)] hover:shadow-[0_0_50px_rgba(190,242,100,0.6)] hover:bg-bauyesLime/90 transition-all"
                        >
                            Join the Revolution
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>

                    <Link href="/dashboard/events">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border-2 border-primary/30 text-foreground font-medium rounded-full text-lg hover:bg-primary/10 hover:border-primary/50 transition-all"
                        >
                            View Deckathon
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

            {/* Floating Element Animation */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground text-sm z-10"
            >
                Scroll to explore
            </motion.div>
        </section>
    );
}
