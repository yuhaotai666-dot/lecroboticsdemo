import { useEffect, useState } from "react";
import rangeBanner from "@/assets/keenon-range.webp.asset.json";
import serveBanner from "@/assets/keenon-serve.webp.asset.json";
import deliverBanner from "@/assets/keenon-deliver.webp.asset.json";
import cleaningBanner from "@/assets/keenon-cleaning.webp.asset.json";
import createBanner from "@/assets/keenon-create.webp.asset.json";

const slides = [
  {
    url: rangeBanner.url,
    alt: "The full LEC Robotics range: Kleenbot floor cleaners, Xbot kiosks, Dinerbot service robots, Butlerbot W3 and Courier S100",
  },
  {
    url: serveBanner.url,
    alt: "Dinerbot T10 and Dinerbot T9 smart food service robots",
  },
  {
    url: deliverBanner.url,
    alt: "Butlerbot W3 and Courier S100 autonomous delivery robots",
  },
  {
    url: cleaningBanner.url,
    alt: "Kleenbot C40 and Kleenbot C30 intelligent floor cleaning robots",
  },
  {
    url: createBanner.url,
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
    const idle =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? window.requestIdleCallback(warm, { timeout: 2000 })
        : window.setTimeout(warm, 1200);

    const id = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % slides.length;
        setMaxLoaded((m) => Math.max(m, Math.min(next + 1, slides.length - 1)));
        return next;
      });
    }, 5000);

    return () => {
      clearInterval(id);
      if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idle as number);
      } else {
        clearTimeout(idle as number);
      }
    };
  }, []);

  return (
    <div className="relative aspect-[1674/941] w-full overflow-hidden bg-muted">
      {slides.map((slide, i) =>
        i <= maxLoaded ? (
          <img
            key={slide.url}
            src={slide.url}
            alt={slide.alt}
            width={1672}
            height={941}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding={i === 0 ? "sync" : "async"}
            aria-hidden={i !== index}
          />
        ) : null,
      )}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
