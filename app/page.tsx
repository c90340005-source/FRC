"use client";

import { useState } from "react";
import HeroSection            from "@/components/landing/HeroSection";
import AwardsBadgeBar         from "@/components/landing/AwardsBadgeBar";
import TaglineSection         from "@/components/landing/TaglineSection";
import IndustryProblemSection from "@/components/landing/IndustryProblemSection";
import ProgramSection         from "@/components/landing/ProgramSection";
import TrustNumbers           from "@/components/landing/TrustNumbers";
import DifferenceSection      from "@/components/landing/DifferenceSection";
import EmpathySection         from "@/components/landing/EmpathySection";
import UrgencySection         from "@/components/landing/UrgencySection";
import InlineCTASection       from "@/components/landing/InlineCTASection";
import MapSection             from "@/components/landing/MapSection";
import Footer                 from "@/components/landing/Footer";
import StickyBottomCTA        from "@/components/landing/StickyBottomCTA";
import ContactForm            from "@/components/landing/ContactForm";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const open = () => setIsFormOpen(true);

  return (
    <>
      <main style={{ paddingBottom: "80px" }}>
        {/* STAGE 1 — 문제제기 | 다크 | 3D WebGL */}
        <HeroSection onCTAClick={open} />

        {/* 수상 신뢰 배지 마퀴 */}
        <AwardsBadgeBar />

        {/* 에디토리얼 태그라인 | 라이트 */}
        <TaglineSection />

        {/* STAGE 2 — 동종업계 문제점 | 다크 */}
        <IndustryProblemSection />

        {/* STAGE 4 — 해결방안 (프로그램) | 다크 | row separator */}
        <ProgramSection />

        {/* STAGE 5a — 권위 숫자 | 다크 */}
        <TrustNumbers />

        {/* STAGE 5b — 차별화 | 라이트 | GSAP 수평 스크롤 */}
        <DifferenceSection />

        {/* STAGE 3 — 이런 분께 (공감) | 라이트 | 에디토리얼 */}
        <EmpathySection />

        {/* STAGE 6 — 긴급성 + 재등록 | 다크 */}
        <UrgencySection onCTAClick={open} />

        {/* STAGE 7 — 인라인 폼 (DB 수집) | 라이트 */}
        <InlineCTASection />

        {/* 오시는 길 | 다크 */}
        <MapSection onCTAClick={open} />

        <Footer />
      </main>

      {/* 하단 고정 pill CTA (wonderbarre 스타일) */}
      <StickyBottomCTA onCTAClick={open} />

      {/* 다이얼로그 폼 (pill 버튼 클릭 시) */}
      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </>
  );
}
