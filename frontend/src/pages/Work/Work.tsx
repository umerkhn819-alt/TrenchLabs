import React, { useState } from 'react';
import { ProjectCard } from '../../components/ProjectCard';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { WORK_PROJECTS } from '../../content/caseStudies';
import styles from './Work.module.css';

export const Work: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const categories = ['All', 'Web Development', 'Shopify Solutions', 'WordPress Dev', 'AI Automation', 'Digital Marketing'];

    const filteredProjects =
        activeFilter === 'All' ? WORK_PROJECTS : WORK_PROJECTS.filter((proj) => proj.category === activeFilter);

    return (
        <Transitions>
            <Seo
                title="Work & Case Studies"
                description="Selected client work: web platforms, Shopify, WordPress, AI automation, and marketing systems."
                path="/work"
            />
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Our Projects</span>
                    <h1 className="section-title gradient-text">Case Studies Showcase</h1>
                    <p className="section-desc">We build digital platforms tailored to meet core web vitals speed, layout responsiveness, and conversion performance targets.</p>
                </div>
            </section>

            <section className={styles.gallerySection}>
                <div className="container">
                    {/* Category Filter row */}
                    <div className={styles.filterRow}>
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveFilter(cat)}
                                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Masonry-grid layout */}
                    <div className={styles.grid}>
                        {filteredProjects.map((proj) => (
                            <ProjectCard
                                key={proj.id}
                                id={proj.id}
                                title={proj.title}
                                category={proj.category}
                                tagline={proj.tagline}
                                tech={proj.tech}
                                accentColor={proj.accentColor}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Work;
