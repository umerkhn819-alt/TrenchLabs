import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
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
                    <GlowBadge variant="accent" pulse>The team</GlowBadge>
                    <h1 className={styles.heroTitle}>Founder-led, engineer-executed</h1>
                    <p className={styles.heroDesc}>
                        A small, focused team of engineers and operations specialists who care about craft.
                        No account managers—you work directly with the people building your product.
                    </p>
                </div>
            </section>

            {/* Stats strip */}
            <section className={`${styles.statsSection} section-inset`}>
                <GridOverlay opacity={0.06} variant="dots" />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className={styles.statsGrid}>
                        <StatCounter value={5} suffix="+" label="Team members" />
                        <StatCounter value={4} suffix="+" label="Years in operation" />
                        <StatCounter value={150} suffix="+" label="Projects delivered" />
                        <StatCounter value={99} suffix="%" label="Client retention" />
                    </div>
                </div>
            </section>

            {/* Team cards */}
            <section className={styles.gridSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Leadership</span>
                            <h2 className="section-title">Who you work with</h2>
                        </div>
                    </div>
                    <div className={styles.grid}>
                        {TEAM_EXPERTS.map((mem) => (
                            <Link key={mem.id} to={`/team/${mem.id}`} className={styles.teamCard}>
                                <div className={styles.teamCardPhoto}>
                                    {mem.photo ? (
                                        <img src={mem.photo} alt={mem.name} className={styles.teamCardImg} />
                                    ) : (
                                        <div className={styles.teamCardPlaceholder}>
                                            <span>{mem.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <span className={styles.roleBadge}>{mem.roleAbbr}</span>
                                </div>
                                <div className={styles.teamCardBody}>
                                    <h3>{mem.name}</h3>
                                    <p>{mem.role}</p>
                                    <span className={styles.teamCardCta}>View profile <ArrowRight size={13} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values section */}
            <section className={styles.valuesSection}>
                <div className="container">
                    <div className={styles.sectionHeader}>
                        <div>
                            <span className="section-tagline">Philosophy</span>
                            <h2 className="section-title">Our engineering principles</h2>
                        </div>
                    </div>
                    <div className={styles.valuesGrid}>
                        {VALUES.map((v) => {
                            const Icon = v.icon;
                            return (
                                <div key={v.title} className={styles.valueCard}>
                                    <div className={styles.valueIconWrap} style={{ '--vc': v.color } as React.CSSProperties}>
                                        <Icon size={22} strokeWidth={2} />
                                    </div>
                                    <h4>{v.title}</h4>
                                    <p>{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Team;
