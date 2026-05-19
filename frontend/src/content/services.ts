import type { ServiceDetailContent, ServiceSummary } from './types';

export const SERVICE_SUMMARIES: ServiceSummary[] = [
    {
        id: 'web-development',
        name: 'Modern Web Development',
        icon: 'Monitor',
        tagline: 'Sites, dashboards, and apps on modern stacks.',
        desc: 'Marketing sites, dashboards, portals, and custom apps—fast, clear, and maintainable.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        accent: '#0f172a',
        tier: 'core'
    },
    {
        id: 'ai-automation',
        name: 'AI Automation Systems',
        icon: 'Cpu',
        tagline: 'Chatbots, agents, and workflow automation.',
        desc: 'AI assistants, CRM and support automation, lead flows, and integrations that connect safely to your data.',
        tech: ['OpenAI APIs', 'FastAPI', 'Supabase', 'Automation workflows'],
        accent: '#0f172a',
        tier: 'core'
    },
    {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        icon: 'Palette',
        tagline: 'Interfaces and systems that ship.',
        desc: 'UI, dashboards, responsive systems, and landing pages—aligned to how your product is actually built.',
        tech: ['Figma', 'Design systems', 'Prototyping', 'Motion UX', 'Accessibility'],
        accent: '#0f172a',
        tier: 'core'
    },
    {
        id: 'e-commerce',
        name: 'E-Commerce Solutions',
        icon: 'ShoppingBag',
        tagline: 'Stores built for conversion and speed.',
        desc: 'Shopify and custom storefronts—checkout, performance, and merchandising without bloated stacks.',
        tech: ['Shopify', 'Headless commerce', 'React', 'Tailwind CSS'],
        accent: '#0f172a',
        tier: 'secondary'
    },
    {
        id: 'wordpress',
        name: 'WordPress Development',
        icon: 'Terminal',
        tagline: 'Lean WordPress and WooCommerce.',
        desc: 'Custom themes, native blocks, WooCommerce where it fits—no heavy builders; security and speed first.',
        tech: ['WordPress Core', 'Custom PHP', 'Gutenberg', 'WooCommerce'],
        accent: '#0f172a',
        tier: 'secondary'
    }
];

