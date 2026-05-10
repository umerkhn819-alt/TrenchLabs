import type { 
    ContactSubmission, 
    CareersApplication, 
    InternshipApplication, 
    ConsultationBooking,
    TelemetryLog
} from '../models/types';

/** Same-origin `/api` in dev (Vite proxy). In production set VITE_API_URL to your public API base, e.g. `https://api.yourdomain.com/api` */
const API_BASE =
    typeof import.meta.env.VITE_API_URL === 'string' && import.meta.env.VITE_API_URL.trim() !== ''
        ? import.meta.env.VITE_API_URL.trim().replace(/\/$/, '')
        : '/api';

const mapId = <T extends { id?: string; _id?: string }>(raw: unknown): T => {
    const item = raw as T;
    return { ...item, id: String(item._id ?? item.id ?? '') };
};

export class AppController {
    // SECURE REQUEST HEADERS BUILDER
    private static getHeaders(extra: Record<string, string> = {}): Record<string, string> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...extra
        };
        const token = localStorage.getItem('trench_admin_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    // AUTHENTICATION LOGIC
    static async loginAdmin(password: string): Promise<{ ok: boolean; errorMessage?: string }> {
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                const msg =
                    data?.error?.message ||
                    (response.status === 503 ? 'Server is not configured for admin login (set ADMIN_PASSWORD).' : undefined);
                return { ok: false, errorMessage: msg };
            }
            if (data && data.token) {
                localStorage.setItem('trench_admin_token', data.token);
                return { ok: true };
            }
            return { ok: false };
        } catch {
            return { ok: false, errorMessage: 'Network error. Is the API running?' };
        }
    }

    static logoutAdmin() {
        localStorage.removeItem('trench_admin_token');
    }

    static isAuthenticated(): boolean {
        return !!localStorage.getItem('trench_admin_token');
    }

    // CONTACTS CONTROLLERS
    static async submitContact(name: string, email: string, message: string): Promise<ContactSubmission> {
        const response = await fetch(`${API_BASE}/contacts`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, message })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<ContactSubmission>(await response.json());
    }

    static async getContacts(): Promise<ContactSubmission[]> {
        const response = await fetch(`${API_BASE}/contacts`, {
            headers: this.getHeaders()
        });
        if (!response.ok) throw new Error('API request failed');
        const list: unknown[] = await response.json();
        return list.map((row) => mapId<ContactSubmission>(row));
    }

    static async replyToContact(id: string, replyText: string): Promise<ContactSubmission> {
        const response = await fetch(`${API_BASE}/contacts/${id}/reply`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ response_text: replyText })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<ContactSubmission>(await response.json());
    }

    // CAREERS CONTROLLERS
    static async submitCareersApplication(
        name: string, 
        email: string, 
        github: string, 
        compensation: string, 
        experience: string, 
        role: string
    ): Promise<CareersApplication> {
        const response = await fetch(`${API_BASE}/careers`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, github, compensation, experience, role })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<CareersApplication>(await response.json());
    }

    static async getCareersApplications(): Promise<CareersApplication[]> {
        const response = await fetch(`${API_BASE}/careers`, {
            headers: this.getHeaders()
        });
        if (!response.ok) throw new Error('API request failed');
        const list: unknown[] = await response.json();
        return list.map((row) => mapId<CareersApplication>(row));
    }

    static async updateCareersStatus(id: string, status: CareersApplication['status']): Promise<CareersApplication> {
        const response = await fetch(`${API_BASE}/careers/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<CareersApplication>(await response.json());
    }

    static async replyToCareers(id: string, replyText: string): Promise<CareersApplication> {
        const response = await fetch(`${API_BASE}/careers/${id}/reply`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ response_text: replyText })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<CareersApplication>(await response.json());
    }

    // INTERNSHIPS CONTROLLERS
    static async submitInternshipApplication(
        name: string,
        email: string,
        university: string,
        github: string,
        statement: string,
        track: string
    ): Promise<InternshipApplication> {
        const response = await fetch(`${API_BASE}/internships`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ name, email, university, github, statement, track })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<InternshipApplication>(await response.json());
    }

    static async getInternshipApplications(): Promise<InternshipApplication[]> {
        const response = await fetch(`${API_BASE}/internships`, {
            headers: this.getHeaders()
        });
        if (!response.ok) throw new Error('API request failed');
        const list: unknown[] = await response.json();
        return list.map((row) => mapId<InternshipApplication>(row));
    }

    static async updateInternshipStatus(id: string, status: InternshipApplication['status']): Promise<InternshipApplication> {
        const response = await fetch(`${API_BASE}/internships/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<InternshipApplication>(await response.json());
    }

    static async replyToInternship(id: string, replyText: string): Promise<InternshipApplication> {
        const response = await fetch(`${API_BASE}/internships/${id}/reply`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ response_text: replyText })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<InternshipApplication>(await response.json());
    }

    // CONSULTATION CONTROLLERS
    static async submitConsultation(
        date: string,
        time: string,
        company: string,
        contact: string,
        email: string
    ): Promise<ConsultationBooking> {
        const response = await fetch(`${API_BASE}/bookings`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ date, time, company, contact, email })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<ConsultationBooking>(await response.json());
    }

    static async getConsultationBookings(): Promise<ConsultationBooking[]> {
        const response = await fetch(`${API_BASE}/bookings`, {
            headers: this.getHeaders()
        });
        if (!response.ok) throw new Error('API request failed');
        const list: unknown[] = await response.json();
        return list.map((row) => mapId<ConsultationBooking>(row));
    }

    static async updateBookingStatus(id: string, status: ConsultationBooking['status']): Promise<ConsultationBooking> {
        const response = await fetch(`${API_BASE}/bookings/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('API request failed');
        return mapId<ConsultationBooking>(await response.json());
    }

    // TELEMETRY CONTROLLERS
    static async getTelemetryLogs(): Promise<TelemetryLog[]> {
        try {
            const response = await fetch(`${API_BASE}/telemetry`, {
                headers: this.getHeaders()
            });
            if (!response.ok) return [];
            return await response.json();
        } catch {
            return [];
        }
    }
}
export default AppController;
