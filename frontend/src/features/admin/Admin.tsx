import React, { useState, useEffect } from 'react';
import { 
    Users, 
    FileText, 
    Calendar, 
    Activity, 
    Terminal, 
    MessageSquare, 
    Check, 
    AlertCircle, 
    ArrowRight,
    Lock,
    Search,
    Sliders
} from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import type { 
    ContactSubmission, 
    CareersApplication, 
    InternshipApplication, 
    ConsultationBooking,
    TelemetryLog
} from '../../models/types';
import styles from './Admin.module.css';

type ReplyTarget = {
    table: string;
    item: ContactSubmission | CareersApplication | InternshipApplication | ConsultationBooking;
};

/** Loose row shape for the unified registry table (varies by active tab). */
type AdminRow = {
    id: string;
    created_at: string;
    status: string;
    name?: string;
    company?: string;
    email?: string;
    contact?: string;
    message?: string;
    role?: string;
    github?: string;
    compensation?: string;
    experience?: string;
    track?: string;
    university?: string;
    statement?: string;
    date?: string;
    time?: string;
    meeting_link?: string;
    response_text?: string;
};

export const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => AppController.isAuthenticated());
    const [authPass, setAuthPass] = useState('');
    const [authError, setAuthError] = useState('');

    // Tab state
    const [activeTab, setActiveTab] = useState<'contacts' | 'careers' | 'interns' | 'bookings'>('contacts');

    // Data lists
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [careers, setCareers] = useState<CareersApplication[]>([]);
    const [interns, setInterns] = useState<InternshipApplication[]>([]);
    const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
    const [logs, setLogs] = useState<TelemetryLog[]>([]);

    // Search & Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');

    // Reply Modal States
    const [replyingTo, setReplyingTo] = useState<ReplyTarget | null>(null);
    const [replyText, setReplyText] = useState('');

    // Load entire database on mount and login
    const fetchDatabase = async () => {
        try {
            const [contactsData, careersData, internsData, bookingsData, logsData] = await Promise.all([
                AppController.getContacts(),
                AppController.getCareersApplications(),
                AppController.getInternshipApplications(),
                AppController.getConsultationBookings(),
                AppController.getTelemetryLogs()
            ]);
            setContacts(contactsData);
            setCareers(careersData);
            setInterns(internsData);
            setBookings(bookingsData);
            setLogs(logsData);
        } catch (error) {
            console.error('Failed to resolve data records:', error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        queueMicrotask(() => {
            void fetchDatabase();
        });
        const handleLogsUpdate = () => {
            void AppController.getTelemetryLogs().then(setLogs);
        };
        window.addEventListener('trench_log_update', handleLogsUpdate);
        return () => window.removeEventListener('trench_log_update', handleLogsUpdate);
    }, [isAuthenticated]);

    // Secure admin verification gatekeeper callback
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        const result = await AppController.loginAdmin(authPass);
        if (result.ok) {
            setIsAuthenticated(true);
            setAuthPass('');
        } else {
            setAuthError(result.errorMessage || 'Access denied. Invalid administrator credentials.');
        }
    };

    // Controller Updates
    const handleStatusUpdate = async (table: string, id: string, newStatus: string) => {
        try {
            if (table === 'contact_submissions') {
                await AppController.replyToContact(id, 'Marked processed');
            } else if (table === 'careers_applications') {
                await AppController.updateCareersStatus(id, newStatus as CareersApplication['status']);
            } else if (table === 'internship_applications') {
                await AppController.updateInternshipStatus(id, newStatus as InternshipApplication['status']);
            } else if (table === 'consultation_bookings') {
                await AppController.updateBookingStatus(id, newStatus as ConsultationBooking['status']);
            }
            fetchDatabase();
        } catch (err) {
            console.error(err);
        }
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyingTo || !replyText.trim()) return;

        const { table, item } = replyingTo;
        try {
            if (table === 'contacts') {
                await AppController.replyToContact(item.id, replyText);
            } else if (table === 'careers') {
                await AppController.replyToCareers(item.id, replyText);
            } else if (table === 'interns') {
                await AppController.replyToInternship(item.id, replyText);
            }
            setReplyText('');
            setReplyingTo(null);
            fetchDatabase();
        } catch (err) {
            console.error(err);
        }
    };

    // Filtering mechanics
    const getFilteredData = () => {
        const query = searchTerm.toLowerCase();
        if (activeTab === 'contacts') {
            return contacts.filter(item => 
                (statusFilter === 'ALL' || item.status === statusFilter) &&
                (item.name.toLowerCase().includes(query) || item.message.toLowerCase().includes(query) || item.email.toLowerCase().includes(query))
            );
        } else if (activeTab === 'careers') {
            return careers.filter(item => 
                (statusFilter === 'ALL' || item.status === statusFilter) &&
                (item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query) || item.experience.toLowerCase().includes(query))
            );
        } else if (activeTab === 'interns') {
            return interns.filter(item => 
                (statusFilter === 'ALL' || item.status === statusFilter) &&
                (item.name.toLowerCase().includes(query) || item.track.toLowerCase().includes(query) || item.university.toLowerCase().includes(query))
            );
        } else {
            return bookings.filter(item => 
                (statusFilter === 'ALL' || item.status === statusFilter) &&
                (item.company.toLowerCase().includes(query) || item.contact.toLowerCase().includes(query) || item.email.toLowerCase().includes(query))
            );
        }
    };

    // Login Gate View
    if (!isAuthenticated) {
        return (
            <Transitions>
                <Seo title="Admin" description="TrenchLabs internal registry console." path="/admin" />
                <div className={styles.gateHero}>
                    <div className="ambient-glow glow-1"></div>
                    <div className={styles.gateCard}>
                        <div className={styles.gateIcon}><Lock size={32} /></div>
                        <h2>TrenchLabs Registry Admin</h2>
                        <p>Authenticate with your administrator license to access server channels.</p>
                        
                        <form onSubmit={handleLoginSubmit} className={styles.gateForm}>
                            <div className="form-group">
                                <label>Administrator password</label>
                                <input 
                                    type="password" 
                                    required 
                                    value={authPass}
                                    onChange={(e) => setAuthPass(e.target.value)}
                                    placeholder="Enter authorization credentials..." 
                                />
                            </div>
                            {authError && <p className={styles.errorText}><AlertCircle size={14} />{authError}</p>}
                            <button type="submit" className="btn btn-primary btn-full">Unlock Registry Channel</button>
                        </form>
                    </div>
                </div>
            </Transitions>
        );
    }

    const filteredList = getFilteredData() as AdminRow[];

    return (
        <Transitions>
            <Seo title="Admin Dashboard" description="TrenchLabs submissions and operations." path="/admin" />
            <section className={styles.dashboard}>
                <div className="ambient-glow glow-1" style={{ top: '-10%', left: '10%' }}></div>
                <div className="container-fluid" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
                    
                    {/* ADMIN HEADER */}
                    <header className={styles.header}>
                        <div>
                            <span className="section-tagline">Registry Management Console</span>
                            <h1 className="gradient-text">Core Insights &amp; Operations</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <button 
                                onClick={() => { AppController.logoutAdmin(); setIsAuthenticated(false); }}
                                className="btn btn-secondary"
                                style={{ padding: '0.4rem 1.2rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                            >
                                Disconnect Session
                            </button>
                            <div className={styles.systemStatus}>
                                <div className={styles.statusBlink}></div>
                                <span>Cloud Gateway: Connected</span>
                            </div>
                        </div>
                    </header>

                    {/* METRICS ROW */}
                    <section className={styles.metricsGrid}>
                        <div className={styles.metricCard}>
                            <div className={styles.cardInfo}>
                                <span>Total Submissions</span>
                                <h3>{contacts.length + careers.length + interns.length + bookings.length}</h3>
                            </div>
                            <div className={styles.cardVisual}><FileText size={24} /></div>
                        </div>
                        <div className={styles.metricCard}>
                            <div className={styles.cardInfo}>
                                <span>Job Applicants</span>
                                <h3>{careers.length}</h3>
                            </div>
                            <div className={styles.cardVisual}><Users size={24} /></div>
                        </div>
                        <div className={styles.metricCard}>
                            <div className={styles.cardInfo}>
                                <span>Academy Trainees</span>
                                <h3>{interns.length}</h3>
                            </div>
                            <div className={styles.cardVisual}><Sliders size={24} /></div>
                        </div>
                        <div className={styles.metricCard}>
                            <div className={styles.cardInfo}>
                                <span>Synced Bookings</span>
                                <h3>{bookings.length}</h3>
                            </div>
                            <div className={styles.cardVisual}><Calendar size={24} /></div>
                        </div>
                    </section>

                    {/* TWO COLUMN CONTENT VIEW */}
                    <div className={styles.viewLayout}>
                        
                        {/* LEFT COLUMN: REGISTRY & DATABASE TABULATOR */}
                        <div className={styles.mainPane}>
                            
                            {/* DATA FILTER BAR */}
                            <div className={styles.filterBar}>
                                <div className={styles.tabs}>
                                    <button 
                                        onClick={() => { setActiveTab('contacts'); setStatusFilter('ALL'); }}
                                        className={`${styles.tabBtn} ${activeTab === 'contacts' ? styles.activeTab : ''}`}
                                    >
                                        <MessageSquare size={16} /> Contacts ({contacts.length})
                                    </button>
                                    <button 
                                        onClick={() => { setActiveTab('careers'); setStatusFilter('ALL'); }}
                                        className={`${styles.tabBtn} ${activeTab === 'careers' ? styles.activeTab : ''}`}
                                    >
                                        <Users size={16} /> Careers ({careers.length})
                                    </button>
                                    <button 
                                        onClick={() => { setActiveTab('interns'); setStatusFilter('ALL'); }}
                                        className={`${styles.tabBtn} ${activeTab === 'interns' ? styles.activeTab : ''}`}
                                    >
                                        <Sliders size={16} /> Academy ({interns.length})
                                    </button>
                                    <button 
                                        onClick={() => { setActiveTab('bookings'); setStatusFilter('ALL'); }}
                                        className={`${styles.tabBtn} ${activeTab === 'bookings' ? styles.activeTab : ''}`}
                                    >
                                        <Calendar size={16} /> Syncs ({bookings.length})
                                    </button>
                                </div>

                                <div className={styles.controls}>
                                    <div className={styles.search}>
                                        <Search size={14} />
                                        <input 
                                            type="text" 
                                            placeholder="Search entries..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.filter}>
                                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                            <option value="ALL">All Status</option>
                                            {activeTab === 'contacts' && (
                                                <>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Responded">Responded</option>
                                                </>
                                            )}
                                            {activeTab === 'careers' && (
                                                <>
                                                    <option value="Under Review">Under Review</option>
                                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Rejected">Rejected</option>
                                                </>
                                            )}
                                            {activeTab === 'interns' && (
                                                <>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                                    <option value="Accepted">Accepted</option>
                                                    <option value="Rejected">Rejected</option>
                                                </>
                                            )}
                                            {activeTab === 'bookings' && (
                                                <>
                                                    <option value="Scheduled">Scheduled</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* REGISTRY ROWS LIST */}
                            <div className={styles.rowsContainer}>
                                {filteredList.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <AlertCircle size={32} />
                                        <h3>No Records Found</h3>
                                        <p>No transactions match your filtering constraints.</p>
                                    </div>
                                ) : (
                                    filteredList.map((item: AdminRow) => (
                                        <div key={item.id} className={styles.registryCard}>
                                            <div className={styles.rowHeader}>
                                                <div>
                                                    <h4 className={styles.rowTitle}>{item.name || item.company}</h4>
                                                    <span className={styles.rowSubtitle}>{item.email || item.contact}</span>
                                                </div>
                                                <div className={styles.badgeGroup}>
                                                    <span className={`${styles.badge} ${
                                                        item.status === 'Responded' || item.status === 'Accepted' || item.status === 'Completed' || item.status === 'Scheduled' ? styles.badgeSuccess : 
                                                        item.status === 'Pending' || item.status === 'Under Review' ? styles.badgeWarning : 
                                                        item.status === 'Interview Scheduled' ? styles.badgeInfo : 
                                                        styles.badgeDanger
                                                    }`}>
                                                        {item.status}
                                                    </span>
                                                    <span className={styles.rowTime}>{new Date(item.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            {/* BODY RENDERERS BASED ON THE CURRENT TAB */}
                                            <div className={styles.rowBody}>
                                                {activeTab === 'contacts' && (
                                                    <p className={styles.rowText}>&ldquo;{item.message}&rdquo;</p>
                                                )}
                                                {activeTab === 'careers' && (
                                                    <div className={styles.metaSplit}>
                                                        <p><strong>Role applied:</strong> {item.role}</p>
                                                        <p><strong>GitHub Profile:</strong> <a href={item.github} target="_blank" rel="noreferrer">{item.github}</a></p>
                                                        <p><strong>Proposed Budget:</strong> {item.compensation}</p>
                                                        <p className={styles.rowText}><strong>Experience Profile:</strong> &ldquo;{item.experience}&rdquo;</p>
                                                    </div>
                                                )}
                                                {activeTab === 'interns' && (
                                                    <div className={styles.metaSplit}>
                                                        <p><strong>Selected Syllabus:</strong> {item.track}</p>
                                                        <p><strong>University:</strong> {item.university}</p>
                                                        <p><strong>GitHub:</strong> <a href={item.github} target="_blank" rel="noreferrer">{item.github}</a></p>
                                                        <p className={styles.rowText}><strong>Motivation details:</strong> &ldquo;{item.statement}&rdquo;</p>
                                                    </div>
                                                )}
                                                {activeTab === 'bookings' && (
                                                    <div className={styles.metaSplit}>
                                                        <p><strong>Meeting Schedule:</strong> {item.date} at {item.time}</p>
                                                        <p><strong>Google Meet room link:</strong> <a href={item.meeting_link} target="_blank" rel="noreferrer">{item.meeting_link}</a></p>
                                                    </div>
                                                )}

                                                {/* Response display */}
                                                {item.response_text && (
                                                    <div className={styles.responseDisplayBox}>
                                                        <span>System Response:</span>
                                                        <p>{item.response_text}</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* ACTIONS TOOLBAR */}
                                            <div className={styles.rowFooter}>
                                                <div className={styles.statusToggler}>
                                                    <span>Update State:</span>
                                                    {activeTab === 'careers' && (
                                                        <select 
                                                            value={item.status} 
                                                            onChange={(e) => handleStatusUpdate('careers_applications', item.id, e.target.value)}
                                                        >
                                                            <option value="Under Review">Under Review</option>
                                                            <option value="Interview Scheduled">Interview Scheduled</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    )}
                                                    {activeTab === 'interns' && (
                                                        <select 
                                                            value={item.status} 
                                                            onChange={(e) => handleStatusUpdate('internship_applications', item.id, e.target.value)}
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Interview Scheduled">Interview Scheduled</option>
                                                            <option value="Accepted">Accepted</option>
                                                            <option value="Rejected">Rejected</option>
                                                        </select>
                                                    )}
                                                    {activeTab === 'bookings' && (
                                                        <select 
                                                            value={item.status} 
                                                            onChange={(e) => handleStatusUpdate('consultation_bookings', item.id, e.target.value)}
                                                        >
                                                            <option value="Scheduled">Scheduled</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    )}
                                                    {activeTab === 'contacts' && item.status !== 'Responded' && (
                                                        <button 
                                                            onClick={() => handleStatusUpdate('contact_submissions', item.id, 'Responded')}
                                                            className={styles.actionBtnSmall}
                                                        >
                                                            <Check size={12} /> Mark Processed
                                                        </button>
                                                    )}
                                                </div>

                                                {activeTab !== 'bookings' && !item.response_text && (
                                                    <button 
                                                        onClick={() =>
                                                            setReplyingTo({
                                                                table: activeTab,
                                                                item: item as ReplyTarget['item']
                                                            })
                                                        }
                                                        className="btn btn-secondary"
                                                        style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                                                    >
                                                        Respond directly <ArrowRight size={12} style={{ marginLeft: '0.4rem' }} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: REAL-TIME TELEMETRY DB QUERY LOGS */}
                        <div className={styles.sidePane}>
                            <div className={styles.paneHeader}>
                                <Terminal size={18} />
                                <h3>SQL Transaction Logs</h3>
                            </div>
                            <p className={styles.paneDesc}>Live read/write logs of Supabase database connection transactions.</p>
                            
                            <div className={styles.logWindow}>
                                {logs.length === 0 ? (
                                    <div className={styles.logPlaceholder}>
                                        <Activity size={24} className={styles.pulseIcon} />
                                        <span>Listening for incoming database queries...</span>
                                    </div>
                                ) : (
                                    logs.map((log, index) => (
                                        <div key={index} className={styles.logLine}>
                                            <div className={styles.logMeta}>
                                                <span className={styles.logTime}>{log.timestamp}</span>
                                                <span className={log.status.includes('200') ? styles.logOk : styles.logErr}>{log.status}</span>
                                                <span className={styles.logLatency}>{log.latency}</span>
                                            </div>
                                            <p className={styles.logQuery}>{log.query}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* DIRECT RESPONSE DIALOG MODAL */}
            {replyingTo && (
                <div className={styles.modalOverlay} onClick={() => setReplyingTo(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setReplyingTo(null)} className={styles.closeBtn}>&times;</button>
                        
                        <form onSubmit={handleReplySubmit} className={styles.replyForm}>
                            <h3>Draft Response</h3>
                            <p>Send an official response to <strong>{(replyingTo.item as AdminRow).name || (replyingTo.item as AdminRow).company}</strong> ({(replyingTo.item as AdminRow).email}). This will write details back to the Supabase database.</p>
                            
                            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                <label>Response Body Text</label>
                                <textarea 
                                    required 
                                    rows={6} 
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder="Write details or schedule a meeting hook..."
                                ></textarea>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setReplyingTo(null)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn btn-primary">Transmit Response</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Transitions>
    );
};
export default Admin;
