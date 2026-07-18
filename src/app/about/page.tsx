import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <ComingSoon
      eyebrow="Our Story"
      title="About"
      blurb="Founder story, mission, values and the team behind Ace Tech. The full about page is on the way."
    />
  );
}
