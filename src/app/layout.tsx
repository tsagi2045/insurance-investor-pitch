import type { Metadata } from "next";
import "./globals.css";
import PasswordGate from "@/components/auth/PasswordGate";

export const metadata: Metadata = {
  title: "AI 보험 분석 서비스 — 투자 제안",
  description:
    "AI 기반 고객 보장 분석 및 숨은 보험금 찾기 플랫폼. 규제 변화와 시장 전환의 기회를 선점합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
          <PasswordGate>{children}</PasswordGate>
        </body>
    </html>
  );
}
