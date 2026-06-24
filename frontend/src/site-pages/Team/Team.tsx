import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { motion } from 'framer-motion';
import { cinematicStagger, cinematicUp, scaleIn, viewportOnce } from '../../lib/motion';
import { CinematicText } from '../../components/effects/CinematicText';
import { CinematicCard } from '../../components/effects/CinematicCard';
import { Seo } from '../../components/Seo';
import { GlowBadge } from '../../components/ui/GlowBadge';
import { StatCounter } from '../../components/ui/StatCounter';
import { GridOverlay } from '../../components/effects/GridOverlay';
import { TEAM_EXPERTS, TEAM_MEMBERS_BY_ID } from '../../content/team';
import styles from './Team.module.css';

const VALUES = [
    { icon: Code2, title: 'Engineering-first thinking', desc: 'We design systems before writing code—every architecture decision has a reason and a trade-off written down.', color: '#38bdf8' },
    { icon: Layers, title: 'Layered, maintainable output', desc: 'Systems should still make sense 18 months after launch. We write code for the next engineer, not just the current deadline.', color: '#818cf8' },
    { icon: Zap, title: 'Speed without sacrificing quality', desc: 'Founder-led means we ship fast—but never at the cost of security, performance, or reliability.', color: '#34d399' },
];

export const Team: React.FC = () => {
    return (
        <Transitions>
            <Seo
                title="About Us"
                description="Leadership and engineers behind TrenchLabs — architecture, delivery, and operations."
                path="/team"
            />

            <section className={styles.hero}>
                <div className={styles.heroGlow} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        variants={cinematicStagger}
                        initial="hidden"
                        animate="show"
                        className={styles.aboutHeader}
                    >
                        <motion.h1 variants={cinematicUp} className={styles.heroTitle}>
                            About Us
                        </motion.h1>
                        <CinematicText as="p" className={styles.heroIntro} staggerDelay={0.03}>
                            At TrenchLabs, we believe in the power of engineering to elevate brands. We're a technical agency that specializes in crafting bold systems, user-centric applications, and innovative digital solutions. With over 150 projects completed, we've built a reputation for delivering exceptional, results-driven software.
                        </CinematicText>
                        
                        <motion.div variants={cinematicUp} className={styles.heroImageWrap}>
                            <div className={styles.imageGlow} />
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="TrenchLabs Team" className={styles.heroImage} />
                        </motion.div>

                        <CinematicText as="p" className={styles.heroMission} staggerDelay={0.03}>
                            We collaborate closely with our clients, understanding their vision and business goals. Our mission is to help you stand out and create lasting impressions that drive growth. Let's build something unforgettable together!
                        </CinematicText>

                        <motion.div variants={cinematicUp} style={{ marginTop: '2.5rem' }}>
                            <Link to="/contact" className={styles.contactBtn}>
                                Get In Touch
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats strip */}
            <section className={styles.statsSection}>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className={styles.statsGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <motion.div variants={scaleIn} className={styles.statBox}>
                            <h3 className={styles.statValue}>150+</h3>
                            <p className={styles.statLabel}>Projects Completed</p>
                        </motion.div>
                        <motion.div variants={scaleIn} className={styles.statBox}>
                            <h3 className={styles.statValue}>99%</h3>
                            <p className={styles.statLabel}>Happy Clients</p>
                        </motion.div>
                        <motion.div variants={scaleIn} className={styles.statBox}>
                            <h3 className={styles.statValue}>7+</h3>
                            <p className={styles.statLabel}>Industry Awards</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team cards - Massive */}
            <section className={styles.gridSection}>
                <div className="container">
                    <motion.div 
                        className={styles.sectionHeader}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <span className="section-tagline">Leadership</span>
                        <h2 className="section-title">The Syndicate</h2>
                    </motion.div>
                    <motion.div 
                        className={styles.grid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {TEAM_EXPERTS.map((mem, idx) => (
                            <CinematicCard key={mem.id} delay={idx * 0.1}>
                                <Link to={`/team/${mem.id}`} className={styles.teamCard}>
                                    <div className={styles.teamCardPhoto}>
                                        <div className={styles.teamCardOverlay} />
                                        {mem.photo ? (
                                            <img src={mem.photo} alt={mem.name} className={styles.teamCardImg} />
                                        ) : (
                                            <div className={styles.teamCardPlaceholder}>
                                                <span>{mem.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.teamCardBody}>
                                        <span className={styles.roleBadge}>{mem.role}</span>
                                        <h3>{mem.name}</h3>
                                        <p>{TEAM_MEMBERS_BY_ID[mem.id]?.philosophy}</p>
                                        <span className={styles.teamCardCta}>View Dossier &rarr;</span>
                                    </div>
                                </Link>
                            </CinematicCard>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values section */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <motion.div 
                        className={styles.sectionHeader}
                        variants={cinematicUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <span className="section-tagline">Philosophy</span>
                        <h2 className="section-title">Engineering Principles</h2>
                    </motion.div>
                    <motion.div 
                        className={styles.valuesGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        {VALUES.map((v, idx) => {
                            const Icon = v.icon;
                            return (
                                <CinematicCard key={v.title} delay={idx * 0.1}>
                                    <div className={styles.valueCard}>
                                        <div className={styles.valueGlow} style={{ background: `radial-gradient(circle at top right, ${v.color}20 0%, transparent 70%)` }} />
                                        <div className={styles.valueIconWrap} style={{ color: v.color, backgroundColor: `${v.color}15`, border: `1px solid ${v.color}30` }}>
                                            <Icon size={28} strokeWidth={2} />
                                        </div>
                                        <h4>{v.title}</h4>
                                        <CinematicText as="p">{v.desc}</CinematicText>
                                    </div>
                                </CinematicCard>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </Transitions>
    );
};
export default Team;
