import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import styles from './Consultation.module.css';

export const Consultation: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const dates = [
        { label: 'Mon, May 11', val: '2026-05-11' },
        { label: 'Tue, May 12', val: '2026-05-12' },
        { label: 'Wed, May 13', val: '2026-05-13' },
        { label: 'Thu, May 14', val: '2026-05-14' },
        { label: 'Fri, May 15', val: '2026-05-15' }
    ];

    const times = ['10:00 AM PST', '11:30 AM PST', '02:00 PM PST', '04:30 PM PST'];

    const handleConfirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;
        setIsScheduling(true);
        const formData = new FormData(e.currentTarget);
        const company = formData.get('company') as string;
        const contact = formData.get('contact') as string;
        const email = formData.get('email') as string;

        try {
            await AppController.submitConsultation(
                selectedDate,
                selectedTime,
                company,
                contact,
                email
            );
            setIsConfirmed(true);
        } catch (err) {
            console.error(err);
            alert('Database transaction failure.');
        } finally {
            setIsScheduling(false);
        }
    };

    return (
        <Transitions>
            <Seo
                title="Book a Consultation"
                description="Schedule a call with TrenchLabs to scope web, Shopify, or automation work."
                path="/consultation"
            />
            <section className={styles.hero}>
                <div className="ambient-glow glow-1"></div>
                <div className="container">
                    <span className="section-tagline">Consultation booking</span>
                    <h1 className="section-title gradient-text">Schedule An Engineering Consultation</h1>
                    <p className="section-desc">Select an available date and time slot to sync with our system architects regarding your startup goals.</p>
                </div>
            </section>

            <section className={styles.calendarSection}>
                <div className="container">
                    <div className={styles.schedulerCard}>
                        {!isConfirmed ? (
                            <div className={styles.schedulerGrid}>
                                {/* Left Side: Date and Time Selectors */}
                                <div className={styles.pickerPane}>
                                    {/* Date selector */}
                                    <div className={styles.block}>
                                        <div className={styles.paneHeader}>
                                            <CalendarIcon size={18} />
                                            <h3>1. Select Date</h3>
                                        </div>
                                        <div className={styles.datesGrid}>
                                            {dates.map((d) => (
                                                <button
                                                    key={d.val}
                                                    onClick={() => { setSelectedDate(d.label); setSelectedTime(null); }}
                                                    className={`${styles.dateBtn} ${selectedDate === d.label ? styles.activeBtn : ''}`}
                                                >
                                                    {d.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Time selector (Unlocks after date selected) */}
                                    {selectedDate && (
                                        <div className={styles.block} style={{ marginTop: '2.5rem', animation: 'fadeEntry 0.4s ease' }}>
                                            <div className={styles.paneHeader}>
                                                <Clock size={18} />
                                                <h3>2. Select Time</h3>
                                            </div>
                                            <div className={styles.timesGrid}>
                                                {times.map((t) => (
                                                    <button
                                                        key={t}
                                                        onClick={() => setSelectedTime(t)}
                                                        className={`${styles.timeBtn} ${selectedTime === t ? styles.activeBtn : ''}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Contact form (Unlocks after time selected) */}
                                <div className={styles.formPane}>
                                    {selectedDate && selectedTime ? (
                                        <form onSubmit={handleConfirmBooking} className={styles.bookingForm} style={{ animation: 'fadeEntry 0.4s ease' }}>
                                            <h3>3. Project Details</h3>
                                            <p className={styles.slotMeta}>Booking for: <strong>{selectedDate} @ {selectedTime}</strong></p>

                                            <div className="form-group" style={{ marginTop: '1.5rem' }}>
                                                <label>Company Name</label>
                                                <input type="text" name="company" required placeholder="Nexa Group" />
                                            </div>

                                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                                <label>Your Name &amp; Role</label>
                                                <input type="text" name="contact" required placeholder="Umar Khan (Director)" />
                                            </div>

                                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                                <label>Direct Email</label>
                                                <input type="email" name="email" required placeholder="hello@trenchlabs.com" />
                                            </div>

                                            <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '2rem' }} disabled={isScheduling}>
                                                {isScheduling ? (
                                                    <>
                                                        <Loader2 size={16} className={styles.spinner} />
                                                        Locking Meeting Reservation...
                                                    </>
                                                ) : 'Lock Consultation Slot'}
                                            </button>
                                        </form>
                                    ) : (
                                        <div className={styles.formPlaceholder}>
                                            <p>Select a date and available time slot to unlock our intake schedule form.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.successScreen}>
                                <div className={styles.successIcon}><CheckCircle size={52} /></div>
                                <h2>Consultation Confirmed!</h2>
                                <p>We have booked your slots inside our engineering calendars. A meeting calendar invite link with video channel instructions has been transmitted to your inbox.</p>
                                <div className={styles.summaryBox}>
                                    <span>Schedule:</span>
                                    <strong>{selectedDate} &bull; {selectedTime}</strong>
                                </div>
                                <button onClick={() => { setIsConfirmed(false); setSelectedDate(null); setSelectedTime(null); }} className="btn btn-secondary">
                                    Book Another Consultation
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </Transitions>
    );
};
export default Consultation;
