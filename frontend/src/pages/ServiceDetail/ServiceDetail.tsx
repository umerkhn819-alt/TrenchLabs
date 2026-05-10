import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, HelpCircle, ArrowLeft, Send } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { getServiceDetail } from '../../content/services';
import { SERVICE_ICONS } from '../../content/serviceIcons';
import styles from './ServiceDetail.module.css';

export const ServiceDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
    const [isSeatBooked, setIsSeatBooked] = useState(false);

    const [cartCount, setCartCount] = useState(0);
    const [selectedColor, setSelectedColor] = useState<'charcoal' | 'crimson'>('charcoal');

    const [selectedSpecialist, setSelectedSpecialist] = useState('General Practitioner');
    const [bookingDate, setBookingDate] = useState('2026-05-15');
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
        { sender: 'bot', text: 'Hello! I am AssistFlow. Ask me to optimize your system workflows.' }
    ]);
    const [chatInput, setChatInput] = useState('');

    const [adBudget, setAdBudget] = useState(5000);

    const srv = getServiceDetail(id);
    const routeKey = srv.id;
    const ServiceIcon = SERVICE_ICONS[srv.icon];

    // Chat Simulation triggers
    const handleSendChat = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = chatInput;
        setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
        setChatInput('');

        setTimeout(() => {
            let replyText = "I have processed your request. Let's build a secure automation node for this workflow.";
            if (userMsg.toLowerCase().includes('optimize')) {
                replyText = 'Analyzing database schema... Optimizing indices and caching. Latency reduced by 35%!';
            } else if (userMsg.toLowerCase().includes('lead')) {
                replyText = 'Scraping target networks completed. Compiled 150 validated business records with email channels.';
            } else if (userMsg.toLowerCase().includes('zapier') || userMsg.toLowerCase().includes('automation')) {
                replyText = 'Configured dynamic triggers: incoming CRM events automatically generate PDF contracts and alert Slack channels.';
            }
            setChatHistory(prev => [...prev, { sender: 'bot', text: replyText }]);
        }, 1000);
    };

    const triggerPrompt = (prompt: string) => {
        setChatInput(prompt);
        // Timeout to simulate user submitting immediately
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: 'user', text: prompt }]);
            setTimeout(() => {
                let reply = '';
                if (prompt.includes('CRM')) reply = 'System connected: Salesforce triggers are now mapped to automate invoice PDFs.';
                if (prompt.includes('Leads')) reply = 'Automation complete: Leads fetched, verified via API, and added to outreach pipeline.';
                if (prompt.includes('Pipeline')) reply = 'Analytics setup: Automated trigger reports are mapped directly to your analytics console.';
                setChatHistory(prev => [...prev, { sender: 'bot', text: reply }]);
            }, 800);
        }, 100);
    };

    return (
        <Transitions>
            <Seo title={srv.name} description={srv.tagline} path={`/services/${routeKey}`} />
            {/* 1. CINEMATIC HERO */}
            <header className={styles.hero} style={{ '--theme-color': srv.color } as React.CSSProperties}>
                <div className="ambient-glow glow-1" style={{ background: `${srv.color}15` }}></div>
                <div className="container">
                    <Link to="/services" className={styles.backLink}><ArrowLeft size={16} /> Back to Services</Link>
                    <div className={styles.heroContent}>
                        <div className={styles.iconBox} style={{ color: srv.color, backgroundColor: `${srv.color}12` }}>
                            <ServiceIcon size={32} />
                        </div>
                        <h1 className="gradient-text">{srv.name}</h1>
                        <p className={styles.tagline}>{srv.tagline}</p>
                        <p className={styles.desc}>{srv.desc}</p>
                    </div>
                </div>
            </header>

            {/* 2. LIVE INTERACTIVE SYSTEM MOCKUP */}
            <section className={styles.demoSection}>
                <div className="container">
                    <div className={styles.demoHeader}>
                        <span className="section-tagline">Sandbox Simulation</span>
                        <h2 className="section-title">Interactive Platform Preview</h2>
                        <p className="section-desc">Test real-time user-flow simulations representing the visual custom systems we build under this track.</p>
                    </div>

                    <div className={styles.demoWorkspace}>
                        {routeKey === 'web-development' && (
                            <div className={styles.nexaApp}>
                                <div className={styles.appHeader}>
                                    <div className={styles.appDots}><span /><span /><span /></div>
                                    <span>Nexa Restaurant Booking System — Live Preview</span>
                                </div>
                                <div className={styles.nexaGrid}>
                                    <div className={styles.bookingCard}>
                                        <h4>Reserve Table</h4>
                                        <p>Click a physical seat in the dining layout to test our booking handler.</p>
                                        <div className={styles.formGroup}>
                                            <label>Select Date</label>
                                            <input type="date" defaultValue="2026-05-12" />
                                        </div>
                                        <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                                            <label>Guests</label>
                                            <select defaultValue="2">
                                                <option>1 Person</option>
                                                <option>2 People</option>
                                                <option>4 People</option>
                                                <option>6+ People</option>
                                            </select>
                                        </div>
                                        {selectedSeat && (
                                            <button onClick={() => setIsSeatBooked(true)} className="btn btn-primary btn-full" style={{ marginTop: '1.5rem', backgroundColor: srv.color }}>
                                                {isSeatBooked ? 'Reservation Confirmed!' : `Confirm Table #${selectedSeat}`}
                                            </button>
                                        )}
                                        {isSeatBooked && (
                                            <div className={styles.bookingStatus}>
                                                <CheckCircle size={14} /> Registered in Postgres local ledger.
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.layoutMap}>
                                        <h4>Dining Layout</h4>
                                        <div className={styles.seatingGrid}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((seat) => (
                                                <button
                                                    key={seat}
                                                    onClick={() => { setSelectedSeat(seat); setIsSeatBooked(false); }}
                                                    className={`${styles.seat} ${selectedSeat === seat ? styles.seatSelected : ''} ${isSeatBooked && selectedSeat === seat ? styles.seatBooked : ''}`}
                                                    style={{ '--theme': srv.color } as React.CSSProperties}
                                                >
                                                    T#{seat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {routeKey === 'shopify' && (
                            <div className={styles.veloraApp}>
                                <div className={styles.appHeader}>
                                    <div className={styles.appDots}><span /><span /><span /></div>
                                    <span>Velora Premium checkout — Shopify custom simulation</span>
                                </div>
                                <div className={styles.storeContainer}>
                                    <div className={styles.productLayout}>
                                        <div className={styles.productImage} style={{ backgroundColor: selectedColor === 'charcoal' ? '#1c1c1e' : '#7f1d1d' }}>
                                            <span>Premium Wool Jacket</span>
                                        </div>
                                        <div className={styles.productDetails}>
                                            <h3>Velora Core Overcoat</h3>
                                            <span className={styles.price}>$249.00 USD</span>
                                            <p>Custom woven heavyweight fabric with double-stitched canvas borders.</p>
                                            
                                            <div className={styles.optionGroup}>
                                                <label>Color</label>
                                                <div className={styles.colors}>
                                                    <button onClick={() => setSelectedColor('charcoal')} className={`${styles.colorBtn} ${selectedColor === 'charcoal' ? styles.colorBtnActive : ''}`} style={{ backgroundColor: '#1c1c1e' }} aria-label="Charcoal variation"></button>
                                                    <button onClick={() => setSelectedColor('crimson')} className={`${styles.colorBtn} ${selectedColor === 'crimson' ? styles.colorBtnActive : ''}`} style={{ backgroundColor: '#7f1d1d' }} aria-label="Crimson variation"></button>
                                                </div>
                                            </div>

                                            <button onClick={() => setCartCount(prev => prev + 1)} className="btn btn-primary btn-full" style={{ backgroundColor: srv.color, marginTop: '2rem' }}>
                                                Add to Cart (Liquid Async)
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.cartDrawer}>
                                        <h4>Shopping Bag</h4>
                                        <div className={styles.cartCountBadge}>Items: {cartCount}</div>
                                        {cartCount > 0 ? (
                                            <div className={styles.cartItems}>
                                                <div className={styles.cartItem}>
                                                    <span>Velora Overcoat ({selectedColor})</span>
                                                    <span>x{cartCount}</span>
                                                </div>
                                                <div className={styles.cartTotal}>
                                                    <strong>Total:</strong>
                                                    <strong>${(249 * cartCount).toFixed(2)} USD</strong>
                                                </div>
                                                <button onClick={() => alert('Dynamic cart checkout successfully triggered!')} className="btn btn-primary btn-full btn-sm" style={{ backgroundColor: srv.color, marginTop: '1rem' }}>Checkout Flow</button>
                                            </div>
                                        ) : (
                                            <p className={styles.emptyCart}>Your shopping bag is currently empty.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {routeKey === 'wordpress' && (
                            <div className={styles.medicaApp}>
                                <div className={styles.appHeader}>
                                    <div className={styles.appDots}><span /><span /><span /></div>
                                    <span>Medica Clinic Portal — Gutemberg Block Architecture</span>
                                </div>
                                <div className={styles.medicaBooking}>
                                    <div className={styles.appointmentForm}>
                                        <h4>HIPAA Appoinment Scheduler</h4>
                                        <p>Secure CMS-driven clinical appointment dashboard.</p>
                                        
                                        <div className={styles.formGroup} style={{ marginTop: '1.5rem' }}>
                                            <label>Medical Practitioner</label>
                                            <select value={selectedSpecialist} onChange={(e) => { setSelectedSpecialist(e.target.value); setBookingSuccess(false); }}>
                                                <option>General Practitioner</option>
                                                <option>Cardiology Associate</option>
                                                <option>Dermatology Specialist</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                                            <label>Select Date</label>
                                            <input type="date" value={bookingDate} onChange={(e) => { setBookingDate(e.target.value); setBookingSuccess(false); }} />
                                        </div>

                                        <button onClick={() => setBookingSuccess(true)} className="btn btn-primary btn-full" style={{ backgroundColor: srv.color, marginTop: '2rem' }}>
                                            {bookingSuccess ? 'Booking Complete!' : 'Register Appointment'}
                                        </button>
                                    </div>

                                    <div className={styles.medicalReport}>
                                        <h4>Live Clinic Queue</h4>
                                        <div className={styles.recordsTable}>
                                            <div className={styles.recordHeader}>
                                                <span>Doctor</span>
                                                <span>Date</span>
                                                <span>Status</span>
                                            </div>
                                            <div className={styles.recordRow}>
                                                <span>Dr. Allison Hunt</span>
                                                <span>2026-05-12</span>
                                                <span className={styles.recordBadge}>In Queue</span>
                                            </div>
                                            {bookingSuccess && (
                                                <div className={styles.recordRow} style={{ animation: 'fadeEntry 0.5s ease' }}>
                                                    <span>{selectedSpecialist}</span>
                                                    <span>{bookingDate}</span>
                                                    <span className={styles.recordBadgeActive}>Confirmed</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {routeKey === 'ai-automation' && (
                            <div className={styles.aiApp}>
                                <div className={styles.appHeader}>
                                    <div className={styles.appDots}><span /><span /><span /></div>
                                    <span>AssistFlow Custom AI Pipeline — Dynamic Sandbox</span>
                                </div>
                                <div className={styles.aiChatContainer}>
                                    <div className={styles.promptHelper}>
                                        <h5>Suggested Prompts</h5>
                                        <button onClick={() => triggerPrompt('Optimize CRM systems')} className={styles.promptBtn}>Optimize CRM</button>
                                        <button onClick={() => triggerPrompt('Fetch B2B Leads')} className={styles.promptBtn}>Fetch Leads</button>
                                        <button onClick={() => triggerPrompt('Setup Pipeline trigger')} className={styles.promptBtn}>Setup Pipeline</button>
                                    </div>
                                    <div className={styles.chatArea}>
                                        <div className={styles.messages}>
                                            {chatHistory.map((chat, idx) => (
                                                <div key={idx} className={`${styles.message} ${chat.sender === 'user' ? styles.msgUser : styles.msgBot}`}>
                                                    <p>{chat.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <form onSubmit={handleSendChat} className={styles.chatInputRow}>
                                            <input
                                                type="text"
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                                placeholder="Ask assistflow to scrape, sync, or trigger..."
                                            />
                                            <button type="submit" className={styles.sendBtn} style={{ backgroundColor: srv.color }}><Send size={14} /></button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {routeKey === 'digital-marketing' && (
                            <div className={styles.marketingApp}>
                                <div className={styles.appHeader}>
                                    <div className={styles.appDots}><span /><span /><span /></div>
                                    <span>GrowthPulse Custom Analytics Campaign Simulator</span>
                                </div>
                                <div className={styles.metricsWorkspace}>
                                    <div className={styles.inputRangeCard}>
                                        <h4>Ad Budget Scaling</h4>
                                        <p>Adjust monthly spending to see our SEO/SEM projections.</p>
                                        <div className={styles.sliderGroup}>
                                            <label>Ad Spend: ${(adBudget).toLocaleString()} USD</label>
                                            <input
                                                type="range"
                                                min="1000"
                                                max="50000"
                                                step="1000"
                                                value={adBudget}
                                                onChange={(e) => setAdBudget(Number(e.target.value))}
                                            />
                                        </div>
                                        <div className={styles.forecastInfo}>
                                            <span>Organic Multipliers: {(adBudget / 4000).toFixed(1)}x Lift</span>
                                        </div>
                                    </div>
                                    <div className={styles.metricsDisplays}>
                                        <div className={styles.metricCard}>
                                            <h5>Expected Monthly Visits</h5>
                                            <h3>{Math.round(adBudget * 1.85).toLocaleString()}</h3>
                                        </div>
                                        <div className={styles.metricCard}>
                                            <h5>ROAS Projection</h5>
                                            <h3 style={{ color: srv.color }}>{((adBudget * 4.2) / adBudget).toFixed(1)}x ROI</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. DETAILED PRODUCTION PROCESS */}
            <section className={styles.processSection}>
                <div className="container">
                    <span className="section-tagline">Timeline</span>
                    <h2 className="section-title">Delivery Workflow</h2>
                    <div className={styles.processGrid}>
                        {srv.process.map((p, idx) => (
                            <div key={idx} className={styles.processCard}>
                                <div className={styles.stepNum} style={{ color: srv.color }}>{p.step}</div>
                                <h3>{p.title}</h3>
                                <p>{p.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TECHNICAL FAQS */}
            <section className={styles.faqSection}>
                <div className="container">
                    <span className="section-tagline">FAQ</span>
                    <h2 className="section-title">Technical Support</h2>
                    <div className={styles.faqGrid}>
                        {srv.faqs.map((faq, idx) => (
                            <div key={idx} className={styles.faqCard}>
                                <div className={styles.faqIcon}><HelpCircle size={18} /></div>
                                <div className={styles.faqText}>
                                    <h4>{faq.q}</h4>
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SERVICE FOOTER CTA */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaCard} style={{ borderLeftColor: srv.color }}>
                        <h2>Deploy This Specialized Track</h2>
                        <p>Let's schedule a deep-dive call with our engineers to outline custom requirements for your startup.</p>
                        <Link to="/consultation" className="btn btn-primary" style={{ backgroundColor: srv.color }}>Book Consultation</Link>
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default ServiceDetail;
