"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/lib/actions/profile";
import { Profile } from "@/types";
import { X } from "lucide-react";

interface EditProfileDialogProps {
    profile: Profile;
    isOpen: boolean;
    onClose: () => void;
}

export function EditProfileDialog({ profile, isOpen, onClose }: EditProfileDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [fullName, setFullName] = useState(profile.full_name || "");
    const [username, setUsername] = useState(profile.username || "");
    const [bio, setBio] = useState(profile.bio || "");
    const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
    const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
    const [facebook, setFacebook] = useState("");
    const [linkedin, setLinkedin] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("username", username);
        formData.append("bio", bio);
        formData.append("avatarUrl", avatarUrl);
        formData.append("coverPhotoUrl", coverPhotoUrl);
        formData.append("facebook", facebook);
        formData.append("linkedin", linkedin);

        startTransition(async () => {
            const result = await updateProfile(formData);

            if (result.success) {
                alert("✅ " + result.message);
                onClose();
            } else {
                alert("❌ " + result.message);
            }
        });
    };

    return (
        <div className="fixed inset-0 bg-bauyesDark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-bauyesLime border border-bauyesDark rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-bauyesDark/60 hover:text-bauyesDark transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-display font-bold text-bauyesDark mb-6">
                    Edit Profile
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture URL */}
                    <div>
                        <label htmlFor="avatarUrl" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Profile Picture URL
                        </label>
                        <input
                            id="avatarUrl"
                            type="url"
                            value={avatarUrl}
                            onChange={(e) => setAvatarUrl(e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                            placeholder="https://example.com/your-photo.jpg"
                        />
                        <p className="text-xs text-bauyesDark/60 mt-1">Paste a URL to your profile picture</p>
                    </div>

                    {/* Cover Photo URL */}
                    <div>
                        <label htmlFor="coverPhotoUrl" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Cover Photo URL
                        </label>
                        <input
                            id="coverPhotoUrl"
                            type="url"
                            value={coverPhotoUrl}
                            onChange={(e) => setCoverPhotoUrl(e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                            placeholder="https://example.com/cover-photo.jpg"
                        />
                        <p className="text-xs text-bauyesDark/60 mt-1">Paste a URL to your cover photo (banner)</p>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                            placeholder="Your full name"
                            required
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-bauyesDark/60">@</span>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                className="w-full pl-8 pr-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                placeholder="username"
                                required
                            />
                        </div>
                        <p className="text-xs text-bauyesDark/60 mt-1">Lowercase letters, numbers, and underscores only</p>
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Facebook */}
                        <div>
                            <label htmlFor="facebook" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                Facebook URL
                            </label>
                            <input
                                id="facebook"
                                type="url"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                placeholder="https://facebook.com/..."
                            />
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <label htmlFor="linkedin" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                                LinkedIn URL
                            </label>
                            <input
                                id="linkedin"
                                type="url"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors"
                                placeholder="https://linkedin.com/in/..."
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-bauyesDark/80 mb-2">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={4}
                            maxLength={200}
                            className="w-full px-4 py-3 bg-white/50 border border-bauyesDark/20 rounded-lg text-bauyesDark placeholder-bauyesDark/50 focus:outline-none focus:border-bauyesDark transition-colors resize-none"
                            placeholder="Tell us about yourself..."
                        />
                        <p className="text-xs text-bauyesDark/60 mt-1">{bio.length}/200 characters</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white/50 text-bauyesDark rounded-lg font-medium hover:bg-white/80 transition-colors"
                            disabled={isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isPending}
                            className="flex-1 px-4 py-3 bg-bauyesDark text-bauyesLime rounded-lg font-bold hover:bg-bauyesDark/90 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isPending ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
