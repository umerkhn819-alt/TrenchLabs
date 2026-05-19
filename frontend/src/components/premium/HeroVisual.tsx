'use client';
import React from 'react';
import { motion } from 'framer-motion';

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.18 } } };
const card = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const cardBase: React.CSSProperties = {
    background: 'color-mix(in srgb, var(--color-card, white) 88%, transparent)',
    border: '1px solid var(--glass-border)',
    borderRadius: 'var(--radius-xl, 1.125rem)',
    boxShadow: 'var(--shadow-glass-deep), inset 0 1px 0 rgb(255 255 255 / 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    padding: '1.25rem 1.5rem',
};

const MetricRow: React.FC<{ label: string; value: string; up?: boolean }> = ({ label, value, up = true }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: up ? '#16a34a' : '#dc2626' }}>{value}</span>
    </div>
);

const MiniBar: React.FC<{ pct: number; color: string }> = ({ pct, color }) => (
    <div style={{ height: 6, background: 'var(--glass-bg)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 1.2s ease' }} />
    </div>
);

export const HeroVisual: React.FC<{ className?: string }> = ({ className = '' }) => (
    <motion.div
        className={className}
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', width: '100%', maxWidth: 540, margin: '0 auto' }}
    >
        {/* Dashboard card */}
        <motion.div variants={card} style={{ ...cardBase, animation: 'float 8s ease-in-out infinite' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>AI Pipeline Status</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>98.7%</p>
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40 }}>
                    {[60, 75, 55, 88, 72, 95, 98].map((h, i) => (
                        <div key={i} style={{ width: 6, height: `${h}%`, background: i === 6 ? 'var(--color-accent)' : 'var(--glass-border)', borderRadius: 3 }} />
                    ))}
                </div>
            </div>
            <MetricRow label="API Calls / min" value="+1,247" up />
            <MetricRow label="Avg. Latency" value="12ms" up />
            <MetricRow label="Error Rate" value="0.02%" up />
        </motion.div>

        {/* Two columns row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.1rem' }}>
            {/* Automation flow */}
            <motion.div variants={card} style={{ ...cardBase, animation: 'float 10s ease-in-out infinite 2s' }}>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Automation</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {['Trigger', 'Process', 'Route', 'Deploy'].map((s, i) => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: i < 3 ? 'var(--color-accent)' : 'var(--glass-border)', flexShrink: 0 }} />
                            <span style={{ fontSize: '0.75rem', color: i < 3 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                            {i < 3 && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Perf card */}
            <motion.div variants={card} style={{ ...cardBase, animation: 'float 12s ease-in-out infinite 1s' }}>
                <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Performance</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {[
                        { label: 'Speed', pct: 97, color: 'var(--color-accent)' },
                        { label: 'CWV', pct: 94, color: '#818cf8' },
                        { label: 'SEO', pct: 99, color: '#34d399' },
                    ].map(({ label, pct, color }) => (
                        <div key={label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{label}</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pct}</span>
                            </div>
                            <MiniBar pct={pct} color={color} />
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    </motion.div>
);
export default HeroVisual;
