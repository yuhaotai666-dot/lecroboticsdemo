import { ArrowDown, ArrowUpRight } from "lucide-react";
import robotHandAsset from "@/assets/landing/robot-hand.png.asset.json";
import humanHandAsset from "@/assets/landing/human-hand.png.asset.json";

export function MachineAgencyHeader() {
  return (
    <section
      aria-labelledby="machine-agency-title"
      className="machine-header relative min-h-screen overflow-hidden bg-[#fdfdfd] text-[#111111]"
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

        <div className="flex flex-1 flex-col justify-center py-14 md:py-8">
          <h1 id="machine-agency-title" className="sr-only">Creative Digital Agency Studio</h1>
          <div className="relative mx-auto flex w-full max-w-[1000px] items-center justify-center" aria-hidden="true">
            <img
              src={robotHandAsset.url}
              alt=""
              width={1065}
              height={474}
              decoding="async"
              className="machine-hand machine-hand--robot relative z-10 w-[56%] object-contain"
            />
            <img
              src={humanHandAsset.url}
              alt=""
              width={1094}
              height={474}
              decoding="async"
              className="machine-hand machine-hand--human relative z-20 -ml-[12%] w-[57%] object-contain"
            />
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
        @media (max-width: 767px) {
          .machine-header { min-height: 760px; }
          .machine-hand--robot { width: 62%; }
          .machine-hand--human { width: 64%; margin-left: -20%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .machine-hand--robot, .machine-hand--human { animation: none; }
        }
      `}</style>
    </section>
  );
}