import { useEffect, useRef, useState } from "react";
import { Check, Globe } from "lucide-react";
import { locales } from "@/lib/i18n/locales";
import { useI18n } from "@/lib/i18n/i18n-context";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
      >
        <Globe className="size-4" strokeWidth={1.8} />
        <span className="uppercase">{locale}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-background p-1.5 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.15)]">
          {locales.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                l.code === locale
                  ? "font-medium text-primary"
                  : "text-foreground/85 hover:bg-accent/50 hover:text-primary"
              }`}
            >
              {l.label}
              {l.code === locale && <Check className="size-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
