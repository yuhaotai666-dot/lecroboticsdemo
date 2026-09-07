import { useEffect, useRef, useState } from "react";
import capability01 from "@/assets/capability-01.webp.asset.json";
import capability02 from "@/assets/capability-02.webp.asset.json";
import capability03 from "@/assets/capability-03.webp.asset.json";
import capability04 from "@/assets/capability-04.webp.asset.json";
import capability05 from "@/assets/capability-05.webp.asset.json";
import capability06 from "@/assets/capability-06.webp.asset.json";
import { useI18n } from "@/lib/i18n/i18n-context";

const capabilities = [
  { image: capability01.url, title: "Robot Selection", heading: "Find the right robot" },
  { image: capability02.url, title: "Deployment & Localisation", heading: "Deploy it into your operation" },
  { image: capability03.url, title: "Systems Integration", heading: "Connect robots to your workflow" },
  { image: capability04.url, title: "Operational Training", heading: "Teach robots how your operation works" },
  { image: capability05.url, title: "Fleet Intelligence", heading: "Make the fleet intelligent" },
  { image: capability06.url, title: "Operational Scale", heading: "Scale across your operation" },
] as const;

export function CapabilityStory() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section || reduceMotion.matches || !desktop.matches) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setProgress(nextProgress);
      setActive(Math.min(capabilities.length - 1, Math.round(nextProgress * (capabilities.length - 1))));
    };

    const requestUpdate = () => {
      if (frameRef.current === null) frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const maxTravel = Math.max(
    0,
    (trackRef.current?.scrollWidth ?? 0) - (viewportRef.current?.clientWidth ?? 0),
  );

  return (
    <section ref={sectionRef} className="border-b border-border bg-muted/40 lg:h-[600vh]">
      <div className="lg:sticky lg:top-16 lg:flex lg:h-[calc(100vh-4rem)] lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-5 pt-20 lg:pt-0">
          <p className="label-mono text-muted-foreground">{t("home.capKicker")}</p>
          <div className="mt-3 flex items-end justify-between gap-6">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t("home.capTitle")}</h2>
            <p className="hidden shrink-0 text-sm tabular-nums text-muted-foreground lg:block" aria-live="polite">
              {String(active + 1).padStart(2, "0")} / 06
            </p>
          </div>
        </div>

        <div ref={viewportRef} className="mt-8 overflow-hidden pb-20 lg:pb-0">
          <div
            ref={trackRef}
            className="mx-auto flex max-w-6xl flex-col gap-5 px-5 lg:max-w-none lg:flex-row lg:gap-6 lg:will-change-transform"
            style={{ transform: `translate3d(${-progress * maxTravel}px, 0, 0)` }}
          >
            {capabilities.map((capability, index) => (
              <figure
                key={capability.title}
                className={`shrink-0 overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[opacity,transform] duration-300 lg:w-[78vw] lg:max-w-6xl ${
                  index === active ? "lg:scale-100 lg:opacity-100" : "lg:scale-[0.985] lg:opacity-60"
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

        <div className="mx-auto mt-6 hidden w-full max-w-6xl items-center gap-2 px-5 lg:flex" aria-hidden="true">
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