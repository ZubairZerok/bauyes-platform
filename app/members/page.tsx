import { createClient } from "@/utils/supabase/server";
import { MembersGrid } from "@/components/members/MembersGrid";

export default async function MembersPage() {
    const supabase = await createClient();

    // Fetch all user profiles
    const { data: profiles } = await supabase
        .from("profiles")
        .select("id, full_name, username, avatar_url, bio, total_xp, current_level")
        .order("total_xp", { ascending: false });

    const members = (profiles || []).map(profile => ({
        id: profile.id,
        full_name: profile.full_name || profile.username || "Anonymous",
        role_title: `Level ${profile.current_level}`,
        bio_short: `${profile.total_xp} XP`,
        bio_long: profile.bio || "No bio available",
        profile_image: profile.avatar_url || null,
        image_url: profile.avatar_url || null,
        social_links: {},
        achievements: [],
        status: "active" as const,
        priority: 99,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }));

    return (
        <div className="min-h-screen bg-voidBlack">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        Our Squad
                    </h1>
                    <p className="text-xl text-zinc-400">
                        Meet the amazing members of BAUYES
                    </p>
                </div>

                <MembersGrid members={members} />
            </div>
        </div>
    );
}
