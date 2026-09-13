import { useEffect, useState } from "react";
import rangeBannerUrl from "@/assets/keenon-range-1920.webp";
import serveBanner from "@/assets/keenon-serve-scene.webp";
import deliverBanner from "@/assets/keenon-deliver-scene.webp";
import cleaningBanner from "@/assets/keenon-cleaning-scene.webp";
import createBanner from "@/assets/keenon-create-scene.webp";

const slides = [
  {
    url: rangeBannerUrl,
    alt: "The full LEC Robotics range: Kleenbot floor cleaners, Xbot kiosks, Dinerbot service robots, Butlerbot W3 and Courier S100",
  },
  {
    url: serveBanner,
    alt: "Dinerbot T10 and Dinerbot T9 smart food service robots",
  },
  {
    url: deliverBanner,
    alt: "Butlerbot W3 and Courier S100 autonomous delivery robots",
  },
  {
    url: cleaningBanner,
    alt: "Kleenbot C40 and Kleenbot C30 intelligent floor cleaning robots",
  },
  {
    url: createBanner,
    alt: "Xbot S Pro automated coffee robot and Xbot IC ice cream kiosk",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  // Only the first slide loads with the page; the rest are fetched after
  // first paint, then always one step ahead of what is on screen.
  const [maxLoaded, setMaxLoaded] = useState(0);

  useEffect(() => {
    const warm = () => setMaxLoaded((m) => Math.max(m, 1));
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    const usedIdle = typeof w.requestIdleCallback === "function";
    const idle: number = usedIdle
      ? w.requestIdleCallback!(warm, { timeout: 2000 })
      : window.setTimeout(warm, 1200);

    // Auto-advance is decorative: respect a reduced-motion preference, and stop
    // burning frames while the tab is in the background.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let id: number | undefined;

    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };

    const start = () => {
      if (id !== undefined || reduceMotion.matches || document.hidden) return;
      id = window.setInterval(() => {
        setIndex((i) => {
          const next = (i + 1) % slides.length;
          setMaxLoaded((m) => Math.max(m, Math.min(next + 1, slides.length - 1)));
          return next;
        });
      }, 5000);
    };

    const sync = () => {
      stop();
      start();
    };

    start();
    document.addEventListener("visibilitychange", sync);
    reduceMotion.addEventListener?.("change", sync);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", sync);
      reduceMotion.removeEventListener?.("change", sync);
      if (usedIdle && typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white sm:aspect-[16/9] lg:aspect-[8/3] lg:max-h-[46vh]">
      {slides.map((slide, i) =>
        i <= maxLoaded ? (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            width={1920}
            height={720}
            className={`absolute inset-0 h-full w-full object-cover object-center lg:object-bottom transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}

            aria-hidden={i !== index}
          />
        ) : null,
      )}
      <div className="absolute right-4 bottom-3 z-10 flex gap-2 sm:right-6 sm:bottom-4">
        {slides.map((slide, i) => (
          <button
            key={slide.url}
            type="button"
            onClick={() => {
              setIndex(i);
              setMaxLoaded((m) => Math.max(m, i));
            }}
            aria-label={`Show slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-foreground/25 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
