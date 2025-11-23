"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/types";
import Image from "next/image";

interface MemberCardProps {
    member: TeamMember;
    onClick: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
    return (
        <motion.div
            layoutId={`card-${member.id}`}
            onClick={onClick}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-card border border-white/10 hover:border-primary/50 transition-colors"
            whileHover={{ y: -5 }}
        >
            {/* Image */}
            {member.image_url ? (
                <motion.div
                    className="h-full w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={member.image_url}
                        alt={member.full_name}
                        fill
                        className="object-cover"
                    />
                </motion.div>
            ) : (
                <div className="h-full w-full bg-[#1a2e05] flex items-center justify-center relative overflow-hidden">
                    {/* Placeholder SVG Pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="memberGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L20 0" stroke="#bef264" strokeWidth="2" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#memberGrid)" />
                    </svg>
                    <span className="text-4xl font-display font-bold text-[#bef264] relative z-10">
                        {member.full_name.charAt(0)}
                    </span>
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-bauyesDark/90 via-bauyesDark/40 to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-4">
                <motion.h3
                    layoutId={`name-${member.id}`}
                    className="text-xl font-display font-bold text-white"
                >
                    {member.full_name}
                </motion.h3>
                <motion.p
                    layoutId={`role-${member.id}`}
                    className="text-sm text-primary font-medium"
                >
                    {member.role_title}
                </motion.p>
            </div>
        </motion.div>
    );
}
