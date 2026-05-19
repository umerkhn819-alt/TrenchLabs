import type { Variants } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: easeOut }
    }
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.7, ease: easeOut }
    }
};

export const staggerContainer: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.09, delayChildren: 0.06 }
    }
};

export const viewportOnce = { once: true, amount: 0.15, margin: '-60px' } as const;
