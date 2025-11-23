"use client";

import { motion } from "framer-motion";
import { Facebook, Globe, Linkedin, Instagram, LucideIcon } from "lucide-react";

const socials = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Globe, href: "#", label: "Website" },
];

export function StickySocials() {
    return (
        // Attached to the right sidebar
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-0">
            {/* Icons (white backgrounds, no extra margin/padding) */}
            <div className="flex flex-col gap-0">
                {socials.map((social, index) => (
                    <SocialIcon key={index} {...social} />
                ))}
            </div>
        </div>
    );
}

function SocialIcon({ icon: Icon, href, label }: { icon: LucideIcon; href: string; label: string }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="m-0 p-0 bg-white text-bauyesDark w-9 h-9 flex items-center justify-center"
            whileHover={{
                scale: 1.15,
                x: -4,
                color: "#bef264"
            }}
        >
            <Icon size={18} className="text-current" />
        </motion.a>
    );
}
