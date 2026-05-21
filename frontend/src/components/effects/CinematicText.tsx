import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cinematicUp } from '../../lib/motion';

interface CinematicTextProps extends HTMLMotionProps<"div"> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    children: React.ReactNode;
    delay?: number;
    staggerDelay?: number;
    className?: string;
}

export const CinematicText: React.FC<CinematicTextProps> = ({ 
    as = 'div', 
    children, 
    delay = 0, 
    staggerDelay,
    className = '', 
    ...props 
}) => {
    const Component = motion[as as keyof typeof motion] as any;
    
    return (
        <Component
            variants={cinematicUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: '0px 0px -50px 0px' }}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </Component>
    );
};
