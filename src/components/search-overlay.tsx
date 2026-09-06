import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { products } from "@/lib/products";
import { industryMenu } from "@/lib/nav";
import { useI18n } from "@/lib/i18n/i18n-context";

type Result = {
  kind: "product" | "industry" | "page";
  label: string;
  hint?: string;
  image?: string;
  to: string;
  params?: Record<string, string>;
  hash?: string;
};

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const pages: Result[] = useMemo(
    () => [
      { kind: "page", label: t("nav.caseStudies"), to: "/case-studies" },
      { kind: "page", label: t("nav.resources"), to: "/resources" },
      { kind: "page", label: t("nav.about"), to: "/about" },
      { kind: "page", label: t("nav.support"), to: "/support" },
      { kind: "page", label: t("nav.bookDemo"), to: "/book-a-demo" },
      { kind: "page", label: t("roi.kicker"), to: "/roi" },
    ],
    [t],
  );

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    const productResults: Result[] = products.map((p) => ({
      kind: "product",
      label: p.name,
      hint: t(`prod.${p.slug}.positioning`),
      image: p.image,
      to: "/products/$slug",
      params: { slug: p.slug },
    }));
    const industryResults: Result[] = industryMenu.map((ind) => ({
      kind: "industry",
      label: t(`ind.${ind.slug}.name`),
      hint: t(`ind.${ind.slug}.blurb`),
      to: "/industries",
      hash: ind.slug,
    }));
    const all = [...productResults, ...industryResults, ...pages];
    if (!q) return [];
    return all.filter(
      (r) => r.label.toLowerCase().includes(q) || r.hint?.toLowerCase().includes(q),
    );
  }, [query, t, pages]);

  useEffect(() => setActive(0), [results.length]);

  if (!open) return null;

  const go = (r: Result) => {
    onClose();
    navigate({
      to: r.to as never,
      params: r.params as never,
      hash: r.hash,
    });
  };

  const groups: { key: string; title: string; items: { r: Result; idx: number }[] }[] = [];
  const kinds: [Result["kind"], string][] = [
    ["product", t("search.products")],
    ["industry", t("search.industries")],
    ["page", t("search.pages")],
  ];
  kinds.forEach(([kind, title]) => {
    const items = results
      .map((r, idx) => ({ r, idx }))
      .filter(({ r }) => r.kind === kind);
    if (items.length) groups.push({ key: kind, title, items });
  });

  return (
    <div className="absolute inset-x-0 top-full z-50 border-t border-border/60 bg-background/95 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.12)] backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-5 py-6">
        <div className="flex items-center gap-3 rounded-lg border border-input bg-background px-4 transition-colors focus-within:border-primary">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active]);
              }
            }}
            placeholder={t("search.placeholder")}
            aria-label={t("search.open")}
            className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>

        {query.trim() && (
          <div className="mt-4 max-h-[55vh] overflow-y-auto">
            {groups.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                {t("search.noResults")}
              </p>
            ) : (
              groups.map((g) => (
                <div key={g.key} className="mb-4">
                  <p className="label-mono text-muted-foreground">{g.title}</p>
                  <ul className="mt-2 space-y-0.5">
                    {g.items.map(({ r, idx }) => (
                      <li key={`${r.kind}-${r.label}`}>
                        <button
                          type="button"
                          onClick={() => go(r)}
                          onMouseEnter={() => setActive(idx)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            idx === active ? "bg-accent/60" : ""
                          }`}
                        >
                          {r.image && (
                            <img
                              src={r.image}
                              alt=""
                              loading="lazy"
                              className="size-8 shrink-0 object-contain"
                            />
                          )}
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-foreground">
                              {r.label}
                            </span>
                            {r.hint && (
                              <span className="block truncate text-xs text-muted-foreground">
                                {r.hint}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
