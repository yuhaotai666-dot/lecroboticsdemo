import { createFileRoute, Outlet, notFound, redirect } from "@tanstack/react-router";

import { I18nProvider, loadDictionary } from "@/lib/i18n/i18n-context";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/locales";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

/**
 * Layout for every localised page. The `{-$locale}` segment is optional, so this
 * matches both `/products` (default locale, no prefix) and `/fr/products`.
 *
 * The site chrome lives here rather than in __root because the header and footer
 * read translations, and the provider is scoped to this subtree.
 */
export const Route = createFileRoute("/{-$locale}")({
  beforeLoad: ({ params, location }) => {
    const raw = params.locale;
    if (raw === undefined) return;

    // `/en/products` would be a second URL for the same content. Send it to the
    // unprefixed canonical form rather than serving a duplicate.
    if (raw === defaultLocale) {
      const stripped = location.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
      throw redirect({ href: stripped + location.searchStr, statusCode: 301 });
    }

    // Without this, `/anything/products` would render the English page, giving
    // every page unlimited duplicate URLs.
    if (!isLocale(raw)) throw notFound();
  },
  loader: async ({ params }) => {
    const locale: Locale = isLocale(params.locale) ? params.locale : defaultLocale;
    return { locale, dictionary: await loadDictionary(locale) };
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale, dictionary } = Route.useLoaderData();
  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </I18nProvider>
  );
}
