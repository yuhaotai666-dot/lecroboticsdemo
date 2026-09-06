import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Download, PlayCircle } from "lucide-react";
import { categories, getProduct, products, formatPrice, type Product } from "@/lib/products";

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
  const others = products.filter((o) => o.slug !== p.slug).slice(0, 4);
  const category = categories.find((c) => c.id === p.category);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border border-border bg-card p-10 shadow-[var(--shadow-card)]">
            <img src={p.image} alt={`${p.name} — ${p.positioning}`} className="max-h-96 w-auto object-contain" />
          </div>

          <div>
            <nav className="label-mono text-muted-foreground">
              <Link to="/products" className="hover:text-foreground">
                Products
              </Link>{" "}
              / {category?.label}
            </nav>
            <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{p.name}</h1>
            <p className="mt-2 label-mono text-primary">{p.positioning}</p>
            <p className="mt-5 text-lg text-muted-foreground">{p.tagline}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="card-surface p-5">
                <p className="label-mono text-muted-foreground">Buy outright</p>
                <p className="mt-2 font-display text-3xl font-semibold">{formatPrice(p)}</p>
                <p className="mt-1 text-xs text-muted-foreground">+ VAT</p>
              </div>
              <div className="card-surface p-5">
                <p className="label-mono text-muted-foreground">Finance</p>
                <p className="mt-2 font-display text-3xl font-semibold">{p.finance ?? "On request"}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.finance ? "12 months · 7% + VAT" : "Terms available on enquiry"}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Book a demo <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/videos/$slug"
                params={{ slug: p.slug }}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <PlayCircle className="size-4" /> Watch it work
              </Link>
              {p.brochure && (
                <a
                  href={p.brochure}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
                >
                  <Download className="size-4" /> Spec sheet
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">Specification</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {p.specs.map((s) => (
              <div key={s.label} className="card-surface p-6">
                <p className="label-mono text-muted-foreground">{s.label}</p>
                <p className="mt-2 text-xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Figures as published on the current LEC Robotics product pages. Full specification supplied with the
            quotation.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">What deployment looks like</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Site survey", "We map your floors, lifts, docking points and shift pattern."],
              ["02", "Install & train", "Machine commissioned, routes built, your team trained on shift."],
              ["03", "Run & support", "UK-based support, software updates and servicing for the term."],
            ].map(([n, t, b]) => (
              <div key={n} className="card-surface p-8">
                <span className="label-mono text-primary">{n}</span>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold">Explore other robots</h2>
            <Link to="/products" className="label-mono text-primary">
              All robots →
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
                    alt={`${o.name} — ${o.positioning}`}
                    loading="lazy"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="mt-5 font-bold">{o.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{o.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
