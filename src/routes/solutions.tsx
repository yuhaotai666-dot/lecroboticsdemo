import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Robotics by Industry — Hospitality, Healthcare, Retail | LEC Robotics" },
      {
        name: "description",
        content:
          "Which service robot fits which operation: hospitality, food and beverage, healthcare, retail, warehousing and education, with the machines suited to each.",
      },
      { property: "og:title", content: "Robotics by Industry | LEC Robotics" },
      {
        property: "og:description",
        content: "The machines suited to hospitality, food service, healthcare, retail, warehousing and education.",
      },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Solutions,
});

const sectors = [
  {
    name: "Hospitality",
    problem: "Room service and amenity runs eat the night shift.",
    slugs: ["butlerbot-w3", "kleenbot-c30"],
  },
  {
    name: "Food & beverage",
    problem: "Food running and tray return pull staff away from guests.",
    slugs: ["dinerbot-t10", "dinerbot-t9", "dinerbot-t8"],
  },
  {
    name: "Healthcare",
    problem: "Clinical staff spend hours moving supplies and linen.",
    slugs: ["butlerbot-w3", "courier-s100"],
  },
  {
    name: "Retail",
    problem: "Floor cleaning happens after hours at premium labour rates.",
    slugs: ["kleenbot-c40", "xbot-s-pro"],
  },
  {
    name: "Warehouse & logistics",
    problem: "Point-to-point moves of heavy loads across long distances.",
    slugs: ["courier-s100", "kleenbot-c40"],
  },
  {
    name: "Education",
    problem: "Robotics teaching needs a platform students can actually reconfigure.",
    slugs: ["ugot"],
  },
];

function Solutions() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="label-mono text-primary">By industry</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-6xl">
            Same machines. Very different shifts.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Start from the problem you're trying to remove, and we'll point you at the machine that removes it.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-14">
          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
            {sectors.map((s) => (
              <div key={s.name} className="bg-background p-8">
                <h2 className="text-2xl font-extrabold">{s.name}</h2>
                <p className="mt-3 text-muted-foreground">{s.problem}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.slugs.map((slug) => {
                    const p = products.find((x) => x.slug === slug);
                    if (!p) return null;
                    return (
                      <Link
                        key={slug}
                        to="/products/$slug"
                        params={{ slug }}
                        className="rounded-sm border border-border px-3 py-2 label-mono transition-colors hover:border-primary hover:text-primary"
                      >
                        {p.name}
                      </Link>
                    );
                  })}
                </div>
                <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                  Case study slot — awaiting a real customer name, site and result.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
