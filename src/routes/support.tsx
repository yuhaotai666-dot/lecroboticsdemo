import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, Wrench, Headset } from "lucide-react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Service & Support — Robot Lifecycle Support | LEC Robotics" },
      {
        name: "description",
        content:
          "Repair requests, manuals and documents, service plans, FAQs and technical support for every robot in the LEC range.",
      },
      { property: "og:title", content: "Service & Support | LEC Robotics" },
      { property: "og:description", content: "Reliable support throughout the entire robot lifecycle." },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: Support,
});

const cards = [
  { icon: Clock, title: "Fast Response", body: "Response targets are being finalised and will be published here." },
  { icon: ShieldCheck, title: "Professional Installation", body: "Site survey, mapping, commissioning and staff handover." },
  { icon: Wrench, title: "Preventive Maintenance", body: "Scheduled servicing to keep machines on route." },
  { icon: Headset, title: "Technical Support", body: "Remote diagnostics and on-site escalation when needed." },
];

const faqs = [
  {
    q: "How long does deployment take?",
    a: "Most single-robot installs are surveyed, mapped and commissioned in one visit. Multi-floor or lift-integrated deployments take longer.",
  },
  {
    q: "Do staff need training?",
    a: "Yes, but it is short. Handover covers daily start-up, route selection, cleaning of consumable parts and basic fault clearing.",
  },
  {
    q: "What happens if a robot faults on site?",
    a: "Raise a repair request and we triage remotely first. If it needs an engineer, we schedule a visit.",
  },
  {
    q: "What is covered by warranty?",
    a: "Warranty terms are being confirmed for publication and are not stated here yet.",
  },
];

function Support() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">Support</p>
          <h1 className="mt-4 text-4xl md:text-5xl">Service &amp; Support</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Reliable support throughout the entire robot lifecycle.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <c.icon className="size-5 text-primary" strokeWidth={1.75} />
              <h2 className="mt-4 text-base font-semibold text-catalog-title">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-y border-border bg-catalog">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2">
          <section id="repair" className="scroll-mt-24">
            <h2 className="text-2xl">Online service / repair request</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Tell us the model, the site and what the robot is doing. We triage remotely before sending an
              engineer.
            </p>
            <form
              className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="model" className="label-mono text-muted-foreground">
                  Robot model
                </label>
                <select
                  id="model"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                >
                  {products.map((p) => (
                    <option key={p.slug}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="site" className="label-mono text-muted-foreground">
                  Site / company
                </label>
                <input
                  id="site"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Where the robot is installed"
                />
              </div>
              <div>
                <label htmlFor="issue" className="label-mono text-muted-foreground">
                  What is happening
                </label>
                <textarea
                  id="issue"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Error messages, when it started, what changed"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Submit request
              </button>
              <p className="text-xs text-muted-foreground">
                Requests are not yet routed to a live service desk — connect this form when your support inbox
                is ready.
              </p>
            </form>
          </section>

          <div className="space-y-12">
            <section id="documents" className="scroll-mt-24">
              <h2 className="text-2xl">Documents &amp; manuals</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Manuals, quick-start guides, installation documents and troubleshooting guides per model.
                Published spec sheets are on the resources page.
              </p>
              <Link to="/resources" hash="downloads" className="mt-4 inline-block text-sm font-medium text-primary">
                Go to downloads →
              </Link>
            </section>

            <section id="plans" className="scroll-mt-24">
              <h2 className="text-2xl">Service plans</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>Installation and commissioning, including mapping and staff handover.</li>
                <li>Preventive maintenance visits on a scheduled cycle.</li>
                <li>After-sales cover and parts. Pricing and terms to be confirmed.</li>
              </ul>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl">Contact support</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Direct support phone, email and service hours will be published once confirmed.
              </p>
            </section>
          </div>
        </div>
      </div>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-16">
        <h2 className="text-2xl">FAQ</h2>
        <dl className="mt-6 divide-y divide-border border-t border-border">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="text-sm font-semibold text-catalog-title">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
