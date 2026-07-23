// Generates a clean, static 1080x1080 brand poster for OpenGraph / Twitter
// cards — writes public/logo/ace-core-poster.png. Single-frame render (no
// video pipeline) using the same projection as the live logo, with the
// refined "A" so the social card matches the site mark.
import { createCanvas, GlobalFonts } from "@napi-rs/canvas";
import { writeFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SIZE = 1080;

const COL = {
  void: "#0A0A0F",
  cyan: "#00D4FF",
  violet: "#7B2FFF",
  ice: "#FAFAFF",
  silver: "#8B8BA7",
};

try {
  GlobalFonts.registerFromPath(
    join(__dirname, "node_modules/@fontsource/sora/files/sora-latin-700-normal.woff2"),
    "Sora",
  );
  GlobalFonts.registerFromPath(
    join(__dirname, "node_modules/@fontsource/sora/files/sora-latin-600-normal.woff2"),
    "Sora600",
  );
} catch (e) {
  console.warn("font registration failed, using fallbacks:", e.message);
}

/* --------------------------- geometry ----------------------------- */
const PHI = (1 + Math.sqrt(5)) / 2;
const R = 2.2;
const PR = 2.62;

const rawV = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
].map(([x, y, z]) => {
  const m = Math.hypot(x, y, z);
  return [(x / m) * R, (y / m) * R, (z / m) * R];
});

// fixed aesthetic pose: tilted core + a touch of yaw for a 3/4 angle
const SPIN = 0.6;
const V = rawV.map((p) => rotY(rotX(rotY(p, 0.5), 0.42), SPIN));

const dists = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++)
    dists.push(Math.hypot(...V[i].map((c, k) => c - V[j][k])));
const edgeLen = Math.min(...dists);
const EDGES = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++) {
    const d = Math.hypot(...V[i].map((c, k) => c - V[j][k]));
    if (d <= edgeLen * 1.06) EDGES.push([i, j]);
  }

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const b = Math.acos(2 * ((i * 0.6180339) % 1) - 1);
  return { theta: a, phi: b };
});

/* --------------------------- projection --------------------------- */
const FOCAL = 470;
const CAM_Z = 7;
const CX = SIZE / 2;
const CY = SIZE * 0.4;
function project(p) {
  const s = FOCAL / (CAM_Z - p[2]);
  return { x: CX + p[0] * s, y: CY + p[1] * s, z: p[2] };
}

/* ----------------------------- render ----------------------------- */
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext("2d");

ctx.fillStyle = COL.void;
ctx.fillRect(0, 0, SIZE, SIZE);

ctx.save();
ctx.globalCompositeOperation = "lighter";

const aura = ctx.createRadialGradient(CX, CY, 0, CX, CY, 380);
aura.addColorStop(0, "rgba(123,43,255,0.22)");
aura.addColorStop(0.45, "rgba(26,26,255,0.12)");
aura.addColorStop(1, "rgba(10,10,15,0)");
ctx.fillStyle = aura;
ctx.beginPath();
ctx.arc(CX, CY, 380, 0, Math.PI * 2);
ctx.fill();

// edges — depth-sorted, cyan→violet gradient by depth, with glow
const P = V.map((v) => project(v));
const edgeDraw = EDGES.map(([i, j]) => ({ i, j, z: (P[i].z + P[j].z) / 2 })).sort((a, b) => a.z - b.z);
ctx.lineCap = "round";
ctx.lineJoin = "round";
for (const { i, j, z } of edgeDraw) {
  const depth = (z + R) / (2 * R);
  const alpha = 0.22 + 0.72 * depth;
  const col = lerpColor(COL.cyan, COL.violet, depth);
  ctx.strokeStyle = col;
  ctx.globalAlpha = Math.min(1, alpha);
  ctx.lineWidth = 2.4;
  ctx.shadowColor = col;
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(P[i].x, P[i].y);
  ctx.lineTo(P[j].x, P[j].y);
  ctx.stroke();
}

// vertex nodes
ctx.shadowBlur = 18;
for (const p of P) {
  ctx.fillStyle = COL.cyan;
  ctx.globalAlpha = 0.95;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
  ctx.fill();
}

// particle shell — subtle starfield around the core
ctx.shadowBlur = 16;
for (const pt of PARTICLES) {
  const pos = [
    PR * Math.sin(pt.phi) * Math.cos(pt.theta + SPIN),
    PR * Math.sin(pt.phi) * Math.sin(pt.theta + SPIN),
    PR * Math.cos(pt.phi),
  ];
  const pr = project(pos);
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = COL.ice;
  ctx.beginPath();
  ctx.arc(pr.x, pr.y, 3.2, 0, Math.PI * 2);
  ctx.fill();
}
ctx.restore();

// refined "A" — compact, centred on the core, thinner and dialled back so
// the wireframe leads.
ctx.save();
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.globalCompositeOperation = "lighter";
const w = 180, h = 250;
const apex = [CX, CY - h / 2];
const lb = [CX - w / 2, CY + h / 2];
const rb = [CX + w / 2, CY + h / 2];
const cL = [CX - w * 0.25, CY];
const cR = [CX + w * 0.25, CY];
ctx.strokeStyle = COL.cyan;
ctx.shadowColor = COL.cyan;
ctx.shadowBlur = 18;
ctx.lineWidth = 16;
ctx.globalAlpha = 0.8;
ctx.beginPath();
ctx.moveTo(...apex);
ctx.lineTo(...lb);
ctx.lineTo(...cL);
ctx.lineTo(...cR);
ctx.lineTo(...rb);
ctx.lineTo(...apex);
ctx.stroke();
ctx.restore();

// wordmark — solid ice + silver subtitle (no traveling sweep; reads cleanly
// on a static card)
drawWordmark(ctx, CX, SIZE * 0.74);

const outPath = join(__dirname, "..", "..", "public", "logo", "ace-core-poster.png");
writeFileSync(outPath, await canvas.encode("png"));
console.log("wrote", outPath, `(${(statSync(outPath).size / 1024).toFixed(0)} KB)`);

/* --------------------------- helpers ------------------------------- */
function rotX(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function rotY(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}
function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerp(a, b, t) { return a + (b - a) * t; }
function lerpColor(h1, h2, t) {
  const a = hexToRgb(h1), b = hexToRgb(h2);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`;
}
function drawWordmark(ctx, cx, aceY) {
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '700 150px "Sora", sans-serif';
  ctx.fillStyle = COL.ice;
  ctx.fillText("ACE", cx, aceY);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '600 34px "Sora600", sans-serif';
  ctx.fillStyle = COL.silver;
  const sub = "TECH SOLUTIONS";
  const chars = sub.split("");
  const sp = ctx.measureText("M").width * 0.2;
  const total = chars.reduce((s, c) => s + ctx.measureText(c).width + sp, 0) - sp;
  let x = cx - total / 2;
  for (const c of chars) {
    ctx.fillText(c, x + ctx.measureText(c).width / 2, aceY + 118);
    x += ctx.measureText(c).width + sp;
  }
  ctx.restore();
}
