import React from 'react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { BLOG_POSTS } from '../../content/blog';
import styles from './Blog.module.css';

export const Blog: React.FC = () => {
    return (
        <Transitions>
            <Seo
                title="Insights & Blog"
                description="Engineering notes on performance, Shopify, automation, and technical SEO from TrenchLabs."
                path="/blog"
            />
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">TrenchLabs Insights</span>
                    <h1 className="section-title gradient-text">Engineering Guidelines &amp; Logs</h1>
                    <p className="section-desc">We compile architectural findings, speed benchmarks, and automation templates to assist ambitious builders.</p>
                </div>
            </section>

            <section className={styles.blogSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {BLOG_POSTS.map((p) => (
                            <article key={p.title} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.tag}>{p.tag}</span>
                                    <div className={styles.meta}>
                                        <span>{p.date}</span>
                                        <span>&bull;</span>
                                        <span>{p.read}</span>
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <h2>{p.title}</h2>
                                    <p>{p.desc}</p>
                                </div>
                                <div className={styles.cardFooter}>
                                    <button onClick={() => alert('Detailed article layout reading mode is currently in development!')} className={styles.readBtn}>Read Article &rarr;</button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Blog;
