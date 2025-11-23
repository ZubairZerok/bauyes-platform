-- Create events table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  date timestamp with time zone not null,
  location text not null,
  xp_reward integer not null,
  image_url text,
  category text not null check (category in ('competition', 'workshop', 'hackathon', 'meetup')),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create registrations table
create table registrations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  event_id uuid references events(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, event_id)
);

-- Enable RLS
alter table events enable row level security;
alter table registrations enable row level security;

-- Policies for events
create policy "Events are viewable by everyone." on events
  for select using (true);

-- Policies for registrations
create policy "Users can view their own registrations." on registrations
  for select using ((select auth.uid()) = user_id);

create policy "Users can register themselves." on registrations
  for insert with check ((select auth.uid()) = user_id);

create policy "Users can cancel their own registration." on registrations
  for delete using ((select auth.uid()) = user_id);

-- Seed Data
insert into events (title, description, date, location, xp_reward, category)
values
  (
    'Ignition Series: Zero to One',
    'Learn the fundamentals of starting a startup from scratch. This workshop covers ideation, validation, and the first steps of building a product.',
    now() + interval '7 days',
    'BAU Auditorium',
    50,
    'workshop'
  ),
  (
    'BAUYES Deckathon 2025',
    'The ultimate pitch deck competition. Showcase your startup idea to a panel of judges and win amazing prizes.',
    now() + interval '30 days',
    'Virtual / Zoom',
    500,
    'competition'
  ),
  (
    'Agri-Hackathon',
    'Build the future of agriculture in this 48-hour hackathon. Teams will compete to solve real-world problems in the ag-tech space.',
    now() + interval '60 days',
    'Innovation Lab',
    1000,
    'competition'
  );
