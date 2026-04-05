"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: "🧠",
    title: "AI 맞춤 트레이닝",
    description:
      "개인 체형, 목표, 생활 패턴을 분석하여 완전히 맞춤화된 운동 프로그램을 자동 생성합니다.",
    color: "from-violet-600/20 to-violet-600/5",
    border: "border-violet-500/30",
    glow: "rgba(167, 139, 250, 0.15)",
  },
  {
    icon: "🍽️",
    title: "스마트 영양 관리",
    description:
      "식단 로그를 분석하고 최적의 영양 섭취 계획을 제공. 목표에 맞는 칼로리와 매크로를 자동 계산합니다.",
    color: "from-blue-600/20 to-blue-600/5",
    border: "border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.15)",
  },
  {
    icon: "📊",
    title: "실시간 성과 분석",
    description:
      "웨어러블 기기 연동으로 실시간 데이터를 수집. AI가 진행 상황을 분석하고 즉각적인 피드백을 제공합니다.",
    color: "from-indigo-600/20 to-indigo-600/5",
    border: "border-indigo-500/30",
    glow: "rgba(99, 102, 241, 0.15)",
  },
  {
    icon: "🤝",
    title: "커뮤니티 팬덤",
    description:
      "같은 목표를 가진 사람들과 연결되세요. 챌린지, 리더보드, 그룹 트레이닝으로 동기부여를 높입니다.",
    color: "from-purple-600/20 to-purple-600/5",
    border: "border-purple-500/30",
    glow: "rgba(147, 51, 234, 0.15)",
  },
  {
    icon: "🔄",
    title: "자동화 루틴 생성",
    description:
      "생활 패턴과 일정을 분석하여 가장 효과적인 운동 루틴을 자동으로 스케줄링합니다.",
    color: "from-cyan-600/20 to-cyan-600/5",
    border: "border-cyan-500/30",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  {
    icon: "🏆",
    title: "목표 달성 시스템",
    description:
      "단기 및 장기 목표를 설정하고 마일스톤마다 보상을 받으세요. 게임화된 경험으로 꾸준함을 유지합니다.",
    color: "from-amber-600/20 to-amber-600/5",
    border: "border-amber-500/30",
    glow: "rgba(245, 158, 11, 0.15)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 50,
      damping: 15,
    },
  },
};

function ServiceCard({
  service,
}: {
  service: (typeof services)[0];
}) {
  const iconRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -10,
        transition: { type: "spring", stiffness: 300 },
      }}
      className={`relative group rounded-2xl p-6 bg-gradient-to-br ${service.color} border ${service.border} cursor-default overflow-hidden`}
      style={{ perspective: "1000px" }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `inset 0 0 40px ${service.glow}` }}
      />

      {/* Icon */}
      <motion.span
        ref={iconRef}
        className="inline-block text-4xl mb-4"
        whileHover={{ rotate: 12 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {service.icon}
      </motion.span>

      {/* Content */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300">
        {service.title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>

      {/* Arrow */}
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/30 group-hover:text-white/70 transition-colors duration-300">
        자세히 보기
        <svg
          className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-violet-300 text-sm font-medium mb-4">
            서비스
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            모든 것이 <span className="text-gradient">자동화</span>됩니다
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            AI가 당신의 피트니스 파트너가 되어 운동부터 영양까지 전 과정을 스마트하게 관리합니다.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
