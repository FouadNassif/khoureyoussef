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

const supportedLanguages = ['en', 'ar', 'fr'];

// Pick the first device language we support (e.g. "fr-CA" -> "fr"), otherwise English
const getDeviceLanguage = () => {
    const deviceLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const lang of deviceLanguages) {
        const code = lang?.toLowerCase().split('-')[0];
        if (code && supportedLanguages.includes(code)) return code;
    }
    return 'en';
};

// Initialize language on client side: a saved choice wins, otherwise use the device language
if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('i18nextLng');
    if (saved && supportedLanguages.includes(saved)) {
        i18n.changeLanguage(saved);
    } else {
        i18n.changeLanguage(getDeviceLanguage());
    }
    
    // Save language preference when changed
    i18n.on('languageChanged', (lng) => {
        localStorage.setItem('i18nextLng', lng);
    });
}

export default i18n;
