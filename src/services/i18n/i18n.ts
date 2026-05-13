import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../../assets/locales/en/translation.json';
import translationFR from '../../assets/locales/fr/translation.json';

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  ar: {
    translation: translationFR
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['fr', 'en', 'fr'],
    resources,
    fallbackLng: "fr",
    detection: {
      order: [ 'htmlTag'],
      caches: []
    }

  })

export default i18n;