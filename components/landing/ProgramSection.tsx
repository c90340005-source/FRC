"use client";

/**
 * ProgramSection — wonderbarre §6 스타일
 * 다크 배경 + 중앙 정렬 + 구분선 rows
 * 3개 프로그램을 순서대로 번호 + 제목 + 설명 + 구분선
 */

import { useEffect, useRef } from "react";

const programs = [
  {
    num: "01",
    label: "BASIC",
    title: "초보자 맞춤 헬스",
    desc: "기구 사용법부터 루틴 설계까지. 처음 시작하는 분들을 위해 1:1 오리엔테이션을 제공합니다. 혼자서도 할 수 있는 '홀로서기'가 목표입니다.",
    tag: "가장 많이 선택",
  },
  {
    num: "02",
    label: "PREMIUM",
    title: "1:1 퍼스널 트레이닝",
    desc: "국가자격 보유 트레이너와 1:1 집중 케어. 체형 분석 → 목표 설정 → 맞춤 루틴. 가장 빠른 결과를 원하는 분께 권합니다.",
    tag: "재등록률 1위",
  },
  {
    num: "03",
    label: "REHAB",
    title: "재활PT & 체형교정",
    desc: "허리, 무릎, 어깨 통증으로 운동이 두려운 분. 움직임클리닉 자격 보유 트레이너가 통증 원인부터 교정까지 단계별로 함께합니다.",
    tag: "여성 특화",
  },
];

export default function ProgramSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".slide-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="programs"
      ref={ref}
      style={{ background: "#111111", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* 섹션 라벨 */}
        <p
          className="slide-up"
          style={{
            fontFamily: "'Bebas Neue', cursive",
            fontSize: "12px",
            letterSpacing: "0.22em",
            color: "#FFE682",
            marginBottom: "32px",
          }}
        >
          PROGRAMS
        </p>

        {/* 헤딩 */}
        <h2
          className="slide-up"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: "clamp(32px, 6vw, 60px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#F5F5F5",
            marginBottom: "64px",
          }}
        >
          어제보다 나은 오늘을<br />
          만드는 3가지 방법.
        </h2>

        {/* 상단 구분선 */}
        <div
          className="slide-up"
          style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginBottom: 0 }}
        />

        {/* 프로그램 rows */}
        {programs.map((p, i) => (
          <div
            key={i}
            className="slide-up program-row"
            style={{
              padding: "36px 0",
              borderBottom: "1px solid rgba(255,255,255,0.12)",
              animationDelay: `${i * 0.12}s`,
            }}
          >
            {/* 번호 + 태그 */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <span
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: "13px",
                  letterSpacing: "0.15em",
                  color: "rgba(255,230,130,0.5)",
                }}
              >
                {p.num} / {p.label}
              </span>
              <span
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "#111111",
                  background: "#FFE682",
                  padding: "4px 10px",
                  borderRadius: "100px",
                }}
              >
                {p.tag}
              </span>
            </div>

            {/* 제목 */}
            <h3
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(20px, 4vw, 28px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "#F5F5F5",
                marginBottom: "14px",
              }}
            >
              {p.title}
            </h3>

            {/* 설명 */}
            <p
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(14px, 1.8vw, 16px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                lineHeight: 1.8,
                color: "#A0A0A0",
                margin: 0,
              }}
            >
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
