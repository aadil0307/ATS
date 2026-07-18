import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FRAMES = join(__dirname, "frames");
const FRAMESVOID = join(__dirname, "framesVoid");
const OUT = join(__dirname, "out");

/* ----------------------------- config ----------------------------- */
const SIZE = 1080;
const FPS = 30;
const DURATION = 6; // seconds
const N = FPS * DURATION; // 180 frames

const COL = {
  void: "#0A0A0F",
  cyan: "#00D4FF",
  violet: "#7B2FFF",
  blue: "#1A1AFF",
  ice: "#FAFAFF",
  silver: "#8B8BA7",
};

// signature ease: cubic-bezier(0.16, 1, 0.3, 1)
const ease = cubicBezier(0.16, 1, 0.3, 1);

/* ----------------------------- fonts ------------------------------ */
const SORA700 = join(
  __dirname,
  "node_modules/@fontsource/sora/files/sora-latin-700-normal.woff2",
);
const SORA600 = join(
  __dirname,
  "node_modules/@fontsource/sora/files/sora-latin-600-normal.woff2",
);
const INTER = join(
  __dirname,
  "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
);
try {
  GlobalFonts.registerFromPath(SORA700, "Sora");
  GlobalFonts.registerFromPath(SORA600, "Sora600");
  GlobalFonts.registerFromPath(INTER, "Inter");
  console.log("fonts registered");
} catch (e) {
  console.warn("font registration failed, using fallbacks:", e.message);
}

/* --------------------------- geometry ----------------------------- */
const PHI = (1 + Math.sqrt(5)) / 2;
const R = 2.2; // icosa radius
const PR = 2.62; // particle shell radius
const CR = 3.05; // comet orbit radius

// raw icosahedron vertices
const rawV = [
  [0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI],
  [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0],
  [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
].map(([x, y, z]) => {
  const m = Math.hypot(x, y, z);
  return [(x / m) * R, (y / m) * R, (z / m) * R];
});

// fixed aesthetic tilt (not animated -> keeps loop seamless)
const V = rawV.map((p) => rotX(rotY(p, 0.5), 0.42));

// edges: connect vertices at the minimal pairwise distance
const dists = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++)
    dists.push(Math.hypot(...V[i].map((v, k) => v - V[j][k])));
const edgeLen = Math.min(...dists);
const EDGES = [];
for (let i = 0; i < V.length; i++)
  for (let j = i + 1; j < V.length; j++) {
    const d = Math.hypot(...V[i].map((v, k) => v - V[j][k]));
    if (d <= edgeLen * 1.06) EDGES.push([i, j]);
  }

// 12 particles: fixed spherical anchors + integer orbit turns (seamless)
const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const b = Math.acos(2 * ((i * 0.6180339) % 1) - 1);
  const scatter = [
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 12,
    (Math.random() - 0.5) * 12,
  ];
  return {
    theta: a,
    phi: b,
    turns: 1 + (i % 3), // 1..3 full turns over the loop
    scatter,
  };
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

/* ----------------------------- loop ------------------------------- */
const canvas = createCanvas(SIZE, SIZE);
const ctx = canvas.getContext("2d");

