import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/roi")({
  head: () => ({
    meta: [
      { title: "Robot ROI Calculator — Work Out Your Payback | LEC Robotics" },
      {
        name: "description",
        content:
          "Enter your hourly wage cost and the hours a robot would cover, and see the payback period for any machine in the LEC Robotics range.",
      },
      { property: "og:title", content: "Robot ROI Calculator | LEC Robotics" },
      {
        property: "og:description",
        content: "See the payback period for any machine against your own labour cost.",
      },
      { property: "og:url", content: "/roi" },
    ],
    links: [{ rel: "canonical", href: "/roi" }],
  }),
  component: RoiPage,
});

function RoiPage() {
  const { t } = useI18n();
  const priced = products.filter((p) => p.price !== null);
  const [slug, setSlug] = useState(priced[0]!.slug);
  const [wage, setWage] = useState(13.5);
  const [hours, setHours] = useState(25);

  const product = priced.find((p) => p.slug === slug)!;
  const weeklySaving = wage * hours;
  const annualSaving = weeklySaving * 52;
  const paybackWeeks = weeklySaving > 0 ? product.price! / weeklySaving : 0;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="label-mono text-primary">{t("roi.kicker")}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">
            {t("roi.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            {t("roi.sub")}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-2">
          <div className="space-y-8 rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div>
              <label htmlFor="model" className="text-sm font-medium text-foreground">
                {t("roi.machine")}
              </label>
              <select
                id="model"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-3 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
              >
                {priced.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} — {formatPrice(p)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="wage" className="text-sm font-medium text-foreground">
                {t("roi.wage", { wage: wage.toFixed(2) })}
              </label>
              <input
                id="wage"
                type="range"
                min={11}
                max={30}
                step={0.5}
                value={wage}
                onChange={(e) => setWage(Number(e.target.value))}
                className="mt-4 w-full accent-primary"
              />
            </div>

            <div>
              <label htmlFor="hours" className="text-sm font-medium text-foreground">
                {t("roi.hours", { hours })}
              </label>
              <input
                id="hours"
                type="range"
                min={5}
                max={80}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-4 w-full accent-primary"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Result label={t("roi.weeklySaved")} value={`£${Math.round(weeklySaving).toLocaleString("en-GB")}`} />
            <Result label={t("roi.annualSaved")} value={`£${Math.round(annualSaving).toLocaleString("en-GB")}`} />
            <Result label={t("roi.machineCost")} value={formatPrice(product)} note={t("product.plusVat")} />
            <Result
              label={t("roi.payback")}
              value={t("roi.weeks", { n: Math.round(paybackWeeks) })}
              note={t("roi.years", { n: (paybackWeeks / 52).toFixed(1) })}
              highlight
            />
            <div className="card-surface p-6 sm:col-span-2">
              <p className="text-sm text-muted-foreground">
                {t("roi.spread", { name: product.name })}{" "}
                <span className="font-semibold text-foreground">{product.finance ?? t("roi.termsOnRequest")}</span>.
              </p>
              <Link
                to="/book-a-demo"
                className="mt-5 inline-block rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {t("roi.cta")} →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Result({
  label,
  value,
  note,
  highlight,
}: {
  label: string;
  value: string;
  note?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-6 shadow-[var(--shadow-card)] ${
        highlight ? "bg-primary text-primary-foreground" : "border border-border bg-card"
      }`}
    >
      <p className={`label-mono ${highlight ? "opacity-70" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {note && <p className={`mt-1 text-xs ${highlight ? "opacity-70" : "text-muted-foreground"}`}>{note}</p>}
    </div>
  );
}
