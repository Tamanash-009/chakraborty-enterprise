export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Helper to check if gtag is available
const isGtagAvailable = () => typeof window !== 'undefined' && typeof window.gtag === 'function';

export const trackEvent = (action: string, category: string, label: string, value?: number) => {
  if (!isGtagAvailable() || !GA_MEASUREMENT_ID) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackWhatsAppClick = (location: 'floating_button' | 'header' | 'footer' | 'contact_page' | 'mobile_menu') => {
  trackEvent('click', 'WhatsApp', location);
};

export const trackServiceClick = (serviceName: string, categoryName: string) => {
  trackEvent('select_content', 'Service', `${categoryName} - ${serviceName}`);
};

export const trackFormSubmission = (formName: 'contact_form' | 'booking_form', success: boolean) => {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', 'Form', formName);
};

export const trackSearch = (searchQuery: string) => {
  if (!searchQuery.trim()) return;
  trackEvent('search', 'Search', searchQuery);
};
