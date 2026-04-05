"use client";

/**
 * EmpathySection — wonderbarre §7 "이런 분께 추천해요" 스타일
 * 흰 배경 + 에디토리얼 텍스트 + 왼쪽 수직선 데코
 */

import { useEffect, useRef } from "react";

const targets = [
  "뭐할지 몰라서 러닝머신만 타다 오는 분",
  "PT는 부담스럽고, 혼자서는 3개월을 못 채우는 분",
  "청결하고 쾌적한 공간에서 편하게 운동하고 싶은 분",
  "허리·무릎 통증으로 운동이 두려운 분",
  "남들 시선 없이 내 페이스대로 하고 싶은 분",
  "전문 트레이너에게 제대로 배우고 싶은 분",
];

const quotes = [
  '"처음엔 뭔지 몰라서 왔는데, 이제는 못 끊겠어요"',
  '"여기가 아니었으면 운동을 포기했을 것 같아요"',
];

export default function EmpathySection() {
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
      id="empathy"
      ref={ref}
      style={{ background: "#F7F7F5", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* 헤딩 */}
        <h2
          className="slide-up"
          style={{
            fontFamily: "'Pretendard', sans-serif",
            fontSize: "clamp(32px, 6vw, 60px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "#111111",
            marginBottom: "48px",
          }}
        >
          휘트니스팬덤짐,<br />
          이런 분께 추천해요.
        </h2>

        {/* 왼쪽 수직선 + 목록 */}
        <div style={{ display: "flex", gap: "28px" }}>
          {/* 수직 구분선 */}
          <div
            className="slide-up"
            style={{
              width: "1px",
              background: "#111111",
              flexShrink: 0,
              minHeight: "100%",
            }}
          />

          {/* 텍스트 목록 */}
          <div style={{ flex: 1 }}>
            {targets.map((text, i) => (
              <div
                key={i}
                className="slide-up"
                style={{
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(17,17,17,0.1)",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Pretendard', sans-serif",
                    fontSize: "clamp(15px, 2.2vw, 18px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.6,
                    color: "#111111",
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 인용 카피 */}
        <div style={{ marginTop: "56px" }}>
          {quotes.map((q, i) => (
            <p
              key={i}
              className="slide-up"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(14px, 2vw, 17px)",
                fontWeight: 400,
                lineHeight: 2.0,
                letterSpacing: "-0.01em",
                color: "#888",
                margin: 0,
                animationDelay: `${0.2 + i * 0.1}s`,
              }}
            >
              {q}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
