import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Monitor, ShoppingBag, Terminal, Cpu, BarChart2, Palette } from 'lucide-react';
import { MagneticCTA } from './premium/MagneticCTA';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 48);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        queueMicrotask(() => {
            setMobileOpen(false);
            setMegaOpen(false);
        });
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const serviceItems = [
        { name: 'Modern Web Development', path: '/services/web-development', desc: 'Fast, accessible products on modern stacks.', icon: Monitor },
        { name: 'AI Automation Systems', path: '/services/ai-automation', desc: 'Agents, workflows, and integrations that save time.', icon: Cpu },
        { name: 'UI/UX Design', path: '/services/ui-ux-design', desc: 'Interfaces that ship, not stall.', icon: Palette },
        { name: 'E-Commerce Solutions', path: '/services/e-commerce', desc: 'Commerce tuned for conversion and speed.', icon: ShoppingBag },
        { name: 'WordPress Development', path: '/services/wordpress', desc: 'Native blocks, secure CMS, lean builds.', icon: Terminal }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav className={`${styles.navOuter} ${scrolled ? styles.navScrolled : ''}`} aria-label="Primary">
                <div className={styles.navInner}>
                    <div className={styles.container}>
                        <Link to="/" className={styles.logo} aria-label="TrenchLabs Home">
                            <img src="/trenchlabs-logo-transparent.png" alt="TrenchLabs Logo" style={{ height: '24px' }} className={styles.logoIcon} />
                            <span>TrenchLabs</span>
                        </Link>

                        <ul className={styles.navLinks}>
                            <li>
                                <Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/services" className={`${styles.navLink} ${location.pathname.startsWith('/services') ? styles.active : ''}`}>
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link to="/team" className={`${styles.navLink} ${location.pathname.startsWith('/team') ? styles.active : ''}`}>
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}>
                                    Insights
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`} aria-label="Contact by email, no calendar">
                                    Contact
                                </Link>
                            </li>
                        </ul>

                        <div className={styles.navActions}>
                            <MagneticCTA to="/consultation" className={`btn-premium ${styles.navCtaBtn}`}>
                                Book a 15-minute call
                            </MagneticCTA>
                            <button
                                type="button"
                                className={styles.hamburger}
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Open menu"
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuActive : ''}`} aria-hidden={!mobileOpen}>
                <div className={styles.mobileTop}>
                    <span className={styles.mobileTitle}>Menu</span>
                    <button type="button" className={styles.mobileClose} onClick={() => setMobileOpen(false)} aria-label="Close menu">
                        <X size={24} />
                    </button>
                </div>
                <ul className={styles.mobileNavLinks}>
                    <li>
                        <Link to="/" onClick={() => setMobileOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/services" onClick={() => setMobileOpen(false)}>
                            Services
                        </Link>
                    </li>
                    <ul className={styles.mobileSubLinks}>
                        {serviceItems.map((item, i) => (
                            <li key={i}>
                                <Link to={item.path} onClick={() => setMobileOpen(false)}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <li>
                        <Link to="/team" onClick={() => setMobileOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" onClick={() => setMobileOpen(false)}>
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={() => setMobileOpen(false)} aria-label="Contact by email, no calendar">
                            Contact
                        </Link>
                    </li>
                </ul>
                <div>
                    <MagneticCTA to="/consultation" className="btn-premium btn-full">
                        Book a 15-minute call
                    </MagneticCTA>
                </div>
            </div>
        </>
    );
};
export default Navbar;
