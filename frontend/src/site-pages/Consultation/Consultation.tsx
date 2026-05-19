import React, { useMemo, useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, Loader2, ArrowRight } from 'lucide-react';
import { Transitions } from '../../components/Transitions';
import { Seo } from '../../components/Seo';
import { AppController } from '../../controllers/AppController';
import { GlowBadge } from '../../components/ui/GlowBadge';
import { GridOverlay } from '../../components/effects/GridOverlay';
import { Input } from '../../components/ui/Input';
import styles from './Consultation.module.css';

function nextWeekdaySlots(count: number): { label: string; val: string }[] {
    const out: { label: string; val: string }[] = [];
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    while (out.length < count) {
        const day = d.getDay();
        if (day !== 0 && day !== 6) {
            out.push({
                label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                val: d.toISOString().slice(0, 10)
            });
        }
        d.setDate(d.getDate() + 1);
    }
    return out;
}

const TIME_SLOTS = ['10:00 AM PKT', '11:30 AM PKT', '2:00 PM PKT', '4:30 PM PKT'];

export const Consultation: React.FC = () => {
    const dates = useMemo(() => nextWeekdaySlots(5), []);
    const [selectedDate, setSelectedDate] = useState<{ label: string; val: string } | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleConfirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;
        setSubmitError(null);
        setIsScheduling(true);
        const formData = new FormData(e.currentTarget);
        const company = formData.get('company') as string;
        const contact = formData.get('contact') as string;
        const email = formData.get('email') as string;
        const phone = (formData.get('phone') as string) || undefined;

        try {
            await AppController.submitConsultation(selectedDate.val, selectedTime, company, contact, email, phone);
            setIsConfirmed(true);
        } catch (err) {
            console.error(err);
            setSubmitError('Something went wrong. Email hello@trenchlabs.com and we will sort it out.');
        } finally {
            setIsScheduling(false);
        }
    };

    const slotReady = Boolean(selectedDate && selectedTime);

    return (
        <Transitions>
            <Seo
                title="Book a 15-minute call"
                description="Pick a time for a short fit call with TrenchLabs—web, automation, commerce, or performance work."
                path="/consultation"
            />
            <section className={styles.hero}>
                <GridOverlay opacity={0.05} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <GlowBadge variant="accent" pulse>15-minute call</GlowBadge>
                    <h1 className={styles.heroTitle}>Pick a time. We'll handle the rest.</h1>
                    <p className={styles.heroDesc}>
                        Fast to schedule, serious about the work—expect direct questions and straight answers.
                    </p>
                </div>
            </section>

            <section className={styles.calendarSection}>
                <div className="container">
                    <div className={styles.schedulerCard}>
                        {!isConfirmed ? (
                            <div className={styles.schedulerGrid}>
                                <div className={styles.pickerPane}>
                                    <div className={styles.block}>
                                        <div className={styles.paneHeader}>
                                            <CalendarIcon size={18} />
                                            <h3>Choose a day</h3>
                                        </div>
                                        <div className={styles.datesGrid}>
                                            {dates.map((d) => (
                                                <button
                                                    key={d.val}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedDate(d);
                                                        setSelectedTime(null);
                                                    }}
                                                    className={`${styles.dateBtn} ${selectedDate?.val === d.val ? styles.activeBtn : ''}`}
                                                >
                                                    {d.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.block} style={{ marginTop: '2.5rem' }}>
                                        <div className={styles.paneHeader}>
                                            <Clock size={18} />
                                            <h3>Pick a time (PKT)</h3>
                                        </div>
                                        {!selectedDate ? (
                                            <p className={styles.formHint}>Select a day first.</p>
                                        ) : (
                                            <div className={styles.timesGrid} style={{ animation: 'fadeEntry 0.4s ease' }}>
                                                {TIME_SLOTS.map((t) => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setSelectedTime(t)}
                                                        className={`${styles.timeBtn} ${selectedTime === t ? styles.activeBtn : ''}`}
                                                    >
                                                        {t}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.formPane}>
                                    <form onSubmit={handleConfirmBooking} className={styles.bookingForm}>
                                        <h3>Your details</h3>
                                        <p className={styles.slotMeta}>
                                            {slotReady && selectedDate ? (
                                                <>
                                                    Call: <strong>{selectedDate.label}</strong> · <strong>{selectedTime}</strong>
                                                </>
                                            ) : (
                                                <>
                                                    Tell us what you&apos;re building in one sentence—you&apos;ll leave with a clear next
                                                    step, even if that&apos;s not us.
                                                </>
                                            )}
                                        </p>

                                        <div className="mt-6 flex flex-col gap-4">
                                            <Input label="Company" name="company" required placeholder="Acme Inc." />
                                            <Input label="Your name" name="contact" required placeholder="Jane Doe" />
                                            <Input label="Email" name="email" type="email" required placeholder="you@company.com" />
                                            <Input label="Phone (optional)" name="phone" type="tel" placeholder="+1 555 000 0000" />
                                        </div>

                                        {submitError ? <p className={styles.formError}>{submitError}</p> : null}

                                        <button
                                            type="submit"
                                            className="btn-premium"
                                            style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
                                            disabled={isScheduling || !slotReady}
                                        >
                                            {isScheduling ? (
                                                <><Loader2 size={16} className={styles.spinner} /> Saving your spot…</>
                                            ) : (
                                                <>Confirm my call <ArrowRight size={16} /></>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.successScreen}>
                                <div className={styles.successIcon}>
                                    <CheckCircle size={52} />
                                </div>
                                <h2>You&apos;re booked</h2>
                                <p>
                                    Check your email for the link. If it&apos;s missing in five minutes, write hello@trenchlabs.com—we
                                    read every message.
                                </p>
                                <div className={styles.summaryBox}>
                                    <span>When:</span>
                                    <strong>
                                        {selectedDate?.label} · {selectedTime}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsConfirmed(false);
                                        setSelectedDate(null);
                                        setSelectedTime(null);
                                        setSubmitError(null);
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Schedule another call
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
