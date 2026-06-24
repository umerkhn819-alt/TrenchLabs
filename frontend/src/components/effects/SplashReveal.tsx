import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './SplashReveal.module.css';

gsap.registerPlugin(ScrollTrigger);

export const SplashReveal: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const splashRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!containerRef.current || !splashRef.current || !logoRef.current || !taglineRef.current) return;

        const ctx = gsap.context(() => {
            // Initial elegant load animation
            const tl = gsap.timeline();
            tl.fromTo(logoRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
            )
                .fromTo(taglineRef.current,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' },
                    "-=0.8"
                );

            // Scroll-driven minimalist reveal without pin to fix lagging
            const scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            // 1. Text fades out smoothly
            scrollTl.to([logoRef.current, taglineRef.current], {
                opacity: 0,
                y: -50,
                duration: 1,
                ease: 'power2.inOut'
            }, 0);

            // 2. The curtain lifts (smooth clip-path)
            scrollTl.to(splashRef.current, {
                yPercent: -50,
                opacity: 0.5,
                duration: 1.5,
                ease: 'power3.inOut'
            }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {/* Minimalist Splash Curtain */}
            <div ref={splashRef} className={styles.splashClip} style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
                <div className={styles.noise} />

                <div className={styles.contentWrap}>
                    <div ref={logoRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 2 }}>
                        <img
                            src="/trenchlabs-logo-transparent.png"
                            alt="TrenchLabs Logo"
                            style={{ height: '190px', width: 'auto' }}
                        />
                        <h1 className={styles.logoText}>
                            TrenchLabs
                        </h1>
                    </div>
                    <p ref={taglineRef} className={styles.tagline} style={{ position: 'relative', zIndex: 2 }}>
                        Engineering digital velocity.
                    </p>
                </div>

                <div className={styles.scrollIndicator}>
                    Scroll
                </div>
            </div>
        </div>
    );
};

export default SplashReveal;
