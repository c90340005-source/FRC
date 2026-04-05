"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: "01",
    title: "분석",
    subtitle: "당신을 이해합니다",
    description:
      "체형 데이터, 생활 패턴, 운동 이력을 종합 분석하여 기준점을 설정합니다. AI가 당신의 현재 상태를 정확히 파악합니다.",
    icon: "🔍",
    color: "#a78bfa",
  },
  {
    step: "02",
    title: "설계",
    subtitle: "맞춤 플랜 생성",
    description:
      "수천 가지 변수를 고려하여 오직 당신만을 위한 운동 및 영양 프로그램을 자동 설계합니다.",
    icon: "⚡",
    color: "#3b82f6",
  },
  {
    step: "03",
    title: "실행",
    subtitle: "스마트하게 운동",
    description:
      "실시간 자세 교정, 강도 조절, 회복 모니터링으로 매 운동을 최적화합니다. 부상 없이 최대 효과를 얻습니다.",
    icon: "🏋️",
    color: "#6366f1",
  },
  {
    step: "04",
    title: "진화",
    subtitle: "지속적 성장",
    description:
      "매일 축적되는 데이터로 프로그램이 스스로 진화합니다. 목표 달성 후에도 새로운 정상을 향해 나아갑니다.",
    icon: "🚀",
    color: "#8b5cf6",
  },
];

export default function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !worldRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const cardWidth = 420;
    const gap = 32;
    const totalWidth = (cardWidth + gap) * (steps.length - 1);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${totalWidth + 600}`,
        },
      });

      // Initial zoom from satellite view
      tl.from(worldRef.current, {
        scale: 0.3,
        duration: 0.5,
        ease: "power2.out",
      });

      // Horizontal pan
      tl.to(worldRef.current, {
        x: -totalWidth,
        duration: steps.length - 1,
        ease: "none",
      });

      // Card focus/blur for each step
      cards.forEach((card, i) => {
        const offset = i / (steps.length - 1);

        // Focus the current card
        tl.to(
          card,
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.3,
          },
          offset
        );

        // Blur previous cards
        if (i > 0) {
          tl.to(
            cards[i - 1],
            {
              scale: 0.9,
              opacity: 0.2,
              filter: "blur(8px)",
              duration: 0.3,
            },
            offset
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#030014]"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(167,139,250,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Section label */}
      <div className="relative z-10 text-center pt-20 pb-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-blue-300 text-sm font-medium mb-4">
            접근법
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            4단계 <span className="text-gradient">변화의 여정</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            처음 가입부터 목표 달성까지, AI가 모든 단계를 함께합니다.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll world */}
      <div className="relative flex-1 flex items-center overflow-hidden px-[10vw]">
        <div ref={worldRef} className="flex gap-8 will-change-transform">
          {steps.map((step, i) => (
            <div
              key={step.step}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`flex-shrink-0 w-[380px] rounded-3xl p-8 glass border border-white/10 ${
                i !== 0 ? "opacity-20 scale-90 blur-[8px]" : ""
              }`}
              style={{
                boxShadow: `0 0 60px ${step.color}22`,
                borderColor: `${step.color}33`,
              }}
            >
              {/* Step number */}
              <div
                className="text-7xl font-black mb-6 leading-none"
                style={{ color: `${step.color}44` }}
              >
                {step.step}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-6">{step.icon}</div>

              {/* Content */}
              <div
                className="text-xs font-semibold tracking-widest uppercase mb-2"
                style={{ color: step.color }}
              >
                {step.subtitle}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-white/50 leading-relaxed">{step.description}</p>

              {/* Progress indicator */}
              <div className="mt-8 flex gap-2">
                {steps.map((_, j) => (
                  <div
                    key={j}
                    className="h-1 rounded-full flex-1 transition-all duration-300"
                    style={{
                      background: j === i ? step.color : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 text-center pb-8">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          스크롤하여 탐색 →
        </p>
      </div>
    </section>
  );
}
