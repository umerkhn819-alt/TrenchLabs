import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Award, CheckCircle, Cpu, BookOpen } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { getTeamMember } from '../../content/team';
import styles from './TeamMemberDetail.module.css';

export const TeamMemberDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const mem = getTeamMember(id);

    return (
        <Transitions>
            <Seo title={mem.name} description={mem.philosophy} path={`/team/${mem.id}`} />
            {/* 1. MEMBER HEADER */}
            <header className={styles.hero} style={{ '--theme-color': mem.accent } as React.CSSProperties}>
                <div className="container">
                    <Link to="/team" className={styles.backLink}><ArrowLeft size={16} /> Back to Team</Link>
                    <div className={styles.heroContent}>
                        <div className={styles.circleBadge} style={{ color: mem.accent, backgroundColor: `${mem.accent}12` }}>
                            {mem.roleAbbr}
                        </div>
                        <h1 className="gradient-text">{mem.name}</h1>
                        <p className={styles.roleTitle}>{mem.role}</p>
                        <p className={styles.philosophy}>"{mem.philosophy}"</p>
                    </div>
                </div>
            </header>

            {/* 2. SPECIFIC PROFILE DETAILS */}
            <section className={styles.profileSection}>
                <div className="container">
                    <div className={styles.layout}>
                        {/* Bio Text Column */}
                        <div className={styles.textCol}>
                            <div className={styles.segment}>
                                <div className={styles.segHeader}>
                                    <BookOpen size={18} />
                                    <h2>Professional Biography</h2>
                                </div>
                                <p>{mem.bio}</p>
                            </div>

                            <div className={styles.segment} style={{ marginTop: '3rem' }}>
                                <div className={styles.segHeader}>
                                    <Award size={18} />
                                    <h2>Selected Project Involvement</h2>
                                </div>
                                <ul className={styles.projList}>
                                    {mem.projects.map((proj, i) => (
                                        <li key={i}>
                                            <CheckCircle size={14} style={{ color: mem.accent }} />
                                            <span>{proj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Skills and Statistics Sidebar Column */}
                        <div className={styles.sidebarCol}>
                            <div className={styles.skillsCard}>
                                <div className={styles.cardHeader}>
                                    <Cpu size={18} />
                                    <h3>Core Capabilities</h3>
                                </div>
                                <div className={styles.skillsList}>
                                    {mem.skills.map((sk, i) => (
                                        <div key={i} className={styles.skillRow}>
                                            <div className={styles.skillMeta}>
                                                <span>{sk.name}</span>
                                                <span style={{ color: mem.accent }}>{sk.val}</span>
                                            </div>
                                            <div className={styles.barTrack}>
                                                <div className={styles.barFill} style={{ width: sk.val, backgroundColor: mem.accent }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Connect quick trigger */}
                            <a href="mailto:hello@trenchlabs.com" className={styles.mailCTA} style={{ '--accent': mem.accent } as React.CSSProperties}>
                                <Mail size={16} /> Contact via TrenchLabs Registry
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default TeamMemberDetail;
