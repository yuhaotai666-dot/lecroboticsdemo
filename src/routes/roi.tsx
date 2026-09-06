import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, formatPrice } from "@/lib/products";

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
        <div className="mx-auto max-w-7xl px-5 py-16">
          <p className="label-mono text-primary">ROI calculator</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold md:text-6xl">
            How fast does it pay for itself?
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            A rough guide based on the labour hours a machine takes off your rota. It ignores consumables,
            electricity and servicing — treat it as a starting point, not a quotation.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2">
          <div className="space-y-8 rounded-sm border border-border bg-card p-8">
            <div>
              <label htmlFor="model" className="label-mono text-muted-foreground">
                Machine
              </label>
              <select
                id="model"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="mt-3 w-full rounded-sm border border-border bg-background px-4 py-3"
              >
                {priced.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name} — {formatPrice(p)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="wage" className="label-mono text-muted-foreground">
                Fully loaded hourly labour cost — £{wage.toFixed(2)}
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
              <label htmlFor="hours" className="label-mono text-muted-foreground">
                Hours per week the robot covers — {hours} h
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

          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
            <Result label="Weekly labour saved" value={`£${Math.round(weeklySaving).toLocaleString("en-GB")}`} />
            <Result label="Annual labour saved" value={`£${Math.round(annualSaving).toLocaleString("en-GB")}`} />
            <Result label="Machine cost" value={formatPrice(product)} note="+ VAT" />
            <Result
              label="Payback period"
              value={`${Math.round(paybackWeeks)} weeks`}
              note={`≈ ${(paybackWeeks / 52).toFixed(1)} years`}
              highlight
            />
            <div className="bg-background p-6 sm:col-span-2">
              <p className="text-sm text-muted-foreground">
                Prefer to spread it? {product.name} finances at{" "}
                <span className="font-semibold text-foreground">{product.finance ?? "terms on request"}</span>.
              </p>
              <Link
                to="/book-a-demo"
                className="mt-5 inline-block rounded-sm bg-primary px-6 py-3.5 label-mono text-primary-foreground"
              >
                Get the numbers for your site →
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
    <div className={`p-6 ${highlight ? "bg-primary text-primary-foreground" : "bg-background"}`}>
      <p className={`label-mono ${highlight ? "opacity-70" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold">{value}</p>
      {note && <p className={`mt-1 text-xs ${highlight ? "opacity-70" : "text-muted-foreground"}`}>{note}</p>}
    </div>
  );
}
