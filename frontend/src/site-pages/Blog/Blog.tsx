import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { GlowBadge } from '../../components/ui/GlowBadge';
import { GridOverlay } from '../../components/effects/GridOverlay';
import { BLOG_POSTS } from '../../content/blog';
import styles from './Blog.module.css';

const ALL_TAGS = ['All', ...Array.from(new Set(BLOG_POSTS.map((p) => p.tag)))];

export const Blog: React.FC = () => {
    const [activeTag, setActiveTag] = useState('All');
    const filtered = activeTag === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.tag === activeTag);
    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <Transitions>
            <Seo
                title="Insights & Blog"
                description="Engineering notes on performance, e-commerce, automation, and technical SEO from TrenchLabs."
                path="/blog"
            />

            <section className={styles.hero}>
                <GridOverlay opacity={0.05} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <GlowBadge variant="accent" pulse>Insights</GlowBadge>
                    <h1 className={styles.heroTitle}>Engineering notes & guides</h1>
                    <p className={styles.heroDesc}>
                        Architectural findings, speed benchmarks, and automation templates from building production systems.
                    </p>
                </div>
            </section>

            <section className={styles.blogSection}>
                <div className="container">
                    {/* Filter chips */}
                    <div className={styles.filterRow}>
                        {ALL_TAGS.map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ''}`}
                                onClick={() => setActiveTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {featured && (
                        <article className={styles.featured}>
                            <div className={styles.featuredContent}>
                                <div className={styles.featuredMeta}>
                                    <span className={styles.tag}>{featured.tag}</span>
                                    <span className={styles.metaDot}>·</span>
                                    <span className={styles.metaText}>{featured.date}</span>
                                    <span className={styles.metaDot}>·</span>
                                    <span className={styles.metaText}>{featured.read}</span>
                                </div>
                                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                                <p className={styles.featuredDesc}>{featured.desc}</p>
                                <button type="button" className={`${styles.readBtn} btn-premium`} onClick={() => alert('Article reading mode coming soon!')}>
                                    Read article <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    )}

                    {rest.length > 0 && (
                        <div className={styles.grid}>
                            {rest.map((p) => (
                                <article key={p.title} className={styles.card}>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.tag}>{p.tag}</span>
                                        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                                            <span className={styles.metaText}>{p.date}</span>
                                            <span className={styles.metaDot}>·</span>
                                            <span className={styles.metaText}>{p.read}</span>
                                        </div>
                                    </div>
                                    <h3 className={styles.cardTitle}>{p.title}</h3>
                                    <p className={styles.cardDesc}>{p.desc}</p>
                                    <button type="button" className={styles.cardReadBtn} onClick={() => alert('Article reading mode coming soon!')}>
                                        Read <ArrowRight size={13} />
                                    </button>
                                </article>
                            ))}
                        </div>
                    )}

                    {filtered.length === 0 && (
                        <p className={styles.empty}>No posts yet in this category—check back soon.</p>
                    )}
                </div>
            </section>
        </Transitions>
    );
};
export default Blog;
