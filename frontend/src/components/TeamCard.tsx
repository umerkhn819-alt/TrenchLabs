import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import styles from './TeamCard.module.css';

interface TeamCardProps {
    id: string;
    name: string;
    role: string;
    roleAbbr: string;
    accentColor: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({ id, name, role, roleAbbr, accentColor }) => {
    return (
        <Link to={`/team/${id}`} className={styles.card}>
            {/* Background Role Abbreviation Overlay */}
            <div className={styles.abbrBackground}>{roleAbbr}</div>

            {/* Content Segment */}
            <div className={styles.header}>
                <div className={styles.meta}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.role}>{role}</p>
                </div>
            </div>

            {/* Bottom Visual Tray */}
            <div className={styles.bottomTray} style={{ '--accent': accentColor } as React.CSSProperties}>
                <div className={styles.arrowIcon}>
                    <ArrowUpRight size={20} />
                </div>
                <div className={styles.accentBlock}></div>
            </div>
        </Link>
    );
};
export default TeamCard;
