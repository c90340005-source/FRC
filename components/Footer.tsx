"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FF</span>
              </div>
              <span className="font-bold text-white text-lg">휘트니스팬덤</span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed">
              AI 기반 피트니스 자동화 플랫폼으로 모든 이의 피트니스 여정을 혁신합니다.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "서비스",
              links: ["AI 트레이닝", "영양 관리", "성과 분석", "커뮤니티"],
            },
            {
              title: "회사",
              links: ["소개", "블로그", "채용", "파트너십"],
            },
            {
              title: "지원",
              links: ["FAQ", "문의하기", "개인정보처리방침", "이용약관"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white/70 font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white/70 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">
            © 2025 휘트니스팬덤. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["인스타그램", "유튜브", "카카오", "블로그"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-white/20 hover:text-white/60 text-xs transition-colors duration-200"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
