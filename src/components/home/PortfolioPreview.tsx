"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import { CASES } from "@/lib/content/cases";

const PREVIEW = CASES.slice(0, 4);

export default function PortfolioPreview() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <Section
      id="work"
      eyebrow="Proof, Not Promises"
      title="Selected work"
      description="A few engagements where the right architecture moved a real business metric."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {PREVIEW.map((c, i) => {
          const isOpen = open === c.slug;
          const onGitHub = c.website?.includes("github.com");
          return (
            <Reveal key={c.slug} delay={i * 0.05}>
              <motion.article
                layout={!reduce}
                className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : c.slug)}
                  aria-expanded={isOpen}
                  aria-controls={`preview-${c.slug}`}
                  className="cursor-pointer p-7 text-left"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-wider text-silver">
                      {c.client}
                    </span>
                    <div className="flex flex-wrap justify-end gap-2">
                      {c.tags.map((t) => (
                        <Tag key={t} variant="violet">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-ice">{c.title}</h3>
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

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-bright">
                    {isOpen ? "Hide details" : "Read case"}
                    <span aria-hidden="true">{isOpen ? " ↑" : " →"}</span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`preview-${c.slug}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 px-7 pb-7">
                        <p className="text-sm leading-relaxed text-silver">
                          <span className="font-semibold text-blue-bright">Challenge. </span>
                          {c.challenge}
                        </p>
                        <p className="text-sm leading-relaxed text-silver">
                          <span className="font-semibold text-blue-bright">Outcome. </span>
                          {c.outcome}
                        </p>
                        {c.website && (
                          <a
                            href={c.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-bright transition-transform hover:translate-x-1"
                          >
                            {onGitHub ? "View on GitHub" : "Visit site"}
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            </Reveal>
          );
        })}
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
