import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products } from "@/lib/products";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies — Robot Deployments in the Field | LEC Robotics" },
      {
        name: "description",
        content:
          "Deployment stories by industry: the challenge, the robot chosen and the operational result. Filter by hospitality, retail, healthcare, logistics and public spaces.",
      },
      { property: "og:title", content: "Case Studies | LEC Robotics" },
      { property: "og:description", content: "How operators deploy LEC service robots, by industry." },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudies,
});

const filters = [
  { id: "all", label: "All" },
  { id: "food-and-beverage", label: "Food & Beverage" },
  { id: "retail", label: "Retail" },
  { id: "hospitality", label: "Hospitality" },
  { id: "industrial", label: "Industrial" },
  { id: "health-care", label: "Health Care" },
  { id: "real-estate", label: "Real Estate" },
  { id: "public-service", label: "Public Service" },
] as const;

type Study = {
  id: string;
  title: string;
  industry: string;
  industryId: string;
  robot: string;
  location: string;
  challenge: string;
  solution: string;
  result: string;
  featured?: boolean;
};

/**
 * Placeholder deployment records. Customer names, locations and figures are
 * intentionally left generic until real references are supplied.
 */
const studies: Study[] = [
  {
    id: "hotel-room-delivery",
    title: "Improving hotel room delivery efficiency",
    industry: "Hospitality",
    industryId: "hospitality",
    robot: "butlerbot-w3",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Night-shift staff spent most of the shift walking amenity and room-service runs between floors.",
    solution: "Lift-integrated delivery robot handling room-to-room drops with a lockable compartment.",
    result: "Result to be confirmed with the customer.",
    featured: true,
  },
  {
    id: "restaurant-food-running",
    title: "Food running across a high-volume dining floor",
    industry: "Food & Beverage",
    industryId: "food-and-beverage",
    robot: "dinerbot-t10",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Servers covered long distances between kitchen pass and tables during peak covers.",
    solution: "Tray-running robot with digital display used for delivery and in-venue promotion.",
    result: "Result to be confirmed with the customer.",
    featured: true,
  },
  {
    id: "retail-floor-cleaning",
    title: "Overnight floor cleaning in a retail store",
    industry: "Retail",
    industryId: "retail",
    robot: "kleenbot-c30",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Cleaning was booked out-of-hours at premium labour rates.",
    solution: "Scheduled unattended scrubbing and mopping across the sales floor.",
    result: "Result to be confirmed with the customer.",
    featured: true,
  },
  {
    id: "warehouse-transport",
    title: "Moving heavy loads between warehouse zones",
    industry: "Industrial",
    industryId: "industrial",
    robot: "courier-s100",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Repetitive point-to-point moves of heavy stock tied up trained operators.",
    solution: "100 kg autonomous courier running fixed internal routes.",
    result: "Result to be confirmed with the customer.",
  },
  {
    id: "hospital-supply-runs",
    title: "Internal supply runs in a care setting",
    industry: "Health Care",
    industryId: "health-care",
    robot: "butlerbot-w3",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Clinical staff moved linen and consumables between departments by hand.",
    solution: "Secure compartment delivery with lift access between floors.",
    result: "Result to be confirmed with the customer.",
  },
  {
    id: "property-cleaning",
    title: "Cleaning shared areas across a managed building",
    industry: "Real Estate",
    industryId: "real-estate",
    robot: "kleenbot-c40",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Large lobby and corridor areas needed daily cleaning with a small on-site team.",
    solution: "4-in-1 cleaning robot on a scheduled unattended route.",
    result: "Result to be confirmed with the customer.",
  },
  {
    id: "transport-hub-coffee",
    title: "Unattended coffee service in a public venue",
    industry: "Public Service",
    industryId: "public-service",
    robot: "xbot-s-pro",
    location: "Customer to be confirmed · United Kingdom",
    challenge: "Extended opening hours could not be staffed for a small beverage offer.",
    solution: "Robotic coffee kiosk serving a barista-spec menu without staff.",
    result: "Result to be confirmed with the customer.",
  },
];

function CaseStudies() {
  const [active, setActive] = useState<string>("all");
  const shown = active === "all" ? studies : studies.filter((s) => s.industryId === active);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20 pb-10">
        <p className="label-mono text-primary">Case Studies</p>
        <h1 className="mt-4 max-w-3xl text-4xl md:text-5xl">Robots at work, site by site.</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Deployment records grouped by industry. Customer names and measured results are added once each
          reference is signed off.
        </p>
      </section>

      <div className="border-t border-border bg-catalog">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/80 hover:border-primary hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div id="featured" className="mt-10 grid gap-5 scroll-mt-24 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((s) => {
              const robot = products.find((p) => p.slug === s.robot);
              return (
                <article
                  key={s.id}
                  id={s.industryId}
                  className="flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-accent/70 to-card">
                    {robot && (
                      <img
                        src={robot.image}
                        alt={`${robot.name} deployed for ${s.industry.toLowerCase()}`}
                        loading="lazy"
                        className="h-32 w-auto object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-base font-semibold text-catalog-title">{s.title}</h2>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {robot?.name} · {s.industry}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.location}</p>

                    <dl className="mt-5 space-y-3 text-xs leading-relaxed">
                      <div>
                        <dt className="label-mono text-muted-foreground">Challenge</dt>
                        <dd className="mt-1 text-catalog-copy">{s.challenge}</dd>
                      </div>
                      <div>
                        <dt className="label-mono text-muted-foreground">Solution</dt>
                        <dd className="mt-1 text-catalog-copy">{s.solution}</dd>
                      </div>
                      <div>
                        <dt className="label-mono text-muted-foreground">Result</dt>
                        <dd className="mt-1 text-catalog-copy">{s.result}</dd>
                      </div>
                    </dl>

                    <div className="mt-6 pt-2">
                      <Link
                        to="/products/$slug"
                        params={{ slug: s.robot }}
                        className="text-sm font-medium text-primary"
                      >
                        Read case study →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {shown.length === 0 && (
            <p className="mt-12 text-sm text-muted-foreground">
              No deployments listed for this sector yet. <Link to="/book-a-demo" className="text-primary">Talk to us</Link> about a pilot.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
