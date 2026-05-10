# TrenchLabs

Marketing site and lead-capture API for TrenchLabs: React (Vite) frontend and Express backend backed by **Supabase PostgreSQL** or a local JSON sandbox.

## Repository layout

- `frontend/` — Vite + React app (public pages, `/admin` dashboard).
- `backend/` — Express API (`/api/*`), JWT admin auth, Zod validation, rate limits.
- `supabase/migrations/` — SQL schema for Supabase projects.

---

## Connect Supabase (hosted database)

Do this once per Supabase project. The API uses the **service role** key only on the server — never put it in the frontend.

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project** → choose region and database password.

### 2. Create the tables

1. In the Supabase dashboard: **SQL Editor** → **New query**.
2. Paste the **entire** contents of  
   [`supabase/migrations/20250510120000_init_trenchlabs.sql`](supabase/migrations/20250510120000_init_trenchlabs.sql).
3. Click **Run**. You should see success with no errors.

This creates:

- `contact_submissions`, `careers_applications`, `internship_applications`, `consultation_bookings`, `telemetry_logs`

### 3. Get API credentials

1. **Project Settings** (gear) → **API**.
2. Copy **Project URL** → `SUPABASE_URL` in `backend/.env`.
3. Copy **service_role** `secret` (not the anon key) → `SUPABASE_SERVICE_ROLE_KEY` in `backend/.env`.

### 4. Configure the backend

In `backend/.env` (see [`backend/.env.example`](backend/.env.example)):

| Variable | Required | Notes |
|----------|----------|--------|
| `SUPABASE_URL` | Yes (for Supabase) | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (for Supabase) | Service role secret |
| `ADMIN_PASSWORD` | Yes | Admin dashboard password |
| `JWT_SECRET` | Yes (32+ chars in production) | Signs admin JWTs |
| `FRONTEND_ORIGIN` | Yes in production | Comma-separated browser origins, e.g. `https://yoursite.com,https://www.yoursite.com` |
| `PORT` | Optional | Default `5000` |

Restart the API after changing `.env`.

On startup the server logs either **`Supabase: all required tables are reachable`** or an error pointing you back to the migration SQL if something is wrong.

### 5. Configure the frontend (production)

Build-time env (hosting dashboard or `.env.production`):

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical site URL (no trailing slash), e.g. `https://yoursite.com` |
| `VITE_API_URL` | **Only if** the UI and API use different origins. Set to the public API base, e.g. `https://api.yoursite.com/api` (no trailing slash). If the site is served from the same host and `/api` is reverse-proxied to Node, leave unset. |

See [`frontend/.env.example`](frontend/.env.example).

### 6. CORS

The API only accepts origins listed in `FRONTEND_ORIGIN` (production). Include every URL users use to open the site (with and without `www`, `http` vs `https` as applicable).  
Local dev defaults include `http://localhost:5173`, `http://127.0.0.1:5173`, and ports `5174`, `3000`.

### 7. Without Supabase (sandbox only)

Leave `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` empty. Data is stored in `backend/db_sandbox.json` (gitignored). **Not for production.**

---

## Local development

### Prerequisites

- Node.js 20+ recommended
- npm

### Backend

```bash
cd backend
cp .env.example .env
# Set ADMIN_PASSWORD, JWT_SECRET; add Supabase vars if using cloud DB
npm install
npm run dev
```

API: `http://localhost:5000` — `GET /health`.

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Vite proxies `/api` → `http://localhost:5000` (no `VITE_API_URL` needed locally).

---

## Production deployment (outline)

- **Frontend**: Static hosting (Cloudflare Pages, Vercel, Netlify). Build `npm run build` in `frontend/`. Set `VITE_SITE_URL` and `VITE_API_URL` if the API is on another domain.
- **Backend**: Node host (Fly.io, Railway, Render). Set `NODE_ENV=production`, `JWT_SECRET`, `ADMIN_PASSWORD`, `FRONTEND_ORIGIN`, and Supabase credentials. Run `npm run build && npm start` in `backend/`.
- **Same domain**: Put the API behind `/api` (reverse proxy or host rewrites) so the browser can use relative `/api` and you can omit `VITE_API_URL`.
- **Notifications**: Optional `SLACK_WEBHOOK_URL` on the API for new lead alerts.

---

## Security notes

- **Never** expose `SUPABASE_SERVICE_ROLE_KEY` or `JWT_SECRET` in client bundles or public repos.
- Admin sessions are **signed JWTs** (8h). Use strong `JWT_SECRET` and `ADMIN_PASSWORD` in production.
- Public form routes are **rate limited**.

## Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| `frontend/` | `npm run build` | Production bundle |
| `backend/` | `npm run build` | Compile TypeScript to `dist/` |

CI runs lint and build for both packages (see `.github/workflows/ci.yml`).
