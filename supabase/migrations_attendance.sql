-- ============================================
-- ATTENDANCE & XP SYSTEM MIGRATION
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add status to registrations (if not exists)
-- Status values: 'registered', 'attended', 'missed'
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'registered';

-- 2. Add events_attended to profiles (if not exists)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS events_attended integer DEFAULT 0;

-- 3. SECURITY: Allow Admins to Update Registrations & Profiles
-- Ensure RLS is enabled
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can update any registration (to mark attendance)
CREATE POLICY "Admins can update registrations"
ON registrations FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Policy: Admins can update any profile (to award XP)
-- Note: Existing policy might be "Users can update own profile", 
-- we need to add this specific one for admins to update OTHERS.
CREATE POLICY "Admins can update profiles"
ON profiles FOR UPDATE
TO authenticated
USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
