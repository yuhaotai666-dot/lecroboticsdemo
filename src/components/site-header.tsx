import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  aboutMenu,
  caseMenu,
  industryMenu,
  productGroups,
  productImage as img,
  resourceMenu,
  supportMenu,
} from "@/lib/nav";

type MenuKey = "products" | "industries" | "cases" | "resources" | "about" | "support";

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const overlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  const solid = !overlay || scrolled || open !== null;

  const trigger = (key: MenuKey, label: string, to: string) => (
    <div className="relative" onMouseEnter={() => setOpen(key)}>
      <Link
        to={to}
        className="flex items-center gap-1 py-5 text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
        activeProps={{ className: "text-primary" }}
      >
        {label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open === key ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </Link>
    </div>
  );

  return (
    <header
      onMouseLeave={() => setOpen(null)}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-5">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
          LEC<span className="text-primary">.</span>ROBOTICS
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {trigger("products", "Products", "/products")}
          {trigger("industries", "Industries", "/industries")}
          {trigger("cases", "Case Studies", "/case-studies")}
          {trigger("resources", "Resources", "/resources")}
          {trigger("about", "About Us", "/about")}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block" onMouseEnter={() => setOpen("support")}>
            <Link
              to="/support"
              className="rounded-full border border-primary/30 px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Support
            </Link>
          </div>
          <Link
            to="/book-a-demo"
            className="hidden rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:inline-block"
          >
            Book a demo
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mega / dropdown panels */}
      {open && (
        <div className="absolute inset-x-0 top-full hidden border-t border-border/60 bg-background/95 shadow-[0_8px_24px_-16px_rgb(0_0_0/0.12)] backdrop-blur-xl lg:block">
          <div className="mx-auto max-w-6xl px-5 py-9">
            {open === "products" && (
              <>
                <div className="grid gap-8 md:grid-cols-4">
                  {productGroups.map((g) => (
                    <div key={g.title}>
                      <p className="label-mono text-muted-foreground">{g.title}</p>
                      <ul className="mt-4 space-y-1">
                        {g.items.map((it) => (
                          <li key={it.slug}>
                            <Link
                              to="/products/$slug"
                              params={{ slug: it.slug }}
                              className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-accent/50"
                            >
                              <img
                                src={img(it.slug)}
                                alt={it.name}
                                loading="lazy"
                                className="size-12 shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
                              />
                              <span>
                                <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                                  {it.name}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                  {it.blurb}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-7 border-t border-border/60 pt-5">
                  <Link to="/products" className="text-sm font-medium text-primary">
                    View All Products →
                  </Link>
                </div>
              </>
            )}

            {open === "industries" && (
              <>
                <div className="grid gap-x-8 gap-y-5 md:grid-cols-3">
                  {industryMenu.map((ind) => (
                    <Link
                      key={ind.slug}
                      to="/industries"
                      hash={ind.slug}
                      className="group rounded-lg p-2 transition-colors hover:bg-accent/50"
                    >
                      <p className="text-sm font-medium text-foreground group-hover:text-primary">{ind.name}</p>
                      <p className="mt-1 text-xs leading-snug text-muted-foreground">{ind.blurb}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-7 border-t border-border/60 pt-5">
                  <Link to="/industries" className="text-sm font-medium text-primary">
                    Explore All Industries →
                  </Link>
                </div>
              </>
            )}

            {open === "cases" && (
              <div className="grid gap-2 md:grid-cols-4">
                {caseMenu.map((c) => (
                  <Link
                    key={c.hash}
                    to="/case-studies"
                    hash={c.hash}
                    className="rounded-lg p-2 text-sm text-foreground/85 transition-colors hover:bg-accent/50 hover:text-primary"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            )}

            {open === "resources" && (
              <DropdownList to="/resources" items={resourceMenu} />
            )}
            {open === "about" && (
              <DropdownList
                to="/about"
                items={[...aboutMenu, { hash: "contact", label: "Contact Us", blurb: "Talk to the team." }]}
              />
            )}
            {open === "support" && <DropdownList to="/support" items={supportMenu} />}
          </div>
        </div>
      )}

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 overflow-y-auto bg-background px-5 py-6 lg:hidden">
          <MobileGroup
            k="products"
            label="Products"
            active={mobileSection}
            onToggle={setMobileSection}
          >
            {productGroups.flatMap((g) => g.items).map((it) => (
              <Link
                key={it.slug}
                to="/products/$slug"
                params={{ slug: it.slug }}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {it.name}
              </Link>
            ))}
            <Link to="/products" onClick={() => setMobileOpen(false)} className="block py-2 text-sm text-primary">
              View All Products →
            </Link>
          </MobileGroup>

          <MobileGroup k="industries" label="Industries" active={mobileSection} onToggle={setMobileSection}>
            {industryMenu.map((ind) => (
              <Link
                key={ind.slug}
                to="/industries"
                hash={ind.slug}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {ind.name}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup k="cases" label="Case Studies" active={mobileSection} onToggle={setMobileSection}>
            {caseMenu.map((c) => (
              <Link
                key={c.hash}
                to="/case-studies"
                hash={c.hash}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {c.label}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup k="resources" label="Resources" active={mobileSection} onToggle={setMobileSection}>
            {resourceMenu.map((r) => (
              <Link
                key={r.hash}
                to="/resources"
                hash={r.hash}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {r.label}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup k="about" label="About Us" active={mobileSection} onToggle={setMobileSection}>
            {aboutMenu.map((a) => (
              <Link
                key={a.hash}
                to="/about"
                hash={a.hash}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {a.label}
              </Link>
            ))}
          </MobileGroup>

          <MobileGroup k="support" label="Support" active={mobileSection} onToggle={setMobileSection}>
            {supportMenu.map((s) => (
              <Link
                key={s.hash}
                to="/support"
                hash={s.hash}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-muted-foreground"
              >
                {s.label}
              </Link>
            ))}
          </MobileGroup>

          <Link
            to="/book-a-demo"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
          >
            Book a demo
          </Link>
        </div>
      )}
    </header>
  );
}

function DropdownList({
  to,
  items,
}: {
  to: "/resources" | "/about" | "/support";
  items: readonly { hash: string; label: string; blurb: string }[];
}) {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {items.map((it) => (
        <Link
          key={it.hash}
          to={to}
          hash={it.hash}
          className="group rounded-lg p-3 transition-colors hover:bg-accent/50"
        >
          <p className="text-sm font-medium text-foreground group-hover:text-primary">{it.label}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{it.blurb}</p>
        </Link>
      ))}
    </div>
  );
}

function MobileGroup({
  k,
  label,
  active,
  onToggle,
  children,
}: {
  k: MenuKey;
  label: string;
  active: MenuKey | null;
  onToggle: (v: MenuKey | null) => void;
  children: React.ReactNode;
}) {
  const isOpen = active === k;
  return (
    <div className="border-b border-border/60">
      <button
        type="button"
        onClick={() => onToggle(isOpen ? null : k)}
        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-foreground"
      >
        {label}
        <ChevronDown className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
}
