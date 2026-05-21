import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Monitor, Palette, ShoppingBag, BarChart2, Terminal, Star, Zap, Eye, Code2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Seo } from '../../components/Seo';
import { MagneticCTA } from '../../components/premium/MagneticCTA';
import { MeshGradient } from '../../components/effects/MeshGradient';
import { GridOverlay } from '../../components/effects/GridOverlay';
import { MarqueeBand } from '../../components/effects/MarqueeBand';
import { FloatCard } from '../../components/effects/FloatCard';
import { WaveRibbons } from '../../components/effects/WaveRibbons';
import { GlowBadge } from '../../components/ui/GlowBadge';
import { StatCounter } from '../../components/ui/StatCounter';
import { FAQAccordion } from '../../components/ui/FAQAccordion';
import { TECH_LOGOS } from '../../components/ui/TechLogoSVGs';
import { Transitions } from '../../components/Transitions';
import { fadeInUp, staggerContainer, cinematicStagger, cinematicUp, viewportOnce } from '../../lib/motion';
import { CinematicCard } from '../../components/effects/CinematicCard';
import { SplashReveal } from '../../components/effects/SplashReveal';
import { TEAM_EXPERTS } from '../../content/team';
import teamStyles from '../Team/Team.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

const heroContainer = staggerContainer;
const heroItem = fadeInUp;

const FAQ_ITEMS = [
    {
        q: 'How quickly can you start a project?',
        a: 'For most projects we can begin within 5–7 business days after a signed scope. For smaller engagements (landing pages, automation scripts) it\'s often same week.',
    },
    {
        q: 'What does a typical engagement look like?',
        a: 'Discovery call → written spec → design iteration → phased builds with async check-ins. We avoid scope bloat by nailing the spec before code starts.',
    },
    {
        q: 'Do you work with early-stage startups?',
        a: 'Yes—it\'s most of our client base. We understand runway constraints and can phase work to fit your budget, starting with the highest-impact deliverable.',
    },
    {
        q: 'What\'s your pricing model?',
        a: 'Project-based pricing for defined deliverables, retainer for ongoing product engineering. We provide a fixed quote after scoping so there are no surprise invoices.',
    },
    {
        q: 'Do you hand off code or maintain it long-term?',
        a: 'Both. We can ship and hand off with full documentation, or stay on as your engineering partner. Most clients start with a project and move to a retainer.',
    },
    {
        q: 'What makes TrenchLabs different from a typical agency?',
        a: 'Founder-led means you\'re talking to the person writing the architecture, not a middleman translating your requirements. Fewer handoffs = faster decisions and tighter output.',
    },
];

const WHY_ITEMS = [
    {
        icon: Zap,
        title: 'Founder-led speed',
        desc: 'You work directly with the person writing architecture. Zero translation layers, faster pivots.',
        color: '#f59e0b',
    },
    {
        icon: Eye,
        title: 'Transparent specs',
        desc: 'Every project starts with a written spec you approve. No surprise scope creep.',
        color: '#38bdf8',
    },
    {
        icon: Code2,
        title: 'AI-native builds',
        desc: 'We design for AI from the ground up—not as an afterthought bolted on at the end.',
        color: '#818cf8',
    },
    {
        icon: Layers,
        title: 'Zero template code',
        desc: 'Every system is engineered for your constraints—not adapted from a starter kit.',
        color: '#34d399',
    },
];

