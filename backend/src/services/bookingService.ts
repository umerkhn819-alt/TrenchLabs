import { supabase, isRealSupabaseConnected, sandboxDb } from '../config/db.js';
import { generateId } from './ids.js';

export async function listBookings() {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('consultation_bookings')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
    return sandboxDb.read('bookings');
}

export async function createBooking(input: {
    date: string;
    time: string;
    company: string;
    contact: string;
    email: string;
}) {
    const meeting_link = `https://meet.google.com/mock-trench-${input.company.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('consultation_bookings')
            .insert([
                {
                    ...input,
                    status: 'Scheduled',
                    meeting_link
                }
            ])
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('bookings');
    const newRow = {
        id: generateId('booking'),
        created_at: new Date().toISOString(),
        status: 'Scheduled',
        ...input,
        meeting_link
    };
    list.unshift(newRow);
    sandboxDb.write('bookings', list);
    return newRow;
}

export async function updateBookingStatus(id: string, status: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('consultation_bookings')
            .update({ status })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('bookings');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].status = status;
    sandboxDb.write('bookings', list);
    return list[itemIndex];
}
