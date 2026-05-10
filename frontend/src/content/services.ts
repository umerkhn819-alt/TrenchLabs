import type { ServiceDetailContent, ServiceSummary } from './types';

export const SERVICE_SUMMARIES: ServiceSummary[] = [
    {
        id: 'web-development',
        name: 'Web Development',
        icon: 'Monitor',
        tagline: 'React, Next.js & modern architectures.',
        desc: 'We build high-availability SPA and SSR platforms using optimal tech schemas. Blazing page loads, perfect SEO compliance, and modular maintainability.',
        tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
        accent: '#3B82F6'
    },
    {
        id: 'shopify',
        name: 'Shopify Solutions',
        icon: 'ShoppingBag',
        tagline: 'Custom Liquid, Headless, and CRO optimizations.',
        desc: 'Fully bespoke e-commerce solutions built to convert. We customize Liquid themes, construct custom private Shopify apps, and deploy Headless storefronts.',
        tech: ['Shopify Liquid', 'Headless Commerce', 'GraphQL', 'TailwindCSS'],
        accent: '#10B981'
    },
    {
        id: 'wordpress',
        name: 'WordPress Development',
        icon: 'Terminal',
        tagline: 'Custom high-speed Gutenberg & WooCommerce blocks.',
        desc: 'Ditch bloated theme builders. We develop premium custom WordPress themes from scratch with optimized PHP/JS, ensuring instant page-load performance.',
        tech: ['WordPress Core', 'Custom PHP', 'Gutenberg Blocks', 'WooCommerce'],
        accent: '#8B5CF6'
    },
    {
        id: 'ai-automation',
        name: 'AI & Automation Solutions',
        icon: 'Cpu',
        tagline: 'Custom LLM agents, automated data scrapers, & API pipes.',
        desc: 'Save hundreds of administrative hours. We integrate OpenAI, Anthropic, and open-source models with automated workflows (Zapier/Make) and scraper scripts.',
        tech: ['OpenAI APIs', 'LangChain', 'Make.com', 'Python', 'Selenium'],
        accent: '#EC4899'
    },
    {
        id: 'digital-marketing',
        name: 'Digital Marketing & CRO',
        icon: 'BarChart2',
        tagline: 'Conversion optimizations, SEM audits, and analytic loops.',
        desc: 'We map detailed customer acquisition loops. Combining comprehensive technical SEO audits, Google Tag Manager events, and targeted UI enhancements.',
        tech: ['Technical SEO', 'Google Tag Manager', 'Hotjar Heatmaps', 'ROAS Analysis'],
        accent: '#F59E0B'
    }
];

