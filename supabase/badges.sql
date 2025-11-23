-- ============================================
-- BAUYES BADGE SYSTEM
-- Run this in Supabase SQL Editor
-- ============================================

-- Table 1: badges (The master list of all available badges)
CREATE TABLE IF NOT EXISTS badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL, -- Lucide icon name (e.g., 'Rocket', 'Moon', 'Mic')
    xp_bonus INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Table 2: user_badges (Tracks which badges each user has earned)
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
    awarded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(user_id, badge_id) -- Prevent duplicate badge awards
);

-- Enable Row Level Security
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

-- RLS Policies for badges (Everyone can view)
CREATE POLICY "Badges are viewable by everyone" ON badges
    FOR SELECT USING (true);

-- RLS Policies for user_badges
CREATE POLICY "User badges are viewable by everyone" ON user_badges
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own badges" ON user_badges
    FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

-- ============================================
-- SEED DATA: Starter Badges
-- ============================================

INSERT INTO badges (name, description, icon_name, xp_bonus) VALUES
    ('Founder', 'Joined in the first month', 'Rocket', 100),
    ('Night Owl', 'Logged in after midnight', 'Moon', 50),
    ('Pitch Perfect', 'Won a Deckathon', 'Mic', 200),
    ('First Steps', 'Completed your first event', 'Footprints', 50),
    ('Social Butterfly', 'Connected with 10+ community members', 'Users', 75),
    ('Streak Master', 'Maintained a 7-day login streak', 'Flame', 150),
    ('Knowledge Seeker', 'Attended 5+ workshops', 'BookOpen', 100),
    ('Champion', 'Won a competition', 'Trophy', 250),
    ('Early Bird', 'Registered for an event within 24 hours', 'Sunrise', 50),
    ('Team Player', 'Participated in a group project', 'Users2', 100)
ON CONFLICT DO NOTHING;

-- ============================================
-- ADD BIO COLUMN TO PROFILES (If not exists)
-- ============================================

-- Add bio column to profiles table for user descriptions
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
-- If you see this, the Badge System is ready! 🎉
