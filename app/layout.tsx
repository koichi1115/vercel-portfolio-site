import type { Metadata } from "next";
import Header from "@/components/Header";
import { Providers } from "@/components/Providers";
import { ScrollProgress } from "@/components/ScrollProgress";
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
    <html lang="ja" suppressHydrationWarning>
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
