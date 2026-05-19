import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { FAQAccordion } from '../../components/ui/FAQAccordion';
import { FloatCard } from '../../components/effects/FloatCard';
import { SERVICE_SUMMARIES } from '../../content/services';
import { getServiceIcon } from '../../content/serviceIcons';
import styles from './Services.module.css';

const FAQ_ITEMS = [
    { q: 'Do you work with early-stage startups?', a: 'Yes—most of our work is with seed to Series A founders. We understand budget constraints and can phase deliverables to match your runway.' },
    { q: 'What is your typical project timeline?', a: 'Most web platforms take 4–8 weeks from scope approval to launch. AI automation projects vary by complexity, typically 2–6 weeks.' },
    { q: 'Can I combine multiple services in one engagement?', a: 'Absolutely. Most projects touch multiple tracks—web development paired with UI/UX design, or an automation layer added to a web platform.' },
    { q: 'How do you handle ongoing support after launch?', a: 'We offer retainer plans for ongoing product engineering, monitoring, and iteration. Many clients start with a project and transition to a retainer.' },
    { q: 'Do you build custom designs or use templates?', a: 'Everything we build is custom-engineered for your constraints. We never adapt starter kits or page builders as a substitute for real product engineering.' },
    { q: 'What\'s your tech stack preference?', a: 'We default to Next.js, React, TypeScript, Tailwind CSS, Supabase, and FastAPI—but we adapt to your existing stack if you have one.' },
];

export const Services: React.FC = () => {
    return (
        <Transitions>
            <Seo
                title="Services"
                description="TrenchLabs is an AI-powered web and automation studio: modern web development, AI automation, UI/UX design, e-commerce, and WordPress—built for startups and businesses."
                path="/services"
            />

            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroInner}>
                        <div className={styles.heroLeft}>
                            <h1 className={styles.heroTitle}>Our Services</h1>
                            <p className={styles.heroDesc}>
                                Unleashing Comprehensive Digital Marketing Services Tailored to Elevate Your Online Presence and Boost Your Success.
                            </p>
                        </div>
                        <div className={styles.heroRight}>
                            <Link to="/consultation" className={styles.heroCta}>
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {SERVICE_SUMMARIES.map((srv) => {
                            const Icon = getServiceIcon(srv.icon);
                            return (
                                <FloatCard key={srv.id} className={styles.cardWrap}>
                                    <Link to={`/services/${srv.id}`} className={styles.card}>
                                        <div className={styles.cardHeader}>
                                            <div className={styles.iconCircle}>
                                                <Icon size={28} strokeWidth={2.25} />
                                            </div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h2 className={styles.cardTitle}>{srv.name}</h2>
                                            <p className={styles.cardDesc}>{srv.desc}</p>
                                        </div>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.exploreLink}>
                                                Learn more <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </Link>
                                </FloatCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={styles.faqSection}>
                <div className="container">
                    <div className={styles.faqHeader}>
                        <span className="section-tagline">FAQ</span>
                        <h2 className="section-title reveal-clip">Common questions</h2>
                        <p className="section-desc">Everything you need to know about working with TrenchLabs.</p>
                    </div>
                    <FAQAccordion items={FAQ_ITEMS} className={styles.faqList} />
                </div>
            </section>
        </Transitions>
    );
};
export default Services;
