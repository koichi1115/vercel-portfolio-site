import type { Metadata } from "next";
import { Syne, Zen_Kaku_Gothic_New, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  variable: "--font-zen",
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Koichi — DX Strategist & Engineer",
  description:
    "技術とビジネスの両面から本質的な価値創造に取り組むDXストラテジスト/エンジニアのポートフォリオ。開発実績、日記、レビューを掲載。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${syne.variable} ${zenKaku.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          <ScrollProgress />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
