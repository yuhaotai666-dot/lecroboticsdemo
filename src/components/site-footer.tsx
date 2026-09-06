import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import {
  aboutMenu,
  caseMenu,
  industryMenu,
  productGroups,
  resourceMenu,
  supportMenu,
} from "@/lib/nav";

const linkClass =
  "text-sm text-muted-foreground transition-colors duration-200 hover:text-primary";

const socials = [
  { label: "LinkedIn", Icon: Linkedin },
  { label: "YouTube", Icon: Youtube },
  { label: "TikTok", Icon: Music2 },
  { label: "Instagram", Icon: Instagram },
  { label: "X", Icon: Twitter },
];

type ColumnKey = "products" | "industries" | "cases" | "resources" | "about" | "support";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState<ColumnKey | null>(null);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing — you're on the list.");
    setEmail("");
  };

  const columns: { key: ColumnKey; title: string; body: React.ReactNode }[] = [
    {
      key: "products",
      title: "Products",
      body: (
        <>
          {productGroups.map((g) => (
            <li key={g.title}>
              <Link to="/products" className={linkClass}>
                {g.title}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/products" className="text-sm font-medium text-primary">
              View All Products →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "industries",
      title: "Industries",
      body: (
        <>
          {industryMenu.slice(0, 6).map((ind) => (
            <li key={ind.slug}>
              <Link to="/industries" hash={ind.slug} className={linkClass}>
                {ind.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/industries" className="text-sm font-medium text-primary">
              View All Industries →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "cases",
      title: "Case Studies",
      body: (
        <>
          {caseMenu.slice(0, 6).map((c) => (
            <li key={c.hash}>
              <Link to="/case-studies" hash={c.hash} className={linkClass}>
                {c.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/case-studies" className="text-sm font-medium text-primary">
              View All Case Studies →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "resources",
      title: "Resources",
      body: (
        <>
          {resourceMenu.map((r) => (
            <li key={r.hash}>
              <Link to="/resources" hash={r.hash} className={linkClass}>
                {r.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/resources" hash="downloads" className={linkClass}>
              Product Brochures
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "about",
      title: "About Us",
      body: aboutMenu.map((a) => (
        <li key={a.hash}>
          <Link to="/about" hash={a.hash} className={linkClass}>
            {a.label}
          </Link>
        </li>
      )),
    },
    {
      key: "support",
      title: "Support",
      body: (
        <>
          <li>
            <Link to="/support" className={linkClass}>
              Service &amp; Support
            </Link>
          </li>
          {supportMenu.map((s) => (
            <li key={s.hash}>
              <Link to="/support" hash={s.hash} className={linkClass}>
                {s.label}
              </Link>
            </li>
          ))}
        </>
      ),
    },
  ];

  return (
    <footer className="border-t border-border bg-card">
      {/* Newsletter */}
      <div className="border-b border-border/60 bg-catalog/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="max-w-md">
            <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground">
              LEC<span className="text-primary">.</span>ROBOTICS
            </Link>
            <p className="mt-5 font-display text-xl font-medium tracking-tight text-foreground md:text-2xl">
              Subscribe to Our News
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Get product updates, robotics insights and company news.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-sm items-center gap-2">
            <label htmlFor="footer-newsletter" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Sitemap columns — desktop */}
      <div className="mx-auto hidden max-w-6xl grid-cols-3 gap-x-12 gap-y-12 px-5 py-16 md:grid xl:grid-cols-6">
        {columns.map((col) => (
          <nav key={col.key} aria-label={col.title}>
            <p className="text-[15px] font-medium text-foreground">{col.title}</p>
            <ul className="mt-4 space-y-3">{col.body}</ul>
          </nav>
        ))}
      </div>

      {/* Social — desktop */}
      <div className="mx-auto hidden max-w-6xl px-5 pb-10 md:block">
        <SocialRow />
      </div>

      {/* Mobile */}
      <div className="mx-auto max-w-6xl px-5 py-10 md:hidden">
        <SocialRow />
        <div className="mt-8 divide-y divide-border/60 border-y border-border/60">
          {columns.map((col) => {
            const open = openSection === col.key;
            return (
              <div key={col.key}>
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenSection(open ? null : col.key)}
                  className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-foreground"
                >
                  {col.title}
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && <ul className="space-y-3 pb-5 pl-1">{col.body}</ul>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LEC Robotics. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms of Use
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialRow() {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, Icon }) => (
        <a
          key={label}
          href="#"
          aria-label={`${label} (coming soon)`}
          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary"
        >
          <Icon className="size-4" strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}
