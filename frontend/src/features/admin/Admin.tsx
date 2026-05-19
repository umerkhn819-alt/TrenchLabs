import React, { useState, useEffect } from 'react';
import {
    Users, FileText, Calendar, Activity, Terminal, MessageSquare,
    Check, AlertCircle, ArrowRight, Lock, Search, Sliders, LogOut,
    ChevronRight, X, Phone
} from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import type {
    ContactSubmission, CareersApplication, InternshipApplication,
    ConsultationBooking, TelemetryLog
} from '../../models/types';
import styles from './Admin.module.css';

type ReplyTarget = {
    table: string;
    item: ContactSubmission | CareersApplication | InternshipApplication | ConsultationBooking;
};

type AdminRow = {
    id: string;
    created_at: string;
    status: string;
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
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
    project_type?: string;
    budget?: string;
};

type ActiveTab = 'contacts' | 'careers' | 'interns' | 'bookings' | 'telemetry';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
    'Pending': { bg: 'rgb(234 179 8 / 0.15)', color: '#eab308' },
    'Under Review': { bg: 'rgb(234 179 8 / 0.15)', color: '#eab308' },
    'Scheduled': { bg: 'rgb(56 189 248 / 0.15)', color: '#38bdf8' },
    'Interview Scheduled': { bg: 'rgb(129 140 248 / 0.15)', color: '#818cf8' },
    'Responded': { bg: 'rgb(34 197 94 / 0.15)', color: '#22c55e' },
    'Accepted': { bg: 'rgb(34 197 94 / 0.15)', color: '#22c55e' },
    'Completed': { bg: 'rgb(20 184 166 / 0.15)', color: '#14b8a6' },
    'Rejected': { bg: 'rgb(239 68 68 / 0.15)', color: '#ef4444' },
    'Cancelled': { bg: 'rgb(239 68 68 / 0.15)', color: '#ef4444' },
};

function StatusBadge({ status }: { status: string }) {
    const c = STATUS_COLORS[status] ?? { bg: 'rgb(100 116 139 / 0.15)', color: '#94a3b8' };
    return (
        <span style={{
            padding: '0.22rem 0.65rem',
            borderRadius: 999,
            background: c.bg,
            color: c.color,
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
        }}>
            {status}
        </span>
    );
}

