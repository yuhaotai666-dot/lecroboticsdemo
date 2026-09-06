import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultLocale, isLocale, type Locale } from "./locales";
import { en } from "./translations/en";
import { fr } from "./translations/fr";
import { de } from "./translations/de";
import { it } from "./translations/it";
import { es } from "./translations/es";

const dictionaries: Record<Locale, Record<string, string>> = { en, fr, de, it, es };

const STORAGE_KEY = "lec-locale";

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nValue>({
  locale: defaultLocale,
  setLocale: () => {},
  t: (key) => en[key] ?? key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage unavailable */
    }
  };

  const t = (key: string, vars?: Record<string, string | number>) => {
    let s = dictionaries[locale][key] ?? en[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    }
    return s;
  };

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
