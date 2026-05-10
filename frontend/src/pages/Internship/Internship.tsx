import React, { useState } from 'react';
import { Compass, Calendar, BookOpen, Star, CheckCircle, Loader2 } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import styles from './Internship.module.css';

export const Internship: React.FC = () => {
    const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const tracks = [
        {
            id: 'frontend-intern',
            title: 'Frontend Development Intern',
            desc: 'Accelerate your mastery of React, Vite, and modern semantic frameworks. Build production responsive apps.',
            duration: '12 Weeks (Remote)',
            mentor: 'Umar Khan (CEO)'
        },
        {
            id: 'shopify-intern',
            title: 'Shopify Liquid Theme Intern',
            desc: 'Learn Custom Liquid architecture with zero app dependencies. Work on high-converting commerce pipelines.',
            duration: '12 Weeks (Remote)',
            mentor: 'Sarah Jenkins (Systems Lead)'
        },
        {
            id: 'marketing-intern',
            title: 'AI Automation & SEO Intern',
            desc: 'Map REST API hooks (Make.com/Zapier), deploy custom scrapers, and run technical GA4 web audits.',
            duration: '12 Weeks (Remote)',
            mentor: 'Muhammad Tariq (PM)'
        }
    ];

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const university = formData.get('university') as string;
        const github = formData.get('github') as string;
        const statement = formData.get('statement') as string;

        try {
            await AppController.submitInternshipApplication(
                name,
                email,
                university,
                github,
                statement,
                selectedTrack || 'General Track'
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
        setSelectedTrack(null);
        setIsSuccess(false);
    };

    return (
        <Transitions>
            <Seo
                title="Internships"
                description="TrenchLabs Academy — remote internship tracks in frontend, Shopify, and automation."
                path="/internship"
            />
            {/* 1. HERO SECTION */}
            <header className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">TrenchLabs Academy</span>
                    <h1 className="section-title gradient-text">Next-Gen Development Internships</h1>
                    <p className="section-desc">Launch your professional engineering career. Build real, state-of-the-art startup products under one-on-one leadership mentorship.</p>
                </div>
            </header>

            {/* 2. PROGRAM BENEFITS HIGHLIGHT */}
            <section className={styles.aboutSection}>
                <div className="container">
                    <div className={styles.aboutGrid}>
                        <div className={styles.aboutLeft}>
                            <span className="section-tagline">Mentorship Focus</span>
                            <h2>An Internship That Matters</h2>
                            <p>No coffee runs. At TrenchLabs, you are integrated directly into our core project rosters. You will code, coordinate, and launch systems on schedule.</p>
                        </div>
                        <div className={styles.aboutRight}>
                            <div className={styles.featureCard}>
                                <BookOpen className={styles.featIcon} />
                                <div>
                                    <h4>Custom Syllabus Matrix</h4>
                                    <p>Structured curriculum maps outlining precise milestones for each development track.</p>
                                </div>
                            </div>
                            <div className={styles.featureCard} style={{ marginTop: '1.5rem' }}>
                                <Star className={styles.featIcon} />
                                <div>
                                    <h4>Fulltime Career Pathway</h4>
                                    <p>Over 70% of our high-performing interns transition directly into full-time hiring packages.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TRACKS */}
            <section className={styles.tracksSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <span className="section-tagline">Syllabus Tracks</span>
                        <h2 className="section-title">Select Your Specialty</h2>
                    </div>

                    <div className={styles.grid}>
                        {tracks.map((t) => (
                            <div key={t.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className="badge badge-internship">Internship Program</span>
                                </div>
                                <div className={styles.cardBody}>
                                    <h3>{t.title}</h3>
                                    <p className={styles.desc}>{t.desc}</p>
                                    <div className={styles.metaRow}>
                                        <div className={styles.metaItem}>
                                            <Calendar size={14} />
                                            <span>{t.duration}</span>
                                        </div>
                                        <div className={styles.metaItem} style={{ marginTop: '0.4rem' }}>
                                            <Compass size={14} />
                                            <span>Mentor: {t.mentor}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <button onClick={() => setSelectedTrack(t.title)} className="btn btn-primary btn-full">
                                        Apply For Track
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. STUDENT REGISTRY MODAL */}
            {selectedTrack && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button onClick={handleCloseModal} className={styles.closeBtn}>&times;</button>
                        
                        {!isSuccess ? (
                            <form onSubmit={handleFormSubmit} className={styles.applyForm}>
                                <h2>Apply: {selectedTrack}</h2>
                                <p>Register your academic background and project history.</p>

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
                                        <label>University / School</label>
                                        <input type="text" name="university" required placeholder="FAST NUCES, Islamabad" />
                                    </div>
                                    <div className="form-group">
                                        <label>GitHub / Portfolio URL</label>
                                        <input type="url" name="github" required placeholder="https://github.com/trenchlabs" />
                                    </div>
                                </div>

                                <div className="form-group" style={{ marginTop: '1.2rem' }}>
                                    <label>What excites you about digital system engineering?</label>
                                    <textarea name="statement" required rows={4} placeholder="Introduce your favorite languages, tools, or why you want to learn under custom mentorship..."></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className={styles.spinner} />
                                            Encrypting Academic Profile...
                                        </>
                                    ) : 'Submit Internship Form'}
                                </button>
                            </form>
                        ) : (
                            <div className={styles.successScreen}>
                                <div className={styles.successIcon}><CheckCircle size={44} /></div>
                                <h2>Application Transmitted!</h2>
                                <p>We have processed and registered your details in our apprentice log. Our operations team will reach out to schedule a tech screening interview.</p>
                                <button onClick={handleCloseModal} className="btn btn-primary">Acknowledge</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Transitions>
    );
};
export default Internship;
