import type { Metadata } from "next";
import ComingSoon from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <ComingSoon
      eyebrow="Thoughts & Teardowns"
      title="Blog"
      blurb="Engineering deep-dives, architecture teardowns and product lessons. The blog goes live soon."
    />
  );
}
