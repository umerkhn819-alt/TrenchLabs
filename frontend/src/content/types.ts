export type ServiceIconKey = 'Monitor' | 'ShoppingBag' | 'Terminal' | 'Cpu' | 'BarChart2';

export type ServiceSummary = {
    id: string;
    name: string;
    icon: ServiceIconKey;
    tagline: string;
    desc: string;
    tech: string[];
    accent: string;
};

export type ServiceDetailContent = {
    id: string;
    name: string;
    icon: ServiceIconKey;
    color: string;
    tagline: string;
    desc: string;
    tech: string[];
    process: { step: string; title: string; body: string }[];
    faqs: { q: string; a: string }[];
};

export type CaseStudyMetric = { val: string; desc: string };

export type CaseStudy = {
    id: string;
    title: string;
    category: string;
    tagline: string;
    overview: string;
    challenge: string;
    solution: string;
    tech: string[];
    metrics: CaseStudyMetric[];
    nextId: string;
    nextName: string;
    accent: string;
};

export type WorkProjectCard = {
    id: string;
    title: string;
    category: string;
    tagline: string;
    tech: string[];
    accentColor: string;
};

export type TeamExpertCard = {
    id: string;
    name: string;
    role: string;
    roleAbbr: string;
    accent: string;
};

export type TeamMemberDetail = {
    id: string;
    name: string;
    role: string;
    roleAbbr: string;
    philosophy: string;
    bio: string;
    skills: { name: string; val: string }[];
    projects: string[];
    accent: string;
};

export type BlogPostCard = {
    title: string;
    tag: string;
    date: string;
    read: string;
    desc: string;
};
