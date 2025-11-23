-- ============================================
-- PROJECT SUBMISSIONS SYSTEM
-- Run this in Supabase SQL Editor
-- ============================================

-- Add submission_url column to registrations
-- Stores the link to the user's project (Canva, GitHub, Drive, etc.)
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS submission_url text;

-- Add submission timestamp
ALTER TABLE registrations 
ADD COLUMN IF NOT EXISTS submitted_at timestamp with time zone;
