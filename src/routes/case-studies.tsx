import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products, type Product } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Robots at Work in Real Venues | LEC Robotics" },
      {
        name: "description",
        content:
          "How service robots are deployed across hospitality, retail, logistics, health care and public spaces — challenges, solutions and outcomes.",
      },
      { property: "og:title", content: "Case Studies | LEC Robotics" },
      { property: "og:description", content: "Robots at work in real venues, across ten industries." },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

const filters = [
  { id: "all", key: "cases.filter.all", hash: "featured" },
  { id: "food-and-beverage", key: "ind.food-and-beverage.name", hash: "food-and-beverage" },
  { id: "retail", key: "ind.retail.name", hash: "retail" },
  { id: "hospitality", key: "ind.hospitality.name", hash: "hospitality" },
  { id: "industrial", key: "case.industrial", hash: "industrial" },
  { id: "health-care", key: "ind.health-care.name", hash: "health-care" },
  { id: "real-estate", key: "case.real-estate", hash: "real-estate" },
  { id: "public-service", key: "case.public-service", hash: "public-service" },
];

interface Study {
  id: string;
  title: string;
  industry: string;
  filter: string;
  robots: string[];
  challenge: string;
  solution: string;
}

const studies: Study[] = [
  {
    id: "hotel-delivery",
    title: "Improving hotel room delivery efficiency",
    industry: "Hospitality",
    filter: "hospitality",
    robots: ["butlerbot-w3"],
    challenge:
      "Late-night room service requests compete with front-desk duties, and lifts and corridors make manual delivery slow.",
    solution:
      "Butlerbot W3 handles room deliveries with secure locking compartments and lift integration, while staff stay on guest-facing tasks.",
  },
  {
    id: "restaurant-service",
    title: "Keeping food service consistent at peak hours",
    industry: "Food & Beverage",
    filter: "food-and-beverage",
    robots: ["dinerbot-t10"],
    challenge:
      "Weekend peaks stretch the team: plates wait in the pass while servers run food instead of serving tables.",
    solution:
      "Dinerbot T10 runs table routes from kitchen to dining room; servers take the last metre, greet guests and clear tables.",
  },
  {
    id: "warehouse-transport",
    title: "Cutting repetitive internal transport runs",
    industry: "Industrial & Logistics",
    filter: "industrial",
    robots: ["courier-s100"],
    challenge:
      "Operators walk long distances moving totes between picking, packing and dispatch — hundreds of trips a day.",
    solution:
      "Courier S100 automates fixed transport routes between zones, freeing operators for value-adding work.",
  },
  {
    id: "retail-cleaning",
    title: "Overnight floor care for a large retail floor",
    industry: "Retail",
    filter: "retail",
    robots: ["kleenbot-c40"],
    challenge:
      "Large-format floors need daily scrubbing, but overnight cleaning crews are hard to staff and inconsistent.",
    solution:
      "Kleenbot C40 sweeps, scrubs and dries on scheduled overnight routes, reporting coverage after each run.",
  },
  {
    id: "hospital-logistics",
    title: "Internal delivery across a hospital site",
    industry: "Health Care",
    filter: "health-care",
    robots: ["butlerbot-w3", "courier-s100"],
    challenge:
      "Porters spend hours moving samples, linens and supplies between wards, labs and stores.",
    solution:
      "A mixed fleet of Butlerbot W3 and Courier S100 units handles point-to-point delivery with secure compartments.",
  },
  {
    id: "airport-cleaning",
    title: "Continuous cleaning in a transport hub",
    industry: "Transportation",
    filter: "public-service",
    robots: ["kleenbot-c40"],
    challenge:
      "Passenger terminals need constant daytime floor care around heavy foot traffic, not just overnight.",
    solution:
      "Kleenbot C40 cleans concourse zones on a rolling schedule, navigating safely around passengers and luggage.",
  },
];

function robotOf(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

function CaseStudies() {
  const { t } = useI18n();
  const [active, setActive] = useState("all");
  const shown = active === "all" ? studies : studies.filter((s) => s.filter === active);

  return (
    <>
      <section id="featured" className="scroll-mt-24 border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">{t("cases.kicker")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("cases.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("cases.sub")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pt-10">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(f.key)}
            </button>
          ))}
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {shown.map((s) => {
            const firstRobot = robotOf(s.robots[0]);
            return (
              <article key={s.id} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex h-56 items-center justify-center bg-catalog p-8">
                  {firstRobot && (
                    <img
                      src={firstRobot.image}
                      alt={`${firstRobot.name} — ${t(`prod.${firstRobot.slug}.positioning`)}`}
                      loading="lazy"
                      className="max-h-full w-auto object-contain"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="label-mono text-primary">
                    {t("cases.placeholder")} · {s.industry}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold leading-snug">{s.title}</h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {s.robots.map((r) => robotOf(r)?.name).join(" · ")}
                  </p>

                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="label-mono text-muted-foreground">{t("cases.challenge")}</dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">{s.challenge}</dd>
                    </div>
                    <div>
                      <dt className="label-mono text-muted-foreground">{t("cases.solution")}</dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">{s.solution}</dd>
                    </div>
                    <div>
                      <dt className="label-mono text-muted-foreground">{t("cases.result")}</dt>
                      <dd className="mt-1 leading-relaxed text-muted-foreground">
                        {t("cases.resultText")}
                      </dd>
                    </div>
                  </dl>

                  <Link
                    to="/book-a-demo"
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
                  >
                    {t("cases.discuss")} <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
