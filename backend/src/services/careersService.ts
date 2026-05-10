import { supabase, isRealSupabaseConnected, sandboxDb } from '../config/db.js';
import { generateId } from './ids.js';

export async function listCareers() {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('careers_applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
    return sandboxDb.read('careers');
}

export async function createCareers(input: {
    name: string;
    email: string;
    github?: string;
    compensation?: string;
    experience?: string;
    role: string;
}) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('careers_applications')
            .insert([
                {
                    name: input.name,
                    email: input.email,
                    github: input.github || null,
                    compensation: input.compensation || null,
                    experience: input.experience || null,
                    role: input.role,
                    status: 'Under Review'
                }
            ])
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('careers');
    const newRow = {
        id: generateId('candidate'),
        created_at: new Date().toISOString(),
        status: 'Under Review',
        ...input
    };
    list.unshift(newRow);
    sandboxDb.write('careers', list);
    return newRow;
}

export async function updateCareersStatus(id: string, status: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('careers_applications')
            .update({ status })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('careers');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].status = status;
    sandboxDb.write('careers', list);
    return list[itemIndex];
}

export async function replyCareers(id: string, response_text: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('careers_applications')
            .update({ response_text })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('careers');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].response_text = response_text;
    sandboxDb.write('careers', list);
    return list[itemIndex];
}
