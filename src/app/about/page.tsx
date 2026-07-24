import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/home/CTASection";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acetech.in";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ace Tech is a founder-led product engineering team. We build digital products, scale engineering, and ship fast — with craft and honesty.",
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: "About — Ace Tech Solutions",
    description:
      "A founder-led product engineering team. We build digital products, scale engineering, and ship fast — with craft and honesty.",
    url: `${SITE}/about`,
    siteName: "Ace Tech Solutions",
    type: "website",
  },
};

const VALUES = [
  {
    title: "Ship, don't stall",
    desc: "We optimise for working software in users' hands. Demos over decks, every week.",
  },
  {
    title: "Craft is non-negotiable",
    desc: "Typed, tested, accessible and fast. The details are the product.",
  },
  {
    title: "Honest by default",
    desc: "Straight talk on what's possible, what it costs and what we'd do instead.",
  },
  {
    title: "Partners, not vendors",
    desc: "We're in the outcome with you — accountable for the metric, not the timesheet.",
  },
  {
    title: "Velocity with guardrails",
    desc: "Speed from good architecture and automation, never from cutting corners.",
  },
  {
    title: "Own the result",
    desc: "We stay until it's fast, safe and boring in production. Then we improve it.",
  },
];

const TEAM = [
  { name: "Mohammad Aadil Shaikh", role: "Founder & CEO" },
  { name: "Muhammad Suhaan Khan", role: "Co Founder" },
  { name: "Abdul Qadir Khan", role: "Co Founder" },
  { name: "Akbar Ali Khan", role: "Lead Strategist" },
  { name: "Ahmed Ali Shaikh", role: "Marketing Head" },
  { name: "Sufiyan Jigrani", role: "Data Analyst" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who We Are"
        title="A founder-led product team"
        description="We started Ace because we were tired of agencies that ship slides and offshore teams that ship blame. We build the thing, own the outcome, and tell you the truth."
      />

      <Section
        eyebrow="Why We Exist"
        title="Software should move your business — not just look like it"
        description="Most teams optimise for the demo. We optimise for the number that matters to you: signups, conversion, uptime, cost. Everything else is in service of that."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.03] p-7">
                <h3 className="text-lg font-bold text-ice">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">
                  {v.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="The Team"
        title="The people behind the work"
        description="A small, senior team that stays on your engagement end to end. (Photos and full bios coming soon.)"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06}>
              <div className="flex h-full items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,rgba(26,26,255,0.25),rgba(123,47,255,0.25))] font-display text-lg font-black text-ice">
                  {initials(m.name)}
                </div>
                <div>
                  <div className="font-semibold text-ice">{m.name}</div>
                  <div className="text-sm text-silver">{m.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
