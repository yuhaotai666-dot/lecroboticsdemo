export const locales = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
] as const;

export type Locale = (typeof locales)[number]["code"];

export const defaultLocale: Locale = "en";

export const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && locales.some((l) => l.code === v);

/**
 * Absolute origin used for canonical / hreflang / og:url. Search engines ignore
 * relative canonical values, so these must be fully qualified.
 */
export const SITE_URL = "https://www.lecrobotics.ai";

/**
 * The default locale lives at the root (`/products`); every other locale is
 * prefixed (`/fr/products`). Keeping one canonical shape per page is what stops
 * `/products` and `/en/products` from competing as duplicates.
 */
export const localeParam = (locale: Locale): string | undefined =>
  locale === defaultLocale ? undefined : locale;

/** `/products` + `fr` -> `/fr/products`; `/` + `en` -> `/` */
export function localePath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

export const absoluteUrl = (path: string): string => `${SITE_URL}${path === "/" ? "/" : path}`;

/**
 * hreflang set for one page: every locale plus x-default pointing at the
 * unprefixed default. `path` is the locale-less route path, e.g. "/products".
 */
export function alternateLinks(path: string) {
  return [
    ...locales.map((l) => ({
      rel: "alternate",
      hrefLang: l.code,
      href: absoluteUrl(localePath(path, l.code)),
    })),
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(localePath(path, defaultLocale)) },
  ];
}

/** canonical + hreflang + og:url for a page, given its locale-less path. */
export function headLinks(path: string, locale: Locale) {
  return [
    { rel: "canonical", href: absoluteUrl(localePath(path, locale)) },
    ...alternateLinks(path),
  ];
}

/** `/fr/products` -> `/products`; `/products` -> `/products` */
export function stripLocale(pathname: string): string {
  const seg = pathname.split("/")[1];
  if (isLocale(seg) && seg !== defaultLocale) {
    return pathname.slice(seg.length + 1) || "/";
  }
  return pathname;
}

/** Same page, different language — used by the language switcher. */
export const switchLocaleHref = (pathname: string, target: Locale): string =>
  localePath(stripLocale(pathname), target);

export const localeFromParams = (params: { locale?: string | undefined }): Locale =>
  isLocale(params.locale) ? params.locale : defaultLocale;

/** Absolute, locale-correct URL for a page — for og:url and any shared link. */
export const pageUrl = (path: string, locale: Locale): string =>
  absoluteUrl(localePath(path, locale));