export const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => AppController.isAuthenticated());
    const [authPass, setAuthPass] = useState('');
    const [authError, setAuthError] = useState('');
    const [activeTab, setActiveTab] = useState<ActiveTab>('contacts');
    const [contacts, setContacts] = useState<ContactSubmission[]>([]);
    const [careers, setCareers] = useState<CareersApplication[]>([]);
    const [interns, setInterns] = useState<InternshipApplication[]>([]);
    const [bookings, setBookings] = useState<ConsultationBooking[]>([]);
    const [logs, setLogs] = useState<TelemetryLog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [replyingTo, setReplyingTo] = useState<ReplyTarget | null>(null);
    const [replyText, setReplyText] = useState('');

    const fetchDatabase = async () => {
        try {
            const [c, ca, i, b, l] = await Promise.all([
                AppController.getContacts(),
                AppController.getCareersApplications(),
                AppController.getInternshipApplications(),
                AppController.getConsultationBookings(),
                AppController.getTelemetryLogs(),
            ]);
            setContacts(c); setCareers(ca); setInterns(i); setBookings(b); setLogs(l);
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        void fetchDatabase();
        const handler = () => void AppController.getTelemetryLogs().then(setLogs);
        window.addEventListener('trench_log_update', handler);
        return () => window.removeEventListener('trench_log_update', handler);
    }, [isAuthenticated]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        const result = await AppController.loginAdmin(authPass);
        if (result.ok) { setIsAuthenticated(true); setAuthPass(''); }
        else setAuthError(result.errorMessage || 'Invalid credentials.');
    };

    const handleStatusUpdate = async (table: string, id: string, newStatus: string) => {
        try {
            if (table === 'contact_submissions') await AppController.replyToContact(id, 'Marked processed');
            else if (table === 'careers_applications') await AppController.updateCareersStatus(id, newStatus as CareersApplication['status']);
            else if (table === 'internship_applications') await AppController.updateInternshipStatus(id, newStatus as InternshipApplication['status']);
            else if (table === 'consultation_bookings') await AppController.updateBookingStatus(id, newStatus as ConsultationBooking['status']);
            void fetchDatabase();
        } catch (err) { console.error(err); }
    };

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyingTo || !replyText.trim()) return;
        const { table, item } = replyingTo;
        try {
            if (table === 'contacts') await AppController.replyToContact(item.id, replyText);
            else if (table === 'careers') await AppController.replyToCareers(item.id, replyText);
            else if (table === 'interns') await AppController.replyToInternship(item.id, replyText);
            setReplyText(''); setReplyingTo(null); void fetchDatabase();
        } catch (err) { console.error(err); }
    };

    const getFilteredData = (): AdminRow[] => {
        const q = searchTerm.toLowerCase();
        if (activeTab === 'contacts') return contacts.filter(i => (statusFilter === 'ALL' || i.status === statusFilter) && (i.name.toLowerCase().includes(q) || i.email.toLowerCase().includes(q) || i.message.toLowerCase().includes(q)));
        if (activeTab === 'careers') return careers.filter(i => (statusFilter === 'ALL' || i.status === statusFilter) && (i.name.toLowerCase().includes(q) || i.role.toLowerCase().includes(q)));
        if (activeTab === 'interns') return interns.filter(i => (statusFilter === 'ALL' || i.status === statusFilter) && (i.name.toLowerCase().includes(q) || i.track.toLowerCase().includes(q)));
        if (activeTab === 'bookings') return bookings.filter(i => (statusFilter === 'ALL' || i.status === statusFilter) && (i.company.toLowerCase().includes(q) || i.contact.toLowerCase().includes(q)));
        return [];
    };

    // ── LOGIN GATE ──────────────────────────────────────────────
    if (!isAuthenticated) {
        return (
            <Transitions>
                <Seo title="Admin" description="TrenchLabs admin." path="/admin" />
                <div className={styles.gateWrap}>
                    <div className={styles.gateCard}>
                        <div className={styles.gateIconWrap}><Lock size={28} /></div>
                        <h2 className={styles.gateTitle}>TrenchLabs Admin</h2>
                        <p className={styles.gateDesc}>Enter your administrator password to access the dashboard.</p>
                        <form onSubmit={handleLogin} className={styles.gateForm}>
                            <input
                                type="password" required value={authPass}
                                onChange={(e) => setAuthPass(e.target.value)}
                                placeholder="Administrator password"
                                className={styles.gateInput}
                            />
                            {authError && <p className={styles.gateError}><AlertCircle size={14} />{authError}</p>}
                            <button type="submit" className="btn-premium" style={{ width: '100%', justifyContent: 'center' }}>
                                Unlock dashboard <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </Transitions>
        );
    }

    const filteredList = getFilteredData();

    const NAV_ITEMS: { key: ActiveTab; label: string; icon: React.ElementType; count: number }[] = [
        { key: 'contacts', label: 'Contacts', icon: MessageSquare, count: contacts.length },
        { key: 'bookings', label: 'Bookings', icon: Calendar, count: bookings.length },
        { key: 'careers', label: 'Careers', icon: Users, count: careers.length },
        { key: 'interns', label: 'Interns', icon: Sliders, count: interns.length },
        { key: 'telemetry', label: 'Activity', icon: Terminal, count: logs.length },
    ];

    return (
        <Transitions>
            <Seo title="Admin Dashboard" description="TrenchLabs submissions and operations." path="/admin" />

            <div className={styles.dashboard}>
                {/* ── SIDEBAR ─────────────────────────────────────────── */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarLogo}>
                        <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                            <rect x="15" y="15" width="70" height="70" rx="16" stroke="currentColor" strokeWidth="8" />
                            <path d="M35 50 L50 65 L65 35" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>TrenchLabs</span>
                    </div>
                    <nav className={styles.sidebarNav}>
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.key}
                                    type="button"
                                    className={`${styles.navItem} ${activeTab === item.key ? styles.navItemActive : ''}`}
                                    onClick={() => { setActiveTab(item.key); setStatusFilter('ALL'); setSearchTerm(''); }}
                                >
                                    <Icon size={17} />
                                    <span>{item.label}</span>
                                    <span className={styles.navCount}>{item.count}</span>
                                </button>
                            );
                        })}
                    </nav>
                    <button
                        type="button"
                        className={styles.logoutBtn}
                        onClick={() => { AppController.logoutAdmin(); setIsAuthenticated(false); }}
                    >
                        <LogOut size={17} />
                        <span>Sign out</span>
                    </button>
                </aside>

                {/* ── MAIN ─────────────────────────────────────────────── */}
                <main className={styles.main}>
                    {/* Stats bar */}
                    <div className={styles.statsBar}>
                        {[
                            { label: 'Total Contacts', value: contacts.length, icon: MessageSquare, color: '#38bdf8' },
                            { label: 'Pending Bookings', value: bookings.filter(b => b.status === 'Scheduled').length, icon: Calendar, color: '#818cf8' },
                            { label: 'Applications', value: careers.length + interns.length, icon: Users, color: '#f59e0b' },
                            { label: 'Interns', value: interns.length, icon: Sliders, color: '#34d399' },
                        ].map((s) => {
                            const Icon = s.icon;
                            return (
                                <div key={s.label} className={styles.statCard}>
                                    <div className={styles.statCardIcon} style={{ color: s.color, background: `color-mix(in srgb, ${s.color} 12%, transparent)` }}>
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className={styles.statCardValue}>{s.value}</p>
                                        <p className={styles.statCardLabel}>{s.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Table area */}
                    <div className={styles.tableArea}>
                        <div className={styles.tableHeader}>
                            <h2 className={styles.tableTitle}>
                                {NAV_ITEMS.find(n => n.key === activeTab)?.label}
                            </h2>
                            <div className={styles.tableControls}>
                                <div className={styles.searchBox}>
                                    <Search size={14} />
                                    <input type="text" placeholder="Search…" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                                </div>
                                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.statusSelect}>
                                    <option value="ALL">All Status</option>
                                    {activeTab === 'contacts' && <><option>Pending</option><option>Responded</option></>}
                                    {activeTab === 'careers' && <><option>Under Review</option><option>Interview Scheduled</option><option>Accepted</option><option>Rejected</option></>}
                                    {activeTab === 'interns' && <><option>Pending</option><option>Interview Scheduled</option><option>Accepted</option><option>Rejected</option></>}
                                    {activeTab === 'bookings' && <><option>Scheduled</option><option>Completed</option><option>Cancelled</option></>}
                                </select>
                            </div>
                        </div>

                        {/* Telemetry tab */}
                        {activeTab === 'telemetry' ? (
                            <div className={styles.logList}>
                                {logs.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <Activity size={28} />
                                        <p>No telemetry logs yet.</p>
                                    </div>
                                ) : logs.map((log, i) => {
                                    const is200 = log.status.startsWith('2');
                                    const is4xx = log.status.startsWith('4');
                                    const statusColor = is200 ? '#22c55e' : is4xx ? '#eab308' : '#ef4444';
                                    return (
                                        <div key={i} className={styles.logRow}>
                                            <span className={styles.logTime}>{log.timestamp}</span>
                                            <span style={{ color: statusColor, fontWeight: 700, fontSize: '0.75rem' }}>{log.status}</span>
                                            <span className={styles.logLatency}>{log.latency}</span>
                                            <span className={styles.logQuery}>{log.query}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : filteredList.length === 0 ? (
                            <div className={styles.emptyState}>
                                <AlertCircle size={28} />
                                <p>No records found.</p>
                            </div>
                        ) : (
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            {activeTab === 'contacts' && <><th>Name</th><th>Email</th><th>Phone</th><th>Project</th><th>Budget</th><th>Status</th><th>Date</th><th>Actions</th></>}
                                            {activeTab === 'bookings' && <><th>Company</th><th>Contact</th><th>Email</th><th>Phone</th><th>Schedule</th><th>Status</th><th>Actions</th></>}
                                            {activeTab === 'careers' && <><th>Name</th><th>Email</th><th>Role</th><th>GitHub</th><th>Status</th><th>Date</th><th>Actions</th></>}
                                            {activeTab === 'interns' && <><th>Name</th><th>Email</th><th>Track</th><th>University</th><th>Status</th><th>Date</th><th>Actions</th></>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredList.map((item) => (
                                            <tr key={item.id} className={styles.tableRow}>
                                                {activeTab === 'contacts' && <>
                                                    <td className={styles.tdPrimary}>{item.name}</td>
                                                    <td><a href={`mailto:${item.email}`} className={styles.emailLink}>{item.email}</a></td>
                                                    <td>{item.phone ? <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{item.phone}</span> : <span className={styles.tdMuted}>—</span>}</td>
                                                    <td>{item.project_type || <span className={styles.tdMuted}>—</span>}</td>
                                                    <td>{item.budget || <span className={styles.tdMuted}>—</span>}</td>
                                                    <td><StatusBadge status={item.status} /></td>
                                                    <td className={styles.tdMuted}>{new Date(item.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: 6 }}>
                                                            {item.status !== 'Responded' && (
                                                                <button className={styles.actionBtn} onClick={() => handleStatusUpdate('contact_submissions', item.id, 'Responded')}>
                                                                    <Check size={13} />
                                                                </button>
                                                            )}
                                                            {!item.response_text && (
                                                                <button className={`${styles.actionBtn} ${styles.actionBtnReply}`} onClick={() => setReplyingTo({ table: 'contacts', item: item as ReplyTarget['item'] })}>
                                                                    Reply <ChevronRight size={13} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </>}

                                                {activeTab === 'bookings' && <>
                                                    <td className={styles.tdPrimary}>{item.company}</td>
                                                    <td>{item.contact}</td>
                                                    <td><a href={`mailto:${item.email}`} className={styles.emailLink}>{item.email}</a></td>
                                                    <td>{item.phone ? <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} />{item.phone}</span> : <span className={styles.tdMuted}>—</span>}</td>
                                                    <td className={styles.tdMuted}>{item.date} @ {item.time}</td>
                                                    <td>
                                                        <select value={item.status} onChange={(e) => handleStatusUpdate('consultation_bookings', item.id, e.target.value)} className={styles.inlineSelect}>
                                                            <option>Scheduled</option><option>Completed</option><option>Cancelled</option><option>Rescheduled</option>
                                                        </select>
                                                    </td>
                                                    <td></td>
                                                </>}

                                                {activeTab === 'careers' && <>
                                                    <td className={styles.tdPrimary}>{item.name}</td>
                                                    <td><a href={`mailto:${item.email}`} className={styles.emailLink}>{item.email}</a></td>
                                                    <td>{item.role}</td>
                                                    <td>{item.github ? <a href={item.github} target="_blank" rel="noreferrer" className={styles.emailLink}>GitHub →</a> : '—'}</td>
                                                    <td>
                                                        <select value={item.status} onChange={(e) => handleStatusUpdate('careers_applications', item.id, e.target.value)} className={styles.inlineSelect}>
                                                            <option>Under Review</option><option>Interview Scheduled</option><option>Accepted</option><option>Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className={styles.tdMuted}>{new Date(item.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        {!item.response_text && (
                                                            <button className={`${styles.actionBtn} ${styles.actionBtnReply}`} onClick={() => setReplyingTo({ table: 'careers', item: item as ReplyTarget['item'] })}>
                                                                Reply <ChevronRight size={13} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </>}

                                                {activeTab === 'interns' && <>
                                                    <td className={styles.tdPrimary}>{item.name}</td>
                                                    <td><a href={`mailto:${item.email}`} className={styles.emailLink}>{item.email}</a></td>
                                                    <td>{item.track}</td>
                                                    <td>{item.university}</td>
                                                    <td>
                                                        <select value={item.status} onChange={(e) => handleStatusUpdate('internship_applications', item.id, e.target.value)} className={styles.inlineSelect}>
                                                            <option>Pending</option><option>Interview Scheduled</option><option>Accepted</option><option>Rejected</option>
                                                        </select>
                                                    </td>
                                                    <td className={styles.tdMuted}>{new Date(item.created_at).toLocaleDateString()}</td>
                                                    <td>
                                                        {!item.response_text && (
                                                            <button className={`${styles.actionBtn} ${styles.actionBtnReply}`} onClick={() => setReplyingTo({ table: 'interns', item: item as ReplyTarget['item'] })}>
                                                                Reply <ChevronRight size={13} />
                                                            </button>
                                                        )}
                                                    </td>
                                                </>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* ── REPLY MODAL ───────────────────────────────────── */}
            {replyingTo && (
                <div className={styles.modalOverlay} onClick={() => setReplyingTo(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Reply to {(replyingTo.item as AdminRow).name || (replyingTo.item as AdminRow).company}</h3>
                            <button type="button" className={styles.modalClose} onClick={() => setReplyingTo(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <p className={styles.modalMeta}>{(replyingTo.item as AdminRow).email}</p>
                        <form onSubmit={handleReplySubmit}>
                            <textarea
                                required rows={6}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Type your response…"
                                className={styles.modalTextarea}
                            />
                            <div className={styles.modalActions}>
                                <button type="button" onClick={() => setReplyingTo(null)} className="btn btn-secondary">Cancel</button>
                                <button type="submit" className="btn-premium">
                                    Send reply <ArrowRight size={15} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </Transitions>
    );
};
export default Admin;
