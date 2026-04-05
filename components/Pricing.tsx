"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "스타터",
    price: "무료",
    period: "",
    description: "처음 시작하는 피트니스 팬을 위한 기본 플랜",
    features: [
      "기본 AI 운동 추천",
      "주간 루틴 3개",
      "칼로리 트래커",
      "커뮤니티 접근",
      "기본 진행 상황 추적",
    ],
    cta: "무료 시작",
    highlighted: false,
    color: "#6366f1",
  },
  {
    name: "팬덤",
    price: "₩29,900",
    period: "/ 월",
    description: "진지한 목표를 가진 피트니스 팬덤의 핵심 플랜",
    features: [
      "완전 맞춤형 AI 트레이닝",
      "무제한 루틴 생성",
      "영양 플랜 자동화",
      "실시간 성과 분석",
      "웨어러블 기기 연동",
      "1:1 AI 코칭",
      "우선 고객 지원",
    ],
    cta: "팬덤 가입",
    highlighted: true,
    color: "#a78bfa",
  },
  {
    name: "엘리트",
    price: "₩79,900",
    period: "/ 월",
    description: "최고 수준의 성과를 원하는 전문가를 위한 플랜",
    features: [
      "팬덤 플랜 전체 포함",
      "전담 AI 퍼스널 트레이너",
      "고급 바이오마커 분석",
      "맞춤 보충제 추천",
      "전문 트레이너 연결",
      "오프라인 파트너 헬스장",
      "VIP 커뮤니티 접근",
    ],
    cta: "엘리트 시작",
    highlighted: false,
    color: "#3b82f6",
  },
];

function PricingCard({ plan, index }: { plan: (typeof plans)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -15;
    const rotateY = ((x - cx) / cx) * 15;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    // Glare moves opposite direction
    const glareX = 100 - (x / rect.width) * 100;
    const glareY = 100 - (y / rect.height) * 100;
    glareRef.current.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glareRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    glareRef.current.style.background = "transparent";
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex-1"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="relative rounded-2xl overflow-hidden cursor-default h-full transition-transform duration-300"
        style={{
          background: plan.highlighted
            ? `linear-gradient(135deg, ${plan.color}22, ${plan.color}08)`
            : "rgba(255,255,255,0.02)",
          border: plan.highlighted
            ? `1px solid ${plan.color}55`
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: plan.highlighted
            ? `0 0 40px ${plan.color}22, 0 0 80px ${plan.color}11`
            : "none",
        }}
      >
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none transition-all duration-100 rounded-2xl"
        />

        {/* Popular badge */}
        {plan.highlighted && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <span
              className="px-4 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${plan.color}, #3b82f6)` }}
            >
              가장 인기
            </span>
          </div>
        )}

        <div className="relative p-8 flex flex-col h-full">
          {/* Plan name */}
          <div
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ color: plan.color }}
          >
            {plan.name}
          </div>

          {/* Price */}
          <div className="flex items-end gap-1 mb-2">
            <span className="text-4xl font-black text-white">{plan.price}</span>
            <span className="text-white/40 mb-1 text-sm">{plan.period}</span>
          </div>

          <p className="text-white/40 text-sm mb-8">{plan.description}</p>

          {/* Features */}
          <ul className="space-y-3 flex-1 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <span
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${plan.color}33` }}
                >
                  <svg
                    className="w-2.5 h-2.5"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke={plan.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="text-white/70">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
            style={
              plan.highlighted
                ? {
                    background: `linear-gradient(135deg, ${plan.color}, #3b82f6)`,
                    color: "white",
                    boxShadow: isHovered ? `0 0 20px ${plan.color}66` : "none",
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }
            }
          >
            {plan.cta}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-blue-300 text-sm font-medium mb-4">
            가격 플랜
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            당신에게 맞는 <span className="text-gradient">플랜</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            모든 플랜은 14일 무료 체험을 제공합니다. 언제든지 취소 가능합니다.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          모든 가격은 VAT 포함 · 연간 구독 시 20% 할인 · 학생 할인 별도 문의
        </motion.p>
      </div>
    </section>
  );
}
