import { useEffect, useRef, useState } from "react";

import robotHandAsset from "@/assets/landing/robot-hand.png";
import humanHandAsset from "@/assets/landing/human-hand.png";
import { useI18n } from "@/lib/i18n/i18n-context";

const HAND_TRAVEL = 78; // percent of each hand's own width
const HAND_SCALE = 1.12;

/**
 * Scroll-driven opener. The two hands start fingertip to fingertip, then part
 * toward the edges as you scroll, and the headline resolves in the gap they
 * leave. The hands frame the text rather than sitting under it.
 *
 * Adapted from the /landing experiment — the standalone page's own nav bar is
 * dropped here because SiteHeader already provides it, and the copy runs through
 * i18n so the localised homepages don't fall back to English.
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
      let gsap, ScrollTrigger;
      try {
        [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      } catch {
        // Without the timeline the hands never part, so the headline would land
        // on top of them. Fall back to the resolved layout instead.
        if (!cancelled) setStaticState(true);
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.set([robotRef.current, humanRef.current], { xPercent: 0, scale: 1 });
        gsap.set(textRefs.current, { opacity: 0, y: 28 });

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

        tl.to(robotRef.current, { xPercent: -HAND_TRAVEL, scale: HAND_SCALE, ease: "none" }, 0);
        tl.to(humanRef.current, { xPercent: HAND_TRAVEL, scale: HAND_SCALE, ease: "none" }, 0);
        // Held back until the hands have opened a gap wide enough to read in.
        tl.to(textRefs.current, { opacity: 1, y: 0, stagger: 0.08, ease: "none" }, 0.35);
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
      <div className="flex min-h-screen w-full flex-col justify-center py-10">
        {/* The stage is aria-hidden, so the section needs a text equivalent.
            Not an h1 — the page heading is the proposition block below. */}
        <p className="sr-only">{t("home.hands.summary")}</p>

        <div className="relative flex w-full flex-col items-center" aria-hidden="true">
          <div className="flex w-full items-center justify-center">
            <div
              ref={robotRef}
              className="hands-hero__wrapper hands-hero__wrapper--robot relative z-10 w-[46%] max-w-[620px] origin-left"
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
              className="hands-hero__wrapper hands-hero__wrapper--human relative z-10 -ml-[7%] w-[47%] max-w-[640px] origin-right"
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
          </div>

          <div className="pointer-events-none z-30 mt-10 flex max-w-[44rem] flex-col items-center justify-center gap-0.5 px-5 text-center md:absolute md:inset-0 md:mx-auto md:mt-0 md:gap-1.5">
            {([0, 1, 2] as const).map((i) => (
              <div
                key={i}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                className={`hands-hero__text leading-[1.05] font-semibold tracking-tight ${
                  i === 1
                    ? "text-foreground text-[clamp(1.75rem,4.7vw,4rem)]"
                    : "text-muted-foreground text-[clamp(1.25rem,3.3vw,2.75rem)]"
                }`}
              >
                {t(`home.hands.line${i + 1}`)}
              </div>
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
        .hands-hero--static .hands-hero__wrapper--robot { transform: translateX(-30%) !important; }
        .hands-hero--static .hands-hero__wrapper--human { transform: translateX(30%) !important; }
        @media (min-width: 768px) {
          .hands-hero--static .hands-hero__wrapper--robot { transform: translateX(-${HAND_TRAVEL}%) scale(${HAND_SCALE}) !important; }
          .hands-hero--static .hands-hero__wrapper--human { transform: translateX(${HAND_TRAVEL}%) scale(${HAND_SCALE}) !important; }
        }
      `}</style>
    </section>
  );
}
