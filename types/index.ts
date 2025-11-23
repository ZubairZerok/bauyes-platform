import { User as SupabaseUser } from "@supabase/supabase-js";



export interface Profile {
    id: string;
    email?: string;
    full_name?: string;
    username?: string;
    avatar_url?: string;
    bio?: string;
    total_xp: number;
    current_level: number;
    current_streak: number;
    role: 'student' | 'admin' | 'moderator';
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon_name: string;
    xp_bonus: number;
    created_at: string;
}

export interface UserBadge {
    id: string;
    user_id: string;
    badge_id: string;
    awarded_at: string;
    badge?: Badge; // For joined queries
}

export interface UserSession {
    user: SupabaseUser;
    profile: Profile | null;
}

export interface ActivityLog {
    id: string;
    type: "LOGIN" | "COMPLETE_PROFILE" | "FIRST_POST" | "DAILY_STREAK";
    xpEarned: number;
    timestamp: string;
    userId: string;
}

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    xp_reward: number;
    image_url?: string;
    category: 'competition' | 'workshop' | 'hackathon' | 'meetup';
    created_at: string;
}

export interface Registration {
    id: string;
    user_id: string;
    event_id: string;
    created_at: string;
    event_score: number;
    team_name?: string | null;
    custom_answers?: Record<string, unknown> | null;
}

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    xp_reward: number;
    is_global: boolean;
    created_by?: string | null;
    created_at: string;
}

export interface UserTask {
    id: string;
    user_id: string;
    task_id: string;
    status: 'pending' | 'review' | 'completed';
    proof_url?: string | null;
    submitted_at?: string | null;
    completed_at?: string | null;
}


export interface TeamMember {
    id: string;
    full_name: string;
    role_title: string;
    bio_short: string | null;
    bio_long: string | null;
    image_url: string | null;
    social_links: {
        linkedin?: string;
        facebook?: string;
        github?: string;
        twitter?: string;
        website?: string;
    } | null;
    priority: number;
    status: 'active' | 'alumni';
}

export interface Resource {
    id: string;
    title: string;
    description: string | null;
    category: 'deck' | 'template' | 'video' | 'merch';
    download_url: string | null;
    thumbnail_url: string | null;
    is_locked: boolean;
    download_count: number;
    created_at: string;
}
