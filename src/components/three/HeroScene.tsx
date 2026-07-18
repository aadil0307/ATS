export default function HeroScene() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="aurora h-[60vmin] w-[60vmin]" />
      <svg
        viewBox="0 0 400 400"
        className="absolute h-[60vmin] w-[60vmin] animate-[spin_48s_linear_infinite]"
        fill="none"
      >
        <circle cx="200" cy="200" r="180" stroke="#1A1AFF" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="200" cy="200" r="135" stroke="#7B2FFF" strokeOpacity="0.3" strokeWidth="1" />
        <circle cx="200" cy="200" r="92" stroke="#00D4FF" strokeOpacity="0.35" strokeWidth="1" />
        <circle cx="200" cy="200" r="46" stroke="#1A1AFF" strokeOpacity="0.4" strokeWidth="1" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={200 + Math.cos(a) * 180}
              cy={200 + Math.sin(a) * 180}
              r="3"
              fill="#00D4FF"
              fillOpacity="0.7"
            />
          );
        })}
      </svg>
      <div className="absolute h-32 w-32 rounded-full bg-cyan/30 blur-3xl" />
    </div>
  );
}
