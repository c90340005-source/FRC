import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-loaded",
  display: "swap",
});

const siteUrl = "https://fitnessfandom.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "휘트니스팬덤짐 24시 | 화곡 초보전문 헬스장",
    template: "%s | 휘트니스팬덤짐",
  },
  description:
    "화곡에서 2000명이 선택한 초보전문 헬스장. 23년 경력 대표 직접 운영, 전원 국가자격 트레이너. 헬창도 문신도 없는 초보자 친화 공간. 무료 체험 신청하세요.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "휘트니스팬덤짐 24시 | 화곡 초보전문 헬스장",
    description:
      "어제보다 나은 오늘을 선물합니다. 2000명이 선택한 이유를 직접 경험해보세요.",
    siteName: "휘트니스팬덤짐",
    locale: "ko_KR",
    images: [
      {
        url: `${siteUrl}/og-image.png`, // public/og-image.png (1200x630)
        width: 1200,
        height: 630,
        alt: "휘트니스팬덤짐 화곡 초보전문 헬스장",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "휘트니스팬덤짐 24시 | 화곡 초보전문 헬스장",
    description: "화곡에서 2000명이 선택한 초보전문 헬스장. 무료 체험 신청하세요.",
    images: [`${siteUrl}/og-image.png`],
  },
  keywords: [
    "화곡 헬스장",
    "화곡역 헬스장",
    "강서구 헬스장",
    "초보 헬스장",
    "휘트니스팬덤",
    "화곡 PT",
    "강서구 피트니스",
    "재활PT",
    "체형교정",
    "24시 헬스장",
    "여성 헬스장",
    "퍼스널트레이닝",
  ],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "health",
  verification: {
    google: "FF-T7MtOWd8Aj8-OUS9yCWt0UI_Eho1KyBoaZUqFDJM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={bebasNeue.variable}>
      <head>
        <meta name="naver-site-verification" content="55908d0b57a61aecaad6ebabb03d135fe019aa3d" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
