import { createFileRoute } from "@tanstack/react-router";
import { RestaurantScene } from "@/components/landing/RestaurantScene";
import { MachineAgencyHeader } from "@/components/landing/MachineAgencyHeader";

export const Route = createFileRoute("/landing")({
  head: () => ({
    meta: [
      { title: "Landing" },
      { name: "description", content: "Landing page in progress." },
      { property: "og:title", content: "Landing" },
      { property: "og:description", content: "Landing page in progress." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main>
      <RestaurantScene />
      <MachineAgencyHeader />
    </main>
  );
}
