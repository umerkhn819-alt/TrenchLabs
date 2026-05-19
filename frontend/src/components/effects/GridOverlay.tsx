import React from 'react';

interface GridOverlayProps {
    opacity?: number;
    size?: number;
    variant?: 'dots' | 'lines';
    className?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
    opacity = 0.06,
    size = 28,
    variant = 'dots',
    className = '',
}) => {
    const pattern = variant === 'dots'
        ? `radial-gradient(circle, currentColor 1px, transparent 1px)`
        : `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`;

    return (
        <div
            className={className}
            aria-hidden
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
                backgroundImage: pattern,
                backgroundSize: `${size}px ${size}px`,
                opacity,
                color: 'currentColor',
            }}
        />
    );
};
export default GridOverlay;
