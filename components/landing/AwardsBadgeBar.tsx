"use client";

import { Trophy, Award, Star, Shield, CheckCircle, Medal } from "lucide-react";

const awards = [
  { icon: <Trophy className="w-5 h-5" />, text: "KCIA 소비자 만족도 우수센터 감사패" },
  { icon: <Award className="w-5 h-5" />, text: "코리아 피트니스 어워즈 휘트니스부문 우수상" },
  { icon: <Star className="w-5 h-5" />, text: "우수 웰니스 브랜드상" },
  { icon: <Shield className="w-5 h-5" />, text: "생활체육지도자 실습기관 지정" },
  { icon: <CheckCircle className="w-5 h-5" />, text: "전원 국가자격 보유 PT강사진" },
  { icon: <Medal className="w-5 h-5" />, text: "움직임클리닉 자격 전문 강사진" },
  { icon: <Trophy className="w-5 h-5" />, text: "23년 경력 대표 직접 운영" },
  { icon: <Award className="w-5 h-5" />, text: "누적 회원 2,000명+" },
];

export default function AwardsBadgeBar() {
  const doubled = [...awards, ...awards];

  return (
    <section id="awards" className="py-10 overflow-hidden" style={{ background: "#0D0D0D", borderTop: "1px solid rgba(255,230,130,0.08)", borderBottom: "1px solid rgba(255,230,130,0.08)" }}>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {doubled.map((award, i) => (
            <div key={i} className="award-badge flex items-center gap-3 px-5 py-3">
              <span style={{ color: "#FFE682" }}>{award.icon}</span>
              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
              >
                {award.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
