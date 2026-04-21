import { useContext } from 'react';
import en from '../translations/en';
import ta from '../translations/ta';
import ThemeCtx from '../context/themeCtx';

const translations = { en, ta };

export const useTranslation = () => {
  const { language, setLanguage } = useContext(ThemeCtx);

  const t = (key) => {
    const lang = language === 'ta' ? 'ta' : 'en';
    return translations[lang][key] || key;
  };

  return { t, language, setLanguage };
};
