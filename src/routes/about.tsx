import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LEC Robotics — Intelligent Robotics, Deployed in the UK" },
      {
        name: "description",
        content:
          "Who we are, how we think about human–robot collaboration, the technology behind our fleet, our markets and how to reach us.",
      },
      { property: "og:title", content: "About LEC Robotics" },
      {
        property: "og:description",
        content: "Our mission, technology, global presence and milestones in commercial service robotics.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const blocks = [
  {
    id: "overview",
    title: "Company Overview",
    body:
      "We supply, deploy and support commercial service robots across the UK: front-of-house service, autonomous floor cleaning, secure building delivery, heavy internal transport and unattended food and beverage kiosks. Every machine we sell is one we install, commission and maintain ourselves.",
  },
  {
    id: "mission",
    title: "Mission & Vision",
    body:
      "Robots should take the repetitive distance out of a shift, not the people out of the building. Our aim is a working floor where machines carry, clean and run while staff spend their time on the parts of the job that need judgement.",
  },
  {
    id: "technology",
    title: "Technology & Innovation",
    body:
      "Multi-sensor navigation and mapping, autonomous mobility in crowded human spaces, lift and door integration, multi-robot coordination on shared routes, and fleet telemetry that shows what each machine did and when.",
  },
  {
    id: "global",
    title: "Global Presence",
    body:
      "Our range comes from established global robotics manufacturing, deployed and supported locally. Market and partner detail is being finalised and will be published here.",
  },
  {
    id: "milestones",
    title: "Milestones",
    body:
      "Company and product milestones are being confirmed for publication. We would rather leave this blank than post dates we cannot stand behind.",
  },
  {
    id: "careers",
    title: "Careers",
    body:
      "We hire field engineers, deployment specialists and commercial people who like being on site. Open roles will be listed here; in the meantime, get in touch.",
  },
];

function About() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">About Us</p>
          <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">
            Building the working floor of the next decade.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A robotics company for commercial operators: one supplier for the machines, the deployment and the
            service that keeps them running.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {blocks.map((b) => (
            <section key={b.id} id={b.id} className="scroll-mt-24">
              <h2 className="text-xl">{b.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
            </section>
          ))}
        </div>

        <section id="contact" className="mt-16 scroll-mt-24 rounded-xl border border-border bg-card p-8">
          <h2 className="text-xl">Contact Us</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Phone, email and office details will be published once confirmed. Until then, the fastest route to
            us is the demo request form.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/book-a-demo"
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book a demo
            </Link>
            <Link
              to="/support"
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Service &amp; support
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
