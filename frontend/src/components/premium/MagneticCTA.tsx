'use client';

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';

type MagneticCTAProps = {
    to: string;
    className?: string;
    children: React.ReactNode;
};

/** Subtle magnetic pull toward cursor — premium CTA feel. */
export function MagneticCTA({ to, className = '', children }: MagneticCTAProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useSpring(0, { stiffness: 220, damping: 18 });
    const y = useSpring(0, { stiffness: 220, damping: 18 });

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set(dx * 0.12);
        y.set(dy * 0.12);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x, y, display: 'inline-flex' }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
        >
            <Link to={to} className={className}>
                {children}
            </Link>
        </motion.div>
    );
}
