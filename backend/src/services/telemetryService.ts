import { supabase, isRealSupabaseConnected, sandboxDb } from '../config/db.js';

export async function listTelemetry() {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('telemetry_logs')
            .select('*')
            .order('id', { ascending: false })
            .limit(50);
        if (error) throw error;
        return data;
    }
    return sandboxDb.read('telemetry');
}
