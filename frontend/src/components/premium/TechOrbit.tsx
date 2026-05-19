import React from 'react';

const ORBIT_ITEMS = [
    { label: 'AI', color: '#38bdf8', delay: '0s' },
    { label: 'Next', color: '#818cf8', delay: '1.5s' },
    { label: 'API', color: '#34d399', delay: '3s' },
    { label: 'DB', color: '#f59e0b', delay: '4.5s' },
    { label: 'ML', color: '#fb7185', delay: '6s' },
];

export const TechOrbit: React.FC<{ size?: number; className?: string }> = ({ size = 200, className = '' }) => {
    const r = size / 2;
    const orbitR = r * 0.72;

    return (
        <div
            className={className}
            style={{ width: size, height: size, position: 'relative', margin: '0 auto' }}
        >
            {/* Center glyph */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: r * 0.55,
                height: r * 0.55,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))',
                boxShadow: 'var(--accent-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
            }}>
                <svg viewBox="0 0 24 24" width={r * 0.28} height={r * 0.28} fill="none" stroke="#0b1220" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>

            {/* Orbit ring */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: orbitR * 2,
                height: orbitR * 2,
                borderRadius: '50%',
                border: '1px dashed var(--glass-border)',
                animation: 'spin 18s linear infinite',
            }}>
                {ORBIT_ITEMS.map((item, i) => {
                    const angle = (i / ORBIT_ITEMS.length) * 360;
                    const rad = (angle * Math.PI) / 180;
                    const x = orbitR + orbitR * Math.cos(rad) - 18;
                    const y = orbitR + orbitR * Math.sin(rad) - 18;
                    return (
                        <div
                            key={item.label}
                            style={{
                                position: 'absolute',
                                left: x,
                                top: y,
                                width: 36,
                                height: 36,
                                borderRadius: '50%',
                                background: `color-mix(in srgb, ${item.color} 18%, white)`,
                                border: `1px solid ${item.color}44`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6rem',
                                fontWeight: 800,
                                color: item.color,
                                animation: 'spin 18s linear infinite reverse',
                                animationDelay: item.delay,
                            }}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to   { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
};
export default TechOrbit;
