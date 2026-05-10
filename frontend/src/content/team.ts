import type { TeamExpertCard, TeamMemberDetail } from './types';

export const TEAM_EXPERTS: TeamExpertCard[] = [
    { id: 'umar-khan', name: 'Umar Khan', role: 'CEO & Founder', roleAbbr: 'CEO', accent: '#10B981' },
    { id: 'muhammad-tariq', name: 'Muhammad Tariq', role: 'Partnership Manager', roleAbbr: 'PM', accent: '#3B82F6' },
    { id: 'sarah-jenkins', name: 'Sarah Jenkins', role: 'Lead Systems Engineer', roleAbbr: 'SSE', accent: '#8B5CF6' },
    { id: 'clara-mendez', name: 'Clara Mendez', role: 'Operations Director', roleAbbr: 'OPS', accent: '#EC4899' }
];

export const TEAM_MEMBERS_BY_ID: Record<string, TeamMemberDetail> = {
    'umar-khan': {
        id: 'umar-khan',
        name: 'Umar Khan',
        role: 'CEO & Founder',
        roleAbbr: 'CEO',
        philosophy: 'Simplifying architectural complexity is the ultimate form of digital premium. We code with speed and design with intent.',
        bio: 'Umar established TrenchLabs to address the growing demand for highly responsive, zero-bloat web applications. With over 8 years of engineering expertise across distributed cloud platforms and state-of-the-art SaaS layers, he guides our design principles and strategic operations.',
        skills: [
            { name: 'System Architecture', val: '98%' },
            { name: 'React / Next.js', val: '95%' },
            { name: 'Distributed Systems', val: '92%' },
            { name: 'Product Optimization', val: '96%' }
        ],
        projects: ['Nexa Restaurant Reservation Ledger', 'AssistFlow Automation Node Orchestrators'],
        accent: '#10B981'
    },
    'muhammad-tariq': {
        id: 'muhammad-tariq',
        name: 'Muhammad Tariq',
        role: 'Partnership Manager',
        roleAbbr: 'PM',
        philosophy: 'Aligning business workflows with reliable tech is what fuels client scale and long-term retention loops.',
        bio: 'Tariq connects client goals with our technical engineering tracks. He brings 6 years of expertise in digital product management, specialized CRO testing models, and technical requirements mapping, ensuring on-schedule, pixel-perfect deliveries.',
        skills: [
            { name: 'Product Management', val: '96%' },
            { name: 'CRO Optimization', val: '92%' },
            { name: 'Client Engagement', val: '98%' },
            { name: 'Agile Timelines', val: '95%' }
        ],
        projects: ['Velora Fashion Conversion Programs', 'GrowthPulse Campaign Analytics'],
        accent: '#3B82F6'
    },
    'sarah-jenkins': {
        id: 'sarah-jenkins',
        name: 'Sarah Jenkins',
        role: 'Lead Systems Engineer',
        roleAbbr: 'SSE',
        philosophy: 'Database queries and background event loops must be designed to behave predictable under massive concurrent stress loads.',
        bio: 'Sarah leads our backend systems and server optimization. Specialized in relational structures, PostgreSQL query indexing, and Node middleware, she ensures TrenchLabs builds sustain high peaks with zero latency spikes.',
        skills: [
            { name: 'PostgreSQL & Redis', val: '97%' },
            { name: 'Node.js Middleware', val: '96%' },
            { name: 'Cloud Infrastructure', val: '94%' },
            { name: 'API Design Patterns', val: '95%' }
        ],
        projects: ['Redis Double-booking Lock for Nexa', 'HIPAA Secure Patient Directories'],
        accent: '#8B5CF6'
    },
    'clara-mendez': {
        id: 'clara-mendez',
        name: 'Clara Mendez',
        role: 'Operations Director',
        roleAbbr: 'OPS',
        philosophy: 'Smooth organizational workflows are the silent foundation of premium product delivery.',
        bio: 'Clara directs our organizational timelines, administrative structures, and full-time hiring/internship tracks. She brings 7 years of talent management and operations consulting experience to keep TrenchLabs highly efficient.',
        skills: [
            { name: 'Talent Acquisition', val: '95%' },
            { name: 'Operations Audits', val: '97%' },
            { name: 'Workflow Structuring', val: '94%' },
            { name: 'Program Management', val: '96%' }
        ],
        projects: ['TrenchLabs Hiring Blueprint', 'Internship Tracks Program Framework'],
        accent: '#EC4899'
    }
};

export const DEFAULT_TEAM_MEMBER_ID = 'umar-khan';

export function getTeamMember(id: string | undefined): TeamMemberDetail {
    const key = id && TEAM_MEMBERS_BY_ID[id] ? id : DEFAULT_TEAM_MEMBER_ID;
    return TEAM_MEMBERS_BY_ID[key];
}
