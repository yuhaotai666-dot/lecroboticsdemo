import { Link } from "@tanstack/react-router";
import { products } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight">
            LEC<span className="text-primary">.</span>ROBOTICS
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Commercial service robotics, deployed and operated in the UK. UKCA certified, CE marked.
          </p>
        </div>

        <div>
          <p className="label-mono text-muted-foreground">Products</p>
          <ul className="mt-4 space-y-2 text-sm">
            {products.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products" className="text-primary">
                All robots →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label-mono text-muted-foreground">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/solutions" className="text-muted-foreground transition-colors hover:text-foreground">
                Industry solutions
              </Link>
            </li>
            <li>
              <Link to="/roi" className="text-muted-foreground transition-colors hover:text-foreground">
                ROI calculator
              </Link>
            </li>
            <li>
              <Link to="/book-a-demo" className="text-muted-foreground transition-colors hover:text-foreground">
                Book a demo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label-mono text-muted-foreground">Showroom</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Chelsea, London
            <br />
            Live demonstrations by appointment.
          </p>
        </div>
      </div>

      <div className="border-t border-border px-5 py-6">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground">
          © {new Date().getFullYear()} LEC Robotics. Prices shown exclude VAT.
        </p>
      </div>
    </footer>
  );
}
