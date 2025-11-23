"use client";

import { motion } from "framer-motion";

interface XPBarProps {
    currentXP: number;
    currentLevel: number;
}

export function XPBar({ currentXP, currentLevel }: XPBarProps) {
    // Math: Assume 1 Level = 1000 XP. Calculate progress percentage.
    // Example: 1250 XP -> Level 1, 250/1000 = 25%
    const xpInCurrentLevel = currentXP % 1000;
    const percentage = Math.min(100, Math.max(0, (xpInCurrentLevel / 1000) * 100));

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400 mb-2">
                <span>Level {currentLevel}</span>
                <span>{xpInCurrentLevel} / 1000 XP</span>
            </div>
            <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 to-bauyesGreen rounded-full"
                />
            </div>
        </div>
    );
}
