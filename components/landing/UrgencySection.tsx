"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Clock, TrendingDown, Users, ArrowRight } from "lucide-react";

interface UrgencySectionProps {
  onCTAClick: () => void;
}

const newMemberStats = [
  { value: "48시간", label: "결심 유지 평균 시간" },
  { value: "73%", label: "1개월 내 포기율 (타 헬스장)" },
  { value: "2,000명", label: "여기서 성공한 초보자 수" },
];

const timelineStages = [
  { time: "2주", desc: "근력 10% 감소 시작", highlight: false },
  { time: "1개월", desc: "유산소 능력 저하", highlight: false },
  { time: "3개월", desc: "운동 전 상태로 복귀", highlight: false },
  { time: "지금", desc: "지금이 재등록 최적 타이밍", highlight: true },
];

export default function UrgencySection({ onCTAClick }: UrgencySectionProps) {
  // Card 1 state
  const [mousePos1, setMousePos1] = useState({ x: 0, y: 0 });
  const [hovered1, setHovered1] = useState(false);
  const [tilt1, setTilt1] = useState({ rotateX: 0, rotateY: 0 });

  // Card 2 state
  const [mousePos2, setMousePos2] = useState({ x: 0, y: 0 });
  const [hovered2, setHovered2] = useState(false);
  const [tilt2, setTilt2] = useState({ rotateX: 0, rotateY: 0 });

  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const handleMouseMove1 = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos1({ x, y });
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTilt1({ rotateX, rotateY });
    },
    []
  );

  const handleMouseMove2 = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos2({ x, y });
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      setTilt2({ rotateX, rotateY });
    },
    []
  );

  const handleMouseLeave1 = useCallback(() => {
    setHovered1(false);
    setTilt1({ rotateX: 0, rotateY: 0 });
  }, []);

  const handleMouseLeave2 = useCallback(() => {
    setHovered2(false);
    setTilt2({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <section
      id="urgency"
      style={{
        background: "linear-gradient(to bottom, #0D0D0D, #111111)",
        padding: "80px 16px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65 }}
        >
          <span className="section-label">LAST CHANCE</span>
        </motion.div>

        {/* Two cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ── Card 1: New Members ── */}
          <motion.div
            ref={card1Ref}
            className="urgency-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            onMouseMove={handleMouseMove1}
            onMouseEnter={() => setHovered1(true)}
            onMouseLeave={handleMouseLeave1}
            style={{
              background: "#1E1E1E",
              border: `1px solid ${hovered1 ? "rgba(255,230,130,0.5)" : "rgba(255,230,130,0.12)"}`,
              borderRadius: "18px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              boxShadow: hovered1
                ? "0 30px 60px rgba(255,230,130,0.1), 0 0 0 1px rgba(255,230,130,0.2)"
                : "none",
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${tilt1.rotateX}deg) rotateY(${tilt1.rotateY}deg)`,
            }}
          >
            {/* Spotlight overlay */}
            <div
              className="spotlight-overlay"
              style={{
                background: hovered1
                  ? `radial-gradient(circle 250px at ${mousePos1.x}px ${mousePos1.y}px, rgba(255,230,130,0.07), transparent 70%)`
                  : "none",
                opacity: hovered1 ? 1 : 0,
              }}
            />

            {/* Label badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,230,130,0.1)",
                border: "1px solid rgba(255,230,130,0.25)",
                borderRadius: "20px",
                padding: "4px 14px",
                marginBottom: "20px",
              }}
            >
              <Clock size={13} style={{ color: "#FFE682" }} />
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#FFE682",
                  letterSpacing: "0.06em",
                }}
              >
                신규 회원에게
              </span>
            </div>

            {/* Headline */}
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 800,
                color: "#F5F5F5",
                lineHeight: 1.4,
                marginBottom: "14px",
                whiteSpace: "pre-line",
              }}
            >
              {`지금 고민하는 동안\n내 몸은 계속 그대로입니다`}
            </h3>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "14px",
                color: "#A0A0A0",
                lineHeight: 1.7,
                marginBottom: "28px",
                whiteSpace: "pre-line",
              }}
            >
              {`"다음 달부터 시작해야지"라고 생각한 게 몇 번인가요?\n결심이 식기 전에, 딱 한 번만 와보세요.`}
            </p>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              {newMemberStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "12px 14px",
                    background: "rgba(255,230,130,0.04)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,230,130,0.08)",
                  }}
                >
                  <span
                    className="stat-number-glow"
                    style={{
                      fontFamily: "Bebas Neue, cursive",
                      fontSize: "clamp(22px, 3vw, 28px)",
                      color: "#FFE682",
                      lineHeight: 1,
                      minWidth: "80px",
                      flexShrink: 0,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "13px",
                      color: "#A0A0A0",
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onCTAClick}
              className="btn-primary w-full justify-center magnetic-btn"
              style={{ fontSize: "16px", padding: "14px 24px" }}
            >
              무료 체험 신청하기
              <ArrowRight size={16} />
            </button>
          </motion.div>

          {/* ── Card 2: Existing Members ── */}
          <motion.div
            ref={card2Ref}
            className="urgency-card"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            onMouseMove={handleMouseMove2}
            onMouseEnter={() => setHovered2(true)}
            onMouseLeave={handleMouseLeave2}
            style={{
              background: "#1E1E1E",
              border: `1px solid ${hovered2 ? "rgba(255,230,130,0.5)" : "rgba(255,230,130,0.12)"}`,
              borderRadius: "18px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              boxShadow: hovered2
                ? "0 30px 60px rgba(255,230,130,0.1), 0 0 0 1px rgba(255,230,130,0.2)"
                : "none",
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateX(${tilt2.rotateX}deg) rotateY(${tilt2.rotateY}deg)`,
            }}
          >
            {/* Spotlight overlay */}
            <div
              className="spotlight-overlay"
              style={{
                background: hovered2
                  ? `radial-gradient(circle 250px at ${mousePos2.x}px ${mousePos2.y}px, rgba(255,230,130,0.07), transparent 70%)`
                  : "none",
                opacity: hovered2 ? 1 : 0,
              }}
            />

            {/* Label badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "rgba(255,230,130,0.15)",
                border: "1px solid rgba(255,230,130,0.3)",
                borderRadius: "20px",
                padding: "4px 14px",
                marginBottom: "20px",
              }}
            >
              <TrendingDown size={13} style={{ color: "#FFE682" }} />
              <span
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#FFE682",
                  letterSpacing: "0.06em",
                }}
              >
                기존 회원에게
              </span>
            </div>

            {/* Headline */}
            <h3
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontWeight: 800,
                color: "#F5F5F5",
                lineHeight: 1.4,
                marginBottom: "14px",
                whiteSpace: "pre-line",
              }}
            >
              {`그동안 쌓아온 노력\n여기서 멈추면 아깝습니다`}
            </h3>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontSize: "14px",
                color: "#A0A0A0",
                lineHeight: 1.7,
                marginBottom: "28px",
                whiteSpace: "pre-line",
              }}
            >
              {`운동을 2주 쉬면 근력의 10%가 감소합니다.\n지금까지 만든 몸, 이어가세요.`}
            </p>

            {/* Timeline */}
            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: "Pretendard, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#A0A0A0",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                근력 손실 타임라인
              </p>
              {timelineStages.map((stage, i) => (
                <motion.div
                  key={i}
                  className={`timeline-item${stage.highlight ? " highlight" : ""}`}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                >
                  <div className="timeline-dot" />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontFamily: "Bebas Neue, cursive",
                        fontSize: "18px",
                        color: stage.highlight ? "#FFE682" : "#F5F5F5",
                        lineHeight: 1,
                        minWidth: "52px",
                        flexShrink: 0,
                      }}
                    >
                      {stage.time}
                    </span>
                    <span
                      style={{
                        fontFamily: "Pretendard, sans-serif",
                        fontSize: "13px",
                        color: stage.highlight ? "#FFE682" : "#A0A0A0",
                        lineHeight: 1.4,
                        fontWeight: stage.highlight ? 700 : 400,
                      }}
                    >
                      {stage.desc}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button - secondary style */}
            <button
              onClick={onCTAClick}
              className="btn-secondary w-full justify-center magnetic-btn"
              style={{ fontSize: "16px", padding: "14px 24px" }}
            >
              재등록 혜택 문의하기
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
