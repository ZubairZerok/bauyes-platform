/* eslint-disable */
"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    // eslint-disable-next-line
    useEffect(() => {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

        if (savedTheme) {
            if (savedTheme === "light") {
                setTimeout(() => setTheme("light"), 0);
            }
            document.documentElement.classList.toggle("dark", savedTheme === "dark");
        } else {
            // Default to dark if no preference
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-muted border border-border rounded-full p-1 transition-colors hover:border-primary/50"
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            {/* Toggle indicator */}
            <motion.div
                className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm"
                animate={{
                    x: theme === "dark" ? 26 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                }}
            >
                {theme === "light" ? (
                    <Sun className="w-3 h-3 text-primary-foreground" />
                ) : (
                    <Moon className="w-3 h-3 text-primary-foreground" />
                )}
            </motion.div>
        </motion.button>
    );
}
