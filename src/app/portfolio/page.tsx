import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <ComingSoon
      eyebrow="Proof, Not Promises"
      title="Portfolio"
      blurb="Full case studies with metrics, tech stacks and client testimonials. The filterable portfolio is coming soon."
    />
  );
}
