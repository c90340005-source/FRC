"use client";

/**
 * TaglineSection
 * wonderbarre §4 스타일 — 흰 배경, 에디토리얼 대형 타이포
 * 카드 없음. 텍스트 + 수직/수평 선만.
 */

import { useEffect, useRef } from "react";

export default function TaglineSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".slide-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.15 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{ background: "#F7F7F5", padding: "100px 24px 80px" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Section label */}
        <p
          className="slide-up"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "12px",
            letterSpacing: "0.22em",
            color: "#888",
            marginBottom: "32px",
          }}
        >
          WHY 2,000 MEMBERS
        </p>

        {/* 대형 에디토리얼 헤딩 */}
        <h2
          className="slide-up"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: "clamp(36px, 8vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#111111",
            marginBottom: "40px",
          }}
        >
          운동이 두렵거나,<br />
          지루하거나,<br />
          혼자 못 채웠다면.
        </h2>

        {/* 수평 구분선 */}
        <div
          className="slide-up"
          style={{
            width: "40px",
            height: "2px",
            background: "#FFE682",
            marginBottom: "32px",
          }}
        />

        {/* 서브카피 */}
        <p
          className="slide-up"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.85,
            color: "#555",
          }}
        >
          그건 의지의 문제가 아닙니다.<br />
          처음부터 제대로 알려주는 사람이 없었던 거예요.<br />
          화곡에서 15년, 2,000명이 증명한 방법이 있습니다.
        </p>
      </div>
    </section>
  );
}
