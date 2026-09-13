import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { useI18n } from "./i18n-context";
import { localeParam } from "./locales";

/**
 * Every localised page lives under the optional `{-$locale}` segment, so a plain
 * `<Link to="/about">` no longer resolves. Listing the locale-less paths here
 * keeps `to` checked at compile time instead of failing as a runtime 404.
 */
export type AppPath =
  | "/"
  | "/about"
  | "/book-a-demo"
  | "/case-studies"
  | "/industries"
  | "/products"
  | "/products/$slug"
  | "/resources"
  | "/roi"
  | "/solutions"
  | "/support"
  | "/videos/$slug";

type LocaleLinkProps = Omit<LinkComponentProps, "to" | "params"> & {
  to: AppPath;
  params?: Record<string, string>;
};

/** `<LocaleLink to="/products">` -> `/products` in English, `/fr/products` in French. */
export function LocaleLink({ to, params, ...rest }: LocaleLinkProps) {
  const { locale } = useI18n();
  const target = to === "/" ? "/{-$locale}/" : `/{-$locale}${to}`;
  return (
    <Link
      {...rest}
      to={target as never}
      params={{ ...(params ?? {}), locale: localeParam(locale) } as never}
    />
  );
}
