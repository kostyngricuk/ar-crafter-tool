import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.json';
import ru from './lang/ru.json';

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: localStorage.getItem('lang') || 'en',
  fallbackLng: 'en',
  resources,
});

export default i18n;
