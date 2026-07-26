const ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "AWS",
  "Kubernetes",
  "MongoDB",
  "GraphQL",
  "Python",
  "Go",
  "Figma",
  "Vercel",
  "PostgreSQL",
  "Redis",
];

export default function SocialProof() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <section className="border-y border-white/10 py-10 sm:py-12">
      <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-silver sm:mb-8 sm:text-xs">
        Trusted stack · Trusted by teams shipping at scale
      </p>
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track gap-3 sm:gap-4">
          {row.map((it, i) => (
            <span
              key={i}
              className="shrink-0 rounded-pill border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-silver sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
