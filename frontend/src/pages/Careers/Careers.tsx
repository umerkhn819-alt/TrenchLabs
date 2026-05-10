import React, { useState } from 'react';
import { CheckCircle, Award, Compass, Zap, Loader2 } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import styles from './Careers.module.css';

export const Careers: React.FC = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const values = [
        { icon: Compass, title: 'Absolute Intent', desc: 'Every line of code and user flow we design serves a strategic, measurable target.' },
        { icon: Zap, title: 'Extreme Velocity', desc: 'We deliver ultra-fluid builds on schedule, eliminating administrative friction.' },
        { icon: Award, title: 'Premium Aesthetics', desc: 'Crafting pixel-perfect layouts inspired by modern product giants.' }
    ];

    const roles = [
        { id: 'dev-theme', title: 'Lead Fullstack Developer', dept: 'Engineering', term: 'Full-time', pay: '$3k - $4.5k / mo' },
        { id: 'shopify-eng', title: 'Shopify Liquid Theme Engineer', dept: 'E-commerce', term: 'Full-time', pay: '$2.5k - $3.8k / mo' },
        { id: 'ai-ops', title: 'AI Automation Orchestrator', dept: 'Data & Automation', term: 'Full-time', pay: '$3k - $4.2k / mo' }
    ];

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const github = formData.get('github') as string;
        const compensation = formData.get('compensation') as string;
        const experience = formData.get('experience') as string;

        try {
            await AppController.submitCareersApplication(
                name,
                email,
                github,
                compensation,
                experience,
                activeModal || 'General Application'
            );
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Database transaction failure.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setIsSuccess(false);
    };

    return (
        <Transitions>
            <Seo
                title="Careers"
                description="Join TrenchLabs — engineering, Shopify, and automation roles for builders who care about quality."
                path="/careers"
            />
            {/* 1. CINEMATIC HERO */}
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Careers at TrenchLabs</span>
                    <h1 className="section-title gradient-text">Shape The Future Of Digital Engineering</h1>
                    <p className="section-desc">Join our team of architects, developers, and designers. We build state-of-the-art web platforms for scaling startups.</p>
                </div>
            </section>

            {/* 2. VALUES */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className="section-tagline">Our Core Values</span>
                        <h2 className="section-title">The TrenchLabs Philosophy</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((v, idx) => {
                            const Icon = v.icon;
                            return (
                                <div key={idx} className={styles.valueCard}>
                                    <div className={styles.valIcon}><Icon size={24} /></div>
                                    <h3>{v.title}</h3>
                                    <p>{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. BENEFITS CHANNELS */}
            <section className={styles.benefitsSection}>
                <div className="container">
                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitsLeft}>
                            <span className="section-tagline">Benefits &amp; Perks</span>
                            <h2 className="section-title">Why Build With Us?</h2>
                            <p>We believe high-performance output is sustained by providing complete workspace empowerment, clear tracking parameters, and room to experiment.</p>
                        </div>
                        <div className={styles.benefitsRight}>
                            <ul className={styles.benefitsList}>
                                <li><CheckCircle size={16} /> <span>100% Remote-first global workflow autonomy</span></li>
                                <li><CheckCircle size={16} /> <span>Bespoke high-end hardware budget allowance</span></li>
                                <li><CheckCircle size={16} /> <span>Comprehensive continuous learning &amp; book allowances</span></li>
                                <li><CheckCircle size={16} /> <span>Flexible visual hours &amp; unlimited leave policies</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. ACTIVE HIRING VACANCIES */}
            <section className={styles.rolesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className="section-tagline">Opportunities</span>
                        <h2 className="section-title">Open Positions</h2>
                    </div>

                    <div className={styles.rolesList}>
                        {roles.map((r) => (
                            <div key={r.id} className={styles.roleCard}>
                                <div className={styles.roleMeta}>
                                    <span className={styles.roleDept}>{r.dept}</span>
                                    <h3>{r.title}</h3>
                                    <div className={styles.badges}>
                                        <span className="badge badge-fulltime">{r.term}</span>
                                        <span className={styles.payBadge}>{r.pay}</span>
                                    </div>
                                </div>
                                <button onClick={() => setActiveModal(r.title)} className="btn btn-secondary btn-sm">
                                    Apply For Position
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. INTERACTIVE MULTI-STEP APPLY DIALOG */}
            {activeModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleCloseModal} className={styles.closeBtn} aria-label="Close apply modal">&times;</button>
                        
                        {!isSuccess ? (
                            <form onSubmit={handleFormSubmit} className={styles.applyForm}>
                                <h2>Apply: {activeModal}</h2>
                                <p>Provide your details to register in our applicant registry.</p>
                                
                                <div className={styles.formGrid}>
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input type="text" name="name" required placeholder="Umar Khan" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" name="email" required placeholder="hello@trenchlabs.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Portfolio / GitHub</label>
                                        <input type="url" name="github" required placeholder="https://github.com/trenchlabs" />
                                    </div>
                                    <div className="form-group">
                                        <label>Expected Compensation</label>
                                        <input type="text" name="compensation" required placeholder="$3,500 USD / mo" />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: '1.2rem' }}>
                                    <label>Professional Summary &amp; Experience</label>
                                    <textarea name="experience" required rows={4} placeholder="Briefly introduce your technical stack and project involvement history..."></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className={styles.spinner} />
                                            Encrypting &amp; Transmitting Application...
                                        </>
                                    ) : 'Submit Candidate Form'}
                                </button>
                            </form>
                        ) : (
                            <div className={styles.successScreen}>
                                <div className={styles.successIcon}><CheckCircle size={44} /></div>
                                <h2>Application Transmitted!</h2>
                                <p>We have compiled and locked your application logs in our talent database. Our operations director will reach out via email within 48 business hours.</p>
                                <button onClick={handleCloseModal} className="btn btn-primary">Acknowledge</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Transitions>
    );
};
export default Careers;
