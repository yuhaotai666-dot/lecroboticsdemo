import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories, products, formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/products/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Robots — Prices, Specs and Finance | LEC Robotics" },
      {
        name: "description",
        content:
          "Compare every LEC Robotics machine side by side: payload, battery life, outright price and weekly finance across cleaning, delivery, kiosk and industrial robots.",
      },
      { property: "og:title", content: "All Robots — Prices, Specs and Finance | LEC Robotics" },
      {
        property: "og:description",
        content: "Compare payload, battery life, outright price and weekly finance across the full range.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  const { category } = Route.useSearch();
  const { t } = useI18n();
  const shown = category ? products.filter((p) => p.category === category) : products;

  return (
    <>
      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-16">
          <p className="text-sm font-medium text-primary">{t("products.kicker")}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-catalog-title md:text-5xl">
            {t("products.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-6 text-catalog-copy">
            {t("products.sub")}
          </p>
        </div>
      </section>

      <section className="bg-catalog">
        <div className="mx-auto max-w-6xl px-5 pt-8">
          <div className="flex gap-8 overflow-x-auto border-b border-border pb-4">
            <Link
              to="/products"
              search={{}}
              className={`shrink-0 border-b-2 px-1 pb-3 text-sm transition-colors ${
                !category ? "border-primary font-semibold text-catalog-title" : "border-transparent font-normal text-catalog-copy hover:text-catalog-title"
              }`}
            >
              {t("products.all")} ({products.length})
            </Link>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              const active = category === c.id;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  search={{ category: c.id }}
                  className={`shrink-0 border-b-2 px-1 pb-3 text-sm transition-colors ${
                    active
                      ? "border-primary font-semibold text-catalog-title"
                      : "border-transparent font-normal text-catalog-copy hover:text-catalog-title"
                  }`}
                >
                  {t(`cat.${c.id}.label`)} ({count})
                </Link>
              );
            })}
          </div>
          <div className="grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {shown.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group flex min-h-[330px] flex-col bg-card px-5 pb-5 pt-4"
              >
                <div className="flex h-44 items-center justify-center">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${t(`prod.${p.slug}.positioning`)}`}
                    loading="lazy"
                    className="h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <h2 className="text-xl font-semibold leading-7 text-catalog-title">{p.name}</h2>
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

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">{t("products.compareTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("products.compareNote")}</p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-card">
                <tr className="label-mono text-muted-foreground">
                  <th className="px-5 py-4">{t("products.th.model")}</th>
                  <th className="px-5 py-4">{t("products.th.category")}</th>
                  <th className="px-5 py-4">{t("products.th.keySpec")}</th>
                  <th className="px-5 py-4">{t("products.th.runtime")}</th>
                  <th className="px-5 py-4">{t("products.th.buy")}</th>
                  <th className="px-5 py-4">{t("products.th.finance")}</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.slug} className="border-t border-border">
                    <td className="px-5 py-4 font-semibold">
                      <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {t(`cat.${p.category}.label`)}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{p.specs[0]?.value ?? "—"}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {p.specs.find((s) => s.label.includes("Battery"))?.value ?? "—"}
                    </td>
                    <td className="px-5 py-4 font-semibold">{formatPrice(p)}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.finance ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
