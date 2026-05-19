'use client';

import dynamic from 'next/dynamic';
import { HelmetProvider } from 'react-helmet-async';

const LegacyApp = dynamic(() => import('../App'), { ssr: false });

export default function LegacyClient() {
    return (
        <HelmetProvider>
            <LegacyApp />
        </HelmetProvider>
    );
}
