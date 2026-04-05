"use client";

import { Dumbbell, Instagram, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#0A0A0A", borderTop: "1px solid rgba(255,230,130,0.1)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="w-5 h-5" style={{ color: "#FFE682" }} />
              <span className="font-bebas text-xl tracking-widest" style={{ color: "#FFE682" }}>
                FITNESS FANDOM
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
              어제보다 나은 오늘을 선물합니다.<br />
              화곡에서 23년, 2000명의 이야기.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/fandom_daejang"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,230,130,0.1)",
                  border: "1px solid rgba(255,230,130,0.2)",
                  color: "#FFE682",
                }}
                aria-label="인스타그램"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://blog.naver.com/c90340005"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,230,130,0.1)",
                  border: "1px solid rgba(255,230,130,0.2)",
                  color: "#FFE682",
                }}
                aria-label="네이버 블로그"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
            <div>
              <h4
                className="font-bold mb-3 text-sm"
                style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
              >
                센터 정보
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                <li>서울 강서구 화곡로 154 9층</li>
                <li>화곡역 6번 출구 도보 2분</li>
                <li>24시간 연중무휴</li>
                <li>0507-1435-0871</li>
              </ul>
            </div>
            <div>
              <h4
                className="font-bold mb-3 text-sm"
                style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
              >
                프로그램
              </h4>
              <ul className="space-y-2 text-sm" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                <li>초보자 맞춤 헬스</li>
                <li>1:1 퍼스널 트레이닝</li>
                <li>재활PT & 체형교정</li>
                <li>무료 체험 신청</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider-glow my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-center sm:text-left" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
            © 2026 휘트니스팬덤짐 24시 헬스&PT 화곡점. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
            대표: 최정현 | 사업장: 서울 강서구 화곡로 154 9층
          </p>
        </div>
      </div>
    </footer>
  );
}
