import Link from "next/link";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";

type Metric = [string, string];

const CASES: {
  title: string;
  client: string;
  summary: string;
  metrics: Metric[];
  tags: string[];
}[] = [
  {
    title: "Fintech Super App",
    client: "Ledgerly",
    summary:
      "Unified payments + banking wallet for 2M users, rebuilt on a single Next.js platform.",
    metrics: [
      ["2M", "users"],
      ["40%", "faster onboarding"],
      ["6 wks", "to delivery"],
    ],
    tags: ["Web/App", "Cloud"],
  },
  {
    title: "AI Ops Copilot",
    client: "Northwind",
    summary:
      "LLM agent that triages incidents and drafts runbooks, wired into their on-call flow.",
    metrics: [
      ["60%", "less MTTR"],
      ["3x", "throughput"],
    ],
    tags: ["AI", "API"],
  },
  {
    title: "D2C Commerce Platform",
    client: "Maison",
    summary:
      "Headless storefront with sub-second navigation and a 3x lift in conversion.",
    metrics: [
      ["3x", "conversion"],
      ["99.99%", "uptime"],
    ],
    tags: ["Web", "DevOps"],
  },
  {
    title: "Health Telemetry Grid",
    client: "Vitalink",
    summary:
      "Real-time IoT dashboard ingesting 1.2M events/min with live alerting.",
    metrics: [
      ["1.2M", "events/min"],
      ["<50ms", "p99 latency"],
    ],
    tags: ["Cloud", "UI/UX"],
  },
];

export default function PortfolioPreview() {
  return (
    <Section
      id="work"
      eyebrow="Proof, Not Promises"
      title="Selected work"
      description="A few engagements where the right architecture moved a real business metric."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {CASES.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <Link
              href="/portfolio"
              className="group block h-full rounded-lg border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-silver">
                  {c.client}
                </span>
                <div className="flex gap-2">
                  {c.tags.map((t) => (
                    <Tag key={t} variant="violet">
                      {t}
                    </Tag>
                  ))}
                </div>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ice">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver">
                {c.summary}
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
                {c.metrics.map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl font-black text-gradient">
                      {v}
                    </div>
                    <div className="mt-1 text-xs text-silver">{l}</div>
                  </div>
                ))}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue transition-transform hover:translate-x-1"
        >
          View all case studies <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </Section>
  );
}