export const SERVICE_DETAILS_BY_ID: Record<string, ServiceDetailContent> = {
    'web-development': {
        id: 'web-development',
        name: 'Web Development',
        icon: 'Monitor',
        color: '#3B82F6',
        tagline: 'Engineering high-speed, scalable web architectures.',
        desc: 'We craft production-grade, search-engine-optimized Single Page Applications (SPA) and Server-Side Rendered (SSR) platforms. Our builds prioritize core web vitals, absolute modular security, and seamless developer handoff.',
        tech: ['React / Vite', 'Next.js', 'Node.js', 'PostgreSQL', 'Cloudflare Workers'],
        process: [
            { step: '01', title: 'Asset Modeling', body: 'Designing schema models, API endpoints, and route matrices.' },
            { step: '02', title: 'Modular Coding', body: 'Programming highly reusable TypeScript components following rigid DRY principles.' },
            { step: '03', title: 'Stress Analytics', body: 'Executing rigorous load testing, layout layout checks, and automated unit tests.' }
        ],
        faqs: [
            {
                q: 'Which framework do you recommend for static websites?',
                a: 'We typically recommend Next.js or Astro for content-heavy sites due to their excellent caching, image optimizations, and SEO performance.'
            },
            {
                q: 'Do you offer backend database configurations?',
                a: 'Yes, we design comprehensive database schemas, write secure ORM integrations, and set up relational databases like PostgreSQL.'
            }
        ]
    },
    shopify: {
        id: 'shopify',
        name: 'Shopify Solutions',
        icon: 'ShoppingBag',
        color: '#10B981',
        tagline: 'State-of-the-art Custom Liquid and Headless commerce pipelines.',
        desc: 'Transform your retail operations into high-converting storefronts. We develop tailored Shopify Liquid themes, custom back-office ERP/API sync plugins, and Headless storefronts that deliver instantaneous visual loading.',
        tech: ['Shopify Liquid', 'Headless Commerce', 'GraphQL Admin API', 'React', 'TailwindCSS'],
        process: [
            { step: '01', title: 'Cart Flow Auditing', body: 'Reviewing checkout bottlenecks, user metrics, and friction points.' },
            { step: '02', title: 'Liquid Customization', body: 'Bespoke design coding with Zero heavy external app dependencies to maintain speed.' },
            { step: '03', title: 'Conversion Rigging', body: 'A/B testing checkout layouts, configuring custom product bundles, and smart recommendation triggers.' }
        ],
        faqs: [
            {
                q: 'Why choose Custom Liquid over pre-made marketplace themes?',
                a: 'Marketplace themes often come bloated with generic sliders and scripts. Custom Liquid is written from scratch, matching your branding precisely and loading up to 4x faster.'
            },
            {
                q: 'Can you migrate our products from WooCommerce or Magento?',
                a: 'Yes, we manage comprehensive database exports, preserving SKU codes, historical records, variants, and image locations safely.'
            }
        ]
    },
    wordpress: {
        id: 'wordpress',
        name: 'WordPress Development',
        icon: 'Terminal',
        color: '#8B5CF6',
        tagline: 'Custom high-speed Gutenberg block engineering.',
        desc: 'Ditch slow theme builders. We develop premium WordPress sites from the ground up utilizing native block architectures. This yields maximum page speed, strict site security, and extreme administrative ease.',
        tech: ['WordPress Core', 'Custom PHP Frameworks', 'React Gutenberg API', 'TailwindCSS'],
        process: [
            { step: '01', title: 'Blocks Planning', body: 'Mapping native gutenberg block options for administrative ease.' },
            { step: '02', title: 'Custom Coding', body: 'Strict semantic PHP/JS code patterns without third-party page generators.' },
            { step: '03', title: 'GTM Integration', body: 'Setting up precise analytics triggers, CMS caches, and Cloudflare configurations.' }
        ],
        faqs: [
            {
                q: 'Do you use Elementor or Divi?',
                a: 'No, we avoid heavy page builders. We program custom gutenberg Gutenberg blocks directly using PHP or React. This keeps the database lean and guarantees excellent page load speeds.'
            },
            {
                q: 'Is WordPress secure enough for corporate databases?',
                a: 'Yes. With custom backend configurations, disabled public XML-RPC endpoints, and restricted core directories, WordPress is highly resilient and safe.'
            }
        ]
    },
    'ai-automation': {
        id: 'ai-automation',
        name: 'AI & Automation Solutions',
        icon: 'Cpu',
        color: '#EC4899',
        tagline: 'Leverage LLM intelligence and automated event trigger pipelines.',
        desc: 'Automate high-friction administrative tasks. We connect custom LLM systems (OpenAI GPTs, Anthropic Claude, open-source models) to internal databases, configuring smart Make/Zapier triggers, and real-time scrapers.',
        tech: ['OpenAI / Claude APIs', 'LangChain Framework', 'Make.com & Zapier', 'Python Automation', 'NodeJS Orchestrators'],
        process: [
            { step: '01', title: 'Friction Mapping', body: 'Auditing workflow data bottlenecks and pinpointing manual repetition.' },
            { step: '02', title: 'API Integration', body: 'Connecting LLMs to relational records or spreadsheets securely.' },
            { step: '03', title: 'System Audits', body: 'Continuously refining prompt engineering, managing rate-limit caches, and formatting JSON structures.' }
        ],
        faqs: [
            {
                q: 'How secure is our database content with custom LLM pipelines?',
                a: 'We construct secure proxies and enforce data retention rules to prevent external networks from training models on your sensitive documents.'
            },
            {
                q: 'What software platforms can you automate?',
                a: 'We connect virtually any platform with public REST APIs, including HubSpot, Salesforce, Notion, Slack, Jira, and custom backend tools.'
            }
        ]
    },
    'digital-marketing': {
        id: 'digital-marketing',
        name: 'Digital Marketing & CRO',
        icon: 'BarChart2',
        color: '#F59E0B',
        tagline: 'Accelerating growth via analytic engineering and user flow optimization.',
        desc: 'We map structured digital customer acquisition funnels. Combining comprehensive technical audits, custom Google Tag Manager configurations, and visual heatmap logs to maximize conversions and track ROI.',
        tech: ['Google Tag Manager', 'Google Analytics 4', 'Heatmap Audits (Hotjar)', 'Semantic SEO Models'],
        process: [
            { step: '01', title: 'Funnel Logging', body: 'Auditing page drops, recording scroll logs, and compiling visual heatmaps.' },
            { step: '02', title: 'Experiment Setup', body: 'Structuring conversion experiments, ad target parameters, and page layout modifications.' },
            { step: '03', title: 'ROI Assessment', body: 'Reviewing traffic acquisition quality, calculating CPC metrics, and optimizing budgets.' }
        ],
        faqs: [
            {
                q: 'What is your core approach to SEO?',
                a: 'We focus on technical health first (schema markups, speed, crawling accessibility) followed by highly structured semantic content structures to answer precise search intents.'
            },
            {
                q: 'How do you measure conversion rate improvements?',
                a: 'We configure thorough tracking loops via GTM/GA4 and deploy targeted layout changes to measure baseline lift against a control group.'
            }
        ]
    }
};

export const DEFAULT_SERVICE_ID = 'web-development';

export function getServiceDetail(id: string | undefined): ServiceDetailContent {
    const key = id && SERVICE_DETAILS_BY_ID[id] ? id : DEFAULT_SERVICE_ID;
    return SERVICE_DETAILS_BY_ID[key];
}
