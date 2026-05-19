create table if not exists public.request_rate_limits (
    key text primary key,
    count integer not null default 0,
    window_start timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists idx_request_rate_limits_updated_at on public.request_rate_limits (updated_at desc);
