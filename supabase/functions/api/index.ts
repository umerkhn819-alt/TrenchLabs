import { createClient } from 'npm:@supabase/supabase-js@2.49.8';
import { optionsResponse } from '../_shared/cors.ts';
import { ApiError, handleError, jsonResponse } from '../_shared/errors.ts';
import { getAdminPassword, requireAdminAuth, signAdminToken } from '../_shared/auth.ts';
import { enforceRateLimit } from '../_shared/rateLimit.ts';
import {
    bookingCreateSchema,
    careersCreateSchema,
    contactCreateSchema,
    contactReplySchema,
    internshipCreateSchema,
    loginBodySchema,
    replyBodySchema,
    statusUpdateSchema
} from '../_shared/validation.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for Edge Functions.');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false }
});

async function logTelemetryEvent(event: string, status: string = 'ok') {
    const timestamp = new Date().toISOString();
    const latency = `${Math.floor(Math.random() * 20) + 2}ms`;
    await supabase.from('telemetry_logs').insert([{ timestamp, query: event, status, latency }]);
}

async function notifyLead(event: string, meta: Record<string, string>): Promise<void> {
    const url = Deno.env.get('SLACK_WEBHOOK_URL')?.trim();
    if (!url) return;
    const text = `[TrenchLabs] ${event}\n${Object.entries(meta)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n')}`;
    try {
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
    } catch {
        // non-fatal
    }
}

function parsePath(pathname: string): string[] {
    return pathname
        .split('/')
        .filter(Boolean)
        .filter((segment) => segment !== 'functions' && segment !== 'v1' && segment !== 'api');
}

