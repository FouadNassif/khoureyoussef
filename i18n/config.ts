import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations from organized locale files
import enTranslations from '@/locales/en';
import arTranslations from '@/locales/ar';
import frTranslations from '@/locales/fr';

const resources = {
    en: enTranslations,
    ar: arTranslations,
    fr: frTranslations
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'ar', // Default language, will be overridden by localStorage on client
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

// Initialize language from localStorage on client side
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && ['en', 'ar', 'fr'].includes(saved)) {
        i18n.changeLanguage(saved);
    }
    
    // Save language preference when changed
    i18n.on('languageChanged', (lng) => {
        localStorage.setItem('i18nextLng', lng);
    });
}

export default i18n;
