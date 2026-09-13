import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";
import { industryMenu } from "@/lib/nav";
import serveSceneAsset from "@/assets/keenon-serve-scene.webp.asset.json";

const scene = industryMenu.find((i) => i.slug === "food-and-beverage")!;
const robots = products.filter((p) =>
  (scene.robots as readonly string[]).includes(p.slug)
);

const positions = [
  { size: "w-[30vw] max-w-[420px]", left: "md:left-[10%]", top: "md:top-[22%]", delay: "0s", depth: 0.6 },
  { size: "w-[22vw] max-w-[300px]", right: "md:right-[8%]", top: "md:top-[16%]", delay: "1.2s", depth: 0.4 },
  { size: "w-[24vw] max-w-[340px]", left: "md:left-[6%]", bottom: "md:bottom-[12%]", delay: "2.4s", depth: 0.5 },
  { size: "w-[18vw] max-w-[260px]", right: "md:right-[18%]", bottom: "md:bottom-[18%]", delay: "3.6s", depth: 0.3 },
];

export function RestaurantScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;
    let raf = 0;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setOffset(progress);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Restaurant scenario"
      className="scene relative min-h-screen w-full overflow-hidden bg-[#F7F3EF]"
    >
      {/* Depth 0 — background scene */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <img
          src={serveSceneAsset.url}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-20 blur-2xl"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -40}px, 0)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F3EF]/70 via-[#F7F3EF]/40 to-[#F7F3EF]/85" />
      </div>

      {/* Depth 1 — ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
        <div
          className="absolute left-[20%] top-[25%] h-80 w-80 rounded-full bg-amber-200/25 blur-3xl md:h-[28vw] md:w-[28vw]"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -70}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[20%] right-[18%] h-72 w-72 rounded-full bg-blue-200/20 blur-3xl md:h-[22vw] md:w-[22vw]"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -50}px, 0)`,
          }}
        />
      </div>

      {/* Depth 2 — soft decorative shapes */}
      <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
        <div
          className="absolute left-[8%] top-[40%] h-2 w-2 rounded-full bg-black/10 md:h-3 md:w-3"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -90}px, 0)`,
          }}
        />
        <div
          className="absolute right-[12%] top-[45%] h-3 w-3 rounded-full bg-black/10 md:h-4 md:w-4"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -110}px, 0)`,
          }}
        />
        <div
          className="absolute bottom-[35%] left-[55%] h-2 w-2 rounded-full bg-black/10 md:h-3 md:w-3"
          style={{
            transform: reducedMotion ? undefined : `translate3d(0, ${offset * -80}px, 0)`,
          }}
        />
      </div>

      {/* Depth 3 — robots */}
      <div className="relative inset-0 z-30 flex min-h-screen flex-col items-center justify-center gap-8 py-20 md:absolute md:block md:py-0">
        {robots.map((robot, i) => {
          const cfg = positions[i];
          const y = reducedMotion ? 0 : offset * (cfg.depth * 160 - 80);
          return (
            <div
              key={robot.slug}
              className={`will-change-transform ${cfg.size} ${cfg.left} ${cfg.right} ${cfg.top} ${cfg.bottom} relative md:absolute`}
              style={{
                animation: reducedMotion ? undefined : `restFloat${i + 1} ${6 + i * 0.7}s ease-in-out infinite`,
                animationDelay: reducedMotion ? undefined : cfg.delay,
                transform: `translate3d(0, ${y}px, 0)`,
              }}
            >
              <img
                src={robot.image}
                alt={robot.name}
                className="h-auto w-full object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>
          );
        })}
      </div>

      {/* Depth 5 — foreground light particles */}
      <div className="pointer-events-none absolute inset-0 z-40" aria-hidden="true">
        <div
          className="absolute left-[12%] top-[22%] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.9)] animate-ping md:h-2 md:w-2"
          style={{ animationDuration: "3s" }}
        />
        <div
          className="absolute right-[16%] top-[58%] h-1 w-1 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.9)] animate-ping md:h-1.5 md:w-1.5"
          style={{ animationDuration: "4s", animationDelay: "1.5s" }}
        />
      </div>

      <style>{`
        @keyframes restFloat1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(0.8deg); }
        }
        @keyframes restFloat2 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-0.6deg); }
        }
        @keyframes restFloat3 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes restFloat4 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-0.8deg); }
        }
      `}</style>
    </section>
  );
}
