'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface FloatCardProps {
    children: React.ReactNode;
    className?: string;
    tiltStrength?: number;
    glowOnHover?: boolean;
}

export const FloatCard: React.FC<FloatCardProps> = ({
    children,
    className = '',
    tiltStrength = 8,
    glowOnHover = true,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springConfig = { stiffness: 260, damping: 28 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
            }}
            whileHover={glowOnHover ? { boxShadow: 'var(--accent-glow-sm)' } : {}}
            className={className}
        >
            {children}
        </motion.div>
    );
};
export default FloatCard;
