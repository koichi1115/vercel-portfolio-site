import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundImage } from "@/components/BackgroundImage";
import "./globals.css";
import Header from "@/components/Header"; // 作成したHeaderをインポート

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio showcasing career, projects, and reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {/* ここにヘッダーを追加 */}
        <Header />
        
        {/* メインコンテンツ */}
        {children}
      </body>
    </html>
  );
}