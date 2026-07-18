"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import HeroScene from "@/components/three/HeroScene";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => <HeroScene />,
});

const HEADLINES = [
  { pre: "We build", accent: "digital products" },
  { pre: "We scale", accent: "your engineering" },
  { pre: "We ship", accent: "fast." },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  // Cycle the accent phrase
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % HEADLINES.length),
      3400,
    );
    return () => clearInterval(id);
  }, [reduce]);

  // GSAP page-load stagger
  useEffect(() => {
    if (reduce || !rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-stagger]", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.15,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-backdrop opacity-50" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        {reduce ? <HeroScene /> : <HeroCanvas />}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void/10 via-void/30 to-void"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-6 pb-24 pt-28 sm:px-10">
        <p
          data-hero-stagger
          className="mb-5 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan"
        >
          Premium Technology Partner
        </p>

        <h1 className="font-display text-5xl font-black leading-[1.05] text-ice sm:text-7xl">
          <span data-hero-stagger className="block">
            {HEADLINES[index].pre}{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45 }}
                className="text-gradient"
              >
                {HEADLINES[index].accent}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p
          data-hero-stagger
          className="mt-6 max-w-xl text-lg leading-relaxed text-silver"
        >
          From funded startups to global enterprises — we design, build, and
          scale the software that moves your business forward. One agile,
          founder-led team.
        </p>

        <div data-hero-stagger className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/contact" className="px-7 py-3.5">
            Start a Project
          </Button>
          <Button href="/portfolio" variant="ghost" className="px-7 py-3.5">
            See Our Work
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-cyan" />
        </div>
      </div>
    </section>
  );
}
