import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, FileText } from "lucide-react";
import { products } from "@/lib/products";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — News, Insights, Events & Downloads | LEC Robotics" },
      {
        name: "description",
        content:
          "Company news, robotics insights, upcoming events and downloadable product brochures and datasheets.",
      },
      { property: "og:title", content: "Resources | LEC Robotics" },
      { property: "og:description", content: "News, insights, events and downloadable materials." },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

interface Post {
  id: string;
  key: string;
  categoryKey: string;
  date: string;
}

const newsPosts: Post[] = [
  { id: "n1", key: "res.card.n1", categoryKey: "res.cat.news", date: "2026-08-18" },
  { id: "n2", key: "res.card.n2", categoryKey: "res.cat.news", date: "2026-07-30" },
];

const insightPosts: Post[] = [
  { id: "i1", key: "res.card.i1", categoryKey: "res.cat.insights", date: "2026-08-05" },
  { id: "i2", key: "res.card.i2", categoryKey: "res.cat.insights", date: "2026-06-21" },
];

const eventPosts: Post[] = [
  { id: "e1", key: "res.card.e1", categoryKey: "res.cat.events", date: "2026-10-06" },
];

function PostCard({ post }: { post: Post }) {
  const { t } = useI18n();
  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
          {t(post.categoryKey)}
        </span>
        <time className="text-xs text-muted-foreground">{post.date}</time>
      </div>
      <h3 className="mt-4 text-lg font-semibold leading-snug">{t(`${post.key}.title`)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{t(`${post.key}.excerpt`)}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        {t("res.comingSoon")} <ArrowRight className="size-3.5" />
      </span>
    </article>
  );
}

function Resources() {
  const { t } = useI18n();
  const withBrochure = products.filter((p) => p.brochure);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-accent/60 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-16">
          <p className="label-mono text-primary">{t("res.kicker")}</p>
          <h1 className="mt-4 text-4xl md:text-5xl">{t("res.title")}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("res.sub")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16">
        <section id="news" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold">{t("res.news.label")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("res.news.blurb")}</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {newsPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>

        <section id="insights" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold">{t("res.insights.label")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("res.insights.blurb")}</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {insightPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>

        <section id="events" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold">{t("res.events.label")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("res.events.blurb")}</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {eventPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>

        <section id="downloads" className="scroll-mt-24 border-t border-border pt-14">
          <h2 className="text-2xl font-semibold">{t("res.downloads.label")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("res.downloads.blurb")}</p>
          <ul className="mt-7 divide-y divide-border rounded-xl border border-border bg-card">
            {withBrochure.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="size-4 shrink-0 text-primary" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-semibold">
                      {p.name} — {t("res.specSheet")}
                    </p>
                    <p className="text-xs text-muted-foreground">{t(`prod.${p.slug}.positioning`)}</p>
                  </div>
                </div>
                <a
                  href={p.brochure!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  <Download className="size-4" /> PDF
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            <Link to="/support" hash="documents" className="text-primary">
              {t("res.manuals")}
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
