'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
    value: number;
    suffix?: string;
    label: string;
    duration?: number;
    className?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
    value,
    suffix = '',
    label,
    duration = 1.8,
    className = '',
}) => {
    const numRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if (!numRef.current || !containerRef.current || animated) return;
        const obj = { val: 0 };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top 88%',
            onEnter: () => {
                if (animated) return;
                setAnimated(true);
                gsap.to(obj, {
                    val: value,
                    duration,
                    ease: 'power3.out',
                    onUpdate: () => {
                        if (numRef.current) {
                            numRef.current.textContent = Math.round(obj.val).toString();
                        }
                    },
                });
            },
        });

        return () => trigger.kill();
    }, [value, duration, animated]);

    return (
        <div ref={containerRef} className={className} style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.1em', lineHeight: 1 }}>
                <span
                    ref={numRef}
                    style={{
                        fontFamily: 'var(--font-display), ui-serif, Georgia, serif',
                        fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                        fontWeight: 400,
                        color: 'var(--color-foreground)',
                    }}
                >
                    0
                </span>
                {suffix && (
                    <span style={{
                        fontFamily: 'var(--font-display), ui-serif, Georgia, serif',
                        fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                        fontWeight: 400,
                        color: 'var(--text-muted)',
                    }}>
                        {suffix}
                    </span>
                )}
            </div>
            <p style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginTop: '0.6rem',
            }}>
                {label}
            </p>
        </div>
    );
};
export default StatCounter;
