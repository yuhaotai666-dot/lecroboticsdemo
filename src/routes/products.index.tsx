import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories, products, formatPrice } from "@/lib/products";

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
  component: ProductsIndex;
});

function ProductsIndex() {
  const { category } = Route.useSearch();
  const shown = category ? products.filter((p) => p.category === category) : products;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="label-mono text-primary">The range</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-6xl">
            Eleven machines. Every price published.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Filter by the job you need doing, then compare the whole range on payload, runtime and cost in one
            table.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            <Link
              to="/products"
              search={{}}
              className={`rounded-sm border px-4 py-2 label-mono transition-colors ${
                !category ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
              }`}
            >
              All ({products.length})
            </Link>
            {categories.map((c) => {
              const count = products.filter((p) => p.category === c.id).length;
              const active = category === c.id;
              return (
                <Link
                  key={c.id}
                  to="/products"
                  search={{ category: c.id }}
                  className={`rounded-sm border px-4 py-2 label-mono transition-colors ${
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {c.label} ({count})
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col bg-background p-7 transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between">
                  <span className="label-mono text-muted-foreground">
                    {categories.find((c) => c.id === p.category)?.label}
                  </span>
                  {p.badge && (
                    <span className="rounded-sm bg-primary px-2 py-0.5 label-mono text-primary-foreground">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex h-40 items-center justify-center">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.positioning}`}
                    loading="lazy"
                    className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-6 text-xl font-bold">{p.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-5 border-t border-border pt-4 font-display text-lg font-extrabold">
                  {formatPrice(p)}
                  <span className="ml-2 label-mono font-normal text-muted-foreground">
                    {p.finance ? `or ${p.finance}` : "+ VAT"}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-16">
          <h2 className="text-3xl font-extrabold">Compare the full range</h2>
          <p className="mt-2 text-sm text-muted-foreground">All prices exclude VAT. Finance shown over 12 months at 7% unless noted.</p>
          <div className="mt-8 overflow-x-auto rounded-sm border border-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-card">
                <tr className="label-mono text-muted-foreground">
                  <th className="px-5 py-4">Model</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Key spec</th>
                  <th className="px-5 py-4">Runtime</th>
                  <th className="px-5 py-4">Buy outright</th>
                  <th className="px-5 py-4">Finance</th>
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
                      {categories.find((c) => c.id === p.category)?.label}
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
