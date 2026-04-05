"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Users, Clock, Award, ChevronDown, Dumbbell, Sparkles } from "lucide-react";

// Dynamic import — WebGL은 SSR에서 렌더링 불가
const HeroScene3D = dynamic(() => import("./HeroScene3D"), { ssr: false });

interface HeroSectionProps {
  onCTAClick: () => void;
}

export default function HeroSection({ onCTAClick }: HeroSectionProps) {
  const scrollToNext = () => {
    const el = document.getElementById("awards");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg">
      {/* 3D WebGL Background — Fixed Inset Pattern */}
      <HeroScene3D />

      {/* Decorative grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,230,130,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,230,130,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Glow orbs */}
      <div
        className="pointer-events-none absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #FFE682, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #FFE682, transparent 70%)" }}
      />

      {/* Sticky nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(17,17,17,0.85)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,230,130,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5" style={{ color: "#FFE682" }} />
          <span className="font-bebas text-lg tracking-widest" style={{ color: "#FFE682" }}>
            FITNESS FANDOM
          </span>
        </div>
        <button onClick={onCTAClick} className="btn-primary" style={{ fontSize: "14px", padding: "10px 22px" }}>
          무료 체험 신청
        </button>
      </nav>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-28 pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text block */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="section-label mb-4">화곡 초보전문 헬스장</p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-bold tracking-tight mb-6"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#F5F5F5",
              }}
            >
              헬창도 문신도 없는
              <br />
              <span
                className="glow-text"
                style={{ color: "#FFE682" }}
              >
                화곡 초보전문
              </span>
              <br />
              헬스장
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
            >
              2000명이 선택한 이유, 지금 직접 경험해보세요.
              <br />
              <span style={{ color: "#F5F5F5" }}>어제보다 나은 오늘</span>을 함께 만들어 드립니다.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
            >
              {[
                "✅ 누적 회원 2,000명+",
                "✅ 23년 경력 대표 직접 운영",
                "✅ 전원 국가자격 트레이너",
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-sm font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,230,130,0.1)",
                    border: "1px solid rgba(255,230,130,0.25)",
                    color: "#F5F5F5",
                    fontFamily: "'Pretendard', sans-serif",
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button onClick={onCTAClick} className="btn-primary text-xl">
                🎁 사전이용권 1회 신청하기
              </button>
              <a
                href="tel:0507-1435-0871"
                className="btn-secondary"
              >
                📞 전화 상담
              </a>
            </motion.div>

            {/* Micro-copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-4 text-sm"
              style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
            >
              부담 없는 1회 무료 체험 · 별도 가입비 없음 · 신청 후 24시간 내 연락
            </motion.p>
          </div>

          {/* Right: floating stat cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0 relative w-full max-w-xs mx-auto lg:mx-0"
          >
            {/* Big number card */}
            <div
              className="rounded-2xl p-6 mb-4 text-center"
              style={{
                background: "linear-gradient(135deg, #1E1E1E 0%, #252525 100%)",
                border: "1px solid rgba(255,230,130,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,230,130,0.06)",
              }}
            >
              <p className="section-label mb-2">누적 회원</p>
              <p className="font-bebas glow-text" style={{ fontSize: "88px", color: "#FFE682", lineHeight: 1 }}>
                2,000<span style={{ fontSize: "40px" }}>+</span>
              </p>
              <p className="text-sm mt-1" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                화곡에서 2000명이 선택한 헬스장
              </p>
            </div>

            {/* Floating badges */}
            <div className="flex gap-3 justify-center">
              <div className="hero-badge float-1">
                <Users className="w-4 h-4" style={{ color: "#FFE682" }} />
                <div>
                  <p className="font-bebas text-2xl" style={{ color: "#FFE682", lineHeight: 1 }}>23</p>
                  <p className="text-xs" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>년 경력</p>
                </div>
              </div>
              <div className="hero-badge float-2">
                <Clock className="w-4 h-4" style={{ color: "#FFE682" }} />
                <div>
                  <p className="font-bebas text-2xl" style={{ color: "#FFE682", lineHeight: 1 }}>24H</p>
                  <p className="text-xs" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>연중무휴</p>
                </div>
              </div>
              <div className="hero-badge float-1" style={{ animationDelay: "1s" }}>
                <Award className="w-4 h-4" style={{ color: "#FFE682" }} />
                <div>
                  <p className="font-bebas text-2xl" style={{ color: "#FFE682", lineHeight: 1 }}>3</p>
                  <p className="text-xs" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>개 수상</p>
                </div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="pulse-dot" />
              <span className="text-sm" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                지금 이 순간도 운영 중
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer border-none bg-transparent"
        style={{ color: "#A0A0A0" }}
      >
        <Sparkles className="w-4 h-4" style={{ color: "#FFE682" }} />
        <span className="text-xs" style={{ fontFamily: "'Pretendard', sans-serif" }}>스크롤하여 더 보기</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
