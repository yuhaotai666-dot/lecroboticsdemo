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
import { useI18n } from "@/lib/i18n/i18n-context";

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

const groupKey: Record<string, string> = {
  "Cleaning Robots": "pg.cleaning",
  "Food Service Robots": "pg.food",
  "Autonomous Delivery": "pg.delivery",
  "Automated Food & Beverage": "pg.fnb",
};

const caseKey = (hash: string) =>
  hash === "featured" || hash === "industrial" || hash === "real-estate" || hash === "public-service"
    ? `case.${hash}`
    : `ind.${hash}.name`;

export function SiteFooter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [openSection, setOpenSection] = useState<ColumnKey | null>(null);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success(t("footer.newsletter.toast"));
    setEmail("");
  };

  const columns: { key: ColumnKey; title: string; body: React.ReactNode }[] = [
    {
      key: "products",
      title: t("nav.products"),
      body: (
        <>
          {productGroups.map((g) => (
            <li key={g.title}>
              <Link to="/products" className={linkClass}>
                {t(groupKey[g.title] ?? "")}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/products" className="text-sm font-medium text-primary">
              {t("footer.viewAllProducts")} →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "industries",
      title: t("nav.industries"),
      body: (
        <>
          {industryMenu.slice(0, 6).map((ind) => (
            <li key={ind.slug}>
              <Link to="/industries" hash={ind.slug} className={linkClass}>
                {t(`ind.${ind.slug}.name`)}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/industries" className="text-sm font-medium text-primary">
              {t("footer.viewAllIndustries")} →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "cases",
      title: t("nav.caseStudies"),
      body: (
        <>
          {caseMenu.slice(0, 6).map((c) => (
            <li key={c.hash}>
              <Link to="/case-studies" hash={c.hash} className={linkClass}>
                {t(caseKey(c.hash))}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/case-studies" className="text-sm font-medium text-primary">
              {t("footer.viewAllCases")} →
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "resources",
      title: t("nav.resources"),
      body: (
        <>
          {resourceMenu.map((r) => (
            <li key={r.hash}>
              <Link to="/resources" hash={r.hash} className={linkClass}>
                {t(`res.${r.hash}.label`)}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/resources" hash="downloads" className={linkClass}>
              {t("footer.productBrochures")}
            </Link>
          </li>
        </>
      ),
    },
    {
      key: "about",
      title: t("nav.about"),
      body: aboutMenu.map((a) => (
        <li key={a.hash}>
          <Link to="/about" hash={a.hash} className={linkClass}>
            {t(`about.${a.hash}.label`)}
          </Link>
        </li>
      )),
    },
    {
      key: "support",
      title: t("nav.support"),
      body: (
        <>
          <li>
            <Link to="/support" className={linkClass}>
              {t("footer.serviceSupport")}
            </Link>
          </li>
          {supportMenu.map((s) => (
            <li key={s.hash}>
              <Link to="/support" hash={s.hash} className={linkClass}>
                {t(`sup.${s.hash}.label`)}
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
              {t("footer.newsletter.title")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("footer.newsletter.sub")}
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-sm items-center gap-2">
            <label htmlFor="footer-newsletter" className="sr-only">
              {t("footer.newsletter.placeholder")}
            </label>
            <input
              id="footer-newsletter"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.newsletter.placeholder")}
              className="h-11 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
            />
            <button
              type="submit"
              aria-label={t("footer.newsletter.subscribe")}
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
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary">
              {t("footer.privacy")}
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              {t("footer.terms")}
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              {t("footer.cookies")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialRow() {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ label, Icon }) => (
        <a
          key={label}
          href="#"
          aria-label={`${label} (${t("footer.comingSoon")})`}
          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:scale-105 hover:border-primary hover:text-primary"
        >
          <Icon className="size-4" strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}
