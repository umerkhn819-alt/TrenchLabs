import { useEffect } from 'react';

/**
 * Loads optional analytics scripts from env. Safe no-op when unset.
 */
export function Analytics() {
    useEffect(() => {
        const plausible = import.meta.env.VITE_PLAUSIBLE_DOMAIN?.trim();
        if (plausible && !document.querySelector('script[data-trench-plausible]')) {
            const s = document.createElement('script');
            s.src = 'https://plausible.io/js/script.js';
            s.defer = true;
            s.setAttribute('data-domain', plausible);
            s.setAttribute('data-trench-plausible', '1');
            document.head.appendChild(s);
        }

        const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
        if (gaId && !document.querySelector('script[data-trench-ga]')) {
            const gtagScript = document.createElement('script');
            gtagScript.async = true;
            gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
            gtagScript.setAttribute('data-trench-ga', '1');
            document.head.appendChild(gtagScript);
            const inline = document.createElement('script');
            inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`;
            document.head.appendChild(inline);
        }
    }, []);

    return null;
}
