import { supabase, isRealSupabaseConnected, sandboxDb } from '../config/db.js';
import { generateId } from './ids.js';

export async function listInternships() {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('internship_applications')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    }
    return sandboxDb.read('internships');
}

export async function createInternship(input: {
    name: string;
    email: string;
    university?: string;
    github?: string;
    statement: string;
    track: string;
}) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('internship_applications')
            .insert([
                {
                    name: input.name,
                    email: input.email,
                    university: input.university || null,
                    github: input.github || null,
                    statement: input.statement,
                    track: input.track,
                    status: 'Pending'
                }
            ])
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('internships');
    const newRow = {
        id: generateId('intern'),
        created_at: new Date().toISOString(),
        status: 'Pending',
        ...input
    };
    list.unshift(newRow);
    sandboxDb.write('internships', list);
    return newRow;
}

export async function updateInternshipStatus(id: string, status: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('internship_applications')
            .update({ status })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('internships');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].status = status;
    sandboxDb.write('internships', list);
    return list[itemIndex];
}

export async function replyInternship(id: string, response_text: string) {
    if (isRealSupabaseConnected && supabase) {
        const { data, error } = await supabase
            .from('internship_applications')
            .update({ response_text })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data![0];
    }
    const list = sandboxDb.read('internships');
    const itemIndex = list.findIndex((i: { id: string }) => i.id === id);
    if (itemIndex === -1) return null;
    list[itemIndex].response_text = response_text;
    sandboxDb.write('internships', list);
    return list[itemIndex];
}
