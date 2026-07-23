"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/content/cases";

export default function PortfolioGrid({ cases }: { cases: CaseStudy[] }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(cases.map((c) => c.category)))],
    [cases],
  );

  const visible = useMemo(
    () => (filter === "All" ? cases : cases.filter((c) => c.category === filter)),
    [cases, filter],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-3"
        role="group"
        aria-label="Filter case studies by category"
      >
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className={`rounded-pill border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-blue bg-blue/15 text-ice"
                  : "border-white/15 text-silver hover:border-white/30 hover:text-ice"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {visible.map((c) => {
          const isOpen = open === c.slug;
          const onGitHub = c.website?.includes("github.com");
          const label = onGitHub ? "View on GitHub" : "Visit site";
          return (
            <motion.article
              key={c.slug}
              layout={!reduce}
              className="flex flex-col rounded-lg border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20"
            >
              {/* Whole header is a button → clicking the project opens its details */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : c.slug)}
                aria-expanded={isOpen}
                aria-controls={`case-${c.slug}`}
                className="cursor-pointer p-7 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-silver">
                    {c.client} · {c.year}
                  </span>
                  <div className="flex flex-wrap justify-end gap-2">
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

                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-bright transition-transform group-hover:translate-x-1">
                  {isOpen ? "Hide details" : "Read case"}
                  <span aria-hidden="true">{isOpen ? " ↑" : " →"}</span>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`case-${c.slug}`}
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 px-7 pb-7">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-bright">
                          The challenge
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-silver">
                          {c.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-bright">
                          The outcome
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-silver">
                          {c.outcome}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {c.services.map((s) => (
                          <span
                            key={s}
                            className="rounded-pill border border-white/10 px-3 py-1 text-xs text-silver"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {c.website && (
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-bright transition-transform hover:translate-x-1"
                        >
                          {label} <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
