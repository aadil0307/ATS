// Emits a self-contained static SVG lockup of the Ace Core logo
// (mark + "ACE TECH / SOLUTIONS" wordmark) with the Sora webfont embedded
// as base64, so it renders identically in any browser or design tool.
import { writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/* ---------------------------- geometry --------------------------- */
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
  return [(x / m) * R, (y / m) * R, (z / m) * R];
});
const rotX = (p, a) => [p[0], p[1] * Math.cos(a) - p[2] * Math.sin(a), p[1] * Math.sin(a) + p[2] * Math.cos(a)];
const rotY = (p, a) => [p[0] * Math.cos(a) + p[2] * Math.sin(a), p[1], -p[0] * Math.sin(a) + p[2] * Math.cos(a)];
const V = rawV.map((p) => rotX(rotY(p, 0.5), 0.42));
const P = V.map((v) => ({ x: CX + v[0], y: CY - v[1] }));
const EDGES = (() => {
  const d = [];
  for (let i = 0; i < V.length; i++)
    for (let j = i + 1; j < V.length; j++)
      d.push(Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]));
  const e = Math.min(...d);
  const out = [];
  for (let i = 0; i < V.length; i++)
    for (let j = i + 1; j < V.length; j++) {
      const dd = Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]);
      if (dd <= e * 1.06) out.push([i, j]);
    }
  return out;
})();
const A_PATH = "M50 19 L27 85 L34 53 L66 53 L73 85 L50 19";

/* ---------------------------- fonts ------------------------------- */
const b64 = (p) => readFileSync(p).toString("base64");
const sora700 = b64(join(__dirname, "node_modules/@fontsource/sora/files/sora-latin-700-normal.woff2"));
const sora600 = b64(join(__dirname, "node_modules/@fontsource/sora/files/sora-latin-600-normal.woff2"));

const lines = EDGES.map(
  ([i, j]) => `      <line x1="${P[i].x.toFixed(2)}" y1="${P[i].y.toFixed(2)}" x2="${P[j].x.toFixed(2)}" y2="${P[j].y.toFixed(2)}" />`,
).join("\n");

const W = 640;
const H = 150;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Ace Tech Solutions">
  <defs>
    <linearGradient id="aceGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#7B2FFF" />
      <stop offset="1" stop-color="#00D4FF" />
    </linearGradient>
    <style>
      @font-face {
        font-family: "Sora";
        font-weight: 700;
        font-display: swap;
        src: url(data:font/woff2;base64,${sora700}) format("woff2");
      }
      @font-face {
        font-family: "Sora";
        font-weight: 600;
        font-display: swap;
        src: url(data:font/woff2;base64,${sora600}) format("woff2");
      }
    </style>
  </defs>

  <!-- mark -->
  <g transform="translate(10,15) scale(1.15)" fill="none">
    <g stroke="url(#aceGrad)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">
${lines}
    </g>
    <path d="${A_PATH}" stroke="#00D4FF" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- wordmark -->
  <text x="140" y="80" font-family="'Sora', system-ui, sans-serif" font-weight="700" font-size="44" fill="#FAFAFF">ACE&#160;<tspan fill="#1A1AFF">TECH</tspan></text>
  <text x="142" y="108" font-family="'Sora', system-ui, sans-serif" font-weight="600" font-size="15" letter-spacing="3.6" fill="#8B8BA7">SOLUTIONS</text>
</svg>
`;

const outPath = join(__dirname, "..", "..", "public", "logo", "ace-core-logo.svg");
writeFileSync(outPath, svg);
console.log("wrote", outPath, `(${(svg.length / 1024).toFixed(1)} KB)`);
