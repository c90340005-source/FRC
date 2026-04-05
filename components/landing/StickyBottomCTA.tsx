"use client";

/**
 * StickyBottomCTA — wonderbarre 하단 고정 pill 버튼
 * 항상 화면 하단에 노출. 스크롤해도 사라지지 않음.
 */

interface Props {
  onCTAClick: () => void;
}

export default function StickyBottomCTA({ onCTAClick }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "14px 16px 20px",
        background: "linear-gradient(to top, rgba(17,17,17,0.98) 60%, transparent)",
        pointerEvents: "none",
      }}
    >
      <button
        onClick={onCTAClick}
        style={{
          display: "block",
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "18px 32px",
          borderRadius: "100px",
          border: "none",
          background: "#FFE682",
          color: "#111111",
          fontFamily: "'Pretendard', sans-serif",
          fontSize: "17px",
          fontWeight: 800,
          letterSpacing: "-0.01em",
          cursor: "pointer",
          pointerEvents: "all",
          position: "relative",
          overflow: "hidden",
          transition: "transform 0.2s, background 0.2s",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#F5D84A";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#FFE682";
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        무료 체험 신청하기 &gt;
      </button>
    </div>
  );
}
