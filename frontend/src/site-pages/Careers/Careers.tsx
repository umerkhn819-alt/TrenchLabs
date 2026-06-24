import React, { useState } from 'react';
import { CheckCircle, Award, Compass, Zap, Loader2 } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { motion, type Variants } from 'framer-motion';
import { cinematicStagger, cinematicUp, viewportOnce } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import { CinematicCard } from '../../components/effects/CinematicCard';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import styles from './Careers.module.css';

export const Careers: React.FC = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const values = [
        { icon: Compass, title: 'Absolute Intent', desc: 'Every line of code and user flow we design serves a strategic, measurable target.', color: '#38bdf8' },
        { icon: Zap, title: 'Extreme Velocity', desc: 'We deliver ultra-fluid builds on schedule, eliminating administrative friction.', color: '#a78bfa' },
        { icon: Award, title: 'Premium Aesthetics', desc: 'Crafting pixel-perfect layouts inspired by modern product giants.', color: '#f472b6' }
    ];

    const roles = [
        { id: 'dev-theme', title: 'Lead Fullstack Developer', dept: 'Engineering', term: 'Full-time', pay: '$3k - $4.5k / mo' },
        { id: 'shopify-eng', title: 'E-Commerce Engineer', dept: 'E-commerce', term: 'Full-time', pay: '$2.5k - $3.8k / mo' },
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
                description="Join TrenchLabs — modern web, AI automation, e-commerce, and technical optimization roles for builders who care about quality."
                path="/careers"
            />
            
            {/* 1. CINEMATIC HERO */}
            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <motion.div 
                    className="container"
                    style={{ position: 'relative', zIndex: 1 }}
                    variants={cinematicStagger}
                    initial="hidden"
                    animate="show"
                >
                    <motion.span variants={cinematicUp} className={styles.categoryBadge}>Careers at TrenchLabs</motion.span>
                    <motion.h1 variants={cinematicUp} className={styles.heroTitle}>Shape The Future Of<br/><span className="gradient-text">Digital Engineering</span></motion.h1>
                    <CinematicText as="p" className={styles.heroDesc} staggerDelay={0.03}>Join our syndicate of architects, developers, and designers. We build state-of-the-art web platforms for scaling startups.</CinematicText>
                </motion.div>
            </section>

            {/* 2. VALUES BENTO */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <motion.div 
                        className={styles.sectionHeader}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <span className="section-tagline">Core Values</span>
                        <h2 className="section-title">The TrenchLabs Philosophy</h2>
                    </motion.div>
                    <motion.div 
                        className={styles.valuesGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {values.map((v, idx) => {
                            const Icon = v.icon;
                            return (
                                <CinematicCard key={idx} delay={idx * 0.1}>
                                    <div className={styles.valueCard}>
                                        <div className={styles.valueGlow} style={{ background: `radial-gradient(circle at top right, ${v.color}15 0%, transparent 60%)` }} />
                                        <div className={styles.valIcon} style={{ color: v.color, backgroundColor: `${v.color}15`, border: `1px solid ${v.color}30` }}><Icon size={28} strokeWidth={2} /></div>
                                        <h3>{v.title}</h3>
                                        <CinematicText as="p">{v.desc}</CinematicText>
                                    </div>
                                </CinematicCard>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* 3. BENEFITS CHANNELS */}
            <section className={styles.benefitsSection}>
                <div className="container">
                    <motion.div 
                        className={styles.benefitsGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <motion.div className={styles.benefitsLeft} variants={cinematicUp}>
                            <span className="section-tagline">Benefits &amp; Perks</span>
                            <h2 className="section-title">Why Build With Us?</h2>
                            <CinematicText as="p">We believe high-performance output is sustained by providing complete workspace empowerment, clear tracking parameters, and room to experiment.</CinematicText>
                        </motion.div>
                        <motion.div className={styles.benefitsRight} variants={cinematicUp}>
                            <ul className={styles.benefitsList}>
                                <li>
                                    <div className={styles.benefitIcon}><CheckCircle size={18} /></div> 
                                    <span>100% Remote-first global workflow autonomy</span>
                                </li>
                                <li>
                                    <div className={styles.benefitIcon}><CheckCircle size={18} /></div> 
                                    <span>Bespoke high-end hardware budget allowance</span>
                                </li>
                                <li>
                                    <div className={styles.benefitIcon}><CheckCircle size={18} /></div> 
                                    <span>Comprehensive continuous learning &amp; book allowances</span>
                                </li>
                                <li>
                                    <div className={styles.benefitIcon}><CheckCircle size={18} /></div> 
                                    <span>Flexible visual hours &amp; unlimited leave policies</span>
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 4. ACTIVE HIRING VACANCIES */}
            <section className={styles.rolesSection}>
                <div className="container">
                    <motion.div 
                        className={styles.sectionHeader}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <span className="section-tagline">Opportunities</span>
                        <h2 className="section-title">Open Positions</h2>
                    </motion.div>

                    <motion.div 
                        className={styles.rolesList}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {roles.map((r, idx) => (
                            <CinematicCard key={r.id} delay={idx * 0.1}>
                                <div className={styles.roleCard}>
                                    <div className={styles.roleGlow} />
                                    <div className={styles.roleMeta}>
                                        <span className={styles.roleDept}>{r.dept}</span>
                                        <h3>{r.title}</h3>
                                        <div className={styles.badges}>
                                            <span className={styles.termBadge}>{r.term}</span>
                                            <span className={styles.payBadge}>{r.pay}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setActiveModal(r.title)} className={styles.applyBtn}>
                                        Apply For Position &rarr;
                                    </button>
                                </div>
                            </CinematicCard>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 5. HIGH-TECH CONSOLE MODAL */}
            {activeModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalGlow} />
                        <button onClick={handleCloseModal} className={styles.closeBtn} aria-label="Close apply modal">&times;</button>
                        
                        {!isSuccess ? (
                            <form onSubmit={handleFormSubmit} className={styles.applyForm}>
                                <span className={styles.modalTag}>Application Process</span>
                                <h2>{activeModal}</h2>
                                <p>Provide your details to register in our applicant registry.</p>
                                
                                <div className={styles.formGrid}>
                                    <div className={styles.inputGroup}>
                                        <label>Full Name</label>
                                        <input type="text" name="name" required placeholder="John Doe" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Email Address</label>
                                        <input type="email" name="email" required placeholder="john@example.com" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Portfolio / GitHub</label>
                                        <input type="url" name="github" required placeholder="https://github.com/johndoe" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Expected Compensation</label>
                                        <input type="text" name="compensation" required placeholder="$3,500 USD / mo" />
                                    </div>
                                </div>

                                <div className={styles.inputGroup} style={{ marginTop: '1.5rem' }}>
                                    <label>Professional Summary &amp; Experience</label>
                                    <textarea name="experience" required rows={4} placeholder="Briefly introduce your technical stack and project involvement history..."></textarea>
                                </div>

                                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className={styles.spinner} />
                                            <span>Encrypting &amp; Transmitting...</span>
                                        </>
                                    ) : (
                                        <span>Submit Candidate Form &rarr;</span>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className={styles.successScreen}>
                                <div className={styles.successIconWrap}>
                                    <CheckCircle size={44} />
                                </div>
                                <h2>Application Transmitted!</h2>
                                <p>We have compiled and locked your application logs in our talent database. Our operations director will reach out via email within 48 business hours.</p>
                                <button onClick={handleCloseModal} className={styles.successBtn}>Acknowledge</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Transitions>
    );
};
export default Careers;

