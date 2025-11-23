"use client";

import { useState } from "react";
import { Profile } from "@/types";
import { User as UserIcon, Edit2 } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import Image from "next/image";

interface ProfileHeaderProps {
    profile: Profile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const [isEditOpen, setIsEditOpen] = useState(false);

    return (
        <>
            <div className="relative">
                {/* Banner */}
                <div className="h-48 md:h-64 bg-gradient-to-br from-bauyesLime/20 via-bauyesDark/6 to-card border border-border rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoNHYzNmgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                </div>

                {/* Avatar - Overlapping the banner */}
                <div className="absolute -bottom-16 md:-bottom-20 left-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-card border-4 border-border overflow-hidden flex items-center justify-center shadow-2xl">
                        {profile.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt={profile.full_name || "User"}
                                width={160}
                                height={160}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <UserIcon size={60} className="text-bauyesDark" />
                        )}
                    </div>
                </div>

                {/* Edit Button */}
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="absolute top-4 right-4 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/20"
                >
                    <Edit2 size={16} />
                    Edit Profile
                </button>
            </div>

            {/* Profile Info - Below banner with padding for avatar */}
            <div className="pt-20 md:pt-24 px-8 pb-6">
                <div className="max-w-2xl">
                    {/* Name */}
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                        {profile.full_name || "Anonymous User"}
                    </h1>

                    {/* Username */}
                    {profile.username && (
                        <p className="text-lg text-zinc-400 mb-4">
                            @{profile.username}
                        </p>
                    )}

                    {/* Bio */}
                    {profile.bio ? (
                        <p className="text-zinc-300 text-base leading-relaxed">
                            {profile.bio}
                        </p>
                    ) : (
                        <p className="text-zinc-500 italic text-sm">
                            No bio yet. Click &quot;Edit Profile&quot; to add one!
                        </p>
                    )}
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <EditProfileDialog
                profile={profile}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
            />
        </>
    );
}
