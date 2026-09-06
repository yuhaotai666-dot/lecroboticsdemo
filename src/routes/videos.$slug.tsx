import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Film, PlayCircle } from "lucide-react";
import { getProduct, formatPrice, type Product } from "@/lib/products";
import { getVideos, type Clip } from "@/lib/videos";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/videos/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, clips: getVideos(params.slug) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Video not found | LEC Robotics" }, { name: "robots", content: "noindex" }] };
    }
    const p: Product = loaderData.product;
    const title = `${p.name} videos — operation & deployment footage | LEC Robotics`;
    const description = `Watch the ${p.name} being operated on site and working in real deployments, plus pricing and UK support.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "video.other" },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/videos/${params.slug}` }],
    };
  },
  component: VideoPage,
});

function ClipCard({ clip, poster, alt }: { clip: Clip; poster?: string; alt: string }) {
  const { t } = useI18n();
  return (
    <article className="card-surface p-6">
      <div className="flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
        {clip.src ? (
          <video
            controls
            preload="metadata"
            poster={clip.poster ?? poster}
            className="h-full w-full object-cover"
            aria-label={clip.title}
          >
            <source src={clip.src} type="video/mp4" />
          </video>
        ) : (
          <div className="px-6 py-10 text-center">
            <Film className="mx-auto size-7 text-muted-foreground" aria-hidden />
            <p className="mt-3 label-mono text-muted-foreground">{t("videos.pending")}</p>
            <img src={poster} alt={alt} loading="lazy" className="mx-auto mt-4 h-20 w-auto object-contain opacity-40" />
          </div>
        )}
      </div>
      <p className="mt-5 label-mono text-primary">
        {clip.kind === "operation" ? t("videos.operation") : t("videos.application")}
      </p>
      <h2 className="mt-2 text-lg font-bold">{clip.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{clip.summary}</p>
    </article>
  );
}

function VideoPage() {
  const { product: p, clips } = Route.useLoaderData();
  const { t } = useI18n();
  const operation = clips.filter((c) => c.kind === "operation");
  const scenes = clips.filter((c) => c.kind === "scene");
  const alt = `${p.name} — ${t(`prod.${p.slug}.positioning`)}`;

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <nav className="label-mono text-muted-foreground">
            <Link to="/products" className="hover:text-foreground">
              {t("nav.products")}
            </Link>{" "}
            /{" "}
            <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-foreground">
              {p.name}
            </Link>{" "}
            / {t("videos.breadcrumb")}
          </nav>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{t("videos.title", { name: p.name })}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("videos.intro", { price: formatPrice(p) })}
            {p.finance ? t("videos.introFinance", { finance: p.finance }) : "."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {t("videos.bookLive")} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              {t("videos.specPricing")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">{t("videos.opTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("videos.opSub")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {operation.map((c) => (
              <ClipCard key={c.id} clip={c} poster={p.image} alt={alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-3xl font-semibold">{t("videos.appTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("videos.appSub")}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {scenes.map((c) => (
              <ClipCard key={c.id} clip={c} poster={p.image} alt={alt} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div>
              <p className="label-mono text-primary">
                <PlayCircle className="mr-2 inline size-4" aria-hidden />
                {t("videos.prefer")}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{t("videos.showroom")}</h2>
            </div>
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              {t("nav.bookDemo")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
