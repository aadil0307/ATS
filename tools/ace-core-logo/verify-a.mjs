// Verifies the "A" is fully drawn in the held frame (frame075, t=2.5s, aDraw=1):
// samples points along BOTH legs and confirms they are lit (cyan on void).
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const img = await loadImage(join(__dirname, "framesVoid", "frame075.png"));
const c = createCanvas(img.width, img.height);
const ctx = c.getContext("2d");
ctx.drawImage(img, 0, 0);
// A geometry must match render.mjs (SIZE=1080, CX=CY=540, W=240,H=340)
const cx = 540, cy = 432, Aw = 240, Ah = 340;
const apex = [cx, cy - Ah / 2];
const rb = [cx + Aw / 2, cy + Ah / 2];
const lb = [cx - Aw / 2, cy + Ah / 2];

const lit = (x, y) => {
  const d = ctx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
  // cyan-ish on void: green & blue clearly above the near-black background
  return { r: d[0], g: d[1], b: d[2], lit: d[1] > 60 && d[2] > 90 };
};

// points 25/50/75% along each leg
const pts = (a, b) =>
  [0.25, 0.5, 0.75].map((t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);

const left = pts(apex, lb).map(([x, y]) => lit(x, y));
const right = pts(apex, rb).map(([x, y]) => lit(x, y));

const leftLit = left.filter((p) => p.lit).length;
const rightLit = right.filter((p) => p.lit).length;
console.log("left leg samples :", left.map((p) => `${p.lit ? "ON " : "off"} (${p.r},${p.g},${p.b})`).join("  "));
console.log("right leg samples:", right.map((p) => `${p.lit ? "ON " : "off"} (${p.r},${p.g},${p.b})`).join("  "));
console.log(`\nleft lit ${leftLit}/3, right lit ${rightLit}/3`);
console.log(rightLit === 3 && leftLit === 3 ? "PASS: A is complete (both legs drawn)" : "FAIL: A incomplete");
