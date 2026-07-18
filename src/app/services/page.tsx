import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <ComingSoon
      eyebrow="What We Do"
      title="Services"
      blurb="Full-stack product development, AI & automation, cloud & DevOps, UI/UX, API integrations and security audits — each with a dedicated page. Detailed service pages are launching soon."
    />
  );
}
