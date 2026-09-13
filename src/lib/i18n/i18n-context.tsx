import { createContext, useContext, useMemo, type ReactNode } from "react";
import { defaultLocale, type Locale } from "./locales";
import { en } from "./translations/en";

export type Dictionary = Record<string, string>;

/**
 * English ships with the main bundle because it is the fallback for any key a
 * translation is missing; the other four are separate chunks fetched only for
 * the locale actually being rendered. Loading all five eagerly put ~32 kB gzip
 * of unused strings in front of every visitor.
 */
export async function loadDictionary(locale: Locale): Promise<Dictionary> {
  switch (locale) {
    case "fr":
      return (await import("./translations/fr")).fr;
    case "de":
      return (await import("./translations/de")).de;
    case "it":
      return (await import("./translations/it")).it;
    case "es":
      return (await import("./translations/es")).es;
    default:
      return en;
  }
}

type I18nValue = {
  locale: Locale;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const translate = (dict: Dictionary) => (key: string, vars?: Record<string, string | number>) => {
  let s = dict[key] ?? en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
};

const I18nContext = createContext<I18nValue>({
  locale: defaultLocale,
  t: translate(en),
});

/**
 * Locale comes from the URL (the `{-$locale}` route segment), not from state —
 * that is what lets the server render the right language and gives each
 * translation its own indexable URL.
 */
export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({ locale, t: translate(dictionary) }),
    [locale, dictionary],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
