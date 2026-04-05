"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Train, ExternalLink } from "lucide-react";

interface MapSectionProps {
  onCTAClick: () => void;
}

export default function MapSection({ onCTAClick }: MapSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const info = [
    {
      icon: <MapPin className="w-5 h-5 flex-shrink-0" />,
      label: "주소",
      value: "서울 강서구 화곡로 154 9층",
    },
    {
      icon: <Train className="w-5 h-5 flex-shrink-0" />,
      label: "지하철",
      value: "5호선 화곡역 6번 출구 도보 2분 (117m)",
    },
    {
      icon: <Clock className="w-5 h-5 flex-shrink-0" />,
      label: "운영시간",
      value: "24시간 연중무휴 365일",
    },
    {
      icon: <Phone className="w-5 h-5 flex-shrink-0" />,
      label: "전화",
      value: "0507-1435-0871",
    },
  ];

  return (
    <section
      id="map"
      className="py-24 px-6 section-hidden"
      ref={sectionRef}
      style={{ background: "#111111" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">오시는 길</p>
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Pretendard', sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.03em",
              color: "#F5F5F5",
            }}
          >
            화곡역 바로{" "}
            <span style={{ color: "#FFE682" }}>앞</span>에 있습니다
          </h2>
          <p className="text-lg max-w-lg mx-auto" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
            5호선 화곡역 6번 출구에서 걸어서 2분. 언제든지 오세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 네이버 지도 iframe */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,230,130,0.15)", aspectRatio: "4/3", position: "relative" }}
          >
            <iframe
              src="https://m.place.naver.com/place/2076781689/location?entry=pll&filter=location&selected_place_id=2076781689"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              title="휘트니스팬덤짐 24시 헬스&PT 화곡점 — 네이버 지도"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="space-y-4"
          >
            {info.map((item, i) => (
              <div
                key={i}
                className="map-info-card flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(255,230,130,0.1)",
                    border: "1px solid rgba(255,230,130,0.2)",
                    color: "#FFE682",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-semibold mb-0.5"
                    style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-semibold"
                    style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif", fontSize: "15px" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={onCTAClick} className="btn-primary flex-1 justify-center" style={{ fontSize: "16px" }}>
                무료 체험 신청
              </button>
              <a
                href="https://map.naver.com/p/search/%ED%9C%98%ED%8A%B8%EB%8B%88%EC%8A%A4%ED%8C%AC%EB%8D%A4%EC%A7%90%20%ED%99%94%EA%B3%A1%EC%A0%90"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 justify-center"
                style={{ fontSize: "15px" }}
              >
                <ExternalLink className="w-4 h-4" />
                네이버 지도로 보기
              </a>
            </div>

            {/* Blog link */}
            <a
              href="https://blog.naver.com/c90340005"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm transition-all duration-200 hover:gap-3"
              style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
            >
              <span>📝 네이버 블로그에서 더 많은 정보 보기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
