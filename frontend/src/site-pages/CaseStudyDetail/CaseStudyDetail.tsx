import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Cpu, Calendar } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { motion } from 'framer-motion';
import { cinematicStagger, cinematicUp, viewportOnce } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import { CinematicCard } from '../../components/effects/CinematicCard';
import { Seo } from '../../components/Seo';
import { getCaseStudy } from '../../content/caseStudies';
import styles from './CaseStudyDetail.module.css';

export const CaseStudyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const study = getCaseStudy(id);

    return (
        <Transitions>
            <Seo title={study.title} description={study.tagline} path={`/work/${study.id}`} />
            {/* 1. HERO SECTION */}
            <header className={styles.hero} style={{ '--theme-color': study.accent } as React.CSSProperties}>
                <div className="container">
                    <Link to="/work" className={styles.backLink}><ArrowLeft size={16} /> Back to Work</Link>
                    <motion.div 
                        className={styles.heroContent}
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.span variants={cinematicUp} className={styles.categoryBadge} style={{ color: study.accent, backgroundColor: `${study.accent}12` }}>
                            {study.category}
                        </motion.span>
                        <motion.h1 variants={cinematicUp} className="gradient-text">{study.title}</motion.h1>
                        <CinematicText as="p" className={styles.tagline} staggerDelay={0.03}>{study.tagline}</CinematicText>
                    </motion.div>
                </div>
            </header>

            {/* 2. CASE STUDY CONTENT OVERVIEW */}
            <section className={styles.mainContent}>
                <div className="container">
                    <motion.div 
                        className={styles.grid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {/* Left column details */}
                        <motion.div className={styles.detailsCol} variants={cinematicUp}>
                            <div className={styles.segment}>
                                <h2>Overview</h2>
                                <CinematicText as="p">{study.overview}</CinematicText>
                            </div>
                            <div className={styles.segment}>
                                <h2>The Challenge</h2>
                                <CinematicText as="p">{study.challenge}</CinematicText>
                            </div>
                            <div className={styles.segment}>
                                <h2>Our Solution</h2>
                                <CinematicText as="p">{study.solution}</CinematicText>
                            </div>
                        </motion.div>

                        {/* Right column details */}
                        <motion.div className={styles.sidebarCol} variants={cinematicUp}>
                            {/* Tech Stack Box */}
                            <div className={styles.sideCard}>
                                <div className={styles.sideHeader}>
                                    <Cpu size={18} />
                                    <h3>Technologies Used</h3>
                                </div>
                                <div className={styles.techGrid}>
                                    {study.tech.map((t, i) => (
                                        <span key={i} className={styles.techBadge}>{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Project Parameters */}
                            <div className={styles.sideCard} style={{ marginTop: '1.5rem' }}>
                                <div className={styles.sideHeader}>
                                    <Calendar size={18} />
                                    <h3>Project Schedule</h3>
                                </div>
                                <ul className={styles.projectList}>
                                    <li><span>Timeline:</span> <span>6-8 Weeks</span></li>
                                    <li><span>Audit Stage:</span> <span>Completed</span></li>
                                    <li><span>Status:</span> <span className={styles.liveBadge} style={{ color: study.accent }}>Production Live</span></li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. MEASURED PERFORMANCE OUTCOMES */}
            <section className={styles.metricsSection} style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <span className="section-tagline">Results</span>
                    <h2 className="section-title">Measured Performance Metrics</h2>
                    <motion.div 
                        className={styles.metricsGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {study.metrics.map((m, i) => (
                            <CinematicCard key={i} delay={i * 0.1}>
                                <div className={styles.metricCard}>
                                    <div className={styles.metricIconWrap} style={{ color: study.accent, backgroundColor: `${study.accent}12` }}>
                                        <TrendingUp size={22} />
                                    </div>
                                    <div className={styles.metricValue} style={{ color: study.accent }}>{m.val}</div>
                                    <p className={styles.metricLabel}>{m.desc}</p>
                                </div>
                            </CinematicCard>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 4. NEXT CASE STUDY NAVIGATOR */}
            <section className={styles.nextSection}>
                <div className="container">
                    <CinematicCard delay={0.2}>
                        <Link to={`/work/${study.nextId}`} className={styles.nextCard} style={{ '--accent-glow': study.accent } as React.CSSProperties}>
                            <div className={styles.nextText}>
                                <span>Next Case Study &rarr;</span>
                                <h3>{study.nextName}</h3>
                            </div>
                            <div className={styles.nextArrow} style={{ backgroundColor: study.accent }}><ArrowRight size={20} /></div>
                        </Link>
                    </CinematicCard>
                </div>
            </section>
        </Transitions>
    );
};
export default CaseStudyDetail;
