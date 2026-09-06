import { createFileRoute, Link } from "@tanstack/react-router";
import { industryMenu } from "@/components/site-header";
import { products } from "@/lib/products";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Where Service Robots Work | LEC Robotics" },
      {
        name: "description",
        content:
          "Hospitality, food and beverage, retail, healthcare, logistics, transport, education and public spaces: the robots suited to each operation.",
      },
      { property: "og:title", content: "Industries | LEC Robotics" },
      {
        property: "og:description",
        content: "Robot deployments by industry, with the recommended models for each environment.",
      },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: Industries,
});

const byslug = (slug: string) => products.find((p) => p.slug === slug);

function Industries() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-14">
        <p className="label-mono text-primary">Industries</p>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">Where our robots go to work.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Every environment has a different bottleneck. Pick the sector closest to your operation to see the
          machines that fit it, and the work they take over.
        </p>
      </section>

      <div className="border-t border-border bg-catalog">
        <div className="mx-auto max-w-6xl space-y-4 px-5 py-14">
          {industryMenu.map((ind, i) => (
            <section
              key={ind.slug}
              id={ind.slug}
              className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className={`grid md:grid-cols-2 ${i % 2 ? "md:[direction:rtl]" : ""}`}>
                <div className="flex min-h-56 items-center justify-center bg-gradient-to-br from-accent/70 to-card p-8 md:[direction:ltr]">
                  <div className="flex items-end gap-4">
                    {ind.robots.slice(0, 3).map((slug) => {
                      const p = byslug(slug);
                      return p ? (
                        <img
                          key={slug}
                          src={p.image}
                          alt={`${p.name} deployed in ${ind.name.toLowerCase()} environments`}
                          loading="lazy"
                          className="h-28 w-auto object-contain md:h-36"
                        />
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="p-8 md:[direction:ltr]">
                  <h2 className="text-2xl">{ind.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ind.blurb}</p>
                  <p className="label-mono mt-6 text-muted-foreground">Recommended robots</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ind.robots.map((slug) => {
                      const p = byslug(slug);
                      return p ? (
                        <li key={slug}>
                          <Link
                            to="/products/$slug"
                            params={{ slug }}
                            className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            {p.name}
                          </Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                  <div className="mt-7 flex gap-4 text-sm font-medium">
                    <Link to="/case-studies" className="text-primary">
                      See case studies →
                    </Link>
                    <Link to="/book-a-demo" className="text-muted-foreground hover:text-foreground">
                      Book a demo
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
