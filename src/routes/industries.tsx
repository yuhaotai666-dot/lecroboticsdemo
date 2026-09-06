import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { industryMenu, productImage } from "@/lib/nav";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Robots for Every Industry — Restaurants to Warehouses | LEC Robotics" },
      {
        name: "description",
        content:
          "Service robot solutions across Food & Beverage, Retail, Hospitality, Industrial & Logistics, Health Care, Transportation, Entertainment & Sports, Real Estate, Education and Public Service.",
      },
      { property: "og:title", content: "Robots for Every Industry | LEC Robotics" },
      {
        property: "og:description",
        content: "Service robot solutions across ten industries, matched to the right machines.",
      },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

function Industries() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">{t("industries.kicker")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("industries.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("industries.sub")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="space-y-14">
          {industryMenu.map((ind, i) => (
            <section
              key={ind.slug}
              id={ind.slug}
              className={`grid scroll-mt-24 gap-8 rounded-xl border border-border bg-card p-8 md:grid-cols-2 md:p-10 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <p className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{t(`ind.${ind.slug}.name`)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`ind.${ind.slug}.blurb`)}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {ind.robots.map((slug) => {
                    const p = products.find((r) => r.slug === slug);
                    if (!p) return null;
                    return (
                      <Link
                        key={slug}
                        to="/products/$slug"
                        params={{ slug }}
                        className="rounded-full border border-border bg-catalog px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                      >
                        {p.name}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  to="/book-a-demo"
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  {t("industries.bookDemo")} <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ind.robots.slice(0, 4).map((slug) => {
                  const img = productImage(slug);
                  const p = products.find((r) => r.slug === slug);
                  if (!img || !p) return null;
                  return (
                    <Link
                      key={slug}
                      to="/products/$slug"
                      params={{ slug }}
                      className="group flex aspect-[4/3] items-center justify-center rounded-lg bg-catalog p-4"
                    >
                      <img
                        src={img}
                        alt={`${p.name} — ${t(`prod.${slug}.positioning`)}`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
