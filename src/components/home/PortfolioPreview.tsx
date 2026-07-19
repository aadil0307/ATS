import Link from "next/link";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { CASES } from "@/lib/content/cases";

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
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-bright transition-transform hover:translate-x-1"
        >
          View all case studies <span aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </Section>
  );
}