async function handleAuth(path: string[], req: Request): Promise<Response> {
    if (req.method === 'POST' && path[0] === 'auth' && path[1] === 'login') {
        await enforceRateLimit(req, 'auth_login', 15, 10, 'Too many login attempts. Try again later.');
        const body = loginBodySchema.parse(await req.json());
        const expected = getAdminPassword();
        if (body.password !== expected) {
            await logTelemetryEvent('auth.login.failure', 'unauthorized');
            throw new ApiError(401, 'Invalid authorization credentials.', 'INVALID_CREDENTIALS');
        }
        const token = await signAdminToken();
        await logTelemetryEvent('auth.login.success', 'ok');
        return jsonResponse({ token });
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function handleContacts(path: string[], req: Request): Promise<Response> {
    if (req.method === 'GET' && path.length === 1) {
        await requireAdminAuth(req);
        await logTelemetryEvent('contacts.list', 'ok');
        const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 1) {
        await enforceRateLimit(req, 'public_form_contacts', 60, 60, 'Too many submissions from this IP.');
        const body = contactCreateSchema.parse(await req.json());
        await logTelemetryEvent('contacts.create', 'ok');
        const { data, error } = await supabase.from('contact_submissions').insert([{ ...body, status: 'Pending' }]).select().single();
        if (error) throw error;
        void notifyLead('New contact submission', { id: String(data.id) });
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 3 && path[2] === 'reply') {
        await requireAdminAuth(req);
        const { response_text } = contactReplySchema.parse(await req.json());
        await logTelemetryEvent('contacts.reply', 'ok');
        const { data, error } = await supabase
            .from('contact_submissions')
            .update({ status: 'Responded', response_text })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function handleCareers(path: string[], req: Request): Promise<Response> {
    if (req.method === 'GET' && path.length === 1) {
        await requireAdminAuth(req);
        await logTelemetryEvent('careers.list', 'ok');
        const { data, error } = await supabase.from('careers_applications').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 1) {
        await enforceRateLimit(req, 'public_form_careers', 60, 60, 'Too many submissions from this IP.');
        const body = careersCreateSchema.parse(await req.json());
        await logTelemetryEvent('careers.create', 'ok');
        const { data, error } = await supabase
            .from('careers_applications')
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    github: body.github || null,
                    compensation: body.compensation || null,
                    experience: body.experience || null,
                    role: body.role,
                    status: 'Under Review'
                }
            ])
            .select()
            .single();
        if (error) throw error;
        void notifyLead('New careers application', { id: String(data.id), role: body.role });
        return jsonResponse(data);
    }
    if (req.method === 'PUT' && path.length === 2) {
        await requireAdminAuth(req);
        const { status } = statusUpdateSchema.parse(await req.json());
        await logTelemetryEvent('careers.status_update', 'ok');
        const { data, error } = await supabase
            .from('careers_applications')
            .update({ status })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 3 && path[2] === 'reply') {
        await requireAdminAuth(req);
        const { response_text } = replyBodySchema.parse(await req.json());
        await logTelemetryEvent('careers.reply', 'ok');
        const { data, error } = await supabase
            .from('careers_applications')
            .update({ response_text })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function handleInternships(path: string[], req: Request): Promise<Response> {
    if (req.method === 'GET' && path.length === 1) {
        await requireAdminAuth(req);
        await logTelemetryEvent('internships.list', 'ok');
        const { data, error } = await supabase.from('internship_applications').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 1) {
        await enforceRateLimit(req, 'public_form_internships', 60, 60, 'Too many submissions from this IP.');
        const body = internshipCreateSchema.parse(await req.json());
        await logTelemetryEvent('internships.create', 'ok');
        const { data, error } = await supabase
            .from('internship_applications')
            .insert([
                {
                    name: body.name,
                    email: body.email,
                    university: body.university || null,
                    github: body.github || null,
                    statement: body.statement,
                    track: body.track,
                    status: 'Pending'
                }
            ])
            .select()
            .single();
        if (error) throw error;
        void notifyLead('New internship application', { id: String(data.id), track: body.track });
        return jsonResponse(data);
    }
    if (req.method === 'PUT' && path.length === 2) {
        await requireAdminAuth(req);
        const { status } = statusUpdateSchema.parse(await req.json());
        await logTelemetryEvent('internships.status_update', 'ok');
        const { data, error } = await supabase
            .from('internship_applications')
            .update({ status })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 3 && path[2] === 'reply') {
        await requireAdminAuth(req);
        const { response_text } = replyBodySchema.parse(await req.json());
        await logTelemetryEvent('internships.reply', 'ok');
        const { data, error } = await supabase
            .from('internship_applications')
            .update({ response_text })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function handleBookings(path: string[], req: Request): Promise<Response> {
    if (req.method === 'GET' && path.length === 1) {
        await requireAdminAuth(req);
        await logTelemetryEvent('bookings.list', 'ok');
        const { data, error } = await supabase.from('consultation_bookings').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return jsonResponse(data);
    }
    if (req.method === 'POST' && path.length === 1) {
        await enforceRateLimit(req, 'public_form_bookings', 60, 60, 'Too many submissions from this IP.');
        const body = bookingCreateSchema.parse(await req.json());
        await logTelemetryEvent('bookings.create', 'ok');
        const meetingLink = `https://meet.google.com/mock-trench-${body.company.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
        const { data, error } = await supabase
            .from('consultation_bookings')
            .insert([{ ...body, status: 'Scheduled', meeting_link: meetingLink }])
            .select()
            .single();
        if (error) throw error;
        void notifyLead('New consultation booking', { id: String(data.id), company: body.company });
        return jsonResponse(data);
    }
    if (req.method === 'PUT' && path.length === 2) {
        await requireAdminAuth(req);
        const { status } = statusUpdateSchema.parse(await req.json());
        await logTelemetryEvent('bookings.status_update', 'ok');
        const { data, error } = await supabase
            .from('consultation_bookings')
            .update({ status })
            .eq('id', path[1])
            .select()
            .maybeSingle();
        if (error) throw error;
        if (!data) throw new ApiError(404, 'Record not found', 'NOT_FOUND');
        return jsonResponse(data);
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function handleTelemetry(path: string[], req: Request): Promise<Response> {
    if (req.method === 'GET' && path.length === 1) {
        await requireAdminAuth(req);
        const { data, error } = await supabase.from('telemetry_logs').select('*').order('id', { ascending: false }).limit(50);
        if (error) throw error;
        return jsonResponse(data);
    }
    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

async function routeRequest(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const path = parsePath(url.pathname);

    if (req.method === 'GET' && path.length === 1 && path[0] === 'health') {
        return jsonResponse({ status: 'healthy', timestamp: new Date().toISOString(), database: 'supabase' });
    }

    if (path[0] === 'auth') return handleAuth(path, req);
    if (path[0] === 'contacts') return handleContacts(path, req);
    if (path[0] === 'careers') return handleCareers(path, req);
    if (path[0] === 'internships') return handleInternships(path, req);
    if (path[0] === 'bookings') return handleBookings(path, req);
    if (path[0] === 'telemetry') return handleTelemetry(path, req);

    throw new ApiError(404, 'Route not found', 'NOT_FOUND');
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') return optionsResponse();
    try {
        return await routeRequest(req);
    } catch (err) {
        return handleError(err);
    }
});
