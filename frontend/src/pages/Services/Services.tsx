import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { SERVICE_SUMMARIES } from '../../content/services';
import { getServiceIcon } from '../../content/serviceIcons';
import styles from './Services.module.css';

export const Services: React.FC = () => {
    return (
        <Transitions>
            <Seo
                title="Services"
                description="Web development, Shopify, WordPress, AI automation, and digital marketing — modular builds engineered to scale."
                path="/services"
            />
            <section className={styles.intro}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Our Capabilities</span>
                    <h1 className="section-title gradient-text">What We Build</h1>
                    <p className="section-desc">We deliver modular, custom-coded software frameworks and optimization programs designed for high availability and long-term scalability.</p>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {SERVICE_SUMMARIES.map((srv) => {
                            const Icon = getServiceIcon(srv.icon);
                            return (
                                <div key={srv.id} className={styles.card} style={{ '--accent-glow': srv.accent } as React.CSSProperties}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.iconWrapper} style={{ backgroundColor: `${srv.accent}12`, color: srv.accent }}>
                                            <Icon size={24} />
                                        </div>
                                        <span className={styles.accentBadge} style={{ color: srv.accent, backgroundColor: `${srv.accent}12` }}>Active Track</span>
                                    </div>

                                    <div className={styles.cardContent}>
                                        <h2>{srv.name}</h2>
                                        <p className={styles.tagline}>{srv.tagline}</p>
                                        <p className={styles.desc}>{srv.desc}</p>
                                        
                                        <div className={styles.techList}>
                                            {srv.tech.map((t, i) => (
                                                <span key={i} className={styles.techBadge}>{t}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <Link to={`/services/${srv.id}`} className="btn btn-secondary btn-full">
                                            Explore Track Details <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Services;
