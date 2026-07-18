import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Careers",
};

export default function CareersPage() {
  return (
    <ComingSoon
      eyebrow="Join the Squad"
      title="Careers"
      blurb="Open roles, our engineering culture and how to apply. The careers page is launching soon."
    />
  );
}
