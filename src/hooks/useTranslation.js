import { useState } from 'react';
import en from '../translations/en';
import ta from '../translations/ta';

const translations = { en, ta };

export const useTranslation = () => {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  return { t, language, setLanguage };
};