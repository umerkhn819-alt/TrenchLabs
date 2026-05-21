import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cinematicUp } from '../../lib/motion';

interface CinematicCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export const CinematicCard: React.FC<CinematicCardProps> = ({ 
    children, 
    delay = 0, 
    className = '', 
    ...props 
}) => {
    return (
        <motion.div
            variants={cinematicUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.1, margin: '0px 0px -50px 0px' }}
            transition={{ delay }}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
};
