import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/home/CTASection";
import { site } from "@/lib/site";

const SITE = site.url;

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a small, senior product team that ships. Open roles in engineering, AI, design and delivery — remote-first, outcome-driven.",
  alternates: { canonical: `${SITE}/careers` },
  openGraph: {
    title: "Careers — Ace Tech Solutions",
    description:
      "Join a small, senior product team that ships. Open roles in engineering, AI, design and delivery — remote-first, outcome-driven.",
    url: `${SITE}/careers`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

const ROLES = [
  {
    title: "Senior Frontend Engineer",
    type: "Full-time",
    location: "Remote (IN)",
    desc: "Own Next.js + React surfaces end to end. Strong TypeScript, accessibility and performance instincts required.",
  },
  {
    title: "AI Engineer",
    type: "Full-time",
    location: "Remote (IN)",
    desc: "Build RAG pipelines, agents and eval harnesses. Comfortable with Python, LLM APIs and shipping to production.",
  },
  {
    title: "Platform / DevOps Engineer",
    type: "Full-time",
    location: "Remote (IN)",
    desc: "Terraform, Kubernetes, CI/CD and observability. You make deploys boring and incidents rare.",
  },
  {
    title: "Product Designer",
    type: "Full-time",
    location: "Hybrid (Bengaluru)",
    desc: "Design systems, interaction and research. You sweat the details and can defend every pixel.",
  },
  {
    title: "Engineering Manager",
    type: "Full-time",
    location: "Hybrid (Bengaluru)",
    desc: "Lead a delivery pod. You protect focus, unblock the team and care about the outcome, not the timesheet.",
  },
];

const CULTURE = [
  "Remote-first, async by default — we optimise for deep work.",
  "Small teams, real ownership, no theatre.",
  "Learn out loud; review kindly; ship weekly.",
  "We pay for impact, not hours logged.",
];

const applyHref = (role: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(`Application: ${role}`)}`;

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the Squad"
        title="Build things that ship"
        description="We're a small, senior team that owns outcomes. If you'd rather ship a metric than a status update, we should talk."
      />

      <Section
        eyebrow="Open Roles"
        title="We're hiring"
        description="Don't see your role? Tell us what you'd do here — we read every note."
      >
        <div className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.04}>
              <div className="flex flex-col gap-4 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-bold text-ice">{r.title}</h3>
                    <span className="rounded-pill border border-white/15 px-3 py-0.5 text-xs text-silver">
                      {r.type}
                    </span>
                    <span className="rounded-pill border border-white/15 px-3 py-0.5 text-xs text-silver">
                      {r.location}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-silver">
                    {r.desc}
                  </p>
                </div>
                <a
                  href={applyHref(r.title)}
                  className="inline-flex shrink-0 items-center gap-1 self-start text-sm font-semibold text-blue-bright transition-transform hover:translate-x-1 sm:self-center"
                >
                  Apply <span aria-hidden="true">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How We Work"
        title="The culture, briefly"
        description="A few things we actually practice — not the poster on the wall."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {CULTURE.map((c, i) => (
            <Reveal key={c} delay={(i % 2) * 0.06}>
              <li className="flex h-full items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-6 text-sm leading-relaxed text-silver">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-bright"
                  aria-hidden="true"
                />
                {c}
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      <CTASection />
    </>
  );
}
