export type Category = {
  id: string;
  label: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "dining", label: "Front of house", blurb: "Food running, tray return and table service." },
  { id: "cleaning", label: "Floor cleaning", blurb: "Scrub, sweep, mop and vacuum, unattended." },
  { id: "delivery", label: "Building delivery", blurb: "Lift-enabled, secure room-to-room delivery." },
  { id: "kiosk", label: "Automated kiosks", blurb: "Coffee and ice cream, made without staff." },
  { id: "industrial", label: "Industrial transport", blurb: "Heavy payloads across sites and yards." },
  { id: "education", label: "Education & R&D", blurb: "Modular platforms for teaching and prototyping." },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  positioning: string;
  price: number | null;
  priceNote?: string;
  finance: string | null;
  image: string;
  specs: { label: string; value: string }[];
  badge?: "New" | "Popular";
  brochure?: string;
};

/**
 * Prices and specs taken from lecrobotics.ai product pages (Sept 2026).
 * Anything not published there is left null rather than invented.
 */
export const products: Product[] = [
  {
    slug: "dinerbot-t10",
    name: "Dinerbot T10",
    category: "dining",
    tagline: "Delivery robot. Digital display. Two jobs at once.",
    positioning: "Premium advertising & service robot",
    price: 8247,
    finance: "£192 / wk",
    badge: "Popular",
    image: "/__l5e/assets-v1/c1078acb-4c35-4b6b-801e-6c18e8f658b3/dinerbot-t10.webp",
    brochure:
      "https://cdn.prod.website-files.com/6a20051eaff93cc35362905a/6a229307ac93e535a0880f9e_LEC%20Dinerbot%20T10%20Spec%20Sheet.pdf",
    specs: [
      { label: "Total load capacity", value: "40 kg" },
      { label: "Battery life", value: "Up to 18 h" },
      { label: "Moving speed", value: "0.1–1.0 m/s" },
      { label: "Advertising screen", value: "23.8\" HD + 11.6\" touch" },
    ],
  },
  {
    slug: "dinerbot-t9",
    name: "Dinerbot T9",
    category: "dining",
    tagline: "High load. High volume. Reliable every shift.",
    positioning: "High-capacity service robot",
    price: 5616,
    finance: "£131 / wk",
    image: "/__l5e/assets-v1/75e9e12f-c34f-484c-ac05-19ae49513d5c/dinerbot-t9.webp",
    specs: [
      { label: "Total load capacity", value: "40 kg" },
      { label: "Battery life", value: "Up to 15 h" },
      { label: "Moving speed", value: "1.0 m/s" },
      { label: "Advertising screen", value: "—" },
    ],
  },
  {
    slug: "dinerbot-t8",
    name: "Dinerbot T8",
    category: "dining",
    tagline: "Compact. Autonomous. Keeps service moving.",
    positioning: "Ultra-narrow service robot",
    price: 5418,
    finance: "£126 / wk",
    image:
      "https://cdn.prod.website-files.com/6a20051eaff93cc35362905a/6a20051eaff93cc3536291eb_Transparent%20image%20(4).svg",
    specs: [
      { label: "Total load capacity", value: "20 kg" },
      { label: "Battery life", value: "9–12.5 h" },
      { label: "Moving speed", value: "1.0 m/s" },
      { label: "Advertising screen", value: "—" },
    ],
  },
  {
    slug: "kleenbot-c40",
    name: "Kleenbot C40",
    category: "cleaning",
    tagline: "4-in-1 intelligent floor cleaning.",
    positioning: "Pro wet & dry separation system",
    price: 11019,
    finance: "£256 / wk",
    image: "/__l5e/assets-v1/6d2db49e-4294-482f-97a8-3f63147eaf5b/kleenbot-c40.webp",
    specs: [
      { label: "Cleaning modes", value: "Sweep · Scrub · Mop · Vacuum" },
      { label: "Water system", value: "Wet & dry separation" },
      { label: "Operation", value: "Unattended, scheduled" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "kleenbot-c30",
    name: "Kleenbot C30",
    category: "cleaning",
    tagline: "3-in-1 intelligent floor cleaning.",
    positioning: "Mid-size autonomous scrubber",
    price: 7623,
    finance: "£177 / wk",
    image: "/__l5e/assets-v1/e4f54dda-4a46-4fcc-a7d6-299e336d0c19/kleenbot-c30.webp",
    specs: [
      { label: "Cleaning modes", value: "Sweep · Scrub · Mop" },
      { label: "Operation", value: "Unattended, scheduled" },
      { label: "Deployment", value: "Retail, facilities, transport" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "butlerbot-w3",
    name: "Butlerbot W3",
    category: "delivery",
    tagline: "Secure delivery. Any floor. Any room.",
    positioning: "Lift-integrated hotel delivery robot",
    price: 11712,
    finance: "£273 / wk",
    image: "/__l5e/assets-v1/7b967c64-211a-4115-8761-4f0b928facc3/butlerbot-w3.webp",
    specs: [
      { label: "Compartment", value: "Lockable, secure" },
      { label: "Lift integration", value: "Yes" },
      { label: "Deployment", value: "Hotels, residential, hospitals" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "courier-s100",
    name: "Courier S100",
    category: "industrial",
    tagline: "100 kg. Autonomous. Works where people can't.",
    positioning: "Heavy-payload industrial courier",
    price: 9633,
    finance: "£224 / wk",
    image: "/__l5e/assets-v1/f56de82e-5025-42f6-9e62-3801b9cf721d/courier-s100.webp",
    specs: [
      { label: "Payload", value: "100 kg" },
      { label: "Environment", value: "Indoor & sheltered outdoor" },
      { label: "Deployment", value: "Warehousing, logistics, manufacturing" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "xbot-s-pro",
    name: "Xbot S Pro",
    category: "kiosk",
    tagline: "Barista-quality coffee. Fully automated.",
    positioning: "Robotic coffee kiosk",
    price: 85000,
    finance: "£545 / wk (36 months)",
    image: "/__l5e/assets-v1/beaa4357-dc95-4ed9-9c55-b48691662a35/xbot-s-pro.webp",
    specs: [
      { label: "Output", value: "Barista-spec espresso menu" },
      { label: "Staffing", value: "Unattended" },
      { label: "Deployment", value: "Transport hubs, offices, retail" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "xbot-ic",
    name: "Xbot IC",
    category: "kiosk",
    tagline: "Freshly made ice cream. No staff. Any hour.",
    positioning: "Robotic ice cream kiosk",
    price: 21999,
    finance: "£669 / mo",
    image: "/__l5e/assets-v1/03348529-f7dd-4bbc-9acb-56faa8af7874/xbot-ic.webp",
    specs: [
      { label: "Output", value: "Soft serve, made to order" },
      { label: "Staffing", value: "Unattended" },
      { label: "Deployment", value: "Leisure, retail, transport" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "xbot-lite",
    name: "Xbot Lite",
    category: "kiosk",
    tagline: "Compact automated coffee, in a smaller footprint.",
    positioning: "Entry-level robotic coffee kiosk",
    price: null,
    priceNote: "Enquire for pricing",
    finance: null,
    badge: "New",
    image: "/__l5e/assets-v1/beaa4357-dc95-4ed9-9c55-b48691662a35/xbot-s-pro.webp",
    specs: [
      { label: "Output", value: "Espresso menu" },
      { label: "Staffing", value: "Unattended" },
      { label: "Footprint", value: "Compact" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
  {
    slug: "ugot",
    name: "UGOT",
    category: "education",
    tagline: "Configure it. Program it. Put it to work.",
    positioning: "Modular robotics platform",
    price: null,
    priceNote: "Enquire for pricing",
    finance: null,
    image:
      "https://cdn.prod.website-files.com/6a20051eaff93cc35362905a/6a20051eaff93cc3536291f0_Transparent%20image.svg",
    specs: [
      { label: "Format", value: "Modular, reconfigurable" },
      { label: "Use", value: "Teaching, research, prototyping" },
      { label: "Programming", value: "Block & code" },
      { label: "Compliance", value: "UKCA · CE" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (p: Product) =>
  p.price === null ? (p.priceNote ?? "Enquire") : `£${p.price.toLocaleString("en-GB")}`;
