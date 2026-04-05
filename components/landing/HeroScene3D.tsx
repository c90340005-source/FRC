"use client";

/**
 * HeroScene3D — WebGL 배경 캔버스
 *
 * Architecture Rules (from spec):
 * 1. Canvas is wrapped in `fixed inset-0 z-0 pointer-events-none` div
 * 2. useThree / useFrame are ONLY inside <InteractiveScene />, never in parent
 * 3. Every useFrame loop has a null guard at the top
 */

import { useRef, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, Environment, Float, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MouseRef {
  x: number;
  y: number;
}

// ─── Sub-component: Individual floating debris piece ─────────────────────────
function GlassDebris({
  position,
  scale,
  speed,
  scrollRef,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  scrollRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPos = useRef(new THREE.Vector3(...position));

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Idle rotation
    meshRef.current.rotation.x += delta * speed * 0.4;
    meshRef.current.rotation.y += delta * speed * 0.6;

    // Scroll: explode outward + move toward camera
    const scroll = scrollRef.current;
    const dir = initialPos.current.clone().normalize();
    meshRef.current.position.set(
      initialPos.current.x + dir.x * scroll * 3,
      initialPos.current.y + dir.y * scroll * 2,
      initialPos.current.z + scroll * 1.5
    );
  });

  return (
    <Octahedron ref={meshRef} args={[scale, 0]} position={position}>
      <MeshTransmissionMaterial
        transmission={0.92}
        roughness={0.12}
        thickness={0.6}
        chromaticAberration={0.6}
        ior={1.5}
        color="#FFE682"
        backside
      />
    </Octahedron>
  );
}

// ─── Sub-component: Central crystal ──────────────────────────────────────────
function CentralCrystal({
  mouseRef,
  scrollRef,
}: {
  mouseRef: MutableRefObject<MouseRef>;
  scrollRef: MutableRefObject<number>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Idle rotation
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;

    // Scroll: retreat backward, spin faster
    const scroll = scrollRef.current;
    meshRef.current.position.z = -scroll * 4;
    meshRef.current.rotation.y += delta * scroll * 2;

    // Mouse: subtle lean
    meshRef.current.rotation.y += (mouseRef.current.x * 0.3 - meshRef.current.rotation.y) * 0.04;
    meshRef.current.rotation.x += (-mouseRef.current.y * 0.2 - meshRef.current.rotation.x) * 0.04;
  });

  return (
    <Icosahedron ref={meshRef} args={[1.4, 0]} position={[0, 0, 0]}>
      <MeshTransmissionMaterial
        transmission={0.96}
        roughness={0}
        thickness={1.2}
        chromaticAberration={0.8}
        ior={1.6}
        color="#FFE682"
        backside
        samples={6}
      />
    </Icosahedron>
  );
}

// ─── Sub-component: Camera parallax controller ───────────────────────────────
function CameraRig({ mouseRef }: { mouseRef: MutableRefObject<MouseRef> }) {
  const { camera } = useThree();

  useFrame(() => {
    // Lerp camera position toward mouse direction (parallax depth)
    camera.position.x += (mouseRef.current.x * 1.2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseRef.current.y * 0.8 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Sub-component: Full scene (all useThree/useFrame lives here) ─────────────
const DEBRIS: Array<{ pos: [number, number, number]; scale: number; speed: number }> = [
  { pos: [-3.2,  1.8, -1.5], scale: 0.28, speed: 0.9 },
  { pos: [ 3.5,  2.2, -2.0], scale: 0.22, speed: 1.2 },
  { pos: [-2.8, -2.0, -1.0], scale: 0.18, speed: 0.7 },
  { pos: [ 2.6, -1.6, -1.8], scale: 0.32, speed: 1.0 },
  { pos: [ 0.8,  3.0, -2.5], scale: 0.20, speed: 1.4 },
  { pos: [-1.2, -3.2, -1.2], scale: 0.24, speed: 0.8 },
];

function InteractiveScene({
  mouseRef,
  scrollRef,
}: {
  mouseRef: MutableRefObject<MouseRef>;
  scrollRef: MutableRefObject<number>;
}) {
  return (
    <>
      {/* Lighting — city env provides reflections for glass */}
      <Environment preset="city" />
      <ambientLight intensity={0.3} color="#FFE682" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#FFE682" />
      <pointLight position={[-5, -3, 2]} intensity={0.4} color="#ffffff" />

      {/* Central crystal */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <CentralCrystal mouseRef={mouseRef} scrollRef={scrollRef} />
      </Float>

      {/* Floating debris */}
      {DEBRIS.map((d, i) => (
        <GlassDebris key={i} position={d.pos} scale={d.scale} speed={d.speed} scrollRef={scrollRef} />
      ))}

      {/* Camera rig for parallax */}
      <CameraRig mouseRef={mouseRef} />
    </>
  );
}

// ─── Public component: Canvas + Fixed Inset wrapper ──────────────────────────
export default function HeroScene3D() {
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);

  // Track mouse
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Track scroll velocity (normalized 0–1)
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* Fixed Inset Pattern — canvas never in flow layout */
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <InteractiveScene mouseRef={mouseRef} scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
