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
    <section className="border-y border-white/10 py-12">
      <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.14em] text-silver">
        Trusted stack · Trusted by teams shipping at scale
      </p>
      <div className="ticker-mask overflow-hidden">
        <div className="ticker-track gap-4">
          {row.map((it, i) => (
            <span
              key={i}
              className="shrink-0 rounded-pill border border-white/10 bg-white/[0.03] px-5 py-2.5 font-mono text-sm text-silver"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
