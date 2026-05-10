import { supabase, isRealSupabaseConnected, sandboxDb } from '../config/db.js';
import { generateId } from './ids.js';

export async function listContacts() {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
    return sandboxDb.read('contacts');
}

export async function createContact(input: { name: string; email: string; message: string }) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([{ ...input, status: 'Pending' }])
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('contacts');
    const newRow = {
        id: generateId('contact'),
        created_at: new Date().toISOString(),
        status: 'Pending',
        ...input
    };
    list.unshift(newRow);
    sandboxDb.write('contacts', list);
    return newRow;
}

export async function replyContact(id: string, response_text: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('contact_submissions')
            .update({ status: 'Responded', response_text })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('contacts');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].status = 'Responded';
    list[itemIndex].response_text = response_text;
    sandboxDb.write('contacts', list);
    return list[itemIndex];
}
