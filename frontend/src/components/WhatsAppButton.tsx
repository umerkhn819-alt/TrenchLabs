import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WA_NUMBER = '923000000000';
const WA_URL = `https://wa.me/${WA_NUMBER}`;

export const WhatsAppButton: React.FC = () => {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: hovered ? '0.75rem 1.25rem 0.75rem 1rem' : '0.9rem',
                background: 'var(--whatsapp-green, #25d366)',
                color: '#fff',
                borderRadius: '999px',
                boxShadow: '0 4px 20px rgb(37 211 102 / 0.45)',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: hovered ? '200px' : '52px',
                animation: 'pulse-glow-green 3s ease-in-out infinite',
            }}
        >
            <MessageCircle size={22} style={{ flexShrink: 0 }} />
            <span style={{
                opacity: hovered ? 1 : 0,
                transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                whiteSpace: 'nowrap',
            }}>
                Chat with us
            </span>
        </a>
    );
};
export default WhatsAppButton;
