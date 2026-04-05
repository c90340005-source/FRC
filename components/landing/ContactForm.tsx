"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle, Phone, MessageCircle } from "lucide-react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const programs = [
  "초보자 맞춤 헬스",
  "1:1 퍼스널 트레이닝",
  "재활PT & 체형교정",
  "기타 / 둘러보고 싶어요",
];

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, program, message: note }),
      });
      if (!res.ok) throw new Error("전송 실패");
      setSubmitted(true);
    } catch {
      setError("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setProgram("");
    setNote("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="dialog-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
    >
      <div className="dialog-box w-full" style={{ maxWidth: "500px" }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.05)", color: "#A0A0A0", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="닫기"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(255,230,130,0.15)", border: "1px solid rgba(255,230,130,0.3)" }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: "#FFE682" }} />
            </div>
            <h3
              className="font-bold mb-3"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "24px",
                color: "#F5F5F5",
                letterSpacing: "-0.02em",
              }}
            >
              신청이 완료되었습니다! 🎉
            </h3>
            <p
              className="mb-2"
              style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
            >
              <span style={{ color: "#F5F5F5", fontWeight: 600 }}>{name}</span>님,
              신청 감사합니다.
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}
            >
              24시간 이내에 <span style={{ color: "#FFE682" }}>{phone}</span>으로 연락드리겠습니다.
            </p>
            <div
              className="rounded-xl p-4 mb-6 text-sm text-left"
              style={{ background: "rgba(255,230,130,0.07)", border: "1px solid rgba(255,230,130,0.15)" }}
            >
              <p className="font-semibold mb-2" style={{ color: "#FFE682", fontFamily: "'Pretendard', sans-serif" }}>
                📍 방문 전 참고하세요
              </p>
              <p style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                서울 강서구 화곡로 154 9층<br />
                화곡역 6번 출구 도보 2분<br />
                운영: 24시간 연중무휴
              </p>
            </div>
            <button onClick={handleClose} className="btn-primary w-full justify-center" style={{ fontSize: "16px" }}>
              확인
            </button>
          </motion.div>
        ) : (
          /* Form state */
          <>
            <div className="mb-6">
              <p className="section-label mb-2">무료 체험 신청</p>
              <h3
                className="font-bold mb-1"
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "22px",
                  color: "#F5F5F5",
                  letterSpacing: "-0.02em",
                }}
              >
                지금 바로 신청하세요
              </h3>
              <p className="text-sm" style={{ color: "#A0A0A0", fontFamily: "'Pretendard', sans-serif" }}>
                부담 없는 1회 무료 체험 · 별도 가입비 없음 · 1:1 트레이너 상담 포함
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
                >
                  이름 <span style={{ color: "#FFE682" }}>*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="성함을 입력해주세요"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
                >
                  연락처 <span style={{ color: "#FFE682" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-0000-0000"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
                >
                  관심 프로그램
                </label>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="form-input"
                  style={{ appearance: "none", cursor: "pointer" }}
                >
                  <option value="" style={{ background: "#1E1E1E" }}>선택해주세요 (선택사항)</option>
                  {programs.map((p) => (
                    <option key={p} value={p} style={{ background: "#1E1E1E" }}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-1.5"
                  style={{ color: "#F5F5F5", fontFamily: "'Pretendard', sans-serif" }}
                >
                  한마디 (선택)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="운동 목적이나 궁금한 점을 자유롭게 적어주세요"
                  rows={3}
                  className="form-input resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-center" style={{ color: "#f87171", fontFamily: "'Pretendard', sans-serif" }}>
                  {error}
                </p>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2" style={{ fontSize: "17px", opacity: loading ? 0.7 : 1 }}>
                {loading ? "전송 중..." : "🎁 무료 체험 신청하기"}
              </button>
            </form>

            {/* Alt contact */}
            <div className="divider-glow my-5" />
            <div className="flex gap-3">
              <a
                href="tel:0507-1435-0871"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#F5F5F5",
                  fontFamily: "'Pretendard', sans-serif",
                }}
              >
                <Phone className="w-4 h-4" style={{ color: "#FFE682" }} />
                전화 상담
              </a>
              <a
                href="https://www.instagram.com/fandom_daejang"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#F5F5F5",
                  fontFamily: "'Pretendard', sans-serif",
                }}
              >
                <MessageCircle className="w-4 h-4" style={{ color: "#FFE682" }} />
                인스타 DM
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
