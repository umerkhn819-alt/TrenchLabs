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

export const viewportOnce = { once: false, amount: 0.1, margin: '0px 0px -50px 0px' } as const;

/* Solid, clean, Apple-like variants */
export const cinematicEase = [0.25, 1, 0.5, 1] as const;

export const cinematicUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: cinematicEase }
    }
};

export const cinematicStagger: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: cinematicEase }
    }
};

export const cinematicViewport = { once: false, amount: 0.1, margin: '0px 0px -50px 0px' } as const;
