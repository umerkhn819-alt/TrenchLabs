import { createClient } from 'npm:@supabase/supabase-js@2.49.8';
import { ApiError } from './errors.ts';

function getDbClient() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRole) {
        throw new ApiError(503, 'Supabase service credentials are missing.', 'AUTH_NOT_CONFIGURED');
    }
    return createClient(supabaseUrl, serviceRole, { auth: { persistSession: false } });
}

export async function enforceRateLimit(
    req: Request,
    routeKey: string,
    windowMinutes: number,
    max: number,
    errorMessage: string
): Promise<void> {
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor.split(',')[0].trim() || 'unknown';
    const now = new Date();
    const windowStart = new Date(Math.floor(now.getTime() / (windowMinutes * 60_000)) * windowMinutes * 60_000);
    const key = `${routeKey}:${ip}:${windowStart.toISOString()}`;

    const db = getDbClient();
    const { data: existing, error: readError } = await db
        .from('request_rate_limits')
        .select('key,count,window_start')
        .eq('key', key)
        .maybeSingle();
    if (readError) throw readError;

    const count = (existing?.count ?? 0) + 1;
    if (count > max) {
        throw new ApiError(429, errorMessage, 'RATE_LIMIT');
    }

    const { error: upsertError } = await db.from('request_rate_limits').upsert(
        {
            key,
            count,
            window_start: windowStart.toISOString(),
            updated_at: now.toISOString()
        },
        { onConflict: 'key' }
    );
    if (upsertError) throw upsertError;
}
