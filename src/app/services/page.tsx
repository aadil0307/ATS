import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import CTASection from "@/components/home/CTASection";
import { SERVICES } from "@/lib/content/services";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Full-stack product development, AI & automation, cloud & DevOps, UI/UX, API integrations and security audits — delivered by a single accountable team.",
  alternates: { canonical: `${SITE}/services` },
  openGraph: {
    title: "Services — Ace Tech Solutions",
    description:
      "Full-stack product development, AI & automation, cloud & DevOps, UI/UX, API integrations and security audits.",
    url: `${SITE}/services`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    desc: "We map the problem, constraints and success metrics before a line of code is written.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Architecture, UX and a clickable prototype so you can feel the product early.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Weekly shippable increments, typed end-to-end, with you in the loop the whole way.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Launch, measure, harden and optimise — we stay until it's fast, safe and boring.",
  },
];

const STACK = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "GCP",
  "Kubernetes",
  "Terraform",
  "PostgreSQL",
  "Redis",
  "LLMs / RAG",
  "Figma",
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Services engineered for impact"
        description="A full-stack technology partner — from first prototype to production scale. One accountable team, one process, real guarantees."
      />

      <Section
        eyebrow="How We Engage"
        title="A process built to de-risk delivery"
        description="Four phases, every engagement. You always know what's shipping next and why."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.03] p-7">
                <div className="font-mono text-sm text-blue-bright">{p.step}</div>
                <h3 className="mt-3 text-xl font-bold text-ice">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        id="capabilities"
        eyebrow="Capabilities"
        title="What we build"
        description="Six core disciplines, brought together by a single delivery team."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <TiltCard className="group h-full rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20 hover:shadow-[0_8px_40px_rgba(26,26,255,0.12)]">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[linear-gradient(135deg,rgba(26,26,255,0.12),rgba(123,47,255,0.12))] text-xl">
                  <span aria-hidden="true">{s.icon}</span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <h3 className="text-lg font-bold text-ice">{s.title}</h3>
                  <Tag variant="cyan">{s.tag}</Tag>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-silver">
                  {s.desc}
                </p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2 text-sm text-silver"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-bright"
                        aria-hidden="true"
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Stack"
        title="Technologies we trust"
        description="Modern, battle-tested tools — chosen for velocity and longevity, not hype."
      >
        <div className="flex flex-wrap gap-3">
          {STACK.map((t) => (
            <span
              key={t}
              className="rounded-pill border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-silver transition-colors hover:border-white/25 hover:text-ice"
            >
              {t}
            </span>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
