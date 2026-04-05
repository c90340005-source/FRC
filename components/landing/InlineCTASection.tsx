"use client";

/**
 * InlineCTASection — 인라인 폼 섹션 (DB 수집)
 * 흰 배경 + 에디토리얼 헤딩 + 인라인 폼 (이름/연락처/프로그램)
 */

import { useState, useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const programs = [
  "초보자 맞춤 헬스",
  "1:1 퍼스널 트레이닝",
  "재활PT & 체형교정",
  "기타 / 둘러보고 싶어요",
];

export default function InlineCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".slide-up");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, program, message: "" }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: "#F7F7F5", padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>

        {submitted ? (
          /* 완료 상태 */
          <div className="slide-up" style={{ textAlign: "center", padding: "40px 0" }}>
            <div
              style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(255,230,130,0.15)",
                border: "1px solid rgba(255,230,130,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <CheckCircle style={{ width: "28px", height: "28px", color: "#F5D84A" }} />
            </div>
            <h3
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#111111",
                marginBottom: "12px",
              }}
            >
              신청이 완료됐어요!
            </h3>
            <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "16px", color: "#555", lineHeight: 1.8 }}>
              <strong>{name}</strong>님, 감사합니다.<br />
              24시간 내 <strong>{phone}</strong>으로 연락드립니다.
            </p>
          </div>
        ) : (
          <>
            {/* 섹션 라벨 */}
            <p
              className="slide-up"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: "12px",
                letterSpacing: "0.22em",
                color: "#888",
                marginBottom: "24px",
              }}
            >
              FREE TRIAL
            </p>

            {/* 헤딩 */}
            <h2
              className="slide-up"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "clamp(32px, 6vw, 60px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#111111",
                marginBottom: "16px",
              }}
            >
              지금 신청하면<br />
              무료 체험 1회 드립니다.
            </h2>

            <p
              className="slide-up"
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontSize: "16px",
                color: "#888",
                lineHeight: 1.8,
                letterSpacing: "-0.01em",
                marginBottom: "48px",
              }}
            >
              부담 없이 한 번만 와보세요. 강요 없이, 체험만 해도 됩니다.<br />
              신청 후 24시간 내 연락드립니다.
            </p>

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="slide-up">
              {/* 구분선 */}
              <div style={{ borderTop: "1px solid rgba(17,17,17,0.15)", marginBottom: "32px" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* 이름 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    이름 <span style={{ color: "#F5D84A" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="성함을 입력해주세요"
                    required
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(17,17,17,0.25)",
                      padding: "12px 0",
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: "16px",
                      color: "#111111",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#111111")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(17,17,17,0.25)")}
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "#111111",
                      marginBottom: "8px",
                    }}
                  >
                    연락처 <span style={{ color: "#F5D84A" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    required
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid rgba(17,17,17,0.25)",
                      padding: "12px 0",
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: "16px",
                      color: "#111111",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = "#111111")}
                    onBlur={(e) => (e.target.style.borderBottomColor = "rgba(17,17,17,0.25)")}
                  />
                </div>

                {/* 관심 프로그램 */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'Pretendard', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "#111111",
                      marginBottom: "12px",
                    }}
                  >
                    관심 프로그램 (선택)
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {programs.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setProgram(p === program ? "" : p)}
                        style={{
                          padding: "8px 16px",
                          borderRadius: "100px",
                          border: `1px solid ${program === p ? "#111111" : "rgba(17,17,17,0.2)"}`,
                          background: program === p ? "#111111" : "transparent",
                          color: program === p ? "#FFE682" : "#555",
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: "13px",
                          fontWeight: program === p ? 600 : 400,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 구분선 */}
              <div style={{ borderTop: "1px solid rgba(17,17,17,0.15)", margin: "40px 0 32px" }} />

              {error && (
                <p style={{ fontFamily: "'Pretendard', sans-serif", fontSize: "14px", color: "#ef4444", marginBottom: "16px" }}>
                  {error}
                </p>
              )}

              {/* CTA 버튼 */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "20px 32px",
                  borderRadius: "100px",
                  border: "none",
                  background: "#111111",
                  color: "#FFE682",
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "17px",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                  transition: "all 0.25s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#1E1E1E";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#111111";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                {loading ? "전송 중..." : "무료 체험 신청하기 →"}
              </button>

              {/* 안심 문구 */}
              <p
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontSize: "13px",
                  color: "#999",
                  textAlign: "center",
                  marginTop: "16px",
                  lineHeight: 1.7,
                }}
              >
                강요 없는 1회 무료 체험 · 개인정보 상담 외 미사용 · 24시간 내 연락
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
