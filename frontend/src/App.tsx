 'use client';
import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';
import { WhatsAppButton } from './components/WhatsAppButton';

import { Home } from './site-pages/Home/Home';
import { Services } from './site-pages/Services/Services';
import { Team } from './site-pages/Team/Team';
import { TeamMemberDetail } from './site-pages/TeamMemberDetail/TeamMemberDetail';
import { Careers } from './site-pages/Careers/Careers';
import { Internship } from './site-pages/Internship/Internship';
import { Contact } from './site-pages/Contact/Contact';
import { Consultation } from './site-pages/Consultation/Consultation';
import { Privacy } from './site-pages/Legal/Privacy';
import { Terms } from './site-pages/Legal/Terms';

gsap.registerPlugin(ScrollTrigger);

const ServiceDetail = lazy(() => import('./site-pages/ServiceDetail/ServiceDetail'));
const CaseStudyDetail = lazy(() => import('./site-pages/CaseStudyDetail/CaseStudyDetail'));
const Blog = lazy(() => import('./site-pages/Blog/Blog'));
const BlogPost = lazy(() => import('./site-pages/BlogPost/BlogPost'));
const Admin = lazy(() => import('./features/admin/Admin'));
const Work = lazy(() => import('./site-pages/Work/Work'));
const Process = lazy(() => import('./site-pages/Process/Process'));

// Scroll Restorator
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, [pathname]);
    return null;
};

// Main Router wrapper to encapsulate Lenis smooth scroll
const AppContent: React.FC = () => {
    useEffect(() => {
        // Initialize Lenis smooth inertia scroll
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false
        });
        (window as any).lenis = lenis;

        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
        requestAnimationFrame(() => ScrollTrigger.refresh());

        return () => {
            lenis.off('scroll', ScrollTrigger.update);
            lenis.destroy();
            delete (window as any).lenis;
        };
    }, []);

    return (
        <>
            <Analytics />
            <ScrollToTop />
            <Navbar />
            <main className="site-main">
                <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading…</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/shopify" element={<Navigate to="/services/e-commerce" replace />} />
                        <Route path="/services/digital-marketing" element={<Navigate to="/services" replace />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/work/:id" element={<CaseStudyDetail />} />
                        <Route path="/process" element={<Process />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/team/:id" element={<TeamMemberDetail />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/internship" element={<Internship />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/consultation" element={<Consultation />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPost />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    );
};

export const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
