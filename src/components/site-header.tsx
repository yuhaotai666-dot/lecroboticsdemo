import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/products", label: "Products" },
  { to: "/solutions", label: "Solutions" },
  { to: "/roi", label: "ROI calculator" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          LEC<span className="text-primary">.</span>ROBOTICS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/book-a-demo"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:inline-block"
          >
            Book a demo
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border px-5 py-4 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/book-a-demo" onClick={() => setOpen(false)} className="block py-2.5 text-sm font-semibold text-primary">
            Book a demo
          </Link>
        </nav>
      )}
    </header>
  );
}
