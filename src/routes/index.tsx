import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products, formatPrice } from "@/lib/products";
import { HeroCarousel } from "@/components/hero-carousel";


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

const capabilities = [
  {
    n: "01",
    title: "Commercial distribution",
    body: "We select, position and deploy the right machine for your operation — not the one that happens to be in stock.",
  },
  {
    n: "02",
    title: "Software & localisation",
    body: "UK-governed architecture and Western compliance standards, configured for how your site actually runs.",
  },
  {
    n: "03",
    title: "Ecosystem design",
    body: "Your building, workflows and integrations rebuilt around autonomous machines, not bolted on beside them.",
  },
  {
    n: "04",
    title: "Data & training",
    body: "Mapping, routing and operational data that make a robot capable on day one rather than month six.",
  },
  {
    n: "05",
    title: "Intelligence systems",
    body: "Layered LLM and LAM architecture so your team manages outcomes, not machines.",
  },
  {
    n: "06",
    title: "Manufacturing",
    body: "Prototype to commercial scale. UKCA certified, CE marked, proven in live environments.",
  },
];

function Home() {
  const featured = products.filter((p) => p.price !== null).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <HeroCarousel />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-24">
          <div className="max-w-3xl">
            <p className="label-mono text-primary">Commercial service robotics · United Kingdom</p>
            <h1 className="mt-6 text-5xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
              Robots that do the shift.
              <br />
              <span className="text-muted-foreground">Priced, financed and supported here.</span>
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              Eleven machines across food service, floor cleaning, building delivery, automated kiosks and
              industrial transport. Every price published up front, every deployment run from our Chelsea
              showroom.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                See all robots <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/roi"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                Work out your payback
              </Link>
            </div>
          </div>


          <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-8 md:grid-cols-4">
            {[
              ["11", "Machines in range"],
              ["6", "Sectors covered"],
              ["£5,418", "Entry price + VAT"],
              ["UKCA/CE", "Certified range"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-semibold tracking-tight">{v}</dt>
                <dd className="mt-1 label-mono text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      {/* Event strip — swap the copy when the event changes, delete when there isn't one */}
      <section className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <p className="text-sm font-semibold">
            Live demonstrations run weekly at the Chelsea showroom — see every machine working before you buy.
          </p>
          <Link to="/book-a-demo" className="label-mono underline underline-offset-4">
            Reserve a slot →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="label-mono text-muted-foreground">Find by job</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Start with the work, not the model number.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/products"
                search={{ category: c.id }}
                className="group card-surface p-8 hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold">{c.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors group-hover:text-primary">
                  View <ArrowRight className="size-3.5" />
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
              <p className="label-mono text-muted-foreground">The range</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Built to perform. Ready to deploy.</h2>
            </div>
            <Link to="/products" className="label-mono text-primary">
              Compare all 11 →
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col card-surface p-8 hover:-translate-y-0.5"
              >
                <div className="flex h-40 items-center justify-center">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.positioning}`}
                    loading="lazy"
                    className="h-full w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 text-xl font-bold">{p.name}</h3>
                <p className="mt-1 label-mono text-muted-foreground">{p.positioning}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-5 border-t border-border pt-4 font-display text-lg font-semibold">
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

      {/* Capabilities */}
      <section className="border-b border-border bg-muted/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="label-mono text-muted-foreground">What we actually do</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Six capabilities. One outcome.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.n} className="card-surface p-8">
                <span className="label-mono text-primary">{c.n}</span>
                <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">See one working in your space.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Bring your floor plan and shift pattern. We'll run the machine and give you the payback numbers for
            your own operation.
          </p>
          <Link
            to="/book-a-demo"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Book a demo <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
