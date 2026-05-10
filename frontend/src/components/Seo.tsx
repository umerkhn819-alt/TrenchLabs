import { Helmet } from 'react-helmet-async';

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://trenchlabs.com').replace(/\/$/, '');

type SeoProps = {
    title: string;
    description?: string;
    path?: string;
};

export function Seo({ title, description, path = '' }: SeoProps) {
    const fullTitle = title.toLowerCase().includes('trenchlabs') ? title : `${title} | TrenchLabs`;
    const url = `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description ? <meta name="description" content={description} /> : null}
            <meta property="og:title" content={fullTitle} />
            {description ? <meta property="og:description" content={description} /> : null}
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <link rel="canonical" href={url} />
        </Helmet>
    );
}
