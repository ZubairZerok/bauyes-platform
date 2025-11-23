"use client";

import { useState } from "react";
import { TeamMember } from "@/types";
import { MemberCard } from "./MemberCard";
import { MemberModal } from "./MemberModal";
import { AnimatePresence } from "framer-motion";

interface MembersGridProps {
    members: TeamMember[];
}

export function MembersGrid({ members }: MembersGridProps) {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <MemberCard
                        key={member.id}
                        member={member}
                        onClick={() => setSelectedMember(member)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedMember && (
                    <MemberModal
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
