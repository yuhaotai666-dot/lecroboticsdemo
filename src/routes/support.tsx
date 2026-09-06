import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, Wrench, Headset } from "lucide-react";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

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
  { icon: Clock, key: "support.card1" },
  { icon: ShieldCheck, key: "support.card2" },
  { icon: Wrench, key: "support.card3" },
  { icon: Headset, key: "support.card4" },
];

const faqKeys = ["support.faq1", "support.faq2", "support.faq3", "support.faq4"] as const;

function Support() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">{t("support.kicker")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("support.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("support.sub")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div key={c.key} className="rounded-xl border border-border bg-card p-6">
              <c.icon className="size-5 text-primary" strokeWidth={1.75} />
              <h2 className="mt-4 text-base font-semibold text-catalog-title">{t(`${c.key}.title`)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${c.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-y border-border bg-catalog">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2">
          <section id="repair" className="scroll-mt-24">
            <h2 className="text-2xl">{t("support.repair.title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("support.repair.sub")}
            </p>
            <form
              className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="model" className="label-mono text-muted-foreground">
                  {t("support.form.model")}
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
                  {t("support.form.site")}
                </label>
                <input
                  id="site"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder={t("support.form.sitePlaceholder")}
                />
              </div>
              <div>
                <label htmlFor="issue" className="label-mono text-muted-foreground">
                  {t("support.form.issue")}
                </label>
                <textarea
                  id="issue"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  placeholder={t("support.form.issuePlaceholder")}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("support.form.submit")}
              </button>
              <p className="text-xs text-muted-foreground">
                {t("support.form.note")}
              </p>
            </form>
          </section>

          <div className="space-y-12">
            <section id="documents" className="scroll-mt-24">
              <h2 className="text-2xl">{t("sup.documents.label")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("support.documents.sub")}
              </p>
              <Link to="/resources" hash="downloads" className="mt-4 inline-block text-sm font-medium text-primary">
                {t("support.documents.go")} →
              </Link>
            </section>

            <section id="plans" className="scroll-mt-24">
              <h2 className="text-2xl">{t("sup.plans.label")}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>{t("support.plans.li1")}</li>
                <li>{t("support.plans.li2")}</li>
                <li>{t("support.plans.li3")}</li>
              </ul>
            </section>

            <section id="contact" className="scroll-mt-24">
              <h2 className="text-2xl">{t("sup.contact.label")}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {t("support.contact.sub")}
              </p>
            </section>
          </div>
        </div>
      </div>

      <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-16">
        <h2 className="text-2xl">{t("support.faq.title")}</h2>
        <dl className="mt-6 divide-y divide-border border-t border-border">
          {faqKeys.map((k) => (
            <div key={k} className="py-5">
              <dt className="text-sm font-semibold text-catalog-title">{t(`${k}.q`)}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${k}.a`)}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
