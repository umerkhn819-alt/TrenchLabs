'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
    q: string;
    a: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className = '' }) => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {items.map((item, i) => (
                <div
                    key={i}
                    style={{
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-lg)',
                        background: open === i
                            ? 'color-mix(in srgb, var(--color-accent) 5%, var(--glass-bg-strong))'
                            : 'var(--glass-bg-strong)',
                        overflow: 'hidden',
                        transition: 'background 0.25s ease, border-color 0.25s ease',
                        borderColor: open === i ? 'color-mix(in srgb, var(--color-accent) 25%, var(--glass-border))' : undefined,
                    }}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(open === i ? null : i)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1.25rem 1.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.975rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.4,
                        }}
                    >
                        <span>{item.q}</span>
                        <span style={{
                            flexShrink: 0,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            background: open === i ? 'var(--color-accent)' : 'var(--glass-bg)',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease',
                        }}>
                            {open === i
                                ? <Minus size={14} style={{ color: '#0b1220' }} />
                                : <Plus size={14} style={{ color: 'var(--text-secondary)' }} />
                            }
                        </span>
                    </button>

                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                                style={{ overflow: 'hidden' }}
                            >
                                <p style={{
                                    padding: '0 1.5rem 1.25rem',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.65,
                                    margin: 0,
                                }}>
                                    {item.a}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};
export default FAQAccordion;
