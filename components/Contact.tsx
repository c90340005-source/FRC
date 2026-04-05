"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "전송 실패");
      }

      setStatus("success");
      setFormData({ name: "", phone: "", email: "", program: "", message: "" });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "전송에 실패했습니다.");
      setStatus("error");
    }
  };

  const inputClass = (name: string) =>
    `w-full rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-200 ${
      focused === name
        ? "bg-white/8 border border-indigo-500/70 shadow-[0_0_15px_rgba(99,102,241,0.15)]"
        : "bg-white/5 border border-white/10 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="relative py-32 px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-[#030014]" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-violet-300 text-sm font-medium mb-6">
              문의하기
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              피트니스 혁명을
              <br />
              <span className="text-gradient">함께 시작하세요</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-10">
              궁금한 점이 있으신가요? 데모 신청, 파트너십 문의,
              또는 단순히 더 알고 싶으시다면 언제든지 연락주세요.
              24시간 내 AI 어시스턴트가 응답합니다.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: "📧", label: "이메일", value: "hello@fitnessfandom.kr" },
                { icon: "📱", label: "카카오톡", value: "@휘트니스팬덤" },
                { icon: "📍", label: "위치", value: "서울특별시 강남구" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5">{item.label}</div>
                    <div className="text-sm text-white/70">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="glass rounded-3xl p-8 border border-white/8">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-6">🎉</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    메시지가 전달되었습니다!
                  </h3>
                  <p className="text-white/50">
                    24시간 내에 답변 드리겠습니다. 감사합니다!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 px-6 py-3 rounded-xl glass text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    다시 문의하기
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="홍길동"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass("name")}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/40 mb-2 font-medium">
                        연락처 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="010-0000-0000"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass("phone")}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">
                      관심 플랜
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className={`${inputClass("program")} cursor-pointer`}
                      onFocus={() => setFocused("program")}
                      onBlur={() => setFocused(null)}
                      style={{ appearance: "none" }}
                    >
                      <option value="" style={{ background: "#030014" }}>플랜을 선택하세요</option>
                      <option value="starter" style={{ background: "#030014" }}>스타터 (무료)</option>
                      <option value="fandom" style={{ background: "#030014" }}>팬덤 (₩29,900/월)</option>
                      <option value="elite" style={{ background: "#030014" }}>엘리트 (₩79,900/월)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-white/40 mb-2 font-medium">
                      메시지
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="궁금하신 점을 자유롭게 입력해주세요..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass("message")} resize-none`}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 rounded-xl font-semibold text-white text-sm transition-all duration-200 bg-gradient-to-r from-violet-600 to-blue-600 hover:opacity-90 hover:shadow-[0_0_30px_rgba(167,139,250,0.3)] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        전송 중...
                      </>
                    ) : (
                      <>
                        메시지 보내기
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="text-center text-xs text-red-400">
                      {errorMsg}
                    </p>
                  )}
                  <p className="text-center text-xs text-white/25">
                    제출 시 개인정보처리방침에 동의하는 것으로 간주됩니다
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
