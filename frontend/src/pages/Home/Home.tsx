import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ArrowLeft, ShieldCheck, Zap, Activity } from 'lucide-react';
import { ProjectCard } from '../../components/ProjectCard';
import { TeamCard } from '../../components/TeamCard';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import styles from './Home.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
    const [sliderIndex, setSliderIndex] = useState(0);
    const statsRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    const stats = [
        { label: 'Client Retention Rate', val: 99, suffix: '%' },
        { label: 'API Queries Processed', val: 50, suffix: 'M+' },
        { label: 'Tailored Platforms Delivered', val: 150, suffix: '+' }
    ];

    const testimonials = [
        { name: 'Marcus Sterling', role: 'CTO, Nexa Group', text: 'TrenchLabs completely transformed our booking workflows. Our server latency dropped by 40% and site performance has been bulletproof since launch.' },
        { name: 'Elena Rostova', role: 'Creative Director, Velora', text: 'The customized Shopify Liquid engineering they delivered was state-of-the-art. Our conversion rate instantly boosted by 42% after checkout optimizations.' },
        { name: 'Dr. Aaron Vance', role: 'Director, Medica Labs', text: 'HIPAA-compliant, high-fidelity scheduling systems delivered in record time. Professional execution and clean architecture from day one.' }
    ];

    // GSAP statistics animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(`.${styles.statNum}`, {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                textContent: '0',
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 }
            });
        }, statsRef);

        return () => ctx.revert();
    }, []);

    const nextTestimonial = () => {
        setSliderIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setSliderIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <Transitions>
            <Seo
                title="We Build Digital Systems That Scale"
                description="TrenchLabs is a premium digital agency for web development, Shopify, AI automation, and growth engineering."
                path="/"
            />
            {/* 1. HERO SECTION */}
            <header className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="ambient-glow glow-2"></div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <span className="section-tagline">Digital Systems Architects</span>
                        <h1 className={`${styles.heroTitle} gradient-text`}>
                            We Engineer Digital Systems <br />That Scale
                        </h1>
                        <p className={styles.heroDesc}>
                            TrenchLabs is a premium software agency. We combine clean code with Apple-grade visual design to build high-availability platforms for ambitious companies.
                        </p>
                        <div className={styles.heroActions}>
                            <Link to="/services" className="btn btn-primary btn-lg">Explore Services <ArrowRight size={16} /></Link>
                            <Link to="/consultation" className="btn btn-secondary btn-lg">Book Consultation</Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. BRAND METRICS SECTION */}
            <section ref={statsRef} className={styles.statsSection}>
                <div className="container">
                    <div className={styles.statsGrid}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className={styles.statCard}>
                                <span className={styles.statNum}>{stat.val}</span>
                                <span className={styles.statSuffix}>{stat.suffix}</span>
                                <p className={styles.statLabel}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CAPABILITIES INSIGHT */}
            <section className={styles.previewSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Capabilities</span>
                            <h2 className="section-title">What We Do</h2>
                        </div>
                        <p className="section-desc">We build performant digital applications designed to match enterprise expectations and startup speed.</p>
                    </div>

                    <div className={styles.capabilitiesGrid}>
                        <div className={styles.capCard}>
                            <Zap className={styles.capIcon} size={28} />
                            <h3>High-Performance Engineering</h3>
                            <p>From microservices to blazing-fast Jamstack web assets, we code with strict optimization guidelines.</p>
                            <Link to="/services/web-development" className={styles.capLink}>Web Dev &rarr;</Link>
                        </div>
                        <div className={styles.capCard}>
                            <ShieldCheck className={styles.capIcon} size={28} />
                            <h3>Shopify Liquid Architecture</h3>
                            <p>Headless commerce, highly-optimized responsive stores, custom applications, and automated checkout pipelines.</p>
                            <Link to="/services/shopify" className={styles.capLink}>Shopify &rarr;</Link>
                        </div>
                        <div className={styles.capCard}>
                            <Activity className={styles.capIcon} size={28} />
                            <h3>AI &amp; Automation Integration</h3>
                            <p>Automate repetitive administrative pipelines, train customized models, and configure live chatbot support.</p>
                            <Link to="/services/ai-automation" className={styles.capLink}>AI Automation &rarr;</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FEATURED WORK SHOWCASE */}
            <section className={styles.portfolioSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Showcase</span>
                            <h2 className="section-title">Featured Work</h2>
                        </div>
                        <Link to="/work" className="btn btn-secondary btn-sm">View All Projects &rarr;</Link>
                    </div>

                    <div className={styles.portfolioGrid}>
                        <ProjectCard 
                            id="nexa-restaurant"
                            title="Nexa Restaurant"
                            category="Web Development"
                            tagline="A luxury dining reservation system and responsive web portal."
                            tech={['React', 'Vite', 'Node.js', 'PostgreSQL']}
                            accentColor="#3B82F6"
                        />
                        <ProjectCard 
                            id="velora-fashion"
                            title="Velora Fashion"
                            category="Shopify Solutions"
                            tagline="High-speed Custom Liquid checkout and premium fashion storefront."
                            tech={['Shopify', 'Liquid', 'JavaScript', 'TailwindCSS']}
                            accentColor="#10B981"
                        />
                    </div>
                </div>
            </section>

            {/* 5. EXPERT TEAM SECTION */}
            <section className={styles.teamSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Leadership</span>
                            <h2 className="section-title">Meet Our Experts</h2>
                        </div>
                        <Link to="/team" className="btn btn-secondary btn-sm">Meet Full Team &rarr;</Link>
                    </div>

                    <div className={styles.teamGrid}>
                        <TeamCard 
                            id="umar-khan"
                            name="Umar Khan"
                            role="CEO &amp; Founder"
                            roleAbbr="CEO"
                            accentColor="#10B981"
                        />
                        <TeamCard 
                            id="muhammad-tariq"
                            name="Muhammad Tariq"
                            role="Partnership Manager"
                            roleAbbr="PM"
                            accentColor="#3B82F6"
                        />
                    </div>
                </div>
            </section>

            {/* 6. SYSTEM TIMELINE PROCESS */}
            <section ref={timelineRef} className={styles.processSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Workflow</span>
                            <h2 className="section-title">Our Production Timeline</h2>
                        </div>
                    </div>

                    <div className={styles.timelineContainer}>
                        <div className={styles.timelineBar}></div>
                        <div className={styles.timelineGrid}>
                            <div className={styles.timelineNode}>
                                <div className={styles.nodePoint}>1</div>
                                <h4>Discover</h4>
                                <p>Comprehensive assessment of your technological requirements and targets.</p>
                            </div>
                            <div className={styles.timelineNode}>
                                <div className={styles.nodePoint}>2</div>
                                <h4>Strategy</h4>
                                <p>Drafting layout specifications, cloud routing schemas, and asset milestones.</p>
                            </div>
                            <div className={styles.timelineNode}>
                                <div className={styles.nodePoint}>3</div>
                                <h4>Design</h4>
                                <p>Constructing high-fidelity mockups following modern visual and layout frameworks.</p>
                            </div>
                            <div className={styles.timelineNode}>
                                <div className={styles.nodePoint}>4</div>
                                <h4>Develop</h4>
                                <p>Clean modular programming supported by continuous integration pipelines.</p>
                            </div>
                            <div className={styles.timelineNode}>
                                <div className={styles.nodePoint}>5</div>
                                <h4>Launch</h4>
                                <p>Continuous load testing, SEO deployment metrics, and server handoff.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. SLIDING TESTIMONIALS */}
            <section className={styles.testSection}>
                <div className="container">
                    <div className={styles.sliderContainer}>
                        <div className={styles.stars}>
                            <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                            <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                            <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                            <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                            <Star size={16} fill="var(--accent-color)" color="var(--accent-color)" />
                        </div>
                        <p className={styles.testimonialText}>
                            "{testimonials[sliderIndex].text}"
                        </p>
                        <div className={styles.clientMeta}>
                            <h4>{testimonials[sliderIndex].name}</h4>
                            <span>{testimonials[sliderIndex].role}</span>
                        </div>
                        <div className={styles.sliderControls}>
                            <button onClick={prevTestimonial} className={styles.slideBtn} aria-label="Previous testimonial"><ArrowLeft size={16} /></button>
                            <div className={styles.dots}>
                                {testimonials.map((_, idx) => (
                                    <span key={idx} className={`${styles.dot} ${idx === sliderIndex ? styles.dotActive : ''}`}></span>
                                ))}
                            </div>
                            <button onClick={nextTestimonial} className={styles.slideBtn} aria-label="Next testimonial"><ArrowRight size={16} /></button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. CAREERS INTRO CALL TO ACTION */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard}>
                        <h2>Join Our Talent Pool</h2>
                        <p>We are constantly seeking brilliant minds to join our development internship cycles and full-time hiring programs.</p>
                        <div className={styles.ctaActions}>
                            <Link to="/careers" className="btn btn-primary">Browse Hiring Jobs</Link>
                            <Link to="/internship" className="btn btn-secondary">Internship Tracks</Link>
                        </div>
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Home;
