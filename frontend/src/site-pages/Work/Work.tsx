import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Seo } from '../../components/Seo';
import { MagneticCTA } from '../../components/premium/MagneticCTA';
import { Transitions } from '../../components/Transitions';
import { fadeInUp, staggerContainer, viewportOnce } from '../../lib/motion';
import styles from './Work.module.css';

const projects = [
    { 
        id: 'nexa-restaurant', 
        title: 'Nexa Restaurant', 
        category: 'Hospitality · Web', 
        tagline: 'Reservations, seating, and a guest portal that actually gets used. Rebuilt booking flows to decrease latency and increase conversions.', 
        image: '/projects/nexa.jpg', 
        metrics: ['-40% Latency', '+22% Bookings'], 
        tech: ['React', 'Node.js', 'PostgreSQL'] 
    },
    { 
        id: 'velora-fashion', 
        title: 'Velora Fashion', 
        category: 'Retail · E-Commerce', 
        tagline: 'Storefront engineering with checkout tuned for conversion. Built a headless architecture for lightning-fast loads.', 
        image: '/projects/velora.jpg', 
        metrics: ['+18% CVR', '2.1s LCP'], 
        tech: ['Shopify', 'Liquid', 'TailwindCSS'] 
    },
    { 
        id: 'medica-labs', 
        title: 'Medica Labs', 
        category: 'Healthcare · Internal Tools', 
        tagline: 'HIPAA-aware scheduling and patient management dashboard. Shipped fast with a clear architecture from day one.', 
        image: '/projects/medica.jpg', 
        metrics: ['100% HIPAA Compliant', '50% Faster Intake'], 
        tech: ['Next.js', 'Prisma', 'AWS'] 
    },
    { 
        id: 'aura-analytics', 
        title: 'Aura Analytics', 
        category: 'SaaS · AI Automation', 
        tagline: 'Automated data ingestion pipelines and AI-driven reporting for marketing teams, eliminating 20+ hours of manual work weekly.', 
        image: '/projects/aura.jpg', 
        metrics: ['20h Saved/Week', 'Automated Reports'], 
        tech: ['Python', 'OpenAI', 'React'] 
    }
];

export const Work: React.FC = () => {
    return (
        <Transitions>
            <div className={styles.workPage}>
                <Seo
                    title="Our Work | TrenchLabs"
                    description="Explore our case studies. We build AI automation and custom software for teams that want to scale."
                    path="/work"
                />

                <div className={styles.glowBg}></div>

                <div className="container">
                    <motion.div 
                        className={styles.header}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.span className={styles.tagline} variants={fadeInUp}>Portfolio</motion.span>
                        <motion.h1 className={styles.title} variants={fadeInUp}>Selected Work</motion.h1>
                        <motion.p className={styles.desc} variants={fadeInUp}>
                            We design and engineer systems built for scale, speed, and long-term growth. Here's a look at what we've shipped.
                        </motion.p>
                    </motion.div>

                    <div className={styles.grid}>
                        {projects.map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportOnce}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Link to={`/work/${p.id}`} className={styles.card}>
                                    <div className={styles.imageWrap}>
                                        <img src={p.image} alt={p.title} className={styles.image} loading="lazy" />
                                        <div className={styles.imageOverlay}>
                                            <div className={styles.metrics}>
                                                {p.metrics.map((m) => (
                                                    <span key={m} className={styles.metricChip}>{m}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.cardBody}>
                                        <span className={styles.category}>{p.category}</span>
                                        <h3 className={styles.cardTitle}>{p.title}</h3>
                                        <p className={styles.cardDesc}>{p.tagline}</p>
                                        <div className={styles.techRow}>
                                            {p.tech.map((t) => <span key={t} className={styles.techChip}>{t}</span>)}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        className={styles.cta}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                    >
                        <MagneticCTA to="/consultation" className="btn-premium">
                            Start a Project <ArrowRight size={16} />
                        </MagneticCTA>
                    </motion.div>
                </div>
            </div>
        </Transitions>
    );
};

export default Work;
