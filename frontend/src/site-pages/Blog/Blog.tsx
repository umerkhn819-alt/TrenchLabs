import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Transitions } from '../../components/Transitions';
import { motion, type Variants } from 'framer-motion';
import { cinematicStagger, cinematicUp, scaleIn, viewportOnce } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import { CinematicCard } from '../../components/effects/CinematicCard';
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
                    <motion.div
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={cinematicUp}>
                            <GlowBadge variant="accent" pulse>Insights</GlowBadge>
                        </motion.div>
                        <motion.h1 variants={cinematicUp} className={styles.heroTitle}>Engineering notes & guides</motion.h1>
                        <CinematicText as="p" className={styles.heroDesc} staggerDelay={0.03}>
                            Architectural findings, speed benchmarks, and automation templates from building production systems.
                        </CinematicText>
                    </motion.div>
                </div>
            </section>

            <section className={styles.blogSection}>
                <div className="container">
                    {/* Filter chips */}
                    <motion.div 
                        className={styles.filterRow}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
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
                    </motion.div>

                    {featured && (
                        <CinematicCard delay={0.1}>
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
                                    <CinematicText as="p" className={styles.featuredDesc}>{featured.desc}</CinematicText>
                                    <Link to={`/blog/${featured.slug}`} className={`${styles.readBtn} btn-premium`}>
                                        Read article <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </article>
                        </CinematicCard>
                    )}

                    {rest.length > 0 && (
                        <motion.div 
                            className={styles.grid}
                            variants={cinematicStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportOnce}
                        >
                            {rest.map((post, idx) => (
                                <CinematicCard key={post.title} delay={idx * 0.1}>
                                    <article className={styles.card}>
                                        <div className={styles.cardMeta}>
                                            <span className={styles.tag}>{post.tag}</span>
                                            <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                                                <span className={styles.metaText}>{post.date}</span>
                                                <span className={styles.metaDot}>·</span>
                                                <span className={styles.metaText}>{post.read}</span>
                                            </div>
                                        </div>
                                        <h3 className={styles.cardTitle}>{post.title}</h3>
                                        <CinematicText as="p" className={styles.cardDesc}>{post.desc}</CinematicText>
                                        <Link to={`/blog/${post.slug}`} className={styles.cardReadBtn}>
                                            Read <ArrowRight size={13} />
                                        </Link>
                                    </article>
                                </CinematicCard>
                            ))}
                        </motion.div>
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

