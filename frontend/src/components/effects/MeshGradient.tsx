'use client';
import React, { useEffect, useRef } from 'react';

interface MeshGradientProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export const MeshGradient: React.FC<MeshGradientProps> = ({ className = '', intensity = 'medium' }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const alpha = intensity === 'high' ? 0.22 : intensity === 'medium' ? 0.14 : 0.08;

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            el.style.setProperty('--mx', `${x}%`);
            el.style.setProperty('--my', `${y}%`);
            el.style.setProperty('--ma', String(alpha));
        };

        document.addEventListener('mousemove', onMove, { passive: true });
        return () => document.removeEventListener('mousemove', onMove);
    }, [intensity]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
            aria-hidden
        >
            {/* Static radial mesh blobs */}
            <div style={{
                position: 'absolute', width: '70%', height: '70%',
                top: '-20%', left: '15%',
                background: 'radial-gradient(ellipse at center, rgb(56 189 248 / 0.12) 0%, transparent 65%)',
                animation: 'floatSlow 12s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', width: '55%', height: '55%',
                bottom: '-15%', right: '-10%',
                background: 'radial-gradient(ellipse at center, rgb(14 165 233 / 0.09) 0%, transparent 60%)',
                animation: 'floatSlow 16s ease-in-out infinite reverse',
            }} />
            <div style={{
                position: 'absolute', width: '40%', height: '40%',
                top: '30%', left: '-5%',
                background: 'radial-gradient(ellipse at center, rgb(99 102 241 / 0.07) 0%, transparent 60%)',
                animation: 'floatSlow 20s ease-in-out infinite',
            }} />
            {/* Mouse-reactive spotlight */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse 420px 360px at var(--mx, 50%) var(--my, 40%), rgb(56 189 248 / var(--ma, 0.1)) 0%, transparent 70%)',
                transition: 'background 0.15s ease',
            }} />
        </div>
    );
};
export default MeshGradient;
