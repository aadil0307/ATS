"use client";

export default function HeroScene() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      {/* Aurora background glow */}
      <div className="aurora h-[70vmin] w-[70vmin]" />

      {/* Main rotating ring structure - FASTER */}
      <svg
        viewBox="0 0 400 400"
        className="absolute h-[64vmin] w-[64vmin] animate-[spin_24s_linear_infinite]"
        fill="none"
      >
        <circle cx="200" cy="200" r="192" stroke="#1A1AFF" strokeOpacity="0.18" strokeWidth="1" />
        <circle cx="200" cy="200" r="180" stroke="#1A1AFF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="200" r="135" stroke="#7B2FFF" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="200" cy="200" r="92" stroke="#00D4FF" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="200" cy="200" r="46" stroke="#1A1AFF" strokeOpacity="0.4" strokeWidth="1" />
        {/* spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={`l-${i}`}
              x1={200 + Math.cos(a) * 46}
              y1={200 + Math.sin(a) * 46}
              x2={200 + Math.cos(a) * 180}
              y2={200 + Math.sin(a) * 180}
              stroke="#7B2FFF"
              strokeOpacity="0.15"
              strokeWidth="0.5"
            />
          );
        })}
        {/* nodes on the outer ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={`n-${i}`}
              cx={200 + Math.cos(a) * 180}
              cy={200 + Math.sin(a) * 180}
              r="3"
              fill="#00D4FF"
              fillOpacity="0.8"
            />
          );
        })}
      </svg>

      {/* Floating geometric shapes - VISIBLE & ANIMATED */}
      {/* Triangle/Pyramid shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[20%] top-[25%] h-16 w-16 animate-[spin_15s_linear_infinite] opacity-60 md:h-20 md:w-20"
        fill="none"
      >
        <polygon
          points="50,10 90,80 10,80"
          stroke="#00D4FF"
          strokeWidth="2"
          fill="#00D4FF"
          fillOpacity="0.1"
        />
      </svg>

      {/* Hexagon shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[15%] top-[35%] h-12 w-12 animate-[spin_20s_linear_reverse] opacity-50 md:h-16 md:w-16"
        fill="none"
      >
        <polygon
          points="50,5 85,25 85,65 50,85 15,65 15,25"
          stroke="#7B2FFF"
          strokeWidth="2"
          fill="#7B2FFF"
          fillOpacity="0.1"
        />
      </svg>

      {/* Diamond/Square shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[30%] left-[25%] h-14 w-14 animate-[spin_18s_linear_infinite] opacity-55 md:h-18 md:w-18"
        fill="none"
      >
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          stroke="#1A1AFF"
          strokeWidth="2"
          fill="#1A1AFF"
          fillOpacity="0.1"
          transform="rotate(45 50 50)"
        />
      </svg>

      {/* Octagon shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-[25%] right-[20%] h-16 w-16 animate-[spin_22s_linear_reverse] opacity-60 md:h-20 md:w-20"
        fill="none"
      >
        <polygon
          points="30,10 70,10 90,30 90,70 70,90 30,90 10,70 10,30"
          stroke="#00D4FF"
          strokeWidth="2"
          fill="#00D4FF"
          fillOpacity="0.1"
        />
      </svg>

      {/* Pentagon shape */}
      <svg
        viewBox="0 0 100 100"
        className="absolute left-[15%] top-[60%] h-12 w-12 animate-[spin_16s_linear_infinite] opacity-50 md:h-14 md:w-14"
        fill="none"
      >
        <polygon
          points="50,10 95,40 80,85 20,85 5,40"
          stroke="#7B2FFF"
          strokeWidth="2"
          fill="#7B2FFF"
          fillOpacity="0.1"
        />
      </svg>

      {/* Small cube wireframe */}
      <svg
        viewBox="0 0 100 100"
        className="absolute right-[25%] bottom-[40%] h-10 w-10 animate-[spin_12s_linear_reverse] opacity-65 md:h-12 md:w-12"
        fill="none"
      >
        <path
          d="M 50 20 L 80 35 L 80 65 L 50 80 L 20 65 L 20 35 Z M 50 20 L 50 50 M 80 35 L 50 50 M 20 35 L 50 50"
          stroke="#1A1AFF"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Glowing orbs */}
      <div className="absolute h-40 w-40 rounded-full bg-cyan/30 blur-3xl" />
      <div className="absolute h-28 w-28 rounded-full bg-violet/25 blur-3xl" />
      <div className="absolute h-24 w-24 animate-[spin_15s_linear_infinite] rounded-full border border-cyan/20" />
    </div>
  );
}
