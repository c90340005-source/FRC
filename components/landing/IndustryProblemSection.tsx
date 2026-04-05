"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Users,
  RefreshCw,
  Frown,
  TrendingDown,
  DollarSign,
} from "lucide-react";

const problems = [
  {
    icon: AlertCircle,
    title: "등록하면 알아서 하세요",
    desc: "기구 앞에서 멍하니 서있어도 아무도 도와주지 않습니다. PT를 끊어야만 관심을 받습니다.",
    tag: "방치",
  },
  {
    icon: Users,
    title: "헬창들 사이에서 눈치 게임",
    desc: "다들 뭔가 열심히 하는데 나만 모르는 것 같은 그 느낌. 운동도 못하고 스트레스만 받고 나옵니다.",
    tag: "위압감",
  },
  {
    icon: RefreshCw,
    title: "트레이너가 매달 바뀜",
    desc: "겨우 친해졌더니 새 트레이너. 내 몸 상태를 매번 처음부터 설명해야 합니다.",
    tag: "일관성 없음",
  },
  {
    icon: Frown,
    title: "더럽고 불쾌한 공용 샤워실",
    desc: "운동하고 나서 씻으러 갔다가 더 찝찝해지는 경험. 특히 여성 회원분들이 가장 많이 하시는 말씀입니다.",
    tag: "불결함",
  },
  {
    icon: TrendingDown,
    title: "3개월 후 아무도 신경 안 씀",
    desc: "처음엔 관심 갖다가 등록비 받으면 끝. 진짜 결과가 나오기 시작하는 시점에 혼자가 됩니다.",
    tag: "무관심",
  },
  {
    icon: DollarSign,
    title: "PT 안 끊으면 찬밥 신세",
    desc: "일반 회원은 2등 시민 취급. 운동 공간이지만 영업 공간처럼 느껴지는 곳. 오래 다닐 수가 없습니다.",
    tag: "차별",
  },
];

export default function IndustryProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.classList.add("section-hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("section-hidden");
          el.classList.add("section-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="industry-problem"
      ref={sectionRef}
      style={{ backgroundColor: "#0D0D0D" }}
      className="py-20 md:py-28 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="section-label">THE PROBLEM</span>
          <h2
            className="mt-4 mb-4 font-bold leading-tight"
            style={{
              fontFamily: "Pretendard, sans-serif",
              fontSize: "clamp(26px, 5vw, 42px)",
              color: "#F5F5F5",
            }}
          >
            대부분의 헬스장이 초보자한테 이렇게 합니다
          </h2>
          <p
            style={{
              color: "#A0A0A0",
              fontSize: "clamp(15px, 2vw, 17px)",
              lineHeight: 1.7,
            }}
          >
            등록만 받고 끝. 어떻게 운동해야 하는지 아무도 안 알려줍니다.
          </p>
        </div>

        {/* Problem cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                style={{ perspective: "800px", transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="problem-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    default: { duration: 0.6, delay: i * 0.1 },
                    rotateX: { type: "spring", stiffness: 300, damping: 20 },
                    rotateY: { type: "spring", stiffness: 300, damping: 20 },
                    scale:   { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  whileHover={{
                    rotateX: -4,
                    rotateY: 4,
                    scale: 1.03,
                    z: 30,
                    borderColor: "rgba(239,68,68,0.5)",
                    background: "rgba(30,10,10,0.98)",
                    boxShadow:
                      "0 20px 50px rgba(239,68,68,0.12), 0 0 0 1px rgba(239,68,68,0.3)",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Tag badge — top right */}
                  <motion.span
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      color: "#f87171",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontFamily: "Pretendard, sans-serif",
                    }}
                    whileHover={{
                      background: "rgba(239,68,68,0.25)",
                      borderColor: "rgba(239,68,68,0.6)",
                    }}
                  >
                    {item.tag}
                  </motion.span>

                  {/* Icon */}
                  <motion.div
                    className="problem-icon mb-4"
                    whileHover={{
                      boxShadow: "0 0 20px rgba(239,68,68,0.3)",
                    }}
                  >
                    <Icon size={20} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#F5F5F5",
                      marginBottom: "10px",
                      paddingRight: "40px",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "Pretendard, sans-serif",
                      fontSize: "14px",
                      color: "#A0A0A0",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Connector text */}
        <div className="mt-10 text-center">
          <p
            style={{
              color: "#FFE682",
              fontSize: "clamp(15px, 2vw, 18px)",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            휘트니스팬덤짐은 이 6가지 모두 다릅니다 →
          </p>
        </div>
      </div>
    </section>
  );
}
