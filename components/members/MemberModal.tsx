"use client";

import { motion } from "framer-motion";
import { TeamMember } from "@/types";
import Image from "next/image";
import { X, Linkedin, Facebook, Github, Twitter, Globe, LucideIcon } from "lucide-react";

interface MemberModalProps {
    member: TeamMember;
    onClose: () => void;
}

export function MemberModal({ member, onClose }: MemberModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-bauyesDark/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                layoutId={`card-${member.id}`}
                className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#064e3b]/90 backdrop-blur-md border border-primary/20 shadow-2xl"
            >
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 rounded-full bg-bauyesDark/20 p-2 text-white hover:bg-white/10 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Col: Image */}
                    <div className="relative h-64 md:h-auto min-h-[300px]">
                        {member.image_url ? (
                            <Image
                                src={member.image_url}
                                alt={member.full_name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-secondary flex items-center justify-center">
                                <span className="text-6xl font-display font-bold text-muted-foreground">
                                    {member.full_name.charAt(0)}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/90 to-transparent md:bg-gradient-to-r" />
                    </div>

                    {/* Right Col: Content */}
                    <div className="p-8 flex flex-col justify-center">
                        <motion.h2
                            layoutId={`name-${member.id}`}
                            className="text-3xl md:text-4xl font-display font-bold text-white mb-2"
                        >
                            {member.full_name}
                        </motion.h2>

                        <motion.div
                            layoutId={`role-${member.id}`}
                            className="self-start rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary border border-primary/20 mb-6"
                        >
                            {member.role_title}
                        </motion.div>

                        <div className="prose prose-invert prose-sm max-w-none mb-8 text-gray-300">
                            <p>{member.bio_long || member.bio_short || "No bio available."}</p>
                        </div>

                        {/* Social Icons */}
                        {member.social_links && (
                            <div className="flex gap-4">
                                {member.social_links.linkedin && (
                                    <SocialLink href={member.social_links.linkedin} icon={Linkedin} />
                                )}
                                {member.social_links.facebook && (
                                    <SocialLink href={member.social_links.facebook} icon={Facebook} />
                                )}
                                {member.social_links.github && (
                                    <SocialLink href={member.social_links.github} icon={Github} />
                                )}
                                {member.social_links.twitter && (
                                    <SocialLink href={member.social_links.twitter} icon={Twitter} />
                                )}
                                {member.social_links.website && (
                                    <SocialLink href={member.social_links.website} icon={Globe} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: LucideIcon }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors hover:scale-110 transform duration-200"
        >
            <Icon size={24} />
        </a>
    );
}