export const Home: React.FC = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    const testimonials = [
        {
            name: 'Marcus Sterling',
            role: 'CTO, Nexa Group',
            text: 'They rebuilt our booking flows—latency down ~40% and the stack has been solid since launch.',
            avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        },
        {
            name: 'Elena Rostova',
            role: 'Creative Director, Velora',
            text: 'Fast storefront, clean checkout—conversion jumped after we shipped. Team is a pleasure to work with.',
            avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        },
        {
            name: 'Dr. Aaron Vance',
            role: 'Director, Medica Labs',
            text: 'HIPAA-aware scheduling shipped fast. Clear architecture from day one—no mysteries in the codebase.',
            avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
        },
    ];

    const servicePanels = [
        { id: 'web-development', title: 'Web Development', outcome: 'Sites, dashboards, portals, and custom apps—fast loads, clean handoff, room to grow.', icon: Monitor, color: '#38bdf8' },
        { id: 'ai-automation', title: 'AI Automation', outcome: 'Workflows, support, and ops automation wired to your stack—with guardrails.', icon: Cpu, color: '#818cf8' },
        { id: 'ui-ux-design', title: 'UI / UX Design', outcome: 'Product UI and design systems your engineers can implement without thrash.', icon: Palette, color: '#f472b6' },
        { id: 'e-commerce', title: 'E-Commerce', outcome: 'Commerce focused on speed, clarity, and checkout confidence.', icon: ShoppingBag, color: '#34d399' },
        { id: 'wordpress', title: 'WordPress', outcome: 'Native blocks, secure CMS, lean builds built to last.', icon: Terminal, color: '#a78bfa' },
    ];

    const projects = [
        { id: 'nexa-restaurant', title: 'Nexa Restaurant', category: 'Hospitality · Web', tagline: 'Reservations, seating, and a guest portal that actually gets used.', image: '/projects/nexa.jpg', metrics: ['-40% Latency', '+22% Bookings'], tech: ['React', 'Node.js', 'PostgreSQL'] },
        { id: 'velora-fashion', title: 'Velora Fashion', category: 'Retail · E-Commerce', tagline: 'Storefront engineering with checkout tuned for conversion.', image: '/projects/velora.jpg', metrics: ['+18% CVR', '2.1s LCP'], tech: ['Shopify', 'Liquid', 'TailwindCSS'] },
    ];

    const processSteps = [
        { n: '01', t: 'Discover', b: 'Goals, constraints, and stack—aligned to outcomes first.' },
        { n: '02', t: 'Architect', b: 'Flows, contracts, and performance budgets before UI.' },
        { n: '03', t: 'Design', b: 'UI, motion, and a system language your devs can build.' },
        { n: '04', t: 'Build', b: 'Typed paths, reviews, and delivery you can trace.' },
        { n: '05', t: 'Automate', b: 'AI, workflows, and integrations wired to your stack.' },
        { n: '06', t: 'Launch', b: 'Hardening, observability, and iteration on real usage.' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && heroRef.current) {
                const copy = heroRef.current.querySelector(`.${styles.heroCopy}`);
                if (copy) {
                    gsap.to(copy, {
                        yPercent: -8,
                        ease: 'none',
                        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.65 },
                    });
                }
            }

            if (rootRef.current) {
                const ctaInner = rootRef.current.querySelector(`.${styles.ctaAnimatedInner}`);
                if (ctaInner) {
                    gsap.fromTo(ctaInner,
                        { scale: 0.9, opacity: 0, y: 50 },
                        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.75)', scrollTrigger: { trigger: ctaInner, start: 'top 85%' } }
                    );
                }
            }
        }, rootRef);
        return () => ctx.revert();
    }, []);

    return (
        <Transitions>
            <div ref={rootRef} style={{ position: 'relative', overflow: 'hidden' }}>
                <Seo
                    title="AI-Powered Web & Automation Studio"
                    description="TrenchLabs ships web, automation, and UI for startups and teams—founder-led, fast to respond, serious about engineering."
                    path="/"
                />

                <SplashReveal />

                {/* ─── HERO ──────────────────────────────────────────────────── */}
                <header ref={heroRef} className={styles.hero}>


                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <motion.div
                            className={styles.heroCopy}
                            variants={heroContainer}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.h1 className={styles.heroTitle} variants={heroItem}>
                                Building intelligent systems for
                                <span className={styles.heroTitleAccent}><br />modern businesses</span>
                            </motion.h1>

                            <motion.p className={styles.heroDesc} variants={heroItem}>
                                We design AI, automation, and software systems built for scale, speed, and long-term growth.
                            </motion.p>

                            <motion.div className={styles.heroActions} variants={heroItem}>
                                <MagneticCTA to="/consultation" className="btn-premium">
                                    Book a 15-minute call <ArrowRight size={16} />
                                </MagneticCTA>
                                <Link to="/services" className={styles.heroGhostBtn}>
                                    Explore our services
                                </Link>
                            </motion.div>

                            <motion.p className={styles.heroCtaHint} variants={heroItem}>
                                No prep deck required—we'll ask four questions and tell you honestly if we're a match.
                            </motion.p>

                            <motion.div className={styles.heroMeta} variants={heroItem}>
                                <span><em>Focus</em> <strong>Startups · SaaS · Commerce</strong></span>
                                <span className={styles.metaDivider} />
                                <span><em>Output</em> <strong>Ship-ready engineering</strong></span>
                                <span className={styles.metaDivider} />
                                <span><em>Style</em> <strong>Founder-led, no middlemen</strong></span>
                            </motion.div>
                        </motion.div>

                    </div>
                </header>

                {/* ─── TEAM SECTION ─────────────────────────────────────────────── */}
                <section className={teamStyles.gridSection} style={{ paddingBottom: '2rem' }}>
                    <div className="container">
                        <motion.div 
                            className={teamStyles.sectionHeader}
                            variants={cinematicUp}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportOnce}
                        >
                            <div>
                                <span className="section-tagline">Leadership</span>
                                <h2 className="section-title">Who you work with</h2>
                            </div>
                        </motion.div>
                        <motion.div 
                            className={teamStyles.grid}
                            variants={cinematicStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportOnce}
                        >
                            {TEAM_EXPERTS.map((mem, idx) => (
                                <CinematicCard key={mem.id} delay={idx * 0.1}>
                                    <Link to={`/team/${mem.id}`} className={teamStyles.teamCard}>
                                        <div className={teamStyles.teamCardPhoto}>
                                            {mem.photo ? (
                                                <img src={mem.photo} alt={mem.name} className={teamStyles.teamCardImg} />
                                            ) : (
                                                <div className={teamStyles.teamCardPlaceholder}>
                                                    <span>{mem.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            <span className={teamStyles.roleBadge}>{mem.role}</span>
                                        </div>
                                        <div className={teamStyles.teamCardBody}>
                                            <h3>{mem.name}</h3>
                                            <span className={teamStyles.teamCardCta}>
                                                Full profile &rarr;
                                            </span>
                                        </div>
                                    </Link>
                                </CinematicCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ─── STATS (dark band) ───────────────────────────────────────── */}
                <section className={`${styles.statsSection} section-inset`}>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className={`${styles.statsGrid} reveal-scrub`}>
                            <StatCounter value={99} suffix="%" label="Client retention rate" />
                            <StatCounter value={50} suffix="M+" label="API events routed" />
                            <StatCounter value={150} suffix="+" label="Systems shipped" />
                        </div>
                        <p className={`${styles.statsQuote} reveal`}>
                            "They rebuilt our booking flows—latency down ~40% and the stack has been solid since launch." <br />
                            <strong>— Marcus Sterling, CTO Nexa Group</strong>
                        </p>
                    </div>
                </section>

                {/* ─── SERVICES ───────────────────────────────────────────────── */}
                <section className={`${styles.servicesSection}`}>
                    <div className="container">
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">Capabilities</span>
                                <h2 className="section-title reveal-clip">Systems we engineer</h2>
                            </div>
                            <p className="section-desc">Five tracks—each tied to an outcome, not a checklist.</p>
                        </div>

                        <div className={styles.serviceGrid}>
                            {servicePanels.map((s) => {
                                const Icon = s.icon;
                                return (
                                    <FloatCard key={s.id} className={styles.cardWrap}>
                                        <Link to={`/services/${s.id}`} className={`${styles.serviceCard} reveal`}>
                                            <div className={styles.serviceCardTop}>
                                                <div className={styles.serviceIconCircle} style={{ '--icon-color': s.color } as React.CSSProperties}>
                                                    <Icon size={22} strokeWidth={1.75} />
                                                </div>
                                            </div>
                                            <div className={styles.serviceCardContent}>
                                                <h3 className={styles.serviceCardTitle}>{s.title}</h3>
                                                <p className={styles.serviceCardDesc}>{s.outcome}</p>
                                            </div>
                                            <div className={styles.serviceCardFooter}>
                                                <span className={styles.serviceCardLink}>
                                                    Explore <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </Link>
                                    </FloatCard>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── WHY TRENCHLABS ─────────────────────────────────────────── */}
                <section className={styles.whySection}>
                    <div className="container">
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">Differentiators</span>
                                <h2 className="section-title reveal-clip">Why TrenchLabs</h2>
                            </div>
                        </div>
                        <div className={styles.whyGrid}>
                            {WHY_ITEMS.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div key={item.title} className={`${styles.whyCard} reveal`}>
                                        <div className={styles.whyIconWrap} style={{ '--why-color': item.color } as React.CSSProperties}>
                                            <Icon size={20} strokeWidth={2} />
                                        </div>
                                        <h4 className={styles.whyTitle}>{item.title}</h4>
                                        <p className={styles.whyDesc}>{item.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── WORK SHOWCASE ──────────────────────────────────────────── */}
                <section className={styles.workSection}>
                    <div className="container">
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">Selected Work</span>
                                <h2 className="section-title reveal-clip">Case studies</h2>
                            </div>
                            <Link to="/services" className="btn btn-secondary btn-sm">
                                Full archive <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className={styles.workGrid}>
                            {projects.map((p) => (
                                <Link key={p.id} to={`/work/${p.id}`} className={`${styles.workCard} reveal`}>
                                    <div className={styles.workImageWrap}>
                                        <img src={p.image} alt={p.title} className={styles.workImage} loading="lazy" />
                                        <div className={styles.workImageOverlay}>
                                            <div className={styles.workMetrics}>
                                                {p.metrics.map((m) => (
                                                    <span key={m} className={styles.workMetricChip}>{m}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.workCardBody}>
                                        <span className={styles.workCategory}>{p.category}</span>
                                        <h3 className={styles.workCardTitle}>{p.title}</h3>
                                        <p className={styles.workCardDesc}>{p.tagline}</p>
                                        <div className={styles.workTechRow}>
                                            {p.tech.map((t) => <span key={t} className={styles.workTechChip}>{t}</span>)}
                                        </div>
                                        <span className={styles.workCta}>View case study <ArrowRight size={14} /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── PROCESS TIMELINE ────────────────────────────────────────── */}
                <section id="process" className={`${styles.processSection} section-inset`}>
                    <GridOverlay opacity={0.05} variant="dots" />
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">Workflow</span>
                                <h2 className="section-title reveal-clip">From idea to shipped system</h2>
                            </div>
                        </div>
                        <motion.div 
                            className={styles.processGrid}
                            variants={cinematicStagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportOnce}
                        >
                            {processSteps.map((step, i) => (
                                <CinematicCard key={step.n} delay={i * 0.1}>
                                    <div className={styles.processNode}>
                                        <div className={styles.processNodeWatermark}>{step.n}</div>
                                        <div className={styles.processContent}>
                                            <span className={styles.processStepAccent}>Phase {step.n}</span>
                                            <h4>{step.t}</h4>
                                            <p>{step.b}</p>
                                        </div>
                                    </div>
                                </CinematicCard>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ─── TESTIMONIALS ──────────────────────────────────────────── */}
                <section className={styles.testimonialsSection}>
                    <div className="container">
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">Client Feedback</span>
                                <h2 className="section-title reveal-clip">Trusted by builders</h2>
                            </div>
                        </div>
                        <div className={styles.testimonialsGrid}>
                            {testimonials.map((t, i) => (
                                <div key={i} className={`${styles.testimonialCard} reveal`}>
                                    <div className={styles.stars}>
                                        {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />)}
                                    </div>
                                    <p className={styles.testimonialText}>"{t.text}"</p>
                                    <div className={styles.testimonialAuthor}>
                                        <img src={t.avatar} alt={t.name} className={styles.testimonialAvatar} />
                                        <div>
                                            <strong>{t.name}</strong>
                                            <span>{t.role}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── FAQ ────────────────────────────────────────────────────── */}
                <section className={styles.faqSection}>
                    <div className="container">
                        <div className={`${styles.sectionHeader} reveal`}>
                            <div>
                                <span className="section-tagline">FAQ</span>
                                <h2 className="section-title reveal-clip">Common questions</h2>
                            </div>
                        </div>
                        <FAQAccordion items={FAQ_ITEMS} className={`${styles.faqList} reveal`} />
                    </div>
                </section>


            </div>
        </Transitions>
    );
};
export default Home;
