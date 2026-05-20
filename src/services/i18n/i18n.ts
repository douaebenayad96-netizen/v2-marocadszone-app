import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from '../../assets/locales/en/translation.json';
import translationFR from '../../assets/locales/fr/translation.json';
import translationAR from '../../assets/locales/ar/translation.json';

import aboutEN from '../../assets/locales/en/about.json';
import aboutFR from '../../assets/locales/fr/about.json';
import aboutAR from '../../assets/locales/ar/about.json';

import categoriesEN from '../../assets/locales/en/categories.json';
import categoriesFR from '../../assets/locales/fr/categories.json';
import categoriesAR from '../../assets/locales/ar/categories.json';

import jobOffersEN from '../../assets/locales/en/jobOffers.json';
import jobOffersFR from '../../assets/locales/fr/jobOffers.json';
import jobOffersAR from '../../assets/locales/ar/jobOffers.json';

import termsEN from '../../assets/locales/en/terms.json';
import termsFR from '../../assets/locales/fr/terms.json';
import termsAR from '../../assets/locales/ar/terms.json';

import cookiesEN from '../../assets/locales/en/cookies.json';
import cookiesFR from '../../assets/locales/fr/cookies.json';
import cookiesAR from '../../assets/locales/ar/cookies.json';

import mentionsEN from '../../assets/locales/en/mentions.json';
import mentionsFR from '../../assets/locales/fr/mentions.json';
import mentionsAR from '../../assets/locales/ar/mentions.json';

import homeEN from '../../assets/locales/en/home.json';
import homeFR from '../../assets/locales/fr/home.json';
import homeAR from '../../assets/locales/ar/home.json';

import prestatairesEN from '../../assets/locales/en/prestataires.json';
import prestatairesFR from '../../assets/locales/fr/prestataires.json';
import prestatairesAR from '../../assets/locales/ar/prestataires.json';

import shortsEN from '../../assets/locales/en/shorts.json';
import shortsFR from '../../assets/locales/fr/shorts.json';
import shortsAR from '../../assets/locales/ar/shorts.json';

import pricingEN from '../../assets/locales/en/pricing.json';
import pricingFR from '../../assets/locales/fr/pricing.json';
import pricingAR from '../../assets/locales/ar/pricing.json';

import contactEN from '../../assets/locales/en/contact.json';
import contactFR from '../../assets/locales/fr/contact.json';
import contactAR from '../../assets/locales/ar/contact.json';

import accountEN from '../../assets/locales/en/account.json';
import accountFR from '../../assets/locales/fr/account.json';
import accountAR from '../../assets/locales/ar/account.json';

import { DEFAULT_LANGUAGE, languageOptions } from './languageConfig';

const resources = {
  en: {
    translation: translationEN,
    about: aboutEN,
    home: homeEN,
    shorts:shortsEN,
    jobOffers:jobOffersEN,
    prestataires: prestatairesEN,
    categories: categoriesEN,
    terms: termsEN,
    cookies:cookiesEN,
    mentions:mentionsEN,
    pricing: pricingEN,
    contact: contactEN,
    account:accountEN
  },
  fr: {
    translation: translationFR,
    about: aboutFR,
    home: homeFR,
    shorts:shortsFR,
    jobOffers:jobOffersFR,
    prestataires: prestatairesFR,
    categories: categoriesFR,
    terms: termsFR,
    cookies:cookiesFR,
    mentions:mentionsFR,
    pricing: pricingFR,
    contact: contactFR,
    account:accountFR
  },
  ar: {
    translation: translationAR,
    about: aboutAR,
    home: homeAR,
    shorts:shortsAR,
    jobOffers:jobOffersAR,
    prestataires: prestatairesAR,
    categories: categoriesAR,
    terms: termsAR,
   cookies:cookiesAR,
   mentions:mentionsAR,
    pricing: pricingAR,
    contact: contactAR,
    account:accountAR
  },
};

const supportedLngs = languageOptions.map((option) => option.code);

i18n

  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs,
    resources,
    fallbackLng: DEFAULT_LANGUAGE,
    load: 'languageOnly',
    ns: ['translation', 'about','home','prestataires','shorts','jobOffers' ,'categories', 'terms','cookies','mentions', 'pricing', 'contact','account'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    detection: {
      order: ['localStorage', 'htmlTag', 'navigator', 'querystring', 'path'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      htmlTag: document.documentElement,
    },
  });

export default i18n;
