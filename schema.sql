-- Create tracking tables
create table if not exists projects (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists user_roles (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users not null,
    project_id uuid references projects on delete cascade not null,
    role text not null check (role in ('admin', 'editor', 'viewer')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(user_id, project_id)
);

create table if not exists portfolio_sections (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects on delete cascade not null,
    section_name text not null,
    content jsonb not null default '{}'::jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(project_id, section_name)
);

-- To set up an initial admin user manually:
-- 1. Insert into auth.users (via Supabase UI)
-- 2. Insert into projects:
--    insert into projects (id, name) values ('00000000-0000-0000-0000-000000000001', 'Adnan Portfolio');
-- 3. Insert into user_roles:
--    insert into user_roles (user_id, project_id, role) values ('<YOUR-AUTH-USER-UID>', '00000000-0000-0000-0000-000000000001', 'admin');

-- EVENTS SYSTEM

create table if not exists events (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    date timestamp with time zone not null,
    location text,
    meeting_link text,
    image_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists event_registrations (
    id uuid primary key default uuid_generate_v4(),
    event_id uuid references events on delete cascade not null,
    name text not null,
    age integer,
    email text not null,
    phone text,
    is_attending boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Note: You must also create a storage bucket named 'event-images' in Supabase to support image uploads.
-- Example SQL to create the bucket (requires superuser, often easier done in the UI):
-- insert into storage.buckets (id, name, public) values ('event-images', 'event-images', true);
