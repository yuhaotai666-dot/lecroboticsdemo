import { useRef } from "react";

import robotHandAsset from "@/assets/landing/robot-hand.png";
import humanHandAsset from "@/assets/landing/human-hand.png";
import { useI18n } from "@/lib/i18n/i18n-context";
import { useScrollMotion } from "@/lib/use-scroll-motion";

const HAND_TRAVEL = 78; // percent of each hand's own width
const HAND_SCALE = 1.12;

/**
 * Scroll-driven opener. The two hands start fingertip to fingertip, then part
 * toward the edges as you scroll, and the headline converges into the gap they
 * leave — text travelling inward against hands travelling outward, so the
 * parting reads as the cause of the reveal rather than something happening
 * alongside it.
 *
 * Depth layers: 0 atmosphere · 1 contact glow · 3 hands · 4 headline.
 */
export function HandsHero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const staticState = useScrollMotion(sectionRef, (gsap, _ScrollTrigger, scope) => {
    gsap.set([robotRef.current, humanRef.current], { xPercent: 0, scale: 1 });
    // Each line starts off to the side it will converge from.
    gsap.set(textRefs.current, {
      opacity: 0,
      xPercent: (i: number) => (i % 2 === 0 ? -14 : 14),
      y: 18,
    });
    gsap.set(glowRef.current, { opacity: 1, scale: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "+=1300",
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        // Pinned triggers must refresh in document order: a later one that
        // measures before this pin's spacer exists computes a start ~1300 px —
        // this pin's travel — too early, and draws over the section above it.
        // Registration order is not fixed, because each section loads GSAP from
        // its own dynamic import. Higher refreshes first.
        refreshPriority: 2,
      },
    });

    tl.to(robotRef.current, { xPercent: -HAND_TRAVEL, scale: HAND_SCALE, ease: "none" }, 0);
    tl.to(humanRef.current, { xPercent: HAND_TRAVEL, scale: HAND_SCALE, ease: "none" }, 0);
    // depth-0 drifts at a fraction of the hands' rate — the parallax that gives
    // the section its sense of depth.
    tl.to(atmosphereRef.current, { yPercent: -8, scale: 1.06, ease: "none" }, 0);
    // The contact glow only reads while the fingertips are still near.
    tl.to(glowRef.current, { opacity: 0, scale: 2.4, ease: "none" }, 0);
    // Held back until the hands have opened a gap wide enough to read in.
    tl.to(
      textRefs.current,
      { opacity: 1, xPercent: 0, y: 0, stagger: 0.08, ease: "power2.out" },
      0.35,
    );
  });

  return (
    <section
      ref={sectionRef}
      className={`hands-hero relative min-h-screen overflow-hidden border-b border-border bg-background ${
        staticState ? "hands-hero--static" : ""
      }`}
    >
      {/* depth-0 — atmosphere */}
      <div
        ref={atmosphereRef}
        className="hands-hero__atmosphere pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative flex min-h-screen w-full flex-col justify-center py-10">
        {/* The stage is aria-hidden, so the section needs a text equivalent.
            Not an h1 — the page heading is the proposition block below. */}
        <p className="sr-only">{t("home.hands.summary")}</p>

        <div className="relative flex w-full flex-col items-center" aria-hidden="true">
          <div className="relative flex w-full items-center justify-center">
            {/* depth-1 — the light where the fingertips meet */}
            <div
              ref={glowRef}
              className="hands-hero__glow pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            {/* depth-3 — hands */}
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
              className="hands-hero__wrapper hands-hero__wrapper--human relative z-10 -ml-[2%] w-[47%] max-w-[640px] origin-right"
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

            {/* depth-4 — headline */}
            <div className="pointer-events-none z-30 mt-10 flex max-w-[44rem] flex-col items-center justify-center gap-0.5 px-5 text-center md:absolute md:inset-0 md:mx-auto md:mt-0 md:gap-1.5">
              {[
                // Brand name, so it is not translated — and it carries the site's
                // wordmark treatment (primary-coloured dot) used in the header and
                // footer rather than rendering as flat text.
                <>
                  LEC<span className="text-primary">.</span>ROBOTICS
                </>,
                t("home.hands.line2"),
                t("home.hands.line3"),
              ].map((content, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    textRefs.current[i] = el;
                  }}
                  className={`hands-hero__text leading-[1.05] font-semibold tracking-tight ${
                    i === 1
                      ? "text-foreground text-[clamp(1.75rem,4.7vw,4rem)]"
                      : i === 0
                        ? "text-foreground text-[clamp(1.25rem,3.3vw,2.75rem)]"
                        : "text-muted-foreground text-[clamp(1.25rem,3.3vw,2.75rem)]"
                  }`}
                >
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hands-hero__wrapper, .hands-hero__hand, .hands-hero__atmosphere { will-change: transform; }
        .hands-hero__text { will-change: transform, opacity; }
        .hands-hero__atmosphere {
          background:
            radial-gradient(46% 38% at 50% 46%, color-mix(in oklch, var(--primary) 6%, transparent), transparent 72%),
            radial-gradient(70% 60% at 50% 100%, color-mix(in oklch, var(--foreground) 4%, transparent), transparent 70%);
          filter: blur(8px);
        }
        .hands-hero__glow {
          width: clamp(120px, 18vw, 280px);
          aspect-ratio: 1;
          border-radius: 9999px;
          background: radial-gradient(circle, color-mix(in oklch, var(--primary) 22%, transparent), transparent 68%);
          filter: blur(4px);
          will-change: transform, opacity;
        }
        .hands-hero__hand--robot { animation: handsReachRobot 6s ease-in-out infinite; transform-origin: left center; }
        .hands-hero__hand--human { animation: handsReachHuman 6s ease-in-out infinite; transform-origin: right center; }
        @keyframes handsReachRobot { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(1.2%); } }
        @keyframes handsReachHuman { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(-1.2%); } }
        @media (prefers-reduced-motion: reduce) {
          .hands-hero__hand--robot, .hands-hero__hand--human { animation: none; }
        }
        .hands-hero--static .hands-hero__text { opacity: 1 !important; transform: none !important; }
        .hands-hero--static .hands-hero__glow { opacity: 0 !important; }
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