for (let f = 0; f < N; f++) {
  const t = f / FPS; // 0..6
  const tt = t / DURATION; // 0..1 normalized
  const glow = 0.78 + 0.22 * Math.sin(tt * Math.PI * 2); // breathing
  const spinY = tt * Math.PI * 2; // exactly 1 turn -> seamless

  const conv = ease(clamp(t / 1, 0, 1)); // 0..1s convergence
  const aDraw = ease(clamp((t - 1) / 1, 0, 1)); // 1..2s A draws
  const sweep = ease(clamp((t - 2) / 3, 0, 1)); // 2..5s gradient sweep

  ctx.clearRect(0, 0, SIZE, SIZE);

  // additive light layer for glow
  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  // aura
  const aura = ctx.createRadialGradient(CX, CY, 0, CX, CY, 380);
  aura.addColorStop(0, `rgba(123,43,255,${0.20 * glow})`);
  aura.addColorStop(0.45, `rgba(26,26,255,${0.11 * glow})`);
  aura.addColorStop(1, "rgba(10,10,15,0)");
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(CX, CY, 380, 0, Math.PI * 2);
  ctx.fill();

  // project rotated vertices
  const P = V.map((v) => project(rotY(v, spinY)));
  // depth-sorted edges (far first)
  const edgeDraw = EDGES.map(([i, j]) => ({
    i, j, z: (P[i].z + P[j].z) / 2,
  })).sort((a, b) => a.z - b.z);

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const { i, j, z } of edgeDraw) {
    const depth = (z + R) / (2 * R); // 0 (back) .. 1 (front)
    const alpha = (0.22 + 0.72 * depth) * (0.4 + 0.6 * conv) * glow;
    const col = lerpColor(COL.cyan, COL.violet, depth);
    ctx.strokeStyle = col;
    ctx.globalAlpha = Math.min(1, alpha);
    ctx.lineWidth = 2.4;
    ctx.shadowColor = col;
    ctx.shadowBlur = 14 * glow;
    ctx.beginPath();
    ctx.moveTo(P[i].x, P[i].y);
    ctx.lineTo(P[j].x, P[j].y);
    ctx.stroke();
  }

  // vertex nodes
  ctx.shadowBlur = 18 * glow;
  for (const p of P) {
    ctx.fillStyle = COL.cyan;
    ctx.globalAlpha = (0.5 + 0.5 * conv) * glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // particles
  ctx.shadowBlur = 16 * glow;
  for (const pt of PARTICLES) {
    const th = pt.theta + Math.PI * 2 * pt.turns * tt;
    const target = [
      PR * Math.sin(pt.phi) * Math.cos(th),
      PR * Math.sin(pt.phi) * Math.sin(th),
      PR * Math.cos(pt.phi),
    ];
    const pos = [
      lerp(pt.scatter[0], target[0], conv),
      lerp(pt.scatter[1], target[1], conv),
      lerp(pt.scatter[2], target[2], conv),
    ];
    const pr = project(pos);
    ctx.globalAlpha = (0.35 + 0.65 * conv) * glow;
    ctx.fillStyle = COL.ice;
    ctx.beginPath();
    ctx.arc(pr.x, pr.y, 3.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // comet + trail
  const ca = Math.PI * 2 * 3 * tt + 0.6; // 3 turns -> seamless
  const cometPos = rotX([CR * Math.cos(ca), 0, CR * Math.sin(ca)], 0.5);
  const cp = project(cometPos);
  ctx.lineWidth = 3;
  for (let k = 8; k >= 1; k--) {
    const pa = ca - k * 0.06;
    const pp = project(rotX([CR * Math.cos(pa), 0, CR * Math.sin(pa)], 0.5));
    const pp2 = project(rotX([CR * Math.cos(pa + 0.06), 0, CR * Math.sin(pa + 0.06)], 0.5));
    ctx.globalAlpha = (1 - k / 9) * 0.5 * glow;
    ctx.strokeStyle = COL.cyan;
    ctx.beginPath();
    ctx.moveTo(pp.x, pp.y);
    ctx.lineTo(pp2.x, pp2.y);
    ctx.stroke();
  }
  ctx.globalAlpha = glow;
  ctx.shadowBlur = 22 * glow;
  ctx.fillStyle = "#BDF3FF";
  ctx.beginPath();
  ctx.arc(cp.x, cp.y, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // ---- "A" stroke drawn through the core ----
  drawA(ctx, CX, CY, aDraw, glow);

  // ---- wordmark ----
  drawWordmark(ctx, CX, SIZE * 0.74, sweep, glow);

  const buf = await canvas.encode("png");
  writeFileSync(join(FRAMES, `frame${String(f).padStart(3, "0")}.png`), buf);
  if (f % 30 === 0) console.log(`frame ${f}/${N}`);
}
console.log("frames rendered");

/* --------------------------- encoding ----------------------------- */
// Composite the transparent frames over a solid void background (cheap,
// filter-free) so the MP4 has no alpha and ffmpeg stays light on memory.
await compositeVoid();

const mp4Square = [
  "-y", "-framerate", String(FPS),
  "-i", join(FRAMESVOID, "frame%03d.png"),
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
  "-movflags", "+faststart", join(OUT, "ace-core-1080.mp4"),
];
const mp4Wide = [
  "-y", "-framerate", String(FPS),
  "-i", join(FRAMESVOID, "frame%03d.png"),
  "-vf", "pad=1920:1080:420:0:0x0A0A0F",
  "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
  "-movflags", "+faststart", join(OUT, "ace-core-1920x1080.mp4"),
];
const webm = [
  "-y", "-framerate", String(FPS),
  "-i", join(FRAMES, "frame%03d.png"),
  "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0", "-crf", "32",
  join(OUT, "ace-core-transparent.webm"),
];

run(mp4Square);
run(mp4Wide);
run(webm);
// poster = a mid-loop frame (t ≈ 2.5s)
writeFileSync(join(OUT, "poster.png"), readFileSync(join(FRAMESVOID, "frame075.png")));
console.log("done");

/* --------------------------- compositing -------------------------- */
async function compositeVoid() {
  mkdirSync(FRAMESVOID, { recursive: true });
  const c = createCanvas(SIZE, SIZE);
  const x = c.getContext("2d");
  for (let f = 0; f < N; f++) {
    const name = `frame${String(f).padStart(3, "0")}.png`;
    const img = await loadImage(readFileSync(join(FRAMES, name)));
    x.fillStyle = COL.void;
    x.fillRect(0, 0, SIZE, SIZE);
    x.drawImage(img, 0, 0);
    writeFileSync(join(FRAMESVOID, name), await c.encode("png"));
  }
  console.log("void frames composed");
}

/* --------------------------- helpers ------------------------------ */
function run(args) {
  console.log("ffmpeg:", args[args.length - 1].split("/").pop());
  execFileSync(ffmpegPath, args, { stdio: "inherit" });
}

function rotX(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0], p[1] * c - p[2] * s, p[1] * s + p[2] * c];
}
function rotY(p, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [p[0] * c + p[2] * s, p[1], -p[0] * s + p[2] * c];
}

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpColor(h1, h2, t) {
  const a = hexToRgb(h1), b = hexToRgb(h2);
  return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(
    lerp(a[1], b[1], t),
  )},${Math.round(lerp(a[2], b[2], t))})`;
}
function cubicBezier(p1x, p1y, p2x, p2y) {
  const sx = (t) => 3 * (1 - t) * (1 - t) * t * p1x + 3 * (1 - t) * t * t * p2x + t * t * t;
  const sy = (t) => 3 * (1 - t) * (1 - t) * t * p1y + 3 * (1 - t) * t * t * p2y + t * t * t;
  const dx = (t) => 3 * (1 - t) * (1 - t) * p1x + 6 * (1 - t) * t * (p2x - p1x) + 3 * t * t * (1 - p2x);
  return (x) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const e = sx(t) - x;
      if (Math.abs(e) < 1e-4) break;
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= e / d;
    }
    t = Math.max(0, Math.min(1, t));
    return sy(t);
  };
}

function drawA(ctx, cx, cy, prog, glow) {
  const W = 240, H = 340;
  const apex = [cx, cy - H / 2];
  const lb = [cx - W / 2, cy + H / 2];
  const rb = [cx + W / 2, cy + H / 2];
  // crossbar sits at the vertical center, landing on the legs — a clean, classic A
  const cL = [cx - W * 0.25, cy];
  const cR = [cx + W * 0.25, cy];
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalCompositeOperation = "lighter";
  // TRUE path length: both outer legs + both leg->crossbar connectors + crossbar.
  // (Under-counting this was why the right leg never finished drawing.)
  const leg = Math.hypot(W / 2, H);
  const conn = Math.hypot(cL[0] - lb[0], cL[1] - lb[1]);
  const cross = Math.hypot(cR[0] - cL[0], cR[1] - cL[1]);
  const len = 2 * leg + 2 * conn + cross;
  ctx.strokeStyle = COL.cyan;
  ctx.shadowColor = COL.cyan;
  ctx.shadowBlur = 24 * glow;
  ctx.lineWidth = 26;
  ctx.globalAlpha = Math.min(1, (0.3 + 0.7 * prog) * glow);
  ctx.setLineDash([len, len]);
  ctx.lineDashOffset = len * (1 - prog);
  ctx.beginPath();
  ctx.moveTo(...apex);
  ctx.lineTo(...lb);
  ctx.lineTo(...cL);
  ctx.lineTo(...cR);
  ctx.lineTo(...rb);
  ctx.lineTo(...apex);
  ctx.stroke();
  ctx.restore();
}

function drawWordmark(ctx, cx, aceY, sweep, glow) {
  // ACE
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '700 150px "Sora", sans-serif';
  const txt = "ACE";
  const w = ctx.measureText(txt).width;
  ctx.fillStyle = COL.ice;
  ctx.fillText(txt, cx, aceY);
  // traveling cyan->violet sweep (source-atop tints only the glyph pixels)
  const band = (sweep - 0.5) * (w + 460);
  ctx.globalCompositeOperation = "source-atop";
  const g = ctx.createLinearGradient(cx - w / 2 + band - 220, 0, cx - w / 2 + band + 220, 0);
  g.addColorStop(0, "rgba(0,212,255,0)");
  g.addColorStop(0.5, "rgba(0,212,255,0.95)");
  g.addColorStop(0.5, "rgba(123,43,255,0.95)");
  g.addColorStop(1, "rgba(123,43,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(cx - w / 2 - 230, aceY - 130, w + 460, 260);
  ctx.restore();

  // TECH SOLUTIONS
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '600 34px "Sora600", sans-serif';
  ctx.fillStyle = COL.silver;
  ctx.globalAlpha = glow;
  const sub = "TECH SOLUTIONS";
  // emulate letter-spacing 0.2em
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
