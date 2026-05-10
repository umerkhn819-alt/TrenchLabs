import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticBtnProps {
    children: React.ReactElement;
    range?: number;
    speed?: number;
}

export const MagneticBtn: React.FC<MagneticBtnProps> = ({ children, range = 35, speed = 0.8 }) => {
    const elRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elRef.current;
        if (!element) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const elX = rect.left + rect.width / 2;
            const elY = rect.top + rect.height / 2;
            
            const distanceX = e.clientX - elX;
            const distanceY = e.clientY - elY;
            const distance = Math.hypot(distanceX, distanceY);

            if (distance < range * 2) {
                // Attract element
                gsap.to(element, {
                    x: distanceX * speed,
                    y: distanceY * speed,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                // Snaps back
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [range, speed]);

    return (
        <div ref={elRef} style={{ display: 'inline-block' }}>
            {children}
        </div>
    );
};
export default MagneticBtn;
