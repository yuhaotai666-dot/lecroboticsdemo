import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
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
  key: string;
  industryKey: string;
  filter: string;
  robots: string[];
}

const studies: Study[] = [
  { id: "hotel-delivery", key: "cases.s1", industryKey: "ind.hospitality.name", filter: "hospitality", robots: ["butlerbot-w3"] },
  { id: "restaurant-service", key: "cases.s2", industryKey: "ind.food-and-beverage.name", filter: "food-and-beverage", robots: ["dinerbot-t10"] },
  { id: "retail-cleaning", key: "cases.s3", industryKey: "ind.retail.name", filter: "retail", robots: ["kleenbot-c40"] },
  { id: "warehouse-transport", key: "cases.s4", industryKey: "case.industrial", filter: "industrial", robots: ["courier-s100"] },
  { id: "hospital-logistics", key: "cases.s5", industryKey: "ind.health-care.name", filter: "health-care", robots: ["butlerbot-w3", "courier-s100"] },
  { id: "building-cleaning", key: "cases.s6", industryKey: "case.real-estate", filter: "real-estate", robots: ["kleenbot-c40"] },
  { id: "venue-coffee", key: "cases.s7", industryKey: "case.public-service", filter: "public-service", robots: ["xbot-s-pro"] },
];

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

        {shown.length === 0 ? (
          <p className="py-16 text-center text-sm text-muted-foreground">
            {t("cases.empty")}{" "}
            <Link to="/book-a-demo" className="font-medium text-primary">
              {t("cases.talkToUs")}
            </Link>{" "}
            {t("cases.emptySuffix")}
          </p>
        ) : (
          <div className="grid gap-6 py-12 md:grid-cols-2">
            {shown.map((s) => {
              const firstRobot = products.find((p) => p.slug === s.robots[0]);
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
                    <p className="label-mono text-primary">{t("cases.locationTbc")}</p>
                    <h2 className="mt-3 text-xl font-semibold leading-snug">{t(`${s.key}.title`)}</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {t(s.industryKey)} · {s.robots.map((r) => products.find((p) => p.slug === r)?.name).join(" · ")}
                    </p>

                    <dl className="mt-5 space-y-4 text-sm">
                      <div>
                        <dt className="label-mono text-muted-foreground">{t("cases.challenge")}</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">{t(`${s.key}.challenge`)}</dd>
                      </div>
                      <div>
                        <dt className="label-mono text-muted-foreground">{t("cases.solution")}</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">{t(`${s.key}.solution`)}</dd>
                      </div>
                      <div>
                        <dt className="label-mono text-muted-foreground">{t("cases.result")}</dt>
                        <dd className="mt-1 leading-relaxed text-muted-foreground">{t("cases.resultTbc")}</dd>
                      </div>
                    </dl>

                    <Link
                      to="/book-a-demo"
                      className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-primary"
                    >
                      {t("cases.talkToUs")} <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
