import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseBrowserConfigured = SUPABASE_URL !== '' && SUPABASE_ANON_KEY !== '';

/**
 * Reserved for future read-only public content (RLS). All form writes use the API via AppController.
 */
export const supabaseBrowser = isSupabaseBrowserConfigured
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
