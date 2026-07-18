export default function HeroScene() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="aurora h-[70vmin] w-[70vmin]" />
      <svg
        viewBox="0 0 400 400"
        className="absolute h-[64vmin] w-[64vmin] animate-[spin_48s_linear_infinite]"
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
      <div className="absolute h-40 w-40 rounded-full bg-cyan/30 blur-3xl" />
      <div className="absolute h-28 w-28 rounded-full bg-violet/25 blur-3xl" />
      <div className="absolute h-24 w-24 animate-[spin_30s_linear_infinite] rounded-full border border-cyan/20" />
    </div>
  );
}
