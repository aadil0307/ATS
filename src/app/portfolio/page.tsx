import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import CTASection from "@/components/home/CTASection";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { CASES } from "@/lib/content/cases";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export const metadata: Metadata = {
  title: "Client Portfolio & Case Studies",
  description:
    "Explore our track record of success. See how Ace Tech Solutions has transformed businesses with scalable software, AI, and robust digital products.",
  alternates: { canonical: `${SITE}/portfolio` },
  openGraph: {
    title: "Client Portfolio & Case Studies | Ace Tech Solutions",
    description:
      "Explore our track record of success. See how Ace Tech Solutions has transformed businesses with scalable software, AI, and robust digital products.",
    url: `${SITE}/portfolio`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

const QUOTE = {
  text: "Ace didn't just ship the app — they shipped the metric. Onboarding dropped 40% and we haven't looked back.",
  author: "VP Engineering, Ledgerly",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Proof, Not Promises"
        title="Selected work"
        description="A few engagements where the right architecture moved a real business number. Filter by what you're trying to solve."
      />

      <Section>
        <PortfolioGrid cases={CASES} />
      </Section>

      <Section
        eyebrow="In Their Words"
        title="What partners say"
        description="We measure ourselves by the outcomes, not the output."
      >
        <figure className="relative overflow-hidden rounded-lg border border-white/10 bg-ink-soft/60 p-6 sm:p-10 md:p-14">
          <div
            className="aurora absolute -right-10 -top-10 h-48 w-48 opacity-25 sm:h-64 sm:w-64"
            aria-hidden="true"
          />
          <blockquote className="relative font-display text-lg font-medium leading-snug text-ice sm:text-xl md:text-2xl lg:text-3xl">
            “{QUOTE.text}”
          </blockquote>
          <figcaption className="relative mt-6 text-sm font-semibold text-blue-bright">
            {QUOTE.author}
          </figcaption>
        </figure>
      </Section>

      <CTASection />
    </>
  );
}
