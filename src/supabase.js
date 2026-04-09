import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
// Get them from: https://supabase.com/dashboard → your project → Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://abnlbfaqssspnopiqirj.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFibmxiZmFxc3NzcG5vcGlxaXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MjcyNTMsImV4cCI6MjA5MTMwMzI1M30.qSTFQr4aDRam6RMhgYURNNWHo2BZv4ZOj09kp9mhaWQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// SQL to create the table — run this in your Supabase SQL editor:
/*
create table rsvp_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  attending boolean not null,
  guest_count integer default 0,
  guest_names text[] default '{}',
  food_preferences jsonb default '[]',
  allergies text default '',
  meal_confirmed boolean default false,
  language text default 'de'
);

-- Storage bucket for photos (run in Supabase dashboard → Storage)
-- Create a bucket named: wedding-photos (set to public)

-- Table for site settings (colors etc.)
create table site_settings (
  key text primary key,
  value text not null
);

-- Insert default dresscode colors
insert into site_settings (key, value) values
  ('dresscode_color_1', '#697C9F'),
  ('dresscode_color_2', '#2E3D52'),
  ('dresscode_color_3', '#6E6C83'),
  ('dresscode_color_4', '#9BA8C0')
on conflict (key) do nothing;
*/
