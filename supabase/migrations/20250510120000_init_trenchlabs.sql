-- TrenchLabs BFF tables (Supabase / PostgreSQL)
-- Apply via Supabase SQL editor or `supabase db push` when using Supabase CLI.

create extension if not exists "uuid-ossp";

create table if not exists public.contact_submissions (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    message text not null,
    status text not null default 'Pending',
    response_text text
);

create index if not exists idx_contact_submissions_created_at on public.contact_submissions (created_at desc);
create index if not exists idx_contact_submissions_status on public.contact_submissions (status);

create table if not exists public.careers_applications (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    github text,
    compensation text,
    experience text,
    role text not null,
    status text not null default 'Under Review',
    response_text text
);

create index if not exists idx_careers_applications_created_at on public.careers_applications (created_at desc);
create index if not exists idx_careers_applications_status on public.careers_applications (status);

create table if not exists public.internship_applications (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    university text,
    github text,
    statement text not null,
    track text not null,
    status text not null default 'Pending',
    response_text text
);

create index if not exists idx_internship_applications_created_at on public.internship_applications (created_at desc);
create index if not exists idx_internship_applications_status on public.internship_applications (status);

create table if not exists public.consultation_bookings (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamptz not null default now(),
    date text not null,
    time text not null,
    company text not null,
    contact text not null,
    email text not null,
    status text not null default 'Scheduled',
    meeting_link text
);

create index if not exists idx_consultation_bookings_created_at on public.consultation_bookings (created_at desc);
create index if not exists idx_consultation_bookings_status on public.consultation_bookings (status);

create table if not exists public.telemetry_logs (
    id bigserial primary key,
    timestamp text not null,
    query text not null,
    status text not null,
    latency text not null
);

create index if not exists idx_telemetry_logs_id on public.telemetry_logs (id desc);
