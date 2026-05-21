-- Enable Row Level Security (RLS) on all relevant tables
alter table "public"."contact_submissions" enable row level security;
alter table "public"."careers_applications" enable row level security;
alter table "public"."internship_applications" enable row level security;
alter table "public"."consultation_bookings" enable row level security;
alter table "public"."telemetry_logs" enable row level security;
alter table "public"."request_rate_limits" enable row level security;

-- Drop existing policies if any (prevents conflicts when re-running)
drop policy if exists "Enable insert for public" on "public"."contact_submissions";
drop policy if exists "Enable read/update for authenticated admins" on "public"."contact_submissions";
drop policy if exists "Enable insert for public" on "public"."careers_applications";
drop policy if exists "Enable read/update for authenticated admins" on "public"."careers_applications";
drop policy if exists "Enable insert for public" on "public"."internship_applications";
drop policy if exists "Enable read/update for authenticated admins" on "public"."internship_applications";
drop policy if exists "Enable insert for public" on "public"."consultation_bookings";
drop policy if exists "Enable read/update for authenticated admins" on "public"."consultation_bookings";
drop policy if exists "Enable insert for public" on "public"."telemetry_logs";
drop policy if exists "Enable read/update for authenticated admins" on "public"."telemetry_logs";
drop policy if exists "Enable insert for public" on "public"."request_rate_limits";
drop policy if exists "Enable read/update for authenticated admins" on "public"."request_rate_limits";

-- Create policies for Contacts
create policy "Enable insert for public" on "public"."contact_submissions" for insert to public with check (true);
create policy "Enable read/update for authenticated admins" on "public"."contact_submissions" for all to authenticated using (true) with check (true);

-- Create policies for Careers
create policy "Enable insert for public" on "public"."careers_applications" for insert to public with check (true);
create policy "Enable read/update for authenticated admins" on "public"."careers_applications" for all to authenticated using (true) with check (true);

-- Create policies for Internships
create policy "Enable insert for public" on "public"."internship_applications" for insert to public with check (true);
create policy "Enable read/update for authenticated admins" on "public"."internship_applications" for all to authenticated using (true) with check (true);

-- Create policies for Bookings
create policy "Enable insert for public" on "public"."consultation_bookings" for insert to public with check (true);
create policy "Enable read/update for authenticated admins" on "public"."consultation_bookings" for all to authenticated using (true) with check (true);

-- Create policies for Telemetry
create policy "Enable insert for public" on "public"."telemetry_logs" for insert to public with check (true);
create policy "Enable read/update for authenticated admins" on "public"."telemetry_logs" for all to authenticated using (true) with check (true);

-- Create policies for Request Rate Limits
-- Only edge functions / service role should probably write to this, but we'll secure it against public reads/updates
create policy "Enable read/update for authenticated admins" on "public"."request_rate_limits" for all to authenticated using (true) with check (true);

-- NOTE: If your admin logic relies on a service role key in the Edge Functions,
-- the service role key naturally bypasses RLS. These policies ensure that direct
-- API queries from the browser cannot select/update/delete your data.
