import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

import robotHandAsset from "@/assets/landing/robot-hand.png";
import humanHandAsset from "@/assets/landing/human-hand.png";
import { useI18n } from "@/lib/i18n/i18n-context";

const CATEGORIES = ["cleaning", "serve", "deliver", "create"] as const;

/**
 * Scroll-driven opener: the two hands part as you scroll and the headline
 * resolves between them. Adapted from the /landing experiment — the standalone
 * page's own nav bar is dropped here because SiteHeader already provides it, and
 * the copy runs through i18n so the localised homepages don't fall back to
 * English.
 */
export function HandsHero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [staticState, setStaticState] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // Pinning and scrubbing a full-height section is hostile on touch and to
    // anyone who asked for less motion: show the resolved end state instead.
    if (prefersReducedMotion || isTouch) {
      setStaticState(true);
      return;
    }

    const section = sectionRef.current;
    if (!section || !robotRef.current || !humanRef.current) return;

    // GSAP + ScrollTrigger is ~43 kB gzip. Touch and reduced-motion visitors
    // returned above and never animate, so it is fetched only once we know the
    // timeline will actually run.
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    void (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set(robotRef.current, { x: "0%" });
        gsap.set(humanRef.current, { x: "0%" });
        gsap.set(textRefs.current, { opacity: 0, scale: 0.92, y: 24 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=1300",
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        tl.to(robotRef.current, { x: "-42%", ease: "none" }, 0);
        tl.to(humanRef.current, { x: "42%", ease: "none" }, 0);
        tl.to(textRefs.current, { opacity: 1, scale: 1, y: 0, stagger: 0.06, ease: "none" }, 0.22);
      }, section);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hands-hero relative min-h-screen overflow-hidden border-b border-border bg-background ${
        staticState ? "hands-hero--static" : ""
      }`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pt-10 pb-7">
        <div className="relative flex flex-1 flex-col justify-center py-14 md:py-8">
          {/* The animated lines sit inside an aria-hidden stage, so the section
              needs a text equivalent. Not an h1 — the page heading is the
              proposition block below this one. */}
          <p className="sr-only">{t("home.hands.summary")}</p>

          {/* The three lines are placed at 24/50/76% of this box. Sized to the
              hands alone (~250 px) they collided, because a single line is
              58–79 px tall — give the stage room for all three. */}
          <div
            className="relative mx-auto flex min-h-[340px] w-full max-w-[1000px] items-center justify-center md:min-h-[460px]"
            aria-hidden="true"
          >
            <div
              ref={robotRef}
              className="hands-hero__wrapper hands-hero__wrapper--robot relative z-10 w-[56%]"
            >
              <img
                src={robotHandAsset}
                alt=""
                width={1065}
                height={474}
                fetchPriority="high"
                className="hands-hero__hand hands-hero__hand--robot w-full object-contain"
              />
            </div>

            <div
              ref={humanRef}
              className="hands-hero__wrapper hands-hero__wrapper--human relative z-20 -ml-[12%] w-[57%]"
            >
              <img
                src={humanHandAsset}
                alt=""
                width={1094}
                height={474}
                fetchPriority="high"
                className="hands-hero__hand hands-hero__hand--human w-full object-contain"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
              {([0, 1, 2] as const).map((i) => (
                <div
                  key={i}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className={`hands-hero__text absolute whitespace-nowrap font-semibold leading-none tracking-tight text-foreground ${
                    i === 0
                      ? "top-[24%] left-[28%] -translate-x-1/2 -translate-y-1/2 text-[clamp(1.25rem,4.5vw,4rem)]"
                      : i === 1
                        ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(1.5rem,5.5vw,5.5rem)]"
                        : "right-[28%] bottom-[24%] translate-x-1/2 translate-y-1/2 text-[clamp(1.25rem,4.5vw,4rem)]"
                  }`}
                >
                  {t(`home.hands.line${i + 1}`)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
          <p className="max-w-[330px] text-[13px] leading-[1.55] text-muted-foreground">
            {t("home.hands.blurb")}
          </p>

          <span className="hidden flex-col items-center gap-2 text-[8px] font-semibold tracking-[0.24em] text-muted-foreground/60 uppercase md:flex">
            {t("home.hands.scroll")}
            <ArrowDown className="size-4" strokeWidth={1.25} aria-hidden />
          </span>

          <div className="flex flex-wrap gap-2 md:justify-end">
            {CATEGORIES.map((key) => (
              <span
                key={key}
                className="rounded-full border border-border px-3.5 py-2 text-[11px] text-muted-foreground"
              >
                {t(`home.hands.cat.${key}`)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hands-hero__wrapper, .hands-hero__hand { will-change: transform; }
        .hands-hero__text { will-change: transform, opacity; }
        .hands-hero__hand--robot { animation: handsReachRobot 6s ease-in-out infinite; transform-origin: left center; }
        .hands-hero__hand--human { animation: handsReachHuman 6s ease-in-out infinite; transform-origin: right center; }
        @keyframes handsReachRobot { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(1.2%); } }
        @keyframes handsReachHuman { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-1.2%); } }
        @media (prefers-reduced-motion: reduce) {
          .hands-hero__hand--robot, .hands-hero__hand--human { animation: none; }
        }
        .hands-hero--static .hands-hero__text { opacity: 1 !important; transform: none !important; }
        .hands-hero--static .hands-hero__wrapper--robot { transform: translateX(-42%) !important; }
        .hands-hero--static .hands-hero__wrapper--human { transform: translateX(42%) !important; }
      `}</style>
    </section>
  );
}
