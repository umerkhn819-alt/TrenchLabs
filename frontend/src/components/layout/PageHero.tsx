import type { ReactNode } from 'react';

type PageHeroProps = {
    tagline: string;
    title: ReactNode;
    description?: string;
    children?: ReactNode;
};

export function PageHero({ tagline, title, description, children }: PageHeroProps) {
    return (
        <section>
            <div className="ambient-glow glow-1"></div>
            <div className="container">
                <span className="section-tagline">{tagline}</span>
                <h1 className="section-title gradient-text">{title}</h1>
                {description ? <p className="section-desc">{description}</p> : null}
                {children}
            </div>
        </section>
    );
}
