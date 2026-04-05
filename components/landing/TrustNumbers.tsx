"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  prefix?: string;
  end: number;
  suffix: string;
  label: string;
  sub: string;
}

const stats: Stat[] = [
  { end: 2000, suffix: "+", label: "누적 회원", sub: "화곡에서 가장 많이 선택한 곳" },
  { end: 23, suffix: "년", label: "트레이너 경력", sub: "23년 현장 경험의 대표 직접 운영" },
  { end: 100, suffix: "%", label: "국가자격 보유", sub: "전원 국가공인 PT 강사진" },
  { end: 24, suffix: "H", label: "연중무휴 운영", sub: "365일, 당신의 스케줄에 맞춰서" },
];

function useCountUp(end: number, isVisible: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);
  return count;
}

function StatItem({ stat, isVisible, index }: { stat: Stat; isVisible: boolean; index: number }) {
  const count = useCountUp(stat.end, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="trust-stat flex-1 flex flex-col items-center justify-center py-10 px-4 text-center"
    >
      <div className="counter-number mb-2" style={{ fontSize: "clamp(52px, 8vw, 80px)" }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <p
        className="font-bold mb-1"
        style={{
          fontFamily: "'Pretendard', sans-serif",
          fontSize: "18px",
          color: "#F5F5F5",
        }}
      >
        {stat.label}
      </p>
      <p
        className="text-sm"
        style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
      >
        {stat.sub}
      </p>
    </motion.div>
  );
}

export default function TrustNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="trust"
      ref={sectionRef}
      className="py-8 px-6"
      style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,230,130,0.08)", borderBottom: "1px solid rgba(255,230,130,0.08)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap">
          {stats.map((stat, i) => (
            <StatItem key={i} stat={stat} isVisible={isVisible} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
