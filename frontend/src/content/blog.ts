import type { BlogPostCard } from './types';

export const BLOG_POSTS: BlogPostCard[] = [
    {
        slug: 'unlocking-99th-percentile-web-speeds',
        title: 'Unlocking 99th-Percentile Web Speeds',
        tag: 'Web Dev',
        date: 'May 08, 2026',
        read: '6 Min Read',
        desc: 'Ditching heavy assets and page builders in favor of custom-compiled React/Vite builds leads to incredible SEO indexing advantages.',
        content: `
Modern web development often relies on massive libraries and bloated frameworks that severely impact loading times. When a user lands on your page, you have approximately 2.5 seconds before conversion rates begin to plummet. 

We've discovered that bypassing popular, heavyweight page builders in favor of lightweight React applications compiled using Vite can consistently yield 99th-percentile Lighthouse scores. This means lightning-fast First Contentful Paint (FCP) and Time to Interactive (TTI), keeping users engaged and satisfying Google's demanding Core Web Vitals criteria. 

By strategically splitting code, lazy-loading heavy media, and minimizing JavaScript bundles to their absolute essentials, we ensure that every byte served has a purpose. The result? Unparalleled SEO advantages and a frictionless user experience.
        `
    },
    {
        slug: 'custom-liquid-themes-vs-marketplace-builders',
        title: 'Custom Liquid Themes vs Marketplace Builders',
        tag: 'E-commerce',
        date: 'May 04, 2026',
        read: '8 Min Read',
        desc: 'Why bloated visual editors compromise conversion rates, and how to program lightweight Shopify sections utilizing custom schemas.',
        content: `
Shopify is a powerful platform, but many store owners fall into the trap of using drag-and-drop marketplace theme builders. While convenient, these builders inject enormous amounts of unnecessary CSS and JavaScript, slowing the store down and crippling conversion rates.

The alternative? Building highly tailored Liquid themes from scratch. By writing custom schemas and specific Liquid sections, you only deliver the code required for the current view. 

This approach gives you total granular control over HTML structure, allowing for perfect semantic markup and deeply integrated accessibility features. When your e-commerce platform isn't dragging dead weight, your product images load instantly, the checkout flows flawlessly, and your customers buy with confidence.
        `
    },
    {
        slug: 'automating-administrative-slack-flows',
        title: 'Automating Administrative Slack Flows',
        tag: 'AI & Automation',
        date: 'Apr 28, 2026',
        read: '5 Min Read',
        desc: 'A look at how to connect OpenAI prompt ledgers to Salesforce CRM registers and trigger custom notification channels.',
        content: `
Internal communication is the backbone of any agency or enterprise, but context switching between a CRM and Slack can kill a team's momentum. By leveraging custom webhook architectures and AI, we can bridge this gap.

Imagine a pipeline where a lead updating their status in Salesforce immediately triggers an OpenAI analysis of their account history. The AI extracts key action items and dispatches a concise, intelligently formatted brief directly to a dedicated Slack channel. 

This type of flow eliminates the "information hunt." We use edge functions to listen for CRM events, securely parse the data, and format it using Block Kit for Slack. Automation isn't just about doing things faster; it's about delivering the exact context your team needs, precisely when they need it.
        `
    }
];
