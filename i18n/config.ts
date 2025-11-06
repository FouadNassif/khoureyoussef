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

// Get saved language from localStorage or default to 'ar'
const getInitialLanguage = (): string => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('i18nextLng');
        if (saved && ['en', 'ar', 'fr'].includes(saved)) {
            return saved;
        }
    }
    return 'ar';
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getInitialLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: false
        }
    });

// Save language preference when changed
if (typeof window !== 'undefined') {
    i18n.on('languageChanged', (lng) => {
        localStorage.setItem('i18nextLng', lng);
    });
}

export default i18n;
