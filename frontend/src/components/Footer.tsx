'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { MagneticCTA } from './premium/MagneticCTA';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    const [localTime, setLocalTime] = useState<string>('');
    const location = useLocation();
    const isServiceDetail = location.pathname.startsWith('/services/') && location.pathname !== '/services';

    useEffect(() => {
        const updateClock = () => {
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Karachi',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setLocalTime(new Date().toLocaleTimeString('en-US', options));
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className={styles.footer}>
            <div className={styles.mesh} aria-hidden />
            {!isServiceDetail && (
                <div className={styles.ctaBand}>
                    <div className="container">
                        <h2>Book a short call</h2>
                        <p>15 minutes to pressure-test fit, scope, and the fastest sane path—no deck required.</p>
                        <div className={styles.ctaRow}>
                            <MagneticCTA to="/consultation" className="btn-premium">
                                Book a 15-minute call <ArrowRight size={16} />
                            </MagneticCTA>
                            <Link to="/contact" className={styles.ctaSecondaryBtn} title="Prefer email? One form, no calendar.">
                                Email us
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <Link to="/" className={styles.logo}>
                            <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className={styles.logoIcon}>
                                <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="8" />
                                <path d="M35 50 L50 65 L65 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>TrenchLabs</span>
                        </Link>
                        <p className={styles.tagline}>
                            Web, automation, and UI—built for speed and systems that stay maintainable.
                        </p>
                        <div className={styles.timeBadge}>
                            <span className={styles.timeDot} />
                            <span>Pakistan · {localTime || '—'}</span>
                        </div>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Services</h4>
                        <ul>
                            <li>
                                <Link to="/services/web-development">Web Development</Link>
                            </li>
                            <li>
                                <Link to="/services/ai-automation">AI Automation</Link>
                            </li>
                            <li>
                                <Link to="/services/ui-ux-design">UI/UX</Link>
                            </li>
                            <li>
                                <Link to="/services/e-commerce">E-Commerce</Link>
                            </li>
                            <li>
                                <Link to="/services/wordpress">WordPress</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Navigate</h4>
                        <ul>
                            <li>
                                <Link to="/team">About</Link>
                            </li>
                            <li>
                                <Link to="/blog">Insights</Link>
                            </li>
                            <li>
                                <Link to="/careers">Careers</Link>
                            </li>
                            <li>
                                <Link to="/internship">Internships</Link>
                            </li>
                            <li>
                                <Link to="/privacy">Privacy</Link>
                            </li>
                            <li>
                                <Link to="/terms">Terms</Link>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.linksCol}>
                        <h4 className={styles.title}>Connect</h4>
                        <div className={styles.socials}>
                            <a href="mailto:hello@trenchlabs.com" className={styles.email}>
                                hello@trenchlabs.com
                            </a>
                            <a
                                href="https://wa.me/923000000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.whatsappLink}
                            >
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                                </svg>
                                WhatsApp us
                            </a>
                            <div className={styles.socialIcons}>
                                <a href="https://github.com/trenchlabs" target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                                <a href="https://linkedin.com/company/trenchlabs" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                                <a href="https://twitter.com/trenchlabs" target="_blank" rel="noopener noreferrer">
                                    Twitter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>&copy; {new Date().getFullYear()} TrenchLabs. Crafted for founders who ship.</p>
                    <div className={styles.bottomLinks}>
                        <Link to="/admin" style={{ opacity: 0.35 }}>
                            Admin
                        </Link>
                        <span aria-hidden="true"> · </span>
                        <a href="#root" className={styles.backToTop}>
                            Top ↑
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
