"use client";

/**
 * HolographicCard — 프리싱 섹션 E 스펙
 *
 * - Mouse X/Y 추적 → perspective(1000px) rotateX/Y (max ±15deg)
 * - Glare: 마우스 반대 방향으로 이동하는 radial-gradient overlay
 * - mouseleave: 부드럽게 원위치 복귀
 */

import { useRef, useState, useCallback, ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;        // degrees, default 15
  glareOpacity?: number;   // 0-1, default 0.25
  style?: React.CSSProperties;
}

export default function HolographicCard({
  children,
  className = "",
  maxTilt = 15,
  glareOpacity = 0.25,
  style,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      // Normalized -1 to 1
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const rotateY =  nx * maxTilt;
      const rotateX = -ny * maxTilt;

      // Glare moves opposite to mouse (simulate light reflection)
      const glareX = 50 - nx * 35;
      const glareY = 50 - ny * 35;

      setTransform(
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
      );
      setGlare({ x: glareX, y: glareY, opacity: glareOpacity });
    });
  }, [maxTilt, glareOpacity]);

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform,
        transition: "transform 0.12s ease-out",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {children}

      {/* Glare overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          pointerEvents: "none",
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity * 0.8}), rgba(255,230,130,${glare.opacity * 0.5}) 35%, transparent 65%)`,
          transition: "opacity 0.3s ease",
          opacity: glare.opacity > 0 ? 1 : 0,
          mixBlendMode: "overlay",
          zIndex: 10,
        }}
      />
    </div>
  );
}
