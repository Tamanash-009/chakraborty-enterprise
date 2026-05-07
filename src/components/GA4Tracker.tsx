import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fallback to the hardcoded ID to guarantee it works in production 
// even if Vercel environment variables are misconfigured.
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DHE3N6WNSS';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function GA4Tracker() {
  const location = useLocation();

  useEffect(() => {
    // Prevent duplicate loading
    if (document.getElementById('ga4-script')) return;

    // 1. Inject the external Google Tag Manager script
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // 2. Initialize the dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false, // We'll handle this manually on route change
    });
  }, []);

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}
