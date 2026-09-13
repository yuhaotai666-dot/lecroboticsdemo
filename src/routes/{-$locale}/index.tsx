import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { categories, products, formatPrice } from "@/lib/products";
import { HandsHero } from "@/components/hands-hero";
import { CapabilityStory } from "@/components/capability-story";
import { useI18n } from "@/lib/i18n/i18n-context";
import { LocaleLink } from "@/lib/i18n/locale-link";
import { headLinks, localeFromParams, pageUrl } from "@/lib/i18n/locales";
import { SplitWords } from "@/components/split-words";
import { useScrollMotion } from "@/lib/use-scroll-motion";

export const Route = createFileRoute("/{-$locale}/")({
  head: ({ params }) => ({
    meta: [
      { title: "Commercial Service Robots, Deployed in the UK | LEC Robotics" },
      {
        name: "description",
        content:
          "Eleven commercial service robots for hospitality, cleaning, delivery and logistics — with published pricing, weekly finance and UK deployment support.",
      },
      {
        property: "og:title",
        content: "Commercial Service Robots, Deployed in the UK | LEC Robotics",
      },
      {
        property: "og:description",
        content:
          "Eleven commercial service robots with published pricing, weekly finance and UK deployment support.",
      },
      { property: "og:url", content: pageUrl("/", localeFromParams(params)) },
    ],
    links: headLinks("/", localeFromParams(params)),
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const featured = products.filter((p) => p.price !== null).slice(0, 6);
  const pageRef = useRef<HTMLDivElement>(null);

  // One context for every below-the-fold reveal on this page. Selectors are
  // scoped to pageRef by gsap.context, so sections only need a data attribute.
  const staticState = useScrollMotion(pageRef, (gsap) => {
    // Word-by-word lighting: the proposition is the page's only h1, so make the
    // reader move through it rather than skim a block of grey.
    gsap.utils.toArray<HTMLElement>("[data-words] [data-word]").forEach((word, i, all) => {
      gsap.fromTo(
        word,
        { color: "var(--muted-foreground)" },
        {
          color: "var(--foreground)",
          ease: "none",
          scrollTrigger: {
            trigger: word.closest("[data-words]"),
            start: "top 78%",
            end: "top 38%",
            scrub: true,
          },
          delay: 0,
          duration: 0.01 + i / all.length,
        },
      );
    });

    // depth-1 decoration drifts slower than the content in front of it.
    gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
      gsap.to(el, {
        yPercent: Number(el.dataset["parallax"] ?? 8),
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Grouped entrances: children of a [data-reveal] rise together, staggered.
    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((group) => {
      const items = group.children.length ? Array.from(group.children) : [group];
      gsap.from(items, {
        opacity: 0,
        y: 26,
        stagger: 0.07,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });
  });

  return (
    <div ref={pageRef} className={staticState ? "motion-static" : ""}>
      <HandsHero />

      {/* Proposition — follows the scroll-driven opener. */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="grid-lines pointer-events-none absolute inset-0 opacity-30"
          data-parallax="10"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="max-w-3xl">
            <p className="label-mono text-primary">{t("home.kicker")}</p>
            <h1
              data-words
              className="mt-6 text-5xl leading-[1.02] font-semibold tracking-tight md:text-6xl"
            >
              <SplitWords text={t("home.heroTitle1")} />
              <br />
              <SplitWords text={t("home.heroTitle2")} />
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
              {t("home.heroSub")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LocaleLink
                to="/products"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                {t("home.ctaRobots")} <ArrowRight className="size-4" />
              </LocaleLink>
              <LocaleLink
                to="/roi"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                {t("home.ctaPayback")}
              </LocaleLink>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-border bg-catalog">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="label-mono text-muted-foreground">{t("home.findByJob")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {t("home.catTitle")}
          </h2>
          <div data-reveal className="mt-10 grid gap-4 md:grid-cols-3">
            {categories.map((c) => (
              <LocaleLink
                key={c.id}
                to="/products"
                search={{ category: c.id }}
                className="group card-surface p-8 hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold">{t(`cat.${c.id}.label`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(`cat.${c.id}.blurb`)}</p>
                <span className="mt-4 inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors group-hover:text-primary">
                  {t("home.view")} <ArrowRight className="size-3.5" />
                </span>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-mono text-muted-foreground">{t("home.rangeKicker")}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {t("home.rangeTitle")}
              </h2>
            </div>
            <LocaleLink to="/products" className="label-mono text-primary">
              {t("home.compareAll")} →
            </LocaleLink>
          </div>

          <div data-reveal className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <LocaleLink
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group flex min-h-[360px] flex-col bg-card p-4"
              >
                <div className="flex aspect-square w-full items-center justify-center bg-catalog p-4">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${t(`prod.${p.slug}.positioning`)}`}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <h3 className="text-xl font-semibold leading-7 text-catalog-title">{p.name}</h3>
                  {p.badge && (
                    <span className="text-xs font-semibold italic text-badge">
                      {t(p.badge === "New" ? "product.badge.new" : "product.badge.popular")}
                    </span>
                  )}
                </div>
                <p className="mt-1 min-h-8 text-xs leading-4 text-catalog-copy">
                  {t(`prod.${p.slug}.positioning`)}
                </p>
                <p className="mt-auto border-t border-border pt-3 text-sm font-medium text-catalog-title">
                  {formatPrice(p)}
                  <span className="ml-2 text-xs font-normal text-catalog-copy">
                    {p.finance
                      ? t("product.orFinance", { finance: p.finance })
                      : t("product.plusVat")}
                  </span>
                </p>
              </LocaleLink>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <CapabilityStory />

      {/* CTA */}
      <section>
        <div data-reveal className="mx-auto max-w-6xl px-5 py-24 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{t("home.ctaSub")}</p>
          <LocaleLink
            to="/book-a-demo"
            className="mt-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            {t("home.bookDemo")} <ArrowRight className="size-4" />
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
