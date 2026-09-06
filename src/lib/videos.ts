export type Clip = {
  id: string;
  title: string;
  /** "operation" = filmed walkthrough of the machine being used. "scene" = deployment / use-case demo. */
  kind: "operation" | "scene";
  summary: string;
  /** Real footage URL (mp4 or hosted embed). Left null until LEC supplies the file. */
  src: string | null;
  poster?: string;
  duration?: string;
};

const baseClips = (name: string, scene: string, sceneDetail: string): Clip[] => [
  {
    id: "walkthrough",
    title: `${name} — operation walkthrough`,
    kind: "operation",
    summary: `Filmed on site: powering up, route setup, loading, running a shift and returning to dock.`,
    src: null,
  },
  {
    id: "controls",
    title: `${name} — controls & daily routine`,
    kind: "operation",
    summary: "Screen controls, start/stop, refilling or unloading, and end-of-shift clean down.",
    src: null,
  },
  {
    id: "scene",
    title: `${name} in a live ${scene}`,
    kind: "scene",
    summary: sceneDetail,
    src: null,
  },
];

export const videosBySlug: Record<string, Clip[]> = {
  "dinerbot-t10": baseClips(
    "Dinerbot T10",
    "restaurant service",
    "Running food and drinks across a busy floor while the screen plays promotions between trips.",
  ),
  "dinerbot-t9": baseClips(
    "Dinerbot T9",
    "high-volume dining room",
    "Multi-tray runs at peak covers, including tray return from cleared tables.",
  ),
  "dinerbot-t8": baseClips(
    "Dinerbot T8",
    "narrow-aisle café",
    "Navigating tight gangways and pulling in beside guests without touching furniture.",
  ),
  "kleenbot-c40": baseClips(
    "Kleenbot C40",
    "retail floor overnight",
    "Scheduled sweep, scrub, mop and vacuum pass with wet and dry separation, no staff on site.",
  ),
  "kleenbot-c30": baseClips(
    "Kleenbot C30",
    "transport concourse",
    "Scheduled cleaning around passenger flow, with automatic docking and refill.",
  ),
  "butlerbot-w3": baseClips(
    "Butlerbot W3",
    "hotel delivery run",
    "Reception loads the locked compartment, the robot calls the lift and delivers to the room door.",
  ),
  "courier-s100": baseClips(
    "Courier S100",
    "warehouse transfer",
    "Moving a 100 kg load between goods-in, racking and the despatch bay.",
  ),
  "xbot-s-pro": baseClips(
    "Xbot S Pro",
    "unattended coffee kiosk",
    "Full order-to-cup cycle: payment, grind, extraction, milk texturing and hand-off.",
  ),
  "xbot-ic": baseClips(
    "Xbot IC",
    "leisure venue kiosk",
    "Soft serve made to order, cone loading and automatic cleaning cycle.",
  ),
  "xbot-lite": baseClips(
    "Xbot Lite",
    "office coffee point",
    "Compact footprint serving a floor of staff with no barista.",
  ),
  ugot: baseClips(
    "UGOT",
    "classroom session",
    "Students reconfiguring modules and programming a task end to end.",
  ),
};

export const getVideos = (slug: string) => videosBySlug[slug] ?? [];
