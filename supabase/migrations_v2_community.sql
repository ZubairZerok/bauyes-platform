-- Create team_members table
CREATE TABLE team_members (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name text NOT NULL,
    role_title text NOT NULL,
    bio_short text,
    bio_long text,
    image_url text,
    social_links jsonb,
    priority int DEFAULT 10,
    status text DEFAULT 'active' CHECK (status IN ('active', 'alumni'))
);

-- Create resources table
CREATE TABLE resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    category text CHECK (category IN ('deck', 'template', 'video', 'merch')),
    download_url text,
    thumbnail_url text,
    is_locked boolean DEFAULT false,
    download_count int DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- RLS Policies for team_members
CREATE POLICY "Public Read Access" ON team_members
    FOR SELECT USING (true);

CREATE POLICY "Admin Write Access" ON team_members
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- RLS Policies for resources
CREATE POLICY "Public Read Access" ON resources
    FOR SELECT USING (true);

CREATE POLICY "Admin Write Access" ON resources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
        )
    );

-- RPC function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(resource_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE resources
  SET download_count = download_count + 1
  WHERE id = resource_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
