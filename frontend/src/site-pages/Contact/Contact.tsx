import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle, Loader2, ArrowRight, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Transitions } from '../../components/Transitions';
import { motion } from 'framer-motion';
import { cinematicStagger, cinematicUp, viewportOnce } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import { CinematicCard } from '../../components/effects/CinematicCard';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import { GlowBadge } from '../../components/ui/GlowBadge';
import { GridOverlay } from '../../components/effects/GridOverlay';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;
        const phone = (formData.get('phone') as string) || undefined;
        const project_type = (formData.get('project_type') as string) || undefined;
        const budget = (formData.get('budget') as string) || undefined;

        try {
            await AppController.submitContact(name, email, message, phone, project_type, budget);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            setSubmitError('Something went wrong. Email hello@trenchlabs.com and we\'ll sort it out.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transitions>
            <Seo
                title="Contact"
                description="Email TrenchLabs for proposals, partnerships, or a quick question—founder inbox."
                path="/contact"
            />

            <section className={styles.hero}>
                <GridOverlay opacity={0.05} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.div variants={cinematicUp}>
                            <GlowBadge variant="accent" pulse>Get in touch</GlowBadge>
                        </motion.div>
                        <motion.h1 variants={cinematicUp} className={styles.heroTitle}>Let's build something</motion.h1>
                        <CinematicText as="p" className={styles.heroDesc} staggerDelay={0.03}>
                            If you're not ready to book a slot, email is fine—I still read them myself.
                            We typically reply within a business day.
                        </CinematicText>
                    </motion.div>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className="container">
                    <motion.div 
                        className={styles.grid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >

                        {/* ─── Info column ─── */}
                        <motion.div className={styles.infoCol} variants={cinematicUp}>
                            <h2 className={styles.infoTitle}>Reach us directly</h2>
                            <CinematicText as="p" className={styles.infoSub}>Prefer async? Email or WhatsApp—no calendar required.</CinematicText>

                            <div className={styles.infoCards}>
                                <a href="mailto:hello@trenchlabs.com" className={styles.infoCard}>
                                    <div className={styles.infoCardIcon} style={{ background: 'rgb(56 189 248 / 0.12)', color: '#38bdf8' }}>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>hello@trenchlabs.com</p>
                                        <span className={styles.infoCardSub}>Replies within 1 business day</span>
                                    </div>
                                </a>

                                <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer" className={styles.infoCard}>
                                    <div className={styles.infoCardIcon} style={{ background: 'rgb(37 211 102 / 0.12)', color: '#25d366' }}>
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4>WhatsApp</h4>
                                        <p>+92 300 000 0000</p>
                                        <span className={styles.infoCardSub}>Message us now →</span>
                                    </div>
                                </a>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoCardIcon} style={{ background: 'rgb(129 140 248 / 0.12)', color: '#818cf8' }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4>Location</h4>
                                        <p>Islamabad, Pakistan</p>
                                        <span className={styles.infoCardSub}>Remote-first · Global clients</span>
                                    </div>
                                </div>

                                <Link to="/consultation" className={`${styles.infoCard} ${styles.infoCardCta}`}>
                                    <div className={styles.infoCardIcon} style={{ background: 'rgb(56 189 248 / 0.12)', color: '#38bdf8' }}>
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4>Prefer a call?</h4>
                                        <p>Book 15 minutes →</p>
                                        <span className={styles.infoCardSub}>No prep deck required</span>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>

                        {/* ─── Form column ─── */}
                        <CinematicCard delay={0.2} className={styles.formCol}>
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formHeader}>
                                        <h3>Send a message</h3>
                                        <CinematicText as="p">Tell us what you're building and we'll get back to you with a clear next step.</CinematicText>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.floatGroup}>
                                            <input name="name" id="f-name" required placeholder=" " className={styles.floatInput} />
                                            <label htmlFor="f-name" className={styles.floatLabel}>Your name *</label>
                                        </div>
                                        <div className={styles.floatGroup}>
                                            <input name="email" id="f-email" type="email" required placeholder=" " className={styles.floatInput} />
                                            <label htmlFor="f-email" className={styles.floatLabel}>Email address *</label>
                                        </div>
                                    </div>

                                    <div className={styles.floatGroup}>
                                        <input name="phone" id="f-phone" type="tel" placeholder=" " className={styles.floatInput} />
                                        <label htmlFor="f-phone" className={styles.floatLabel}>Phone number (optional)</label>
                                    </div>

                                    <div className={styles.selectGroup}>
                                        <label htmlFor="f-type">Project type</label>
                                        <select name="project_type" id="f-type" className={styles.selectInput}>
                                            <option value="">Select…</option>
                                            <option>Web Platform</option>
                                            <option>AI Automation</option>
                                            <option>E-Commerce</option>
                                            <option>CRM & Internal Tools</option>
                                            <option>UI/UX Design</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div className={styles.floatGroup}>
                                        <textarea name="message" id="f-msg" required rows={5} placeholder=" " className={`${styles.floatInput} ${styles.floatTextarea}`} />
                                        <label htmlFor="f-msg" className={styles.floatLabel}>Your message *</label>
                                    </div>

                                    {submitError && <p className={styles.formError}>{submitError}</p>}

                                    <button type="submit" className="btn-premium" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <><Loader2 size={16} className={styles.spinner} /> Sending…</>
                                        ) : (
                                            <>Send message <ArrowRight size={16} /></>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className={styles.successCard}>
                                    <div className={styles.successIcon}><CheckCircle size={48} /></div>
                                    <h3>Message sent!</h3>
                                    <p>Thanks—we'll get back to you within a business day. Need a call instead?</p>
                                    <Link to="/consultation" className="btn-premium">
                                        Book a 15-minute call <ArrowRight size={16} />
                                    </Link>
                                    <button type="button" onClick={() => setIsSuccess(false)} className="btn btn-secondary" style={{ marginTop: '0.75rem' }}>
                                        Send another message
                                    </button>
                                </div>
                            )}
                        </CinematicCard>
                    </motion.div>
                </div>
            </section>
        </Transitions>
    );
};
export default Contact;
