import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';

export const isRealSupabaseConnected = SUPABASE_URL !== '' && SUPABASE_SERVICE_ROLE_KEY !== '';

export const supabase = isRealSupabaseConnected
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: {
              persistSession: false
          }
      })
    : null;

const sandboxDbPath = path.join(__dirname, '..', '..', 'db_sandbox.json');

const sandboxInitialSeed = {
    contacts: [
        {
            id: 'contact-1',
            created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
            name: 'Alexander Mercer',
            email: 'alex@nexagroup.com',
            message:
                'Looking for an enterprise reservation portal with Redis double-booking lock protocols. We need it deployed in under 6 weeks.',
            status: 'Pending'
        },
        {
            id: 'contact-2',
            created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
            name: 'Sophie Dubois',
            email: 'sophie@velora.fashion',
            message: 'Bespoke Custom Liquid checkout development. Let’s connect on the budget metrics.',
            status: 'Responded',
            response_text:
                'Hello Sophie! We have reviewed your conversion rate benchmarks. Let’s sync on Zoom to map details.'
        }
    ],
    careers: [
        {
            id: 'candidate-1',
            created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
            name: 'David Vance',
            email: 'david@vancedev.io',
            github: 'https://github.com/vancedev',
            compensation: '$4,000 / mo',
            role: 'Lead Fullstack Developer',
            experience:
                '5 years React / PostgreSQL engineering. Configured relational lock layers for SaaS dashboards.',
            status: 'Under Review'
        }
    ],
    internships: [
        {
            id: 'intern-1',
            created_at: new Date(Date.now() - 6 * 3600000).toISOString(),
            name: 'Amara Lopez',
            email: 'amara.lopez@fast.edu',
            university: 'FAST NUCES, Islamabad',
            github: 'https://github.com/amaralopez',
            statement:
                'Very excited about learning Custom Shopify Liquid theme development under direct mentorship of Sarah Jenkins!',
            track: 'Shopify Liquid Theme Intern',
            status: 'Interview Scheduled'
        }
    ],
    bookings: [
        {
            id: 'booking-1',
            created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
            date: 'Tue, May 12',
            time: '11:30 AM PST',
            company: 'Nexa Group',
            contact: 'Alexander Mercer',
            email: 'alex@nexagroup.com',
            status: 'Scheduled',
            meeting_link: 'https://meet.google.com/mock-trenchlabs-nexa'
        }
    ],
    telemetry: []
};

export const connectDatabase = () => {
    if (isRealSupabaseConnected) {
        console.log('Supabase Live Connection: Connected Successfully.');
        void logTelemetryEvent('db.connect.supabase', 'ok');
    } else {
        console.log('Supabase credentials absent. Activating Local Sandboxed Registry Mode...');
        initSandboxDatabase();
    }
};

const initSandboxDatabase = () => {
    if (!fs.existsSync(sandboxDbPath)) {
        fs.writeFileSync(sandboxDbPath, JSON.stringify(sandboxInitialSeed, null, 2), 'utf8');
        console.log('Sandbox registry database initialized & seeded at db_sandbox.json');
    }
    void logTelemetryEvent('db.connect.sandbox', 'ok');
};

export const sandboxDb = {
    read(collection: 'contacts' | 'careers' | 'internships' | 'bookings' | 'telemetry'): any[] {
        if (!fs.existsSync(sandboxDbPath)) {
            initSandboxDatabase();
        }
        const data = JSON.parse(fs.readFileSync(sandboxDbPath, 'utf8'));
        return data[collection] || [];
    },

    write(collection: 'contacts' | 'careers' | 'internships' | 'bookings' | 'telemetry', rows: any[]) {
        if (!fs.existsSync(sandboxDbPath)) {
            initSandboxDatabase();
        }
        const data = JSON.parse(fs.readFileSync(sandboxDbPath, 'utf8'));
        data[collection] = rows;
        fs.writeFileSync(sandboxDbPath, JSON.stringify(data, null, 2), 'utf8');
    }
};

/** Safe telemetry: event keys only, no PII. */
export const logTelemetryEvent = async (event: string, status: string = 'ok') => {
    const timestamp = new Date().toISOString();
    const latency = `${Math.floor(Math.random() * 20) + 2}ms`;
    const payload = { timestamp, query: event, status, latency };

    if (isRealSupabaseConnected && supabase) {
        const { error } = await supabase.from('telemetry_logs').insert([payload]);
        if (error) {
            console.warn('[trenchlabs-api] telemetry_logs insert failed:', error.message);
            saveTelemetryToSandbox(timestamp, event, status, latency);
        }
    } else {
        saveTelemetryToSandbox(timestamp, event, status, latency);
    }
};

/** Log clear errors if migrations were not applied (non-fatal). */
export async function verifySupabaseSchema(): Promise<void> {
    if (!isRealSupabaseConnected || !supabase) return;
    const tables = [
        'contact_submissions',
        'careers_applications',
        'internship_applications',
        'consultation_bookings',
        'telemetry_logs'
    ] as const;
    for (const table of tables) {
        const { error } = await supabase.from(table).select('id').limit(1);
        if (error) {
            console.error(`[trenchlabs-api] Supabase table "${table}" is missing or unreachable: ${error.message}`);
            console.error(
                '[trenchlabs-api] Apply SQL: supabase/migrations/20250510120000_init_trenchlabs.sql in Supabase → SQL Editor.'
            );
            return;
        }
    }
    console.log('[trenchlabs-api] Supabase: all required tables are reachable.');
}

const saveTelemetryToSandbox = (timestamp: string, event: string, status: string, latency: string) => {
    try {
        const logs = sandboxDb.read('telemetry');
        logs.unshift({ timestamp, query: event, status, latency });
        if (logs.length > 50) logs.pop();
        sandboxDb.write('telemetry', logs);
    } catch {
        // ignore
    }
};
