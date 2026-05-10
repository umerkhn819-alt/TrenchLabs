import React from 'react';
import { TeamCard } from '../../components/TeamCard';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { TEAM_EXPERTS } from '../../content/team';
import styles from './Team.module.css';

export const Team: React.FC = () => {
    return (
        <Transitions>
            <Seo
                title="Team"
                description="Leadership and engineers behind TrenchLabs — architecture, delivery, and operations."
                path="/team"
            />
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Leadership &amp; Talent</span>
                    <h1 className="section-title gradient-text">Meet Our System Architects</h1>
                    <p className="section-desc">We are an integrated group of engineers, operations directors, and developers committed to building high-quality corporate applications.</p>
                </div>
            </section>

            <section className={styles.gridSection}>
                <div className="container">
                    <div className={styles.grid}>
                        {TEAM_EXPERTS.map((mem) => (
                            <TeamCard
                                key={mem.id}
                                id={mem.id}
                                name={mem.name}
                                role={mem.role}
                                roleAbbr={mem.roleAbbr}
                                accentColor={mem.accent}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Team;
