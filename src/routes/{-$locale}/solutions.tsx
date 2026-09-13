import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";
import { LocaleLink } from "@/lib/i18n/locale-link";
import { headLinks, localeFromParams, pageUrl } from "@/lib/i18n/locales";

export const Route = createFileRoute("/{-$locale}/solutions")({
  head: ({ params }) => ({
    meta: [
      { title: "Robotics by Industry — Hospitality, Healthcare, Retail | LEC Robotics" },
      {
        name: "description",
        content:
          "Which service robot fits which operation: hospitality, food and beverage, healthcare, retail, warehousing and education, with the machines suited to each.",
      },
      { property: "og:title", content: "Robotics by Industry | LEC Robotics" },
      {
        property: "og:description",
        content:
          "The machines suited to hospitality, food service, healthcare, retail, warehousing and education.",
      },
      { property: "og:url", content: pageUrl("/solutions", localeFromParams(params)) },
    ],
    links: headLinks("/solutions", localeFromParams(params)),
  }),
  component: Solutions,
});

const sectors = [
  { key: "solutions.s1", slugs: ["butlerbot-w3", "kleenbot-c30"] },
  { key: "solutions.s2", slugs: ["dinerbot-t10", "dinerbot-t9", "dinerbot-t8"] },
  { key: "solutions.s3", slugs: ["butlerbot-w3", "courier-s100"] },
  { key: "solutions.s4", slugs: ["kleenbot-c40", "xbot-s-pro"] },
  { key: "solutions.s5", slugs: ["courier-s100", "kleenbot-c40"] },
  { key: "solutions.s6", slugs: ["ugot"] },
];

function Solutions() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="label-mono text-primary">{t("solutions.kicker")}</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold md:text-6xl">
            {t("solutions.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{t("solutions.sub")}</p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="grid gap-4 md:grid-cols-2">
            {sectors.map((s) => (
              <div key={s.key} className="card-surface p-8">
                <h2 className="text-2xl font-semibold">{t(`${s.key}.name`)}</h2>
                <p className="mt-3 text-muted-foreground">{t(`${s.key}.problem`)}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.slugs.map((slug) => {
                    const p = products.find((x) => x.slug === slug);
                    if (!p) return null;
                    return (
                      <LocaleLink
                        key={slug}
                        to="/products/$slug"
                        params={{ slug }}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary hover:text-primary"
                      >
                        {p.name}
                      </LocaleLink>
                    );
                  })}
                </div>
                <p className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
                  {t("solutions.caseSlot")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
