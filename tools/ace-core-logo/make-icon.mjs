import { writeFileSync } from "node:fs";

const PHI = (1 + Math.sqrt(5)) / 2;
const R = 40, CX = 50, CY = 50;

const rawV = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
].map(([x, y, z]) => {
  const m = Math.hypot(x, y, z);
  return [(x / m) * R, (y / m) * R, (z / m) * R];
});
const rotX = (p, a) => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const rotY = (p, a) => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
const V = rawV.map((p) => rotX(rotY(p, 0.5), 0.42));
const P = V.map((v) => ({ x: +(CX + v[0]).toFixed(2), y: +(CY - v[1]).toFixed(2) }));

const d = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++)
    d.push(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]));
const e = Math.min(...d);
const lines = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++) {
    const dd = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
    if (dd <= e * 1.06) lines.push(`<line x1="${P[i].x}" y1="${P[i].y}" x2="${P[j].x}" y2="${P[j].y}"/>`);
  }

const A = "M50 19 L27 85 L34 53 L66 53 L73 85 L50 19";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" role="img" aria-label="Ace Core">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7B2FFF"/>
      <stop offset="1" stop-color="#00D4FF"/>
    </linearGradient>
  </defs>
  <g stroke="url(#g)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">
    ${lines.join("\n    ")}
  </g>
  <path d="${A}" stroke="#00D4FF" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

writeFileSync("C:/Projects/ATS/ace-tech-next/src/app/icon.svg", svg);
console.log("wrote app/icon.svg");
