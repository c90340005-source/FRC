import sharp from "sharp";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const INPUT  = resolve(ROOT, "public/og-source.png");
const OUTPUT = resolve(ROOT, "public/og-image.png");

const W = 1200;
const H = 630;

// SVG 오버레이 (브랜드 텍스트 + 배지)
const overlay = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- 왼쪽 그라디언트 어둠 -->
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"  stop-color="#111111" stop-opacity="0.88"/>
      <stop offset="55%" stop-color="#111111" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#111111" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#111111" stop-opacity="0"/>
      <stop offset="100%" stop-color="#111111" stop-opacity="0.65"/>
    </linearGradient>
  </defs>

  <!-- 오버레이 레이어 -->
  <rect width="${W}" height="${H}" fill="url(#grad)"/>
  <rect width="${W}" height="${H}" fill="url(#bottom)"/>

  <!-- 노랑 포인트 라인 -->
  <rect x="64" y="120" width="4" height="60" rx="2" fill="#FFE682"/>

  <!-- 브랜드명 -->
  <text x="86" y="168"
    font-family="Arial Black, sans-serif"
    font-size="56"
    font-weight="900"
    fill="#FFFFFF"
    letter-spacing="-1">휘트니스팬덤짐</text>

  <!-- 서브 카피 -->
  <text x="86" y="210"
    font-family="Arial, sans-serif"
    font-size="24"
    font-weight="400"
    fill="#FFE682"
    letter-spacing="1">FITNESS FANDOM GYM · 24시 · 화곡역 6번 출구</text>

  <!-- 메인 슬로건 -->
  <text x="86" y="310"
    font-family="Arial Black, sans-serif"
    font-size="42"
    font-weight="900"
    fill="#FFFFFF"
    letter-spacing="-0.5">헬창도 문신도 없는</text>
  <text x="86" y="362"
    font-family="Arial Black, sans-serif"
    font-size="42"
    font-weight="900"
    fill="#FFE682"
    letter-spacing="-0.5">화곡 초보전문 헬스장</text>

  <!-- 신뢰 배지들 -->
  <!-- 배지 1 -->
  <rect x="86" y="420" width="200" height="44" rx="8"
    fill="none" stroke="#FFE682" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="186" y="447"
    font-family="Arial, sans-serif"
    font-size="16"
    font-weight="700"
    fill="#FFE682"
    text-anchor="middle">누적 회원 2,000명+</text>

  <!-- 배지 2 -->
  <rect x="300" y="420" width="220" height="44" rx="8"
    fill="none" stroke="#FFE682" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="410" y="447"
    font-family="Arial, sans-serif"
    font-size="16"
    font-weight="700"
    fill="#FFE682"
    text-anchor="middle">트레이너 경력 23년차</text>

  <!-- 배지 3 -->
  <rect x="534" y="420" width="200" height="44" rx="8"
    fill="none" stroke="#FFE682" stroke-opacity="0.5" stroke-width="1.5"/>
  <text x="634" y="447"
    font-family="Arial, sans-serif"
    font-size="16"
    font-weight="700"
    fill="#FFE682"
    text-anchor="middle">국가자격 PT강사 전원</text>

  <!-- 하단 CTA -->
  <rect x="86" y="510" width="260" height="56" rx="10" fill="#FFE682"/>
  <text x="216" y="544"
    font-family="Arial Black, sans-serif"
    font-size="20"
    font-weight="900"
    fill="#111111"
    text-anchor="middle">무료 체험 신청하기 →</text>

  <!-- 우측 하단 URL -->
  <text x="${W - 40}" y="${H - 24}"
    font-family="Arial, sans-serif"
    font-size="16"
    fill="#A0A0A0"
    text-anchor="end">화곡역 6번 출구 117m · 0507-1435-0871</text>
</svg>
`;

const svgBuffer = Buffer.from(overlay);

await sharp(INPUT)
  .resize(W, H, { fit: "cover", position: "center" })
  .composite([{ input: svgBuffer, top: 0, left: 0 }])
  .png({ quality: 95 })
  .toFile(OUTPUT);

console.log(`✅ OG 이미지 생성 완료: ${OUTPUT}`);
