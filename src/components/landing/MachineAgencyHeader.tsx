import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import robotHandAsset from "@/assets/landing/robot-hand.png.asset.json";
import humanHandAsset from "@/assets/landing/human-hand.png.asset.json";

gsap.registerPlugin(ScrollTrigger);

export function MachineAgencyHeader() {
  const sectionRef = useRef<HTMLElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const humanRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [staticState, setStaticState] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) {
      setStaticState(true);
      return;
    }

    const section = sectionRef.current;
    if (!section || !robotRef.current || !humanRef.current) return;

    const ctx = gsap.context(() => {
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
      tl.to(
        textRefs.current,
        { opacity: 1, scale: 1, y: 0, stagger: 0.06, ease: "none" },
        0.22
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="machine-agency-title"
      className={`machine-header relative min-h-screen overflow-hidden bg-[#fdfdfd] text-[#111111] ${staticState ? "machine-header--static" : ""}`}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1120px] flex-col px-5 pb-7 pt-7 sm:px-8 lg:px-10">
        <header className="grid grid-cols-[1fr_auto] items-center gap-5 md:grid-cols-3">
          <a href="#machine-agency-title" className="inline-flex w-fit items-center gap-2.5" aria-label="Machine home">
            <span className="machine-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="text-[22px] font-semibold leading-none">Machine</span>
          </a>

          <nav
            aria-label="Machine navigation"
            className="hidden items-center justify-self-center rounded-full bg-[#f2f2f2] p-1 text-[12px] font-medium md:flex"
          >
            <a className="rounded-full px-4 py-2 transition-colors hover:bg-white" href="#services">Services</a>
            <a className="rounded-full px-4 py-2 transition-colors hover:bg-white" href="#solutions">Solutions</a>
            <a className="rounded-full px-4 py-2 transition-colors hover:bg-white" href="#portfolio">Portfolio</a>
            <a className="rounded-full px-4 py-2 transition-colors hover:bg-white" href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 justify-self-end rounded-full bg-[#f2f2f2] py-1.5 pl-1.5 pr-4 text-[12px] font-medium transition-colors hover:bg-[#e8e8e8]"
          >
            <span className="grid size-6 place-items-center rounded-full bg-[#111111] text-white">
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </span>
            Start Project
          </a>
        </header>

        <div className="relative flex flex-1 flex-col justify-center py-14 md:py-8">
          <h1 id="machine-agency-title" className="sr-only">Creative Digital Agency Studio</h1>

          <div className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center" aria-hidden="true">
            <div
              ref={robotRef}
              className="machine-hand-wrapper machine-hand-wrapper--robot relative z-10 w-[56%]"
            >
              <img
                src={robotHandAsset.url}
                alt=""
                width={1065}
                height={474}
                decoding="async"
                className="machine-hand machine-hand--robot w-full object-contain"
              />
            </div>

            <div
              ref={humanRef}
              className="machine-hand-wrapper machine-hand-wrapper--human relative z-20 -ml-[12%] w-[57%]"
            >
              <img
                src={humanHandAsset.url}
                alt=""
                width={1094}
                height={474}
                decoding="async"
                className="machine-hand machine-hand--human w-full object-contain"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
              <div
                ref={(el) => (textRefs.current[0] = el)}
                className="machine-hero-text absolute left-[28%] top-[24%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(2rem,5vw,4rem)] font-medium leading-none text-[#111111]"
              >
                Creative
              </div>
              <div
                ref={(el) => (textRefs.current[1] = el)}
                className="machine-hero-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(2.5rem,7vw,5.5rem)] font-medium leading-none text-[#d4d4d4]"
              >
                Digital Agency
              </div>
              <div
                ref={(el) => (textRefs.current[2] = el)}
                className="machine-hero-text absolute bottom-[24%] right-[28%] translate-x-1/2 translate-y-1/2 whitespace-nowrap text-[clamp(2rem,5vw,4rem)] font-medium leading-none text-[#111111]"
              >
                Studio
              </div>
            </div>
          </div>
        </div>

        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto_1fr]">
          <p className="max-w-[330px] text-[13px] leading-[1.55] text-[#6a6a6a]">
            We are a world-class digital agency crafting exquisite brands, cutting-edge websites, and tactile
            experiences for modern companies.
          </p>

          <a
            href="#services"
            className="hidden flex-col items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.24em] text-[#c6c6c6] md:flex"
          >
            Scroll down
            <ArrowDown className="size-4" strokeWidth={1.25} aria-hidden="true" />
          </a>

          <div className="flex flex-wrap gap-2 md:justify-end" aria-label="Services">
            {['Web Design', 'Development', 'Branding'].map((service) => (
              <span key={service} className="rounded-full border border-[#e7e7e7] px-3.5 py-2 text-[11px] text-[#555555]">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .machine-header, .machine-header * { box-sizing: border-box; letter-spacing: 0; }
        .machine-header { font-family: Arial, Helvetica, sans-serif; }
        .machine-mark { display: inline-flex; align-items: center; width: 32px; height: 24px; transform: skewX(-18deg); }
        .machine-mark i { display: block; width: 9px; height: 18px; margin-right: -1px; border-radius: 8px; background: #111111; transform: rotate(34deg); }
        .machine-mark i:nth-child(2) { transform: translateY(4px) rotate(-34deg); }
        .machine-hand-wrapper { will-change: transform; }
        .machine-hand { will-change: transform; }
        .machine-hand--robot { animation: machineRobotReach 6s ease-in-out infinite; transform-origin: left center; }
        .machine-hand--human { animation: machineHumanReach 6s ease-in-out infinite; transform-origin: right center; }
        @keyframes machineRobotReach {
          0%, 100% { transform: translate3d(-8px, 3px, 0) rotate(-0.5deg); }
          50% { transform: translate3d(8px, -2px, 0) rotate(0.5deg); }
        }
        @keyframes machineHumanReach {
          0%, 100% { transform: translate3d(8px, -2px, 0) rotate(0.4deg); }
          50% { transform: translate3d(-8px, 2px, 0) rotate(-0.4deg); }
        }
        .machine-hero-text { will-change: transform, opacity; }
        @media (max-width: 767px) {
          .machine-header { min-height: 760px; }
          .machine-hand-wrapper--robot { width: 62%; }
          .machine-hand-wrapper--human { width: 64%; margin-left: -20%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .machine-hand--robot, .machine-hand--human { animation: none; }
        }
        .machine-header--static .machine-hero-text { opacity: 1 !important; transform: none !important; }
        .machine-header--static .machine-hand-wrapper--robot { transform: translateX(-42%) !important; }
        .machine-header--static .machine-hand-wrapper--human { transform: translateX(42%) !important; }
      `}</style>
    </section>
  );
}
