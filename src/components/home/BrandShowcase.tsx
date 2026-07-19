"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function BrandShowcase() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // React doesn't reliably set the `muted` DOM *property* (only the attribute),
  // and browsers block autoplay unless the element is actually muted — so we
  // force it on the node and kick off playback ourselves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.muted = true;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [reduce]);

  return (
    <section className="relative border-y border-white/10 bg-ink-soft/40 py-20">
      <div className="mx-auto max-w-[1100px] px-6 text-center sm:px-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-blue-bright">
          Our Mark
        </p>
        <h2 className="font-display text-3xl font-black text-ice sm:text-4xl">
          The Ace Core
        </h2>
        <div className="mx-auto mt-8 w-full max-w-[440px]">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-void shadow-[0_0_70px_-15px_rgba(123,43,255,0.55)]">
            {reduce ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/logo/ace-core-poster.png"
                alt="The Ace Core — Ace Tech Solutions living monogram"
                className="aspect-square w-full"
              />
            ) : (
              <video
                ref={videoRef}
                className="aspect-square w-full"
                src="/logo/ace-core-1080.mp4"
                poster="/logo/ace-core-poster.png"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            )}
            {!reduce && !playing && (
              <button
                type="button"
                aria-label="Play the Ace Core animation"
                onClick={() =>
                  videoRef.current
                    ?.play()
                    .then(() => setPlaying(true))
                    .catch(() => {})
                }
                className="absolute inset-0 grid place-items-center bg-void/40 text-xs font-semibold uppercase tracking-[0.18em] text-ice/90 backdrop-blur-sm transition-opacity"
              >
                ▶ Play mark
              </button>
            )}
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-silver">
          A living monogram — a neural core that assembles from particles, a
          neon <span className="text-cyan">A</span> drawn through it, and a comet
          on loop. The signature of everything we ship.
        </p>
      </div>
    </section>
  );
}
