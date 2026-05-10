import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    id: string;
    title: string;
    category: string;
    tagline: string;
    tech: string[];
    accentColor: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, category, tagline, tech, accentColor }) => {
    return (
        <Link to={`/work/${id}`} className={styles.card}>
            <div className={styles.mockupContainer} style={{ '--accent': accentColor } as React.CSSProperties}>
                {/* CSS Visual Mockup Placeholder matching client cases */}
                <div className={styles.browserHeader}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                </div>
                
                <div className={styles.mockupContent}>
                    {id === 'nexa-restaurant' && (
                        <div className={styles.nexaMock}>
                            <h4 style={{ color: accentColor }}>Nexa Res</h4>
                            <div className={styles.bookingRow}>
                                <span>Reservation #4829</span>
                                <span className={styles.badge}>Confirmed</span>
                            </div>
                            <div className={styles.chartLine} style={{ backgroundColor: accentColor }}></div>
                        </div>
                    )}
                    {id === 'velora-fashion' && (
                        <div className={styles.veloraMock}>
                            <span className={styles.itemTitle}>Velora Store</span>
                            <div className={styles.galleryGrid}>
                                <div className={styles.block}></div>
                                <div className={styles.block}></div>
                            </div>
                        </div>
                    )}
                    {id === 'medica-clinic' && (
                        <div className={styles.medicaMock}>
                            <span className={styles.titleMed}>Medica Health</span>
                            <div className={styles.indicator} style={{ borderColor: accentColor }}>
                                <span className={styles.pulseDot} style={{ backgroundColor: accentColor }}></span>
                                <span>Live Dashboard</span>
                            </div>
                        </div>
                    )}
                    {id === 'assistflow-ai' && (
                        <div className={styles.assistMock}>
                            <span className={styles.chatTitle}>AssistFlow Chat</span>
                            <div className={styles.chatBubble} style={{ backgroundColor: accentColor }}>Agent Online</div>
                        </div>
                    )}
                    {id === 'growthpulse' && (
                        <div className={styles.growthMock}>
                            <span className={styles.growthTitle}>GrowthPulse Analytics</span>
                            <div className={styles.bars}>
                                <div className={styles.bar} style={{ height: '30%', backgroundColor: accentColor }}></div>
                                <div className={styles.bar} style={{ height: '60%', backgroundColor: accentColor }}></div>
                                <div className={styles.bar} style={{ height: '90%', backgroundColor: accentColor }}></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.info}>
                <span className={styles.category}>{category}</span>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.tagline}>{tagline}</p>
                <div className={styles.techStack}>
                    {tech.map((t, idx) => (
                        <span key={idx} className={styles.techTag}>{t}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
};
export default ProjectCard;
