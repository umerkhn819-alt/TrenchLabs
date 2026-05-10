import type { CaseStudy, WorkProjectCard } from './types';

export const CASE_STUDIES_BY_ID: Record<string, CaseStudy> = {
    'nexa-restaurant': {
        id: 'nexa-restaurant',
        title: 'Nexa Restaurant Booking System',
        category: 'Web Development',
        tagline: 'Streamlining high-volume restaurant seat bookings and customer retention.',
        overview:
            'Nexa needed a robust booking portal capable of managing thousands of table bookings concurrently while ensuring absolute consistency across real-time occupancy schedules.',
        challenge:
            'High concurrency issues during peak reservation hours resulted in overlapping table bookings and database blockages. Legacy web frames also yielded excessive page load lag, inducing cart abandonments.',
        solution:
            'We programmed a custom React front-end optimized via Cloudflare caching, linking to a secure Node.js ledger. All seating maps are structured with custom SVG rendering, locking active database items dynamically on click events.',
        tech: ['React / Vite', 'NodeJS REST API', 'PostgreSQL', 'Redis Occupancy Lock', 'Cloudflare CDN'],
        metrics: [
            { val: '40%', desc: 'Server latency reduction' },
            { val: '100%', desc: 'Reservation consistency score' },
            { val: '3.2s', desc: 'Average page-load reduction' }
        ],
        nextId: 'velora-fashion',
        nextName: 'Velora Fashion Store',
        accent: '#3B82F6'
    },
    'velora-fashion': {
        id: 'velora-fashion',
        title: 'Velora Fashion Commerce Store',
        category: 'Shopify Solutions',
        tagline: 'Boosting shopping conversions via Custom Liquid and checkout optimizations.',
        overview:
            'Velora Fashion required an elegant digital storefront capable of delivering fluid page flows, variant preview switches, and checkout speed multipliers.',
        challenge:
            'Bespoke design ideas were restricted by bloated third-party theme builders, dragging down mobile speed scores to 28/100, which increased acquisition costs.',
        solution:
            'Our team engineered a tailored Shopify store utilizing Custom Liquid with zero heavy script dependencies. We implemented dynamic variant controllers, asynchronous checkout requests, and automatic GTM schema markers.',
        tech: ['Shopify Liquid Core', 'GraphQL Admin API', 'Vanilla JavaScript', 'TailwindCSS Layouts', 'Google Tag Manager'],
        metrics: [
            { val: '42%', desc: 'Checkout conversion lift' },
            { val: '92/100', desc: 'Mobile Web Vitals score' },
            { val: '2.5x', desc: 'Average return-on-ad-spend (ROAS)' }
        ],
        nextId: 'medica-clinic',
        nextName: 'Medica Clinic Portal',
        accent: '#10B981'
    },
    'medica-clinic': {
        id: 'medica-clinic',
        title: 'Medica Clinic Client Queues',
        category: 'WordPress Development',
        tagline: 'High-speed HIPAA scheduling blocks and physician schedules.',
        overview:
            'Medica Health needed an automated client management platform to schedule clinical bookings, archive patient rosters, and synchronize general physician rotas.',
        challenge:
            'Traditional medical booking plugins lacked customized rotas, leading to overlapping staff timetables, and HIPAA data confidentiality compliance requirements were compromised by legacy software grids.',
        solution:
            'We developed custom WordPress Gutenberg blocks matching internal schedules directly. Public XML-RPC routes were disabled, patient records directories were locked with strong authorization proxies, and automated scheduling alerts were integrated.',
        tech: ['WordPress PHP Core', 'Custom Gutenberg Blocks', 'MySQL Database Locks', 'TailwindCSS Layouts'],
        metrics: [
            { val: '100%', desc: 'HIPAA compliance auditing' },
            { val: '15 Min', desc: 'Patient wait-time reduction' },
            { val: '65%', desc: 'Staff scheduling overhead cut' }
        ],
        nextId: 'assistflow-ai',
        nextName: 'AssistFlow AI Automation',
        accent: '#8B5CF6'
    },
    'assistflow-ai': {
        id: 'assistflow-ai',
        title: 'AssistFlow AI CRM Automations',
        category: 'AI & Automation Solutions',
        tagline: 'Replacing administrative pipelines with automated trigger nets.',
        overview:
            'AssistFlow wanted to automate repetitive administrative cycles—such as outbound business email lead processing and Salesforce CRM document filings.',
        challenge:
            'Manual pipeline tracking was prone to errors, lead sorting was delayed by up to 24 hours, and custom integration scripts crashed due to unhandled rate-limits.',
        solution:
            'We programmed background serverless handlers with OpenAI REST API connections, processing incoming client payloads, classifying leads, mapping Salesforce invoices, and alerting Slack channels in under 60 seconds.',
        tech: ['OpenAI REST APIs', 'LangChain Framework', 'Make.com Orchestrators', 'Node.js Middleware'],
        metrics: [
            { val: '94%', desc: 'Workflow speed multipliers' },
            { val: '40 Hours', desc: 'Saved administrative work/week' },
            { val: '<1 Min', desc: 'Lead response average delay' }
        ],
        nextId: 'growthpulse',
        nextName: 'GrowthPulse Marketing Analytics',
        accent: '#EC4899'
    },
    growthpulse: {
        id: 'growthpulse',
        title: 'GrowthPulse Analytical Marketing',
        category: 'Digital Marketing & CRO',
        tagline: 'Structuring customer acquisition loops via technical SEO audits.',
        overview:
            'GrowthPulse requested a growth program to boost outbound traffic, map checkout conversion drops, and configure accurate attribution charts.',
        challenge:
            'Legacy page headers lacked meta tags and logical structural headers, and missing GTM tracking parameters led to inaccurate ROI calculation charts.',
        solution:
            'Our marketing team completed a comprehensive semantic SEO audit, configured structured GA4 event triggers, resolved technical layout crawls, and set up dynamic Hotjar tracking maps.',
        tech: ['Technical SEO Auditing', 'Google Analytics 4', 'GTM Tag Triggers', 'Hotjar Heatmap Recording'],
        metrics: [
            { val: '312%', desc: 'Organic traffic growth (6 mo)' },
            { val: '4.8x', desc: 'Average conversion ROAS' },
            { val: '28%', desc: 'Cart abandonments drop' }
        ],
        nextId: 'nexa-restaurant',
        nextName: 'Nexa Restaurant Booking',
        accent: '#F59E0B'
    }
};

