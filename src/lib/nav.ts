import { products } from "@/lib/products";

export const productImage = (slug: string) =>
  products.find((p) => p.slug === slug)?.image ?? "";

export const productGroups = [
  {
    title: "Cleaning Robots",
    items: [
      { slug: "kleenbot-c40", name: "Kleenbot C40", blurb: "4-in-1 intelligent floor cleaning" },
      { slug: "kleenbot-c30", name: "Kleenbot C30", blurb: "3-in-1 intelligent floor cleaning" },
    ],
  },
  {
    title: "Food Service Robots",
    items: [
      { slug: "dinerbot-t10", name: "Dinerbot T10", blurb: "Delivery robot with digital display" },
      { slug: "dinerbot-t9", name: "Dinerbot T9", blurb: "High-load, high-volume food service robot" },
    ],
  },
  {
    title: "Autonomous Delivery",
    items: [
      { slug: "butlerbot-w3", name: "Butlerbot W3", blurb: "Secure indoor and room delivery" },
      { slug: "courier-s100", name: "Courier S100", blurb: "High-capacity logistics and material transport" },
    ],
  },
  {
    title: "Automated Food & Beverage",
    items: [
      { slug: "xbot-s-pro", name: "Xbot S Pro", blurb: "Fully automated robotic coffee solution" },
      { slug: "xbot-ic", name: "Xbot IC", blurb: "Automated fresh ice cream solution" },
    ],
  },
];

export const industryMenu = [
  {
    slug: "food-and-beverage",
    name: "Food & Beverage",
    blurb: "Restaurant delivery, food serving, coffee, ice cream and cleaning automation.",
    robots: ["dinerbot-t10", "dinerbot-t9", "xbot-s-pro", "xbot-ic"],
  },
  {
    slug: "retail",
    name: "Retail",
    blurb: "Customer service, automated refreshments, internal transport and floor cleaning.",
    robots: ["xbot-ic", "kleenbot-c30", "kleenbot-c40"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    blurb: "Hotel room delivery, restaurant service, guest experience and cleaning.",
    robots: ["butlerbot-w3", "dinerbot-t10", "kleenbot-c30"],
  },
  {
    slug: "industrial-logistics",
    name: "Industrial, Warehouse & Logistics",
    blurb: "Material transportation, repetitive logistics tasks and large-area cleaning.",
    robots: ["courier-s100", "kleenbot-c40"],
  },
  {
    slug: "health-care",
    name: "Health Care",
    blurb: "Internal delivery, material transport and automated cleaning.",
    robots: ["butlerbot-w3", "courier-s100", "kleenbot-c30"],
  },
  {
    slug: "transportation",
    name: "Transportation",
    blurb: "Airports, railway stations and large hubs needing cleaning and delivery automation.",
    robots: ["kleenbot-c40", "courier-s100", "dinerbot-t9"],
  },
  {
    slug: "entertainment-sports",
    name: "Entertainment & Sports",
    blurb: "Food service, refreshments, mobile delivery and venue cleaning.",
    robots: ["dinerbot-t10", "xbot-ic", "kleenbot-c40"],
  },
  {
    slug: "real-estate",
    name: "Real Estate & Property Services",
    blurb: "Building delivery, property cleaning and internal logistics.",
    robots: ["butlerbot-w3", "kleenbot-c30"],
  },
  {
    slug: "education",
    name: "Education",
    blurb: "Campus cleaning, building delivery and food service.",
    robots: ["kleenbot-c30", "butlerbot-w3", "dinerbot-t9"],
  },
  {
    slug: "public-service",
    name: "Public Service",
    blurb: "Smart service automation for exhibition halls, public facilities and large venues.",
    robots: ["kleenbot-c40", "dinerbot-t10"],
  },
] as const;

export const caseMenu = [
  { hash: "featured", label: "Featured Case Studies" },
  { hash: "food-and-beverage", label: "Food & Beverage" },
  { hash: "retail", label: "Retail" },
  { hash: "hospitality", label: "Hospitality" },
  { hash: "industrial", label: "Industrial & Logistics" },
  { hash: "health-care", label: "Health Care" },
  { hash: "real-estate", label: "Real Estate & Property" },
  { hash: "public-service", label: "Public Spaces" },
];

export const resourceMenu = [
  { hash: "news", label: "News", blurb: "Company announcements, product launches and updates." },
  { hash: "insights", label: "Insights / Blog", blurb: "Robotics trends, automation insights and technology articles." },
  { hash: "events", label: "Events", blurb: "Exhibitions, conferences and launch events." },
  { hash: "downloads", label: "Downloads", blurb: "Product brochures, datasheets and solution materials." },
];

export const aboutMenu = [
  { hash: "overview", label: "Company Overview", blurb: "Who we are and what we build." },
  { hash: "mission", label: "Mission & Vision", blurb: "Our view of human–robot collaboration." },
  { hash: "technology", label: "Technology & Innovation", blurb: "Navigation, AI and multi-robot coordination." },
  { hash: "global", label: "Global Presence", blurb: "Markets, partners and international reach." },
  { hash: "milestones", label: "Milestones", blurb: "Company and product development." },
  { hash: "careers", label: "Careers", blurb: "Join our team." },
  { hash: "contact", label: "Contact Us", blurb: "Talk to the team." },
];

export const supportMenu = [
  { hash: "repair", label: "Online Service / Repair Request", blurb: "Submit a technical or repair request." },
  { hash: "documents", label: "Documents & Manuals", blurb: "Manuals, quick-start and installation guides." },
  { hash: "plans", label: "Service Plans", blurb: "Installation, deployment and maintenance cover." },
  { hash: "faq", label: "FAQ", blurb: "Common product and service questions." },
  { hash: "contact", label: "Contact Support", blurb: "Reach the technical support team." },
];
