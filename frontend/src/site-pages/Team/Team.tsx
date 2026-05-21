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
import { TEAM_EXPERTS } from '../../content/team';
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
                title="Team"
                description="Leadership and engineers behind TrenchLabs — architecture, delivery, and operations."
                path="/team"
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
                            <GlowBadge variant="accent" pulse>The team</GlowBadge>
                        </motion.div>
                        <motion.h1 variants={cinematicUp} className={styles.heroTitle}>Founder-led, engineer-executed</motion.h1>
                        <CinematicText as="p" className={styles.heroDesc} staggerDelay={0.03}>
                            A small, focused team of engineers and operations specialists who care about craft.
                            No account managers—you work directly with the people building your product.
                        </CinematicText>
                    </motion.div>
                </div>
            </section>

            {/* Stats strip */}
            <section className={`${styles.statsSection} section-inset`}>
                <GridOverlay opacity={0.06} variant="dots" />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.div 
                        className={styles.statsGrid}
                        variants={cinematicStagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                    >
                        <motion.div variants={scaleIn}><StatCounter value={5} suffix="+" label="Team members" /></motion.div>
                        <motion.div variants={scaleIn}><StatCounter value={4} suffix="+" label="Years in operation" /></motion.div>
                        <motion.div variants={scaleIn}><StatCounter value={150} suffix="+" label="Projects delivered" /></motion.div>
                        <motion.div variants={scaleIn}><StatCounter value={99} suffix="%" label="Client retention" /></motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Team cards */}
            <section className={styles.gridSection}>
                <div className="container">
                    <motion.div 
                        className={styles.sectionHeader}
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
                                        {mem.photo ? (
                                            <img src={mem.photo} alt={mem.name} className={styles.teamCardImg} />
                                        ) : (
                                            <div className={styles.teamCardPlaceholder}>
                                                <span>{mem.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        <span className={styles.roleBadge}>{mem.role}</span>
                                    </div>
                                    <div className={styles.teamCardBody}>
                                        <h3>{mem.name}</h3>
                                        <p>{mem.shortDesc}</p>
                                        <span className={styles.teamCardCta}>Full profile &rarr;</span>
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
                        <div>
                            <span className="section-tagline">Philosophy</span>
                            <h2 className="section-title">Our engineering principles</h2>
                        </div>
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
                                        <div className={styles.valueIconWrap} style={{ '--vc': v.color } as React.CSSProperties}>
                                            <Icon size={22} strokeWidth={2.25} />
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