export const SERVICE_DETAILS_BY_ID: Record<string, ServiceDetailContent> = {
    'web-development': {
        id: 'web-development',
        name: 'Modern Web Development',
        icon: 'Monitor',
        color: '#0f172a',
        tagline: 'Sites, dashboards, and apps on modern stacks.',
        desc: 'Sites, dashboards, portals, and custom apps in Next.js / React with Tailwind, motion where it earns its keep—CWV, accessibility, and clean handoff.',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
        process: [
            { step: '01', title: 'Discovery & IA', body: 'Goals, audiences, routes, and integrations mapped before design or build.' },
            { step: '02', title: 'Build & integrate', body: 'Component UI, APIs, auth as needed, staging with typed, testable code.' },
            { step: '03', title: 'Launch & measure', body: 'Performance budgets, monitoring, iteration on real usage.' }
        ],
        faqs: [
            {
                q: 'Do you recommend Next.js for marketing and content-heavy sites?',
                a: 'Usually—strong defaults for routing, images, and SEO-friendly rendering. We pick static, server, or hybrid by your content and traffic.'
            },
            {
                q: 'Can you connect dashboards and portals to our existing backend?',
                a: 'Yes—REST/GraphQL, Supabase or Postgres, and SaaS tools your team already runs.'
            }
        ]
    },
    'ai-automation': {
        id: 'ai-automation',
        name: 'AI Automation Systems',
        icon: 'Cpu',
        color: '#0f172a',
        tagline: 'Chatbots, agents, and workflow automation.',
        desc: 'Chatbots, workflow automation, assistants, CRM/support, lead pipelines, and custom AI hooks via OpenAI, FastAPI, Supabase—with retries and observability, not fragile scripts.',
        tech: ['OpenAI APIs', 'FastAPI', 'Supabase', 'Automation workflows', 'TypeScript / Python'],
        process: [
            { step: '01', title: 'Workflow audit', body: 'Manual steps, data sources, failure modes, and compliance before model work.' },
            { step: '02', title: 'Integration layer', body: 'Secure APIs, queues, retries, and logging so automations survive real traffic.' },
            { step: '03', title: 'Iterate safely', body: 'Refine prompts/tools, human-in-the-loop where needed, guardrails for PII and quality.' }
        ],
        faqs: [
            {
                q: 'How do you keep customer data safe with LLMs?',
                a: 'Least privilege, optional proxies, retention policies, and clear separation of training vs production payloads unless you choose otherwise.'
            },
            {
                q: 'Which platforms can you automate?',
                a: 'Anything with a solid API—CRMs, helpdesks, spreadsheets, Slack, booking tools, internal apps.'
            }
        ]
    },
    'ui-ux-design': {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        icon: 'Palette',
        color: '#0f172a',
        tagline: 'Interfaces and systems that ship.',
        desc: 'Product UI, dashboards, responsive systems, and landing pages—scoped to engineering constraints so designs ship, not stall.',
        tech: ['Figma', 'Design tokens', 'Component specs', 'Motion UX', 'WCAG-minded patterns'],
        process: [
            { step: '01', title: 'UX mapping', body: 'Jobs-to-be-done, flows, and hierarchy before pixels—especially dense, multi-role apps.' },
            { step: '02', title: 'UI systems', body: 'Type, spacing, color, and reusable patterns across breakpoints and states.' },
            { step: '03', title: 'Build-ready handoff', body: 'Specs, prototypes, and dev pairing so build matches intent.' }
        ],
        faqs: [
            {
                q: 'Do you design only, or design plus build?',
                a: 'Both—we often pair UI with our web track. Pure design works when you already have engineering.'
            },
            {
                q: 'Can you work inside our existing brand guidelines?',
                a: 'Yes—we extend tokens and components instead of fighting your identity.'
            }
        ]
    },
    'e-commerce': {
        id: 'e-commerce',
        name: 'E-Commerce Solutions',
        icon: 'ShoppingBag',
        color: '#0f172a',
        tagline: 'Stores built for conversion and speed.',
        desc: 'Shopify themes and redesigns, headless or Liquid where it fits, custom storefronts—fast loads, clear merchandising, reliable checkout.',
        tech: ['Shopify', 'Liquid', 'Headless commerce', 'React', 'Tailwind CSS'],
        process: [
            { step: '01', title: 'Commerce audit', body: 'Catalog, checkout friction, apps, and a performance baseline before redesign.' },
            { step: '02', title: 'Store build', body: 'Sections, cart UX, metafields, and ops integrations.' },
            { step: '03', title: 'Conversion hardening', body: 'Measurement, A/B-friendly layouts, tuning without piling on slow scripts.' }
        ],
        faqs: [
            {
                q: 'Do you only work with Shopify?',
                a: 'Shopify is a core strength; we also build custom commerce frontends when the roadmap needs more.'
            },
            {
                q: 'Can you migrate from another platform?',
                a: 'Yes—careful product, variant, customer, and URL moves with redirects and SEO continuity.'
            }
        ]
    },
    wordpress: {
        id: 'wordpress',
        name: 'WordPress Development',
        icon: 'Terminal',
        color: '#0f172a',
        tagline: 'Lean WordPress and WooCommerce.',
        desc: 'Custom themes, native blocks, WooCommerce without bloated builders—hardening, lean DB, front-end performance that fits a modern studio.',
        tech: ['WordPress Core', 'Custom PHP', 'Gutenberg', 'WooCommerce', 'Tailwind CSS'],
        process: [
            { step: '01', title: 'Content modeling', body: 'Block map, roles, and editorial workflows so the CMS stays usable.' },
            { step: '02', title: 'Custom build', body: 'Semantic PHP/JS, reusable blocks, minimal plugins for speed and stability.' },
            { step: '03', title: 'Harden & ship', body: 'Hardening, caching, edge rules, analytics wiring for your host.' }
        ],
        faqs: [
            {
                q: 'Do you use Elementor or Divi?',
                a: 'No—native blocks and custom code stay fast, portable, and easier to secure.'
            },
            {
                q: 'Is WordPress suitable for sensitive or regulated content?',
                a: 'With proper hosting, access control, locked-down endpoints, and careful plugins, it can meet strict needs—we plan for that up front.'
            }
        ]
    }
};

export const DEFAULT_SERVICE_ID = 'web-development';

export function getServiceDetail(id: string | undefined): ServiceDetailContent {
    const key = id && SERVICE_DETAILS_BY_ID[id] ? id : DEFAULT_SERVICE_ID;
    return SERVICE_DETAILS_BY_ID[key];
}
