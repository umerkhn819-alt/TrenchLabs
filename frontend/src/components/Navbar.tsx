import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, ChevronDown, Monitor, ShoppingBag, Terminal, Cpu, BarChart2 } from 'lucide-react';
import styles from './Navbar.module.css';

function readInitialTheme(): 'dark' | 'light' {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const Navbar: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(readInitialTheme);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [megaOpen, setMegaOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.classList.add('theme-transitioning');
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transitioning');
        }, 300);
    };

    // Monitor Scroll position to shrink header
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
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
        { name: 'Web Development', path: '/services/web-development', desc: 'React, Next.js & modern architectures.', icon: Monitor },
        { name: 'Shopify Solutions', path: '/services/shopify', desc: 'Liquid, Headless setups, and CRO integrations.', icon: ShoppingBag },
        { name: 'WordPress Dev', path: '/services/wordpress', desc: 'High-speed Gutenberg and custom configurations.', icon: Terminal },
        { name: 'AI Automation', path: '/services/ai-automation', desc: 'LLM agents, scraper APIs, and zap pipelines.', icon: Cpu },
        { name: 'Digital Marketing', path: '/services/digital-marketing', desc: 'Conversion rate models & campaign metrics.', icon: BarChart2 }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <nav className={`${styles.navbar} ${scrolled ? styles.shrink : ''}`}>
                <div className={styles.container}>
                    {/* Logo Section */}
                    <Link to="/" className={styles.logo} aria-label="TrenchLabs Home">
                        <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className={styles.logoIcon}>
                            <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="8" />
                            <path d="M35 50 L50 65 L65 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>TrenchLabs</span>
                    </Link>

                    {/* Navigation Desktop Links */}
                    <ul className={styles.navLinks}>
                        <li><Link to="/" className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}>Home</Link></li>
                        
                        {/* Services Link with Mega Menu Panel */}
                        <li 
                            className={styles.megaLi}
                            onMouseEnter={() => setMegaOpen(true)}
                            onMouseLeave={() => setMegaOpen(false)}
                        >
                            <button className={`${styles.navLink} ${styles.megaBtn} ${location.pathname.startsWith('/services') ? styles.active : ''}`}>
                                Services <ChevronDown size={14} className={`${styles.chevron} ${megaOpen ? styles.rotate : ''}`} />
                            </button>
                            {megaOpen && (
                                <div className={styles.megaMenu}>
                                    <div className={styles.megaGrid}>
                                        <div className={styles.megaLeft}>
                                            <h4>Our Capabilities</h4>
                                            <p>We build production-ready digital systems engineered for long-term growth.</p>
                                            <Link to="/services" className={styles.viewAll}>View All Services &rarr;</Link>
                                        </div>
                                        <div className={styles.megaRight}>
                                            {serviceItems.map((item, i) => {
                                                const Icon = item.icon;
                                                return (
                                                    <Link key={i} to={item.path} className={styles.megaItem}>
                                                        <div className={styles.megaIcon}><Icon size={18} /></div>
                                                        <div className={styles.megaText}>
                                                            <h5>{item.name}</h5>
                                                            <p>{item.desc}</p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>

                        <li><Link to="/work" className={`${styles.navLink} ${location.pathname.startsWith('/work') ? styles.active : ''}`}>Work</Link></li>
                        <li><Link to="/team" className={`${styles.navLink} ${location.pathname.startsWith('/team') ? styles.active : ''}`}>Team</Link></li>
                        <li><Link to="/careers" className={`${styles.navLink} ${isActive('/careers') ? styles.active : ''}`}>Careers</Link></li>
                        <li><Link to="/internship" className={`${styles.navLink} ${isActive('/internship') ? styles.active : ''}`}>Internships</Link></li>
                        <li><Link to="/blog" className={`${styles.navLink} ${isActive('/blog') ? styles.active : ''}`}>Insights</Link></li>
                        <li><Link to="/contact" className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}>Contact</Link></li>
                    </ul>

                    {/* Actions and Theme Toggles */}
                    <div className={styles.navActions}>
                        <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle theme mode">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <Link to="/consultation" className="btn btn-primary btn-sm">Start Project</Link>

                        {/* Hamburger toggle */}
                        <button 
                            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerActive : ''}`} 
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Panel Overlay */}
            <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuActive : ''}`}>
                <ul className={styles.mobileNavLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <ul className={styles.mobileSubLinks}>
                        {serviceItems.map((item, i) => (
                            <li key={i}><Link to={item.path}>{item.name}</Link></li>
                        ))}
                    </ul>
                    <li><Link to="/work">Work</Link></li>
                    <li><Link to="/team">Team</Link></li>
                    <li><Link to="/careers">Careers</Link></li>
                    <li><Link to="/internship">Internships</Link></li>
                    <li><Link to="/blog">Insights</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
                <div className={styles.mobileMenuFooter}>
                    <Link to="/consultation" className="btn btn-primary btn-full">Book Consultation</Link>
                </div>
            </div>
        </>
    );
};
export default Navbar;
