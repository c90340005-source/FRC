"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────── Central Crystal ─────────────────────────── */
function CentralCrystal({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    // Retreat on scroll
    meshRef.current.position.z = -scrollY * 0.005;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <MeshTransmissionMaterial
          transmission={0.97}
          roughness={0.05}
          thickness={0.5}
          chromaticAberration={0.6}
          ior={1.5}
          color="#a78bfa"
          backside
        />
      </mesh>
    </Float>
  );
}

/* ─────────────────────────── Debris Field ──────────────────────────────── */
function DebrisField({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const debrisCount = 16;

  const positions = useRef<Array<{ phi: number; theta: number; baseRadius: number }>>(
    Array.from({ length: debrisCount }, () => ({
      phi: Math.random() * Math.PI * 2,
      theta: Math.random() * Math.PI,
      baseRadius: 2.5 + Math.random() * 2,
    }))
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scrollFactor = scrollY * 0.003;

    groupRef.current.children.forEach((child, i) => {
      const d = positions.current[i];
      const r = d.baseRadius + scrollFactor * 3;
      const phi = d.phi + t * 0.08;
      const theta = d.theta + t * 0.04;

      child.position.set(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta) + scrollFactor * 2
      );

      child.rotation.x += 0.01;
      child.rotation.y += 0.015;
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: debrisCount }).map((_, i) => (
        <mesh key={i} scale={0.15 + Math.random() * 0.3}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            transmission={0.92}
            roughness={0.1}
            thickness={0.3}
            chromaticAberration={0.8}
            ior={1.5}
            color={i % 2 === 0 ? "#a78bfa" : "#3b82f6"}
            backside
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────── Mouse Parallax Camera ─────────────────────── */
function ParallaxCamera({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    target.current.set(mouse.x * 1.5, mouse.y * 1.0, 5);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ─────────────────────────── Grid Floor ─────────────────────────────────── */
function GridFloor() {
  return (
    <gridHelper
      args={[30, 30, "#a78bfa22", "#3b82f622"]}
      position={[0, -3, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

/* ─────────────────────────── Inner Scene (uses hooks) ───────────────────── */
function InnerScene({
  mouse,
  scrollY,
}: {
  mouse: { x: number; y: number };
  scrollY: number;
}) {
  return (
    <>
      <ParallaxCamera mouse={mouse} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#3b82f6" />
      <Environment preset="city" />
      <GridFloor />
      <CentralCrystal scrollY={scrollY} />
      <DebrisField scrollY={scrollY} />
    </>
  );
}

/* ─────────────────────────── Canvas Wrapper ─────────────────────────────── */
export default function HeroScene() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <InnerScene mouse={mouse} scrollY={scrollY} />
      </Canvas>
    </div>
  );
}
