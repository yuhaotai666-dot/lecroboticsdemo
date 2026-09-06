import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — News, Insights, Events & Downloads | LEC Robotics" },
      {
        name: "description",
        content:
          "Company news, robotics insights, upcoming events and downloadable brochures and datasheets for the LEC robot range.",
      },
      { property: "og:title", content: "Resources | LEC Robotics" },
      { property: "og:description", content: "News, insights, events and product downloads." },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const sections = [
  {
    id: "news",
    title: "News",
    blurb: "Company announcements, product launches and company updates.",
    items: [
      { category: "News", date: "To be confirmed", title: "Announcement slot — content pending" },
      { category: "News", date: "To be confirmed", title: "Product launch slot — content pending" },
      { category: "News", date: "To be confirmed", title: "Company update slot — content pending" },
    ],
  },
  {
    id: "insights",
    title: "Insights / Blog",
    blurb: "Robotics trends, automation insights, industry knowledge and technology articles.",
    items: [
      { category: "Insight", date: "To be confirmed", title: "Where service robots pay back fastest" },
      { category: "Insight", date: "To be confirmed", title: "Planning a multi-robot deployment" },
      { category: "Insight", date: "To be confirmed", title: "What autonomous cleaning changes on site" },
    ],
  },
  {
    id: "events",
    title: "Events",
    blurb: "Exhibitions, conferences, launch events and upcoming events.",
    items: [
      { category: "Event", date: "To be confirmed", title: "Trade show appearance — details pending" },
      { category: "Event", date: "To be confirmed", title: "Demo day — details pending" },
    ],
  },
];

function Resources() {
  const brochures = products.filter((p) => p.brochure);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-12">
        <p className="label-mono text-primary">Resources</p>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">Everything worth reading before you deploy.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          News, practical insight, events and product documentation in one place. Dated entries go live as we
          publish them.
        </p>
      </section>

      <div className="border-t border-border bg-catalog">
        <div className="mx-auto max-w-6xl space-y-16 px-5 py-14">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="text-2xl">{s.title}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{s.blurb}</p>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {s.items.map((it) => (
                  <article key={it.title} className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="h-36 bg-gradient-to-br from-accent/70 to-card" />
                    <div className="p-5">
                      <p className="text-xs text-muted-foreground">
                        {it.category} · {it.date}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-catalog-title">{it.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section id="downloads" className="scroll-mt-24">
            <h2 className="text-2xl">Downloads</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Product brochures, datasheets and solution material. Sheets we hold are linked below; the rest
              follow.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {products.map((p) => (
                <li
                  key={p.slug}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4"
                >
                  <span className="text-sm font-medium text-catalog-title">{p.name} spec sheet</span>
                  {p.brochure ? (
                    <a
                      href={p.brochure}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-primary"
                    >
                      Download →
                    </a>
                  ) : (
                    <Link to="/book-a-demo" className="text-sm text-muted-foreground hover:text-foreground">
                      Request
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              {brochures.length} of {products.length} sheets published so far.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
