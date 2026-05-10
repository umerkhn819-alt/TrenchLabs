import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Analytics } from './components/Analytics';

import { Home } from './pages/Home/Home';
import { Services } from './pages/Services/Services';
import { Work } from './pages/Work/Work';
import { Team } from './pages/Team/Team';
import { TeamMemberDetail } from './pages/TeamMemberDetail/TeamMemberDetail';
import { Careers } from './pages/Careers/Careers';
import { Internship } from './pages/Internship/Internship';
import { Contact } from './pages/Contact/Contact';
import { Consultation } from './pages/Consultation/Consultation';
import { Privacy } from './pages/Legal/Privacy';
import { Terms } from './pages/Legal/Terms';

const ServiceDetail = lazy(() => import('./pages/ServiceDetail/ServiceDetail'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail/CaseStudyDetail'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
const Admin = lazy(() => import('./features/admin/Admin'));

// Scroll Restorator
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Main Router wrapper to encapsulate Lenis smooth scroll
const AppContent: React.FC = () => {
    useEffect(() => {
        // Initialize Lenis smooth inertia scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom inertia easing
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Analytics />
            <ScrollToTop />
            <Navbar />
            <main>
                <Suspense fallback={<div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading…</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:id" element={<ServiceDetail />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/work/:id" element={<CaseStudyDetail />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/team/:id" element={<TeamMemberDetail />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/internship" element={<Internship />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/consultation" element={<Consultation />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
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