export const WORK_PROJECTS: WorkProjectCard[] = [
    {
        id: 'nexa-restaurant',
        title: 'Nexa Restaurant',
        category: 'Web Development',
        tagline: 'A luxury dining reservation system and responsive web portal.',
        tech: ['React', 'Vite', 'Node.js', 'PostgreSQL'],
        accentColor: '#3B82F6'
    },
    {
        id: 'velora-fashion',
        title: 'Velora Fashion',
        category: 'Shopify Solutions',
        tagline: 'High-speed Custom Liquid checkout and premium fashion storefront.',
        tech: ['Shopify', 'Liquid', 'JavaScript', 'TailwindCSS'],
        accentColor: '#10B981'
    },
    {
        id: 'medica-clinic',
        title: 'Medica Clinic',
        category: 'WordPress Dev',
        tagline: 'Custom native block-driven portal for clinic and client queues.',
        tech: ['WordPress Core', 'Custom PHP', 'Gutenberg Blocks', 'Postgres Queue'],
        accentColor: '#8B5CF6'
    },
    {
        id: 'assistflow-ai',
        title: 'AssistFlow AI',
        category: 'AI Automation',
        tagline: 'Custom LLM support dialogs and background automated event pipelines.',
        tech: ['OpenAI APIs', 'LangChain', 'Make.com', 'Python'],
        accentColor: '#EC4899'
    },
    {
        id: 'growthpulse',
        title: 'GrowthPulse',
        category: 'Digital Marketing',
        tagline: 'SEO semantic structure models and performance GA4 trackers.',
        tech: ['Technical SEO', 'GA4 Events', 'Hotjar Heatmaps', 'ROAS Calculations'],
        accentColor: '#F59E0B'
    }
];

export const DEFAULT_CASE_STUDY_ID = 'nexa-restaurant';

export function getCaseStudy(id: string | undefined): CaseStudy {
    const key = id && CASE_STUDIES_BY_ID[id] ? id : DEFAULT_CASE_STUDY_ID;
    return CASE_STUDIES_BY_ID[key];
}
