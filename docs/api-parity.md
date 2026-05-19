# Express to Supabase Edge Function Parity

This document maps every existing Express endpoint to the new Supabase Edge Function router (`supabase/functions/api/index.ts`).

## Base URL

- Local Supabase functions: `http://127.0.0.1:54321/functions/v1/api`
- Production: `https://<project-ref>.supabase.co/functions/v1/api`

## Route Mapping

| Legacy Express | New Edge Function | Auth | Rate Limit |
|---|---|---|---|
| `POST /api/auth/login` | `POST /auth/login` | Public | Login limiter (10/15m/IP) |
| `GET /api/contacts` | `GET /contacts` | Admin token | None |
| `POST /api/contacts` | `POST /contacts` | Public | Public limiter (60/1h/IP+route) |
| `POST /api/contacts/:id/reply` | `POST /contacts/:id/reply` | Admin token | None |
| `GET /api/careers` | `GET /careers` | Admin token | None |
| `POST /api/careers` | `POST /careers` | Public | Public limiter |
| `PUT /api/careers/:id` | `PUT /careers/:id` | Admin token | None |
| `POST /api/careers/:id/reply` | `POST /careers/:id/reply` | Admin token | None |
| `GET /api/internships` | `GET /internships` | Admin token | None |
| `POST /api/internships` | `POST /internships` | Public | Public limiter |
| `PUT /api/internships/:id` | `PUT /internships/:id` | Admin token | None |
| `POST /api/internships/:id/reply` | `POST /internships/:id/reply` | Admin token | None |
| `GET /api/bookings` | `GET /bookings` | Admin token | None |
| `POST /api/bookings` | `POST /bookings` | Public | Public limiter |
| `PUT /api/bookings/:id` | `PUT /bookings/:id` | Admin token | None |
| `GET /api/telemetry` | `GET /telemetry` | Admin token | None |
| `GET /health` | `GET /health` | Public | None |

## Auth Contract

- Login payload: `{ "password": string }`
- Login success: `{ "token": string }`
- Protected routes: `Authorization: Bearer <token>`
- Token claims: `sub=trenchlabs-admin`, `role=admin`, 8h expiry

## Error Contract

All errors keep the same shape:

```json
{
  "error": {
    "code": "SOME_CODE",
    "message": "Human readable message"
  }
}
```

Validation errors additionally include Zod `details`.

## Rate Limiter Storage

Edge Functions store per-window counters in Supabase table:

- `public.request_rate_limits`
  - `key` (text primary key)
  - `count` (int)
  - `window_start` (timestamptz)
  - `updated_at` (timestamptz)

The migration lives in:

- `supabase/migrations/20260511161500_edge_rate_limits.sql`
