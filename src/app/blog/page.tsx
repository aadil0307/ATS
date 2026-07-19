import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering deep-dives, architecture teardowns and product lessons from the Ace Tech team.",
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: "Blog — Ace Tech Solutions",
    description:
      "Engineering deep-dives, architecture teardowns and product lessons from the Ace Tech team.",
    url: `${SITE}/blog`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

const POSTS = [
  {
    category: "Architecture",
    title: "Shipping a 2M-user fintech app on one Next.js codebase",
    excerpt:
      "How we unified payments, wallet and banking onto a single typed platform — and cut onboarding 40%.",
    read: "8 min read",
  },
  {
    category: "AI",
    title: "Building an on-call copilot that actually helps",
    excerpt:
      "A practical RAG + agent setup for incident triage, with the eval harness that kept it honest.",
    read: "11 min read",
  },
  {
    category: "DevOps",
    title: "Making deploys boring (in a good way)",
    excerpt:
      "Terraform, progressive delivery and observability patterns that took our MTTR to near zero.",
    read: "9 min read",
  },
  {
    category: "Design",
    title: "Accessible by default: our design-system checklist",
    excerpt:
      "The concrete rules we bake into every component so WCAG stops being a last-minute scramble.",
    read: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thoughts & Teardowns"
        title="Field notes from the build"
        description="Engineering deep-dives, architecture teardowns and product lessons. The first posts are being written — here's what's in the pipeline."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <article className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-blue-bright">
                    {p.category}
                  </span>
                  <Tag variant="gold">Drafting</Tag>
                </div>
                <h3 className="mt-4 text-xl font-bold leading-snug text-ice">
                  {p.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-silver">
                  {p.excerpt}
                </p>
                <div className="mt-6 border-t border-white/10 pt-5 text-xs text-silver">
                  {p.read}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
