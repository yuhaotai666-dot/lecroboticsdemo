import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/book-a-demo")({
  head: () => ({
    meta: [
      { title: "Book a Demo at the Chelsea Showroom | LEC Robotics" },
      {
        name: "description",
        content:
          "See any LEC Robotics machine working before you buy. Tell us your sector and site, and we'll set up a live demonstration in London.",
      },
      { property: "og:title", content: "Book a Demo at the Chelsea Showroom | LEC Robotics" },
      {
        property: "og:description",
        content: "See any machine working before you buy — live demonstrations in London.",
      },
      { property: "og:url", content: "/book-a-demo" },
    ],
    links: [{ rel: "canonical", href: "/book-a-demo" }],
  }),
  component: BookDemo,
});

const sectorKeys = [
  "demo.sector.hospitality",
  "demo.sector.fnb",
  "demo.sector.healthcare",
  "demo.sector.retail",
  "demo.sector.warehouse",
  "demo.sector.education",
] as const;

function BookDemo() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <section>
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-2">
        <div>
          <p className="label-mono text-primary">{t("demo.kicker")}</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-6xl">{t("demo.title")}</h1>
          <p className="mt-5 text-muted-foreground">{t("demo.sub")}</p>
          <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
            <li className="border-l-2 border-primary pl-4">{t("demo.b1")}</li>
            <li className="border-l-2 border-primary pl-4">{t("demo.b2")}</li>
            <li className="border-l-2 border-primary pl-4">{t("demo.b3")}</li>
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          {sent ? (
            <div className="py-16 text-center">
              <h2 className="text-2xl font-semibold">{t("demo.sent.title")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{t("demo.sent.body")}</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field id="name" label={t("demo.form.name")} />
              <Field id="email" label={t("demo.form.email")} type="email" />
              <Field id="company" label={t("demo.form.company")} />

              <div>
                <label htmlFor="sector" className="text-sm font-medium text-foreground">
                  {t("demo.form.sector")}
                </label>
                <select
                  id="sector"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
                  defaultValue={t(sectorKeys[0])}
                >
                  {sectorKeys.map((k) => (
                    <option key={k}>{t(k)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="machine" className="text-sm font-medium text-foreground">
                  {t("demo.form.machine")}
                </label>
                <select
                  id="machine"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
                  defaultValue="not-sure"
                >
                  <option value="not-sure">{t("demo.form.notSure")}</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="text-sm font-medium text-foreground">
                  {t("demo.form.notes")}
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {t("demo.form.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="mt-2 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none"
      />
    </div>
  );
}
