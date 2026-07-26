"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Stars, Trail } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* Module-scope assets (generated once, browser-only — ssr:false)      */
/* ------------------------------------------------------------------ */

// Detect if mobile for particle count optimization
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;
const PARTICLE_COUNT = IS_MOBILE ? 800 : 2800; // Reduced for mobile
const SPEED_MULTIPLIER = 5; // 5x faster on all devices for dramatic effect

const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 7 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

const PALETTE = [
  new THREE.Color("#00d4ff"),
  new THREE.Color("#7b2fff"),
  new THREE.Color("#1a1aff"),
];

const PARTICLE_COLORS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  return arr;
})();

// Soft radial sprite so points read as glowing orbs instead of squares.
const GLOW = (() => {
  const s = 64;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
})();

// Neural-net globe: nodes on the sphere surface + links between near ones.
const NODE_COUNT = IS_MOBILE ? 48 : 96; // Reduced for mobile
const NODES = (() => {
  const arr = new Float32Array(NODE_COUNT * 3);
  const dirs: Array<[number, number, number]> = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    const r = 3.15;
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    arr[i * 3] = x;
    arr[i * 3 + 1] = y;
    arr[i * 3 + 2] = z;
    dirs.push([x, y, z]);
  }
  return { arr, dirs };
})();

const LINKS = (() => {
  const segs: number[] = [];
  const maxD = 1.5;
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      const a = NODES.dirs[i];
      const b = NODES.dirs[j];
      const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      if (d < maxD) segs.push(a[0], a[1], a[2], b[0], b[1], b[2]);
    }
  }
  return new Float32Array(segs);
})();

/* ------------------------------------------------------------------ */
/* Scene pieces                                                         */
/* ------------------------------------------------------------------ */

function Particles() {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.01 * SPEED_MULTIPLIER;
    ref.current.rotation.x += d * 0.004 * SPEED_MULTIPLIER;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
        <bufferAttribute attach="attributes-color" args={[PARTICLE_COLORS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={GLOW}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        toneMapped={false}
        alphaTest={0.01}
      />
    </points>
  );
}

function NeuralGlobe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.04 * SPEED_MULTIPLIER;
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[3.1, 1]} />
        <meshBasicMaterial
          color="#7b2fff"
          wireframe
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[LINKS, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[NODES.arr, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          map={GLOW}
          color="#00d4ff"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          toneMapped={false}
          alphaTest={0.01}
        />
      </points>
    </group>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y -= d * 0.1 * SPEED_MULTIPLIER;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#7b2fff"
          wireframe
          transparent
          opacity={0.5}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

type ShardCfg = {
  kind: "tetrahedron" | "octahedron" | "icosahedron";
  r: number;
  s: number;
  speed: number;
  tilt: number;
  color: string;
  phase: number;
};

const SHARDS: ShardCfg[] = [
  { kind: "tetrahedron", r: 4.6, s: 0.55, speed: 0.2, tilt: 0.4, color: "#00d4ff", phase: 0 }, // Doubled from 0.1
  { kind: "octahedron", r: 5.4, s: 0.62, speed: -0.16, tilt: -0.3, color: "#7b2fff", phase: 1.3 }, // Doubled from -0.08
  { kind: "icosahedron", r: 6.2, s: 0.45, speed: 0.12, tilt: 0.6, color: "#1a1aff", phase: 2.6 }, // Doubled from 0.06
  { kind: "tetrahedron", r: 5.0, s: 0.42, speed: 0.24, tilt: -0.5, color: "#00d4ff", phase: 3.9 }, // Doubled from 0.12
  { kind: "octahedron", r: 6.9, s: 0.5, speed: -0.1, tilt: 0.2, color: "#7b2fff", phase: 5.2 }, // Doubled from -0.05
];

function Shard({ kind, r, s, speed, tilt, color, phase }: ShardCfg) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(phase);
  useFrame((_, d) => {
    t.current += d * speed * SPEED_MULTIPLIER;
    if (!ref.current) return;
    ref.current.position.set(
      Math.cos(t.current) * r,
      Math.sin(t.current * 1.2) * r * 0.5,
      Math.sin(t.current) * r,
    );
    ref.current.rotation.x += d * 0.1 * SPEED_MULTIPLIER;
    ref.current.rotation.y += d * 0.08 * SPEED_MULTIPLIER;
  });
  return (
    <group ref={ref} rotation={[tilt, tilt, 0]}>
      <mesh>
        {kind === "tetrahedron" ? (
          <tetrahedronGeometry args={[s, 0]} />
        ) : kind === "octahedron" ? (
          <octahedronGeometry args={[s, 0]} />
        ) : (
          <icosahedronGeometry args={[s, 0]} />
        )}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (a.current) {
      a.current.rotation.x += d * 0.06 * SPEED_MULTIPLIER;
      a.current.rotation.z += d * 0.04 * SPEED_MULTIPLIER;
    }
    if (b.current) {
      b.current.rotation.y += d * 0.05 * SPEED_MULTIPLIER;
      b.current.rotation.x -= d * 0.03 * SPEED_MULTIPLIER;
    }
  });
  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.8, 0.012, 16, 140]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={b} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[4.7, 0.012, 16, 140]} />
        <meshBasicMaterial
          color="#7b2fff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function Comet() {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  useFrame((_, d) => {
    t.current += d * 0.2 * SPEED_MULTIPLIER;
    if (!ref.current) return;
    const r = 4.4;
    ref.current.position.set(
      Math.cos(t.current) * r,
      Math.sin(t.current * 1.3) * 1.5,
      Math.sin(t.current) * r,
    );
  });
  return (
    <Trail width={1.6} length={5} color="#00d4ff" attenuation={(w) => w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color="#bdf3ff" toneMapped={false} />
      </mesh>
    </Trail>
  );
}

function Rig() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const tx = state.pointer.x * 0.25; // Increased from 0.05 (5x more sensitive)
    const ty = state.pointer.y * 0.15; // Increased from 0.03 (5x more sensitive)
    group.current.rotation.y += (tx - group.current.rotation.y) * 0.1; // Increased from 0.01 (10x faster response)
    group.current.rotation.x += (-ty - group.current.rotation.x) * 0.1; // Increased from 0.01 (10x faster response)
    group.current.rotation.z += 0.0001 * SPEED_MULTIPLIER;
  });
  return (
    <group ref={group}>
      <Stars radius={70} depth={45} count={IS_MOBILE ? 900 : 1800} factor={3} saturation={0} fade speed={0.6 * SPEED_MULTIPLIER} />
      <NeuralGlobe />
      <Core />
      <Rings />
      {SHARDS.map((s, i) => (
        <Shard key={i} {...s} />
      ))}
      <Comet />
      <Sparkles count={IS_MOBILE ? 35 : 70} scale={[11, 11, 7]} size={3} speed={0.4 * SPEED_MULTIPLIER} color="#7b2fff" opacity={0.6} />
      <Particles />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 12], fov: 50 }}
      dpr={typeof window !== 'undefined' && window.innerWidth < 768 ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      performance={{ min: 0.5 }}
    >
      <Rig />
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={1.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.3}
        />
      </EffectComposer>
    </Canvas>
  );
}
