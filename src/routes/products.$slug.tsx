import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Download, PlayCircle } from "lucide-react";
import { categories, getProduct, products, formatPrice, type Product } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Robot not found | LEC Robotics" }, { name: "robots", content: "noindex" }] };
    }
    const p: Product = loaderData.product;
    const title = `${p.name} — ${p.positioning} | LEC Robotics`;
    return {
      meta: [
        { title },
        { name: "description", content: `${p.tagline} ${formatPrice(p)} + VAT, UK deployment and support.` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.tagline },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.tagline,
            image: p.image,
            brand: { "@type": "Brand", name: "LEC Robotics" },
            ...(p.price
              ? {
                  offers: {
                    "@type": "Offer",
                    price: p.price,
                    priceCurrency: "GBP",
                    availability: "https://schema.org/InStock",
                  },
                }
              : {}),
          }),
        },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { t } = useI18n();
  const others = products.filter((o) => o.slug !== p.slug).slice(0, 4);
  const category = categories.find((c) => c.id === p.category);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border border-border bg-card p-10 shadow-[var(--shadow-card)]">
            <img src={p.image} alt={`${p.name} — ${t(`prod.${p.slug}.positioning`)}`} className="max-h-96 w-auto object-contain" />
          </div>

          <div>
            <nav className="label-mono text-muted-foreground">
              <Link to="/products" className="hover:text-foreground">
                {t("nav.products")}
              </Link>{" "}
              / {category ? t(`cat.${category.id}.label`) : ""}
            </nav>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{p.name}</h1>
            <p className="mt-2 label-mono text-primary">{t(`prod.${p.slug}.positioning`)}</p>
            <p className="mt-5 text-lg text-muted-foreground">{t(`prod.${p.slug}.tagline`)}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-surface p-5">
                <p className="label-mono text-muted-foreground">{t("pdp.buyOutright")}</p>
                <p className="mt-2 font-display text-3xl font-semibold">{formatPrice(p)}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("product.plusVat")}</p>
              </div>
              <div className="card-surface p-5">
                <p className="label-mono text-muted-foreground">{t("pdp.finance")}</p>
                <p className="mt-2 font-display text-3xl font-semibold">{p.finance ?? t("pdp.onRequest")}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.finance ? t("pdp.financeNote") : t("pdp.termsOnEnquiry")}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {t("pdp.bookDemo")} <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/videos/$slug"
                params={{ slug: p.slug }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <PlayCircle className="size-4" /> {t("pdp.watchItWork")}
              </Link>
              {p.brochure && (
                <a
                  href={p.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
                >
                  <Download className="size-4" /> {t("pdp.specSheet")}
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">{t("pdp.specification")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.specs.map((s) => (
              <div key={s.label} className="card-surface p-6">
                <p className="label-mono text-muted-foreground">{t(`spec.${s.label}`)}</p>
                <p className="mt-2 text-xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {t("pdp.specNote")}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">{t("pdp.deployTitle")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["01", t("pdp.step1.title"), t("pdp.step1.body")],
              ["02", t("pdp.step2.title"), t("pdp.step2.body")],
              ["03", t("pdp.step3.title"), t("pdp.step3.body")],
            ].map(([n, title, b]) => (
              <div key={n} className="card-surface p-8">
                <span className="label-mono text-primary">{n}</span>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold">{t("pdp.exploreOthers")}</h2>
            <Link to="/products" className="label-mono text-primary">
              {t("pdp.allRobots")} →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/products/$slug"
                params={{ slug: o.slug }}
                className="group card-surface p-6 hover:-translate-y-0.5"
              >
                <div className="flex h-28 items-center justify-center">
                  <img
                    src={o.image}
                    alt={`${o.name} — ${t(`prod.${o.slug}.positioning`)}`}
                    loading="lazy"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="mt-5 font-bold">{o.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(`prod.${o.slug}.tagline`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
