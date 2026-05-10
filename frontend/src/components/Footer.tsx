import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    const [localTime, setLocalTime] = useState<string>('');

    // Update Live Clock (Pakistan time Asia/Karachi)
    useEffect(() => {
        const updateClock = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Karachi',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            const timeString = new Date().toLocaleTimeString('en-US', options);
            setLocalTime(timeString);
        };
        
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    {/* Brand Info */}
                    <div className={styles.brand}>
                        <Link to="/" className={styles.logo}>
                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className={styles.logoIcon}>
                                <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="8" />
                                <path d="M35 50 L50 65 L65 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>TrenchLabs</span>
                        </Link>
                        <p className={styles.tagline}>We build high-availability digital systems engineered to scale.</p>
                        <div className={styles.timeBadge}>
                            <span className={styles.timeDot}></span>
                            <span>Pakistan Standard Time: {localTime || 'Calculating...'}</span>
                        </div>
                    </div>

                    {/* Column 1: Services */}
                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Services</h4>
                        <ul>
                            <li><Link to="/services/web-development">Web Development</Link></li>
                            <li><Link to="/services/shopify">Shopify Solutions</Link></li>
                            <li><Link to="/services/wordpress">WordPress Theme Dev</Link></li>
                            <li><Link to="/services/ai-automation">AI &amp; Automation</Link></li>
                            <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
                        </ul>
                    </div>

                    {/* Column 2: Company */}
                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Company</h4>
                        <ul>
                            <li><Link to="/team">Meet Our Team</Link></li>
                            <li><Link to="/careers">Join Careers</Link></li>
                            <li><Link to="/internship">Internship Tracks</Link></li>
                            <li><Link to="/blog">Insights / Blog</Link></li>
                            <li><Link to="/consultation">Book Consultation</Link></li>
                            <li><Link to="/admin" style={{ opacity: 0.4, fontStyle: 'italic' }}>Registry Admin</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Connect</h4>
                        <div className={styles.socials}>
                            <a href="mailto:hello@trenchlabs.com" className={styles.email}>hello@trenchlabs.com</a>
                            <div className={styles.socialIcons}>
                                <a href="https://github.com/trenchlabs" target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href="https://linkedin.com/company/trenchlabs" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                <a href="https://twitter.com/trenchlabs" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; 2026 TrenchLabs. All rights reserved. Built with precision and structural elegance.</p>
                    <div className={styles.bottomLinks}>
                        <Link to="/privacy">Privacy</Link>
                        <span aria-hidden="true"> · </span>
                        <Link to="/terms">Terms</Link>
                        <span aria-hidden="true"> · </span>
                        <a href="#root" className={styles.backToTop}>Back to Top &uarr;</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
