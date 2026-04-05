"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <HeroScene />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,_rgba(3,0,20,0)_0%,_rgba(3,0,20,0.7)_70%)]" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-[#030014] to-transparent" />

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-sm text-white/70 font-medium">
            AI 피트니스 자동화 플랫폼 — 베타 출시
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
        >
          <span className="text-white">피트니스를 </span>
          <span className="text-gradient">다시 정의</span>
          <br />
          <span className="text-white">하다</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-xl md:text-2xl text-white/50 font-light max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          AI와 데이터 기반 자동화로 당신만의 피트니스 여정을 설계합니다.
          <br className="hidden md:block" />
          팬덤이 되는 순간, 운동이 달라집니다.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-base hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(167,139,250,0.4)]"
          >
            무료로 시작하기 →
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full glass text-white/80 font-semibold text-base hover:text-white hover:border-white/20 transition-all duration-200"
          >
            서비스 보기
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { value: "10K+", label: "활성 멤버" },
            { value: "98%", label: "목표 달성률" },
            { value: "3x", label: "운동 효율" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
