import Link from "next/link";
import { useId } from "react";
import { cn } from "@/lib/utils";

const PHI = (1 + Math.sqrt(5)) / 2;
const R = 40;
const CX = 50;
const CY = 50;

const rawV = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
].map(([x, y, z]) => {
  const m = Math.hypot(x, y, z);
  return [(x / m) * R, (y / m) * R, (z / m) * R] as [number, number, number];
});

const rotX = (p: number[], a: number): number[] => [
  p[0],
  p[1] * Math.cos(a) - p[2] * Math.sin(a),
  p[1] * Math.sin(a) + p[2] * Math.cos(a),
];
const rotY = (p: number[], a: number): number[] => [
  p[0] * Math.cos(a) + p[2] * Math.sin(a),
  p[1],
  -p[0] * Math.sin(a) + p[2] * Math.cos(a),
];

const V = rawV.map((p) => rotX(rotY(p, 0.5), 0.42));
const P = V.map((v) => ({ x: CX + v[0], y: CY - v[1] }));

const EDGES: Array<[number, number]> = (() => {
  const d: number[] = [];
  for (let i = 0; i < V.length; i++)
    for (let j = i + 1; j < V.length; j++)
      d.push(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]));
  const e = Math.min(...d);
  const out: Array<[number, number]> = [];
  for (let i = 0; i < V.length; i++)
    for (let j = i + 1; j < V.length; j++) {
      const dd = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
      if (dd <= e * 1.06) out.push([i, j]);
    }
  return out;
})();

const A_PATH = "M50 19 L27 85 L34 53 L66 53 L73 85 L50 19";

export function LogoMark({ className }: { className?: string }) {
  const raw = useId();
  const gid = `ace-mark-${raw.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Ace Core mark"
      fill="none"
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7B2FFF" />
          <stop offset="1" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <g
        stroke={`url(#${gid})`}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.92}
      >
        {EDGES.map(([i, j], k) => (
          <line key={k} x1={P[i].x} y1={P[i].y} x2={P[j].x} y2={P[j].y} />
        ))}
      </g>
      <path
        d={A_PATH}
        stroke="#00D4FF"
        strokeWidth={6.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  if (variant === "mark") {
    return (
      <Link href="/" aria-label="Ace Tech Solutions home" className={className}>
        <LogoMark className="h-9 w-9" />
      </Link>
    );
  }
  return (
    <Link
      href="/"
      aria-label="Ace Tech Solutions home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <LogoMark className="h-9 w-9 transition-transform duration-500 group-hover:rotate-[16deg]" />
      <span className="leading-none">
        <span className="block font-logo text-lg font-bold tracking-tight text-ice">
          ACE<span className="text-blue-bright"> TECH</span>
        </span>
        <span className="block font-logo text-[10px] font-medium uppercase tracking-[0.24em] text-silver">
          Solutions
        </span>
      </span>
    </Link>
  );
}
