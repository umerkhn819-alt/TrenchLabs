import React from 'react';

interface MarqueeItem {
    label: string;
    icon?: React.ReactNode;
}

interface MarqueeBandProps {
    items: MarqueeItem[];
    reverse?: boolean;
    speed?: number;
    className?: string;
}

export const MarqueeBand: React.FC<MarqueeBandProps> = ({ items, reverse = false, speed = 28, className = '' }) => {
    const doubled = [...items, ...items];
    const animName = reverse ? 'marqueeRev' : 'marquee';

    return (
        <div
            className={className}
            style={{ overflow: 'hidden', position: 'relative' }}
            aria-hidden
        >
            <div style={{
                display: 'flex',
                gap: '2.5rem',
                width: 'max-content',
                animation: `${animName} ${speed}s linear infinite`,
            }}>
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.45rem 1.1rem',
                            borderRadius: '999px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--glass-bg)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s',
                            cursor: 'default',
                        }}
                        className="marquee-item"
                    >
                        {item.icon && <span style={{ display: 'flex', alignItems: 'center', opacity: 0.75 }}>{item.icon}</span>}
                        {item.label}
                    </span>
                ))}
            </div>
        </div>
    );
};
export default MarqueeBand;
