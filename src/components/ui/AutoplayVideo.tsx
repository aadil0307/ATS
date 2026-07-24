"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AutoplayVideoProps = {
  src: string;
  poster: string;
  alt: string;
  /**
   * Outer framed wrapper (border / rounding / background / shadow).
   * Always `relative overflow-hidden` so the play overlay can position itself.
   */
  frameClassName?: string;
  /** Sizing + aspect on the media element (applied to both <video> and the reduced-motion <img>). */
  mediaClassName?: string;
};

export default function AutoplayVideo({
  src,
  poster,
  alt,
  frameClassName,
  mediaClassName,
}: AutoplayVideoProps) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // React reliably sets the `muted` *attribute* but not the DOM *property*, and
  // browsers block autoplay unless the element is actually muted — so we force
  // it on the node and kick playback off ourselves.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.muted = true;
    v.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [reduce]);

  if (reduce) {
    return (
      <div className={cn("relative overflow-hidden", frameClassName)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt={alt} className={mediaClassName} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", frameClassName)}>
      <video
        ref={videoRef}
        className={mediaClassName}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {!playing && (
        <button
          type="button"
          aria-label={`Play animation: ${alt}`}
          onClick={() =>
            videoRef.current
              ?.play()
              .then(() => setPlaying(true))
              .catch(() => {})
          }
          className="absolute inset-0 grid place-items-center bg-void/40 text-xs font-semibold uppercase tracking-[0.18em] text-ice/90 backdrop-blur-sm"
        >
          <span aria-hidden="true">▶</span> Play
        </button>
      )}
    </div>
  );
}
