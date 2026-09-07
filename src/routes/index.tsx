import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products, formatPrice } from "@/lib/products";
import { HeroCarousel } from "@/components/hero-carousel";
import { CapabilityStory } from "@/components/capability-story";
import { useI18n } from "@/lib/i18n/i18n-context";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Commercial Service Robots, Deployed in the UK | LEC Robotics" },
      {
        name: "description",
        content:
          "Eleven commercial service robots for hospitality, cleaning, delivery and logistics — with published pricing, weekly finance and UK deployment support.",
      },
      { property: "og:title", content: "Commercial Service Robots, Deployed in the UK | LEC Robotics" },
      {
        property: "og:description",
        content:
          "Eleven commercial service robots with published pricing, weekly finance and UK deployment support.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const featured = products.filter((p) => p.price !== null).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroCarousel />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="label-mono text-primary">{t("home.kicker")}</p>
            <h1 className="mt-6 text-5xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
              {t("home.heroTitle1")}
              <br />
              <span className="text-muted-foreground">{t("home.heroTitle2")}</span>
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              {t("home.heroSub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {t("home.ctaRobots")} <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/roi"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                {t("home.ctaPayback")}
              </Link>
            </div>
          </div>


        </div>
      </section>


      {/* Event strip — swap the copy when the event changes, delete when there isn't one */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <p className="text-sm font-semibold">
            {t("home.eventStrip")}
          </p>
          <Link to="/book-a-demo" className="label-mono underline underline-offset-4">
            {t("home.eventCta")} →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-catalog">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="label-mono text-muted-foreground">{t("home.findByJob")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t("home.catTitle")}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                search={{ category: c.id }}
                className="group card-surface p-8 hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold">{t(`cat.${c.id}.label`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`cat.${c.id}.blurb`)}</p>
                <span className="mt-4 inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors group-hover:text-primary">
                  {t("home.view")} <ArrowRight className="size-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono text-muted-foreground">{t("home.rangeKicker")}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{t("home.rangeTitle")}</h2>
            </div>
            <Link to="/products" className="label-mono text-primary">
              {t("home.compareAll")} →
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group flex min-h-[360px] flex-col bg-card p-4"
              >
                <div className="flex aspect-square w-full items-center justify-center bg-catalog p-4">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${t(`prod.${p.slug}.positioning`)}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <h3 className="text-xl font-semibold leading-7 text-catalog-title">{p.name}</h3>
                  {p.badge && (
                    <span className="text-xs font-semibold italic text-badge">
                      {t(p.badge === "New" ? "product.badge.new" : "product.badge.popular")}
                    </span>
                  )}
                </div>
                <p className="mt-1 min-h-8 text-xs leading-4 text-catalog-copy">{t(`prod.${p.slug}.positioning`)}</p>
                <p className="mt-auto border-t border-border pt-3 text-sm font-medium text-catalog-title">
                  {formatPrice(p)}
                  <span className="ml-2 text-xs font-normal text-catalog-copy">
                    {p.finance ? t("product.orFinance", { finance: p.finance }) : t("product.plusVat")}
                  </span>
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* Capabilities */}
      <CapabilityStory />

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            {t("home.ctaSub")}
          </p>
          <Link
            to="/book-a-demo"
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {t("home.bookDemo")} <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
