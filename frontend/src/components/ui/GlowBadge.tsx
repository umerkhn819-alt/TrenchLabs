import React from 'react';

interface GlowBadgeProps {
    children: React.ReactNode;
    variant?: 'accent' | 'neutral' | 'success';
    pulse?: boolean;
    className?: string;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
    children,
    variant = 'accent',
    pulse = true,
    className = '',
}) => {
    const colors = {
        accent: {
            bg: 'rgb(56 189 248 / 0.1)',
            border: 'rgb(56 189 248 / 0.3)',
            text: 'var(--color-accent)',
            dot: '#38bdf8',
        },
        neutral: {
            bg: 'var(--glass-bg)',
            border: 'var(--glass-border)',
            text: 'var(--text-secondary)',
            dot: 'var(--text-muted)',
        },
        success: {
            bg: 'rgb(34 197 94 / 0.1)',
            border: 'rgb(34 197 94 / 0.3)',
            text: '#16a34a',
            dot: '#22c55e',
        },
    }[variant];

    return (
        <span
            className={className}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                border: `1px solid ${colors.border}`,
                background: colors.bg,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: colors.text,
                fontFamily: 'var(--font-sans)',
                animation: pulse ? 'pulse-glow 3s ease-in-out infinite' : undefined,
            }}
        >
            <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: colors.dot,
                flexShrink: 0,
                animation: pulse ? 'pulse-glow 2s ease-in-out infinite' : undefined,
            }} />
            {children}
        </span>
    );
};
export default GlowBadge;
