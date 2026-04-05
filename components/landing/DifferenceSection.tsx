"use client";

/**
 * DifferenceSection — GSAP Horizontal Scroll Pin (Spec §D)
 *
 * - 데스크탑: 섹션 상단에서 pin → 수직 스크롤이 수평 카드 이동으로 변환
 * - Active card: scale 1.0, opacity 1, 노랑 glow shadow
 * - Inactive cards: scale 0.88, opacity 0.35, blur 6px
 * - 모바일: 일반 그리드 폴백
 */

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { UserCheck, Award, ShowerHead, Clock4 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: <UserCheck className="w-7 h-7" />,
    number: "01",
    title: "23년차 대표가 직접 운영하는 검증된 공간",
    desc: "화곡에서 23년, 운영 15년. 트렌드보다 사람을 먼저 생각하는 대표가 매일 센터를 지킵니다. 매달 새로 생기고 사라지는 헬스장이 아닙니다.",
    highlight: "23년 한결같이",
  },
  {
    icon: <Award className="w-7 h-7" />,
    number: "02",
    title: "전원 국가자격 + 움직임클리닉 자격 트레이너",
    desc: "단순히 자격증만 있는 트레이너가 아닙니다. KCIA 인증, 코리아 피트니스 어워즈 수상. 검증된 실력으로 당신의 몸을 책임집니다.",
    highlight: "검증된 전문성",
  },
  {
    icon: <ShowerHead className="w-7 h-7" />,
    number: "03",
    title: "1인 프라이빗 샤워실 & 파우더룸 (여성 특화)",
    desc: "운동 후 눈치 보지 않고 편하게 씻을 수 있는 나만의 공간. 여성 회원을 위한 섬세한 배려가 다릅니다.",
    highlight: "여성 친화 환경",
  },
  {
    icon: <Clock4 className="w-7 h-7" />,
    number: "04",
    title: "24시간 연중무휴, 화곡역 6번 출구 바로",
    desc: "새벽 6시, 밤 11시—언제든 오세요. 화곡역 6번 출구에서 도보 2분, 엘리베이터로 9층. 365일 당신을 기다립니다.",
    highlight: "최고의 접근성",
  },
];

export default function DifferenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const worldRef   = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Horizontal scroll only on desktop
    if (window.innerWidth < 1024) return;
    if (!sectionRef.current || !worldRef.current) return;

    const CARD_WIDTH = 480;
    const GAP = 32;
    const totalPan = (CARD_WIDTH + GAP) * (cards.length - 1);

    const ctx = gsap.context(() => {
      const tween = gsap.to(worldRef.current, {
        x: -totalPan,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: `+=${totalPan + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        animation: tween,
        onUpdate: (self) => {
          const activeIndex = Math.round(self.progress * (cards.length - 1));
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const isActive = i === activeIndex;
            gsap.to(card, {
              scale:     isActive ? 1    : 0.88,
              opacity:   isActive ? 1    : 0.35,
              filter:    isActive ? "blur(0px)" : "blur(6px)",
              boxShadow: isActive
                ? "0 0 60px rgba(255,230,130,0.18), 0 30px 60px rgba(0,0,0,0.5)"
                : "none",
              duration: 0.3,
              overwrite: "auto",
            });
          });
        },
      });

      // Initial state
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          scale: i === 0 ? 1 : 0.88,
          opacity: i === 0 ? 1 : 0.35,
          filter: i === 0 ? "blur(0px)" : "blur(6px)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="difference"
      ref={sectionRef}
      className="py-24 overflow-hidden"
      style={{ background: "#111111", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Why Fitness Fandom</p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              color: "#F5F5F5",
            }}
          >
            휘트니스팬덤이{" "}
            <span style={{ color: "#FFE682" }}>다른 이유</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
            23년의 시간이 만든 차이. 시설이 아니라 사람이 다릅니다.
          </p>
        </div>
      </div>

      {/* ── Desktop: GSAP horizontal scroll track ── */}
      <div
        ref={worldRef}
        className="hidden lg:flex items-center gap-8 flex-shrink-0"
        style={{ paddingLeft: "10vw", paddingRight: "10vw", width: "max-content" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardRefs.current[i] = el; }}
            className="diff-card group flex-shrink-0"
            style={{ width: "480px" }}
          >
            <CardInner card={card} index={i} totalCards={cards.length} />
          </div>
        ))}
      </div>

      {/* ── Mobile: standard 2-col grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden max-w-6xl mx-auto px-6 w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="diff-card group"
          >
            <CardInner card={card} index={i} totalCards={cards.length} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Card inner content ───────────────────────────────────────────────────────
function CardInner({
  card,
  index,
  totalCards,
}: {
  card: (typeof cards)[0];
  index: number;
  totalCards: number;
}) {
  return (
    <>
      {/* Top row: icon + number */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="diff-icon w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(255,230,130,0.12)",
            border: "1px solid rgba(255,230,130,0.25)",
            color: "#FFE682",
          }}
        >
          {card.icon}
        </div>
        <span
          className="font-bebas opacity-20 group-hover:opacity-50 transition-opacity duration-300"
          style={{ fontSize: "40px", color: "#FFE682", lineHeight: 1 }}
        >
          {card.number}
        </span>
      </div>

      {/* Highlight tag */}
      <span
        className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
        style={{
          background: "rgba(255,230,130,0.1)",
          border: "1px solid rgba(255,230,130,0.2)",
          color: "#FFE682",
          fontFamily: "'Pretendard', sans-serif",
        }}
      >
        {card.highlight}
      </span>

      <h3
        className="font-bold mb-3"
        style={{
          fontFamily: "'Pretendard', sans-serif",
          fontSize: "18px",
          color: "#F5F5F5",
          lineHeight: 1.4,
        }}
      >
        {card.title}
      </h3>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
      >
        {card.desc}
      </p>

      {/* Dot progress indicator */}
      <div className="mt-6 flex gap-2 items-center">
        {Array.from({ length: totalCards }).map((_, j) => (
          <div
            key={j}
            style={{
              width: j === index ? "24px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background: j === index ? "#FFE682" : "rgba(255,230,130,0.2)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
        <span
          className="ml-1 text-xs"
          style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
        >
          {index + 1} / {totalCards}
        </span>
      </div>
    </>
  );
}
