import type { Metadata } from "next";
import Header from "@/components/Header";
import "./globals.css";

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