export interface ContactSubmission {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone?: string;
    project_type?: string;
    budget?: string;
    message: string;
    status: 'Pending' | 'Responded';
    response_text?: string;
}

export interface CareersApplication {
    id: string;
    created_at: string;
    name: string;
    email: string;
    github: string;
    compensation: string;
    role: string;
    experience: string;
    status: 'Under Review' | 'Accepted' | 'Rejected' | 'Interview Scheduled';
    response_text?: string;
}

export interface InternshipApplication {
    id: string;
    created_at: string;
    name: string;
    email: string;
    university: string;
    github: string;
    statement: string;
    track: string;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'Interview Scheduled';
    response_text?: string;
}

export interface ConsultationBooking {
    id: string;
    created_at: string;
    date: string;
    time: string;
    company: string;
    contact: string;
    email: string;
    phone?: string;
    status: 'Scheduled' | 'Rescheduled' | 'Completed' | 'Cancelled';
    meeting_link?: string;
    response_text?: string;
}

export interface TelemetryLog {
    timestamp: string;
    query: string;
    status: string;
    latency: string;
}
