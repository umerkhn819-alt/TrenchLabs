import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Cpu, Calendar } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { motion, type Variants } from 'framer-motion';
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
            
            {/* 1. CINEMATIC HERO */}
            <header className={styles.hero} style={{ '--theme-color': study.accent } as React.CSSProperties}>
                <div className={styles.heroGlow} style={{ background: `radial-gradient(circle at top, ${study.accent}20 0%, transparent 60%)` }} />
                <div className="container">
                    <Link to="/work" className={styles.backLink}>
                        <div className={styles.backLinkIcon}><ArrowLeft size={16} /></div>
                        <span>All Projects</span>
                    </Link>
                    <motion.div 
                        className={styles.heroContent}
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={cinematicUp} className={styles.categoryBadgeWrap}>
                            <span className={styles.categoryBadge} style={{ color: study.accent, border: `1px solid ${study.accent}40`, backgroundColor: `${study.accent}10` }}>
                                {study.category}
                            </span>
                        </motion.div>
                        <motion.h1 variants={cinematicUp} className={styles.heroTitle}>
                            {study.title}
                        </motion.h1>
                        <CinematicText as="p" className={styles.tagline} staggerDelay={0.03}>{study.tagline}</CinematicText>
                    </motion.div>
                </div>
            </header>

            {/* 2. BENTO BOX LAYOUT */}
            <section className={styles.mainContent}>
                <div className="container">
                    <motion.div 
                        className={styles.bentoGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {/* Box 1: Overview (Large) */}
                        <motion.div className={`${styles.bentoBox} ${styles.boxOverview}`} variants={cinematicUp}>
                            <h2 className={styles.bentoHeading} style={{ color: study.accent }}>01. Overview</h2>
                            <CinematicText as="p" className={styles.bentoText}>{study.overview}</CinematicText>
                        </motion.div>

                        {/* Box 2: Challenge */}
                        <motion.div className={`${styles.bentoBox} ${styles.boxChallenge}`} variants={cinematicUp}>
                            <h2 className={styles.bentoHeading}>02. The Challenge</h2>
                            <CinematicText as="p" className={styles.bentoText}>{study.challenge}</CinematicText>
                        </motion.div>

                        {/* Box 3: Tech Stack (Dark) */}
                        <motion.div className={`${styles.bentoBox} ${styles.boxTech}`} variants={cinematicUp}>
                            <div className={styles.sideHeader}>
                                <Cpu size={18} style={{ color: study.accent }}/>
                                <h3>Tech Stack</h3>
                            </div>
                            <div className={styles.techGrid}>
                                {study.tech.map((t, i) => (
                                    <span key={i} className={styles.techBadge}>{t}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Box 4: Solution (Large) */}
                        <motion.div className={`${styles.bentoBox} ${styles.boxSolution}`} variants={cinematicUp}>
                            <h2 className={styles.bentoHeading} style={{ color: study.accent }}>03. Our Solution</h2>
                            <CinematicText as="p" className={styles.bentoText}>{study.solution}</CinematicText>
                        </motion.div>

                        {/* Box 5: Schedule */}
                        <motion.div className={`${styles.bentoBox} ${styles.boxSchedule}`} variants={cinematicUp}>
                            <div className={styles.sideHeader}>
                                <Calendar size={18} style={{ color: study.accent }}/>
                                <h3>Delivery</h3>
                            </div>
                            <ul className={styles.projectList}>
                                <li><span>Timeline:</span> <span>6-8 Weeks</span></li>
                                <li><span>Status:</span> <span style={{ color: study.accent, textShadow: `0 0 10px ${study.accent}40` }}>Live</span></li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 3. MEASURED PERFORMANCE OUTCOMES */}
            <section className={styles.metricsSection}>
                <div className="container">
                    <motion.div 
                        className={styles.metricsHeader}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <span className="section-tagline">Results</span>
                        <h2 className="section-title">Performance Metrics</h2>
                    </motion.div>
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
                                    <div className={styles.metricGlow} style={{ background: `radial-gradient(circle at top right, ${study.accent}20 0%, transparent 60%)` }} />
                                    <div className={styles.metricIconWrap} style={{ color: study.accent, backgroundColor: `${study.accent}12`, border: `1px solid ${study.accent}30` }}>
                                        <TrendingUp size={22} />
                                    </div>
                                    <div className={styles.metricValue}>{m.val}</div>
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
                        <Link to={`/work/${study.nextId}`} className={styles.nextCard}>
                            <div className={styles.nextGlow} style={{ background: `radial-gradient(circle at center, ${study.accent}15 0%, transparent 70%)` }} />
                            <div className={styles.nextText}>
                                <span>Next Case Study &rarr;</span>
                                <h3>{study.nextName}</h3>
                            </div>
                            <div className={styles.nextArrow} style={{ color: study.accent }}><ArrowRight size={28} /></div>
                        </Link>
                    </CinematicCard>
                </div>
            </section>
        </Transitions>
    );
};
export default CaseStudyDetail;

