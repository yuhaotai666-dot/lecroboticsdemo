import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Making Robots Useful at Work | LEC Robotics" },
      {
        name: "description",
        content:
          "Who we are, our mission for human-robot collaboration, our technology, global presence and careers.",
      },
      { property: "og:title", content: "About LEC Robotics" },
      { property: "og:description", content: "Making robots genuinely useful at work." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const blocks = [
  { id: "mission", title: "Mission & Vision", body: "Our view is simple: robots should take the repetitive, heavy and unsociable work, so people can do the work that needs people. We build and deploy machines that make that practical for ordinary businesses, not just flagship sites." },
  { id: "technology", title: "Technology & Innovation", body: "The range combines autonomous navigation, multi-sensor perception, fleet scheduling and multi-robot coordination — engineered for busy commercial spaces, not laboratory floors." },
  { id: "global", title: "Global Presence", body: "We serve customers through a network of regional partners with UK deployment and support. Detailed market coverage is being finalised and will be published here." },
  { id: "milestones", title: "Milestones", body: "A timeline of company and product milestones is being prepared and will appear here soon." },
  { id: "careers", title: "Careers", body: "We hire across robotics engineering, deployment and customer success. Open roles will be listed here as they become available — speculative applications are welcome via the demo form for now." },
];

function About() {
  const { t } = useI18n();
  const localizedBlocks = [
    { id: "mission", title: t("about.mission.label"), body: t("about.mission.body") },
    { id: "technology", title: t("about.technology.label"), body: t("about.technology.body") },
    { id: "global", title: t("about.global.label"), body: t("about.global.body") },
    { id: "milestones", title: t("about.milestones.label"), body: t("about.milestones.body") },
    { id: "careers", title: t("about.careers.label"), body: t("about.careers.body") },
  ];

  return (
    <>
      <section id="overview" className="scroll-mt-24 border-b border-border bg-gradient-to-b from-accent/70 to-background">
        <div className="mx-auto max-w-6xl px-5 pt-20 pb-20 text-center">
          <p className="label-mono text-primary">{t("about.kicker")}</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl md:text-6xl">
            {t("about.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t("about.overview.body")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-5 py-16">
        {localizedBlocks.map((b) => (
          <section key={b.id} id={b.id} className="scroll-mt-24">
            <h2 className="text-2xl font-semibold md:text-3xl">{b.title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{b.body}</p>
          </section>
        ))}

        <section id="contact" className="scroll-mt-24 rounded-xl border border-border bg-card p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold">{t("about.contactUs")}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("about.contactBody")}
          </p>
          <Link
            to="/book-a-demo"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("about.contactCta")} <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </>
  );
}
