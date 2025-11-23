-- =============================================
-- PHASE 1: Database Architecture Upgrade
-- Task System & Event Micro-Platforms
-- =============================================

-- =============================================
-- 1. TASK SYSTEM TABLES
-- =============================================

-- Create tasks table
CREATE TABLE tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    xp_reward int DEFAULT 0,
    is_global boolean DEFAULT false,
    created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Create user_tasks table (task submissions)
CREATE TABLE user_tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'review', 'completed')),
    proof_url text,
    submitted_at timestamp with time zone,
    completed_at timestamp with time zone,
    UNIQUE(user_id, task_id)
);

-- =============================================
-- 2. EVENT MICRO-VERSE UPDATES
-- =============================================

-- Alter registrations table to support event-specific features
ALTER TABLE registrations
    ADD COLUMN event_score integer DEFAULT 0,
    ADD COLUMN team_name text,
    ADD COLUMN custom_answers jsonb;

-- =============================================
-- 3. SECURITY (RLS)
-- =============================================

-- Enable RLS on new tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tasks
-- Public read access for all tasks
CREATE POLICY "Public Read Access" ON tasks
    FOR SELECT USING (true);

-- Admin write access for tasks
CREATE POLICY "Admin Write Access" ON tasks
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- RLS Policies for user_tasks
-- Users can read their own task submissions
CREATE POLICY "Users Read Own Tasks" ON user_tasks
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own task submissions
CREATE POLICY "Users Insert Own Tasks" ON user_tasks
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own task submissions
CREATE POLICY "Users Update Own Tasks" ON user_tasks
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can read all task submissions
CREATE POLICY "Admin Read All Tasks" ON user_tasks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- Admins can update all task submissions (for reviewing)
CREATE POLICY "Admin Update All Tasks" ON user_tasks
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- =============================================
-- 4. INDEXES FOR PERFORMANCE
-- =============================================

-- Index for faster lookups on user_tasks
CREATE INDEX idx_user_tasks_user_id ON user_tasks(user_id);
CREATE INDEX idx_user_tasks_task_id ON user_tasks(task_id);
CREATE INDEX idx_user_tasks_status ON user_tasks(status);

-- Index for tasks
CREATE INDEX idx_tasks_is_global ON tasks(is_global);
CREATE INDEX idx_tasks_created_by ON tasks(created_by);

-- Index for registrations event_score
CREATE INDEX idx_registrations_event_score ON registrations(event_score);
