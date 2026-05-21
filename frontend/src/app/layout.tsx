import type { Metadata, Viewport } from 'next';
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-ui',
    display: 'swap'
});

const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-fraunces',
    display: 'swap'
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap'
});

export const metadata: Metadata = {
    title: 'TrenchLabs',
    description: 'TrenchLabs digital agency website'
};

/* Browser chrome color matches dark nav/footer while the page canvas is light. */
export const viewport: Viewport = {
    themeColor: '#0c0e12'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${plusJakartaSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
            <body className={`${plusJakartaSans.className} bg-background text-foreground antialiased`}>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
