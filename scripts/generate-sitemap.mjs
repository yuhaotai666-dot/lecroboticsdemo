/**
 * Writes public/sitemap.xml before the build copies public/ into the output.
 *
 * The URL list has to come from the same data the pages render from, or it goes
 * stale the first time a product is added. That data lives in TypeScript modules
 * that import .webp files, so plain Node cannot load them — this runs them
 * through Vite's SSR module loader instead of regex-scraping the source.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Routes with no parameters. Locale-less paths — the locale is applied per URL.
const STATIC_PATHS = [
  "/",
  "/products",
  "/industries",
  "/case-studies",
  "/about",
  "/support",
  "/resources",
  "/roi",
  "/book-a-demo",
  "/solutions",
];

const vite = await createServer({
  root,
  configFile: false,
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true },
  resolve: { alias: { "@": path.join(root, "src") } },
});

try {
  const { products } = await vite.ssrLoadModule("/src/lib/products.ts");
  const { locales, localePath, absoluteUrl } = await vite.ssrLoadModule("/src/lib/i18n/locales.ts");

  // Both dynamic routes 404 on an unknown slug, so every product yields exactly
  // one detail page and one video page.
  const paths = [
    ...STATIC_PATHS,
    ...products.map((p) => `/products/${p.slug}`),
    ...products.map((p) => `/videos/${p.slug}`),
  ];

  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const entries = paths.flatMap((p) =>
    locales.map(({ code }) => {
      // Each URL carries the full alternate set, matching the hreflang the pages
      // themselves emit.
      const alternates = [
        ...locales.map((l) => ({ hreflang: l.code, href: absoluteUrl(localePath(p, l.code)) })),
        { hreflang: "x-default", href: absoluteUrl(localePath(p, "en")) },
      ];
      return [
        "  <url>",
        `    <loc>${esc(absoluteUrl(localePath(p, code)))}</loc>`,
        ...alternates.map(
          (a) =>
            `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${esc(a.href)}"/>`,
        ),
        "  </url>",
      ].join("\n");
    }),
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");

  writeFileSync(path.join(root, "public/sitemap.xml"), xml);
  console.log(
    `sitemap: ${paths.length} paths × ${locales.length} locales = ${entries.length} URLs`,
  );
} finally {
  await vite.close();
}
