# TrenchLabs

> **The digital engineering studio that builds fast, precise, and without compromise.**

TrenchLabs is a boutique digital engineering agency offering modern web development, AI automation systems, UI/UX design, e-commerce solutions, and WordPress development.

📄 **For a full non-technical overview of the agency — services, team, portfolio, culture, and contact details — see [AGENCY.md](./AGENCY.md).**

---

## Technical Stack

TrenchLabs is now a Supabase-first stack:

- Frontend: Next.js (App Router) in `frontend/`
- Backend: Supabase Edge Functions in `supabase/functions/`
- Database: Supabase PostgreSQL migrations in `supabase/migrations/`
- Hosting: Vercel (frontend) + Supabase (functions/database)

The old Express backend has been removed from the active codebase.

## Repository Layout

- `frontend/` — Next.js UI (public pages + `/admin` dashboard)
- `supabase/functions/api/` — Edge Function API router with parity to legacy Express routes
- `supabase/functions/_shared/` — shared auth, validation, error, CORS, and rate-limit utilities
- `supabase/migrations/` — schema + rate-limit tables
- `docs/api-parity.md` — route contract mapping for migration/cutover

## Supabase Setup

### 1) Create Supabase project

Create a new project in [Supabase](https://supabase.com).

### 2) Run migrations

Run both SQL files in Supabase SQL Editor:

- `supabase/migrations/20250510120000_init_trenchlabs.sql`
- `supabase/migrations/20260511161500_edge_rate_limits.sql`

### 3) Configure Edge Function secrets

In Supabase project secrets (or local function env), set:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_JWT_SECRET` (32+ chars)
- `SLACK_WEBHOOK_URL` (optional)

### 4) Deploy/serve Edge Function

Deploy function:

```bash
supabase functions deploy api --no-verify-jwt
```

Local serve:

```bash
supabase functions serve api --env-file ./supabase/.env.local --no-verify-jwt
```

API base URL becomes:

- Prod: `https://<project-ref>.supabase.co/functions/v1/api`
- Local: `http://127.0.0.1:54321/functions/v1/api`

## Frontend Setup (Next.js)

### Environment variables

Copy `frontend/.env.example` to `frontend/.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`
- optional analytics and browser Supabase vars

### Local dev

```bash
cd frontend
npm install
npm run dev
```

## Vercel Deployment

Set these env vars in Vercel:

- `NEXT_PUBLIC_SITE_URL` (e.g. `https://trenchlabs.com`)
- `NEXT_PUBLIC_API_URL` (Supabase function URL)
- optional:
  - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## API Contracts

Route parity and payload contracts are documented in:

- `docs/api-parity.md`

## Security Notes

- Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend env vars.
- Rotate any leaked admin/service keys immediately.
- Keep `ADMIN_JWT_SECRET` long and random.
