import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TrendingUp, Cpu, Calendar } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
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
                    <div className={styles.heroContent}>
                        <span className={styles.categoryBadge} style={{ color: study.accent, backgroundColor: `${study.accent}12` }}>
                            {study.category}
                        </span>
                        <h1 className="gradient-text">{study.title}</h1>
                        <p className={styles.tagline}>{study.tagline}</p>
                    </div>
                </div>
            </header>

            {/* 2. CASE STUDY CONTENT OVERVIEW */}
            <section className={styles.mainContent}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Left column details */}
                        <div className={styles.detailsCol}>
                            <div className={styles.segment}>
                                <h2>Overview</h2>
                                <p>{study.overview}</p>
                            </div>
                            <div className={styles.segment}>
                                <h2>The Challenge</h2>
                                <p>{study.challenge}</p>
                            </div>
                            <div className={styles.segment}>
                                <h2>Our Solution</h2>
                                <p>{study.solution}</p>
                            </div>
                        </div>

                        {/* Right column details */}
                        <div className={styles.sidebarCol}>
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
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. MEASURED PERFORMANCE OUTCOMES */}
            <section className={styles.metricsSection} style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="container">
                    <span className="section-tagline">Results</span>
                    <h2 className="section-title">Measured Performance Metrics</h2>
                    <div className={styles.metricsGrid}>
                        {study.metrics.map((met, idx) => (
                            <div key={idx} className={styles.metricCard}>
                                <div className={styles.metricIcon} style={{ color: study.accent }}><TrendingUp size={24} /></div>
                                <div className={styles.metricNum} style={{ color: study.accent }}>{met.val}</div>
                                <p className={styles.metricDesc}>{met.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. NEXT CASE STUDY NAVIGATOR */}
            <section className={styles.nextSection}>
                <div className="container">
                    <Link to={`/work/${study.nextId}`} className={styles.nextCard} style={{ '--accent-glow': study.accent } as React.CSSProperties}>
                        <div className={styles.nextText}>
                            <span>Next Case Study &rarr;</span>
                            <h3>{study.nextName}</h3>
                        </div>
                        <div className={styles.nextArrow} style={{ backgroundColor: study.accent }}><ArrowRight size={20} /></div>
                    </Link>
                </div>
            </section>
        </Transitions>
    );
};
export default CaseStudyDetail;
