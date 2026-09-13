import { useRef, useState } from "react";
import capability01 from "@/assets/capability-01.webp";
import capability02 from "@/assets/capability-02.webp";
import capability03 from "@/assets/capability-03.webp";
import capability04 from "@/assets/capability-04.webp";
import capability05 from "@/assets/capability-05.webp";
import capability06 from "@/assets/capability-06.webp";
import { useI18n } from "@/lib/i18n/i18n-context";
import { useScrollMotion } from "@/lib/use-scroll-motion";

const capabilities = [
  { image: capability01, title: "Robot Selection", heading: "Find the right robot" },
  {
    image: capability02,
    title: "Deployment & Localisation",
    heading: "Deploy it into your operation",
  },
  { image: capability03, title: "Systems Integration", heading: "Connect robots to your workflow" },
  {
    image: capability04,
    title: "Operational Training",
    heading: "Teach robots how your operation works",
  },
  { image: capability05, title: "Fleet Intelligence", heading: "Make the fleet intelligent" },
  { image: capability06, title: "Operational Scale", heading: "Scale across your operation" },
] as const;

export function CapabilityStory() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Was a hand-rolled scroll listener + rAF writing translate3d into React state.
  // That never re-measured, so a resize or a late webfont left the horizontal
  // travel wrong, and it ran a second scroll loop alongside the GSAP already on
  // the page. ScrollTrigger owns the pin, the scrub and the re-measure now.
  const staticState = useScrollMotion(sectionRef, (gsap, _ScrollTrigger, scope) => {
    const mm = gsap.matchMedia();

    // Horizontal travel only makes sense where there is width to travel across;
    // below lg the cards stack and scroll normally.
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      const stage = stageRef.current;
      if (!track || !viewport || !stage) return;

      // Read at refresh time rather than once at build time.
      const distance = () => Math.max(track.scrollWidth - viewport.clientWidth, 1);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: stage,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) =>
            setActive(
              Math.min(
                capabilities.length - 1,
                Math.round(self.progress * (capabilities.length - 1)),
              ),
            ),
        },
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      className={`capability-story relative border-b border-border bg-muted/40 ${
        staticState ? "capability-story--static" : ""
      }`}
    >
      {/* depth-1 — atmosphere. Sits behind the cards and drifts at a slower rate
          so the strip reads as sitting in space rather than on a flat panel. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, color-mix(in oklch, var(--primary) 7%, transparent), transparent 70%)",
        }}
      />

      <div
        ref={stageRef}
        className="capability-story__stage relative lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 lg:pt-0">
          <p className="label-mono text-muted-foreground">{t("home.capKicker")}</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t("home.capTitle")}
            </h2>
            <p
              className="hidden shrink-0 text-sm tabular-nums text-muted-foreground lg:block"
              aria-live="polite"
            >
              {String(active + 1).padStart(2, "0")} / 06
            </p>
          </div>
        </div>

        <div ref={viewportRef} className="mt-8 overflow-hidden pb-20 lg:pb-0">
          <div
            ref={trackRef}
            className="capability-story__track mx-auto flex max-w-6xl flex-col gap-5 px-5 lg:max-w-none lg:flex-row lg:gap-6 lg:will-change-transform"
          >
            {capabilities.map((capability, index) => (
              <figure
                key={capability.title}
                className={`shrink-0 overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[opacity,transform] duration-300 lg:w-[78vw] lg:max-w-6xl ${
                  index === active
                    ? "lg:scale-100 lg:opacity-100"
                    : "lg:scale-[0.985] lg:opacity-60"
                }`}
              >
                <img
                  src={capability.image}
                  alt={`${String(index + 1).padStart(2, "0")} — ${capability.title}: ${capability.heading}`}
                  width={1672}
                  height={941}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1672/941] h-auto w-full object-contain"
                />
                <figcaption className="sr-only">{t(`home.cap${index + 1}.title`)}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div
          className="mx-auto mt-6 hidden w-full max-w-6xl items-center gap-2 px-5 lg:flex"
          aria-hidden="true"
        >
          {capabilities.map((capability, index) => (
            <span
              key={capability.title}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                index <= active ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
