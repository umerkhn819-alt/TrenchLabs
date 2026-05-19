import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { getServiceDetail } from '../../content/services';
import { SERVICE_ICONS } from '../../content/serviceIcons';
import { WORK_PROJECTS } from '../../content/caseStudies';
import { ProjectCard } from '../../components/ProjectCard';
import styles from './ServiceDetail.module.css';

export const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const srv = getServiceDetail(id);
    const routeKey = srv.id;
    const ServiceIcon = SERVICE_ICONS[srv.icon];

    return (
        <Transitions>
            <Seo title={srv.name} description={srv.tagline} path={`/services/${routeKey}`} />
            {/* 1. CINEMATIC HERO */}
            <header className={styles.hero} style={{ '--theme-color': srv.color } as React.CSSProperties}>
                <div className="container">
                    <Link to="/services" className={styles.backLink}><ArrowLeft size={16} /> Back to Services</Link>
                    <div className={styles.heroContent}>
                        <div className={styles.iconBox} style={{ color: srv.color, backgroundColor: `${srv.color}12` }}>
                            <ServiceIcon size={32} />
                        </div>
                        <h1 className="gradient-text">{srv.name}</h1>
                        <p className={styles.tagline}>{srv.tagline}</p>
                        <p className={styles.desc}>{srv.desc}</p>
                    </div>
                </div>
            </header>



            {/* 2.5 RELEVANT CASE STUDIES */}
            {(() => {
                const relevantProjects = WORK_PROJECTS.filter(p => srv.name.toLowerCase().includes(p.category.toLowerCase()) || p.category.toLowerCase().includes(srv.name.toLowerCase().replace('modern ', '')));
                if (relevantProjects.length === 0) return null;
                return (
                    <section className={styles.caseStudySection} style={{ padding: '4rem 0' }}>
                        <div className="container">
                            <div style={{ marginBottom: '2.5rem' }}>
                                <span className="section-tagline" style={{ color: srv.color }}>Selected Case Study</span>
                                <h2 className="section-title">Systems Shipped Under This Track</h2>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                                {relevantProjects.map(proj => (
                                    <ProjectCard
                                        key={proj.id}
                                        id={proj.id}
                                        title={proj.title}
                                        category={proj.category}
                                        tagline={proj.tagline}
                                        tech={proj.tech}
                                        accentColor={srv.color}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })()}

            {/* 3. DETAILED PRODUCTION PROCESS */}
            <section className={styles.processSection}>
                <div className="container">
                    <span className="section-tagline">Timeline</span>
                    <h2 className="section-title">Delivery Workflow</h2>
                    <div className={styles.processGrid}>
                        {srv.process.map((p, idx) => (
                            <div key={idx} className={styles.processCard}>
                                <div className={styles.stepNum} style={{ color: srv.color }}>{p.step}</div>
                                <h3>{p.title}</h3>
                                <p>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TECHNICAL FAQS */}
            <section className={styles.faqSection}>
                <div className="container">
                    <span className="section-tagline">FAQ</span>
                    <h2 className="section-title">Technical Support</h2>
                    <div className={styles.faqGrid}>
                        {srv.faqs.map((faq, idx) => (
                            <div key={idx} className={styles.faqCard}>
                                <div className={styles.faqIcon}><HelpCircle size={18} /></div>
                                <div className={styles.faqText}>
                                    <h4>{faq.q}</h4>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SERVICE FOOTER CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard} style={{ borderLeftColor: srv.color }}>
                        <h2>Deploy This Specialized Track</h2>
                        <p>Let's schedule a deep-dive call with our engineers to outline custom requirements for your startup.</p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/consultation" className="btn btn-primary" style={{ backgroundColor: srv.color }}>Book Consultation</Link>
                            <Link to="/contact" className="btn btn-secondary">Email us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default ServiceDetail;
