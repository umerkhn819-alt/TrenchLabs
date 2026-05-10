import React, { useState } from 'react';
import { Mail, MessageSquare, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import styles from './Contact.module.css';

export const Contact: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        try {
            await AppController.submitContact(name, email, message);
            setIsSuccess(true);
        } catch (err) {
            console.error(err);
            alert('Database transaction failure.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Transitions>
            <Seo
                title="Contact"
                description="Reach TrenchLabs for proposals, partnerships, and custom engineering engagements."
                path="/contact"
            />
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Get In Touch</span>
                    <h1 className="section-title gradient-text">Let's Build Systems Together</h1>
                    <p className="section-desc">Have a project proposal, an operational bottleneck, or a custom requirement? Drop our engineers a direct message.</p>
                </div>
            </section>

            <section className={styles.contactSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {/* Left Column Information */}
                        <div className={styles.infoCol}>
                            <h2>Direct Connections</h2>
                            <p className={styles.sub}>Skip the queue and communicate with our leads directly.</p>

                            <div className={styles.cards}>
                                <div className={styles.infoCard}>
                                    <Mail className={styles.icon} />
                                    <div>
                                        <h4>Email Directly</h4>
                                        <a href="mailto:hello@trenchlabs.com">hello@trenchlabs.com</a>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <MessageSquare className={styles.icon} />
                                    <div>
                                        <h4>WhatsApp Chat</h4>
                                        <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">+92 300 0000000</a>
                                    </div>
                                </div>
                                <div className={styles.infoCard}>
                                    <MapPin className={styles.icon} />
                                    <div>
                                        <h4>Physical Registry</h4>
                                        <p>Islamabad, Pakistan (Remote-first Global Ops)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column Form */}
                        <div className={styles.formCol}>
                            {!isSuccess ? (
                                <form onSubmit={handleSubmit} className={styles.contactForm}>
                                    <h3>Send Message</h3>
                                    <p>Our average engineer response latency is under 12 hours.</p>

                                    <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                        <label>Your Name</label>
                                        <input type="text" name="name" required placeholder="Umar Khan" />
                                    </div>

                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <label>Email Address</label>
                                        <input type="email" name="email" required placeholder="hello@trenchlabs.com" />
                                    </div>

                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                        <label>Message Content</label>
                                        <textarea name="message" required rows={5} placeholder="Briefly describe your goals, budget targets, or engineering requirements..."></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '2.2rem' }} disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className={styles.spinner} />
                                                Transmitting Message...
                                            </>
                                        ) : 'Send Message'}
                                    </button>
                                </form>
                            ) : (
                                <div className={styles.successCard}>
                                    <div className={styles.successIcon}><CheckCircle size={44} /></div>
                                    <h3>Message Transmitted!</h3>
                                    <p>Your logs are saved in our direct database. A system architect will analyze your details and contact you shortly.</p>
                                    <button onClick={() => setIsSuccess(false)} className="btn btn-secondary">Send Another Message</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Contact;
