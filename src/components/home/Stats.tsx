"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.8,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setVal(to));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 120, suffix: "+", label: "Products shipped" },
  { to: 40, suffix: "+", label: "Monthly leads target" },
  { to: 2, prefix: "<", suffix: "s", label: "Largest Contentful Paint" },
  { to: 100, suffix: "+", label: "Lighthouse target" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-ink-soft/40 py-20">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-10 px-6 sm:px-10 md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-5xl font-black text-gradient sm:text-6xl">
              <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm text-silver">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
