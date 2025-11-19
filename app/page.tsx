"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// アニメーションの定義
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-blue-500/30">
      {/* 背景の装飾（オーロラグラデーション） */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        {/* ヒーローセクション */}
        <section className="mb-24">
          <motion.div 
            initial={fadeIn.initial} animate={fadeIn.animate} transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row items-start justify-between gap-8"
          >
            <div className="space-y-6 max-w-2xl">
              <h2 className="text-sm font-medium tracking-widest text-zinc-500 uppercase">Portfolio</h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                Koichi<span className="text-blue-500">.</span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                DX企画職 & エンジニア。<br/>
                技術とビジネスの両面から、<br className="md:hidden" />
                <span className="text-zinc-100">本質的な価値創造</span>に取り組んでいます。
              </p>
              
              <div className="flex gap-4 pt-4">
                <Link href="/projects" className="px-6 py-3 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors">
                  View Projects
                </Link>
                <Link href="/profile" className="px-6 py-3 border border-zinc-700 text-zinc-300 font-medium rounded-full hover:border-zinc-500 hover:bg-zinc-900/50 transition-all">
                  About Me
                </Link>
              </div>
            </div>

            {/* アバター画像をスタイリッシュに */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
              <Image 
                src="/images/profile/avatar.jpg" // お手持ちの画像パスに合わせてください
                alt="koichi"
                width={200}
                height={200}
                className="relative rounded-2xl border border-zinc-800 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-500 object-cover"
              />
            </div>
          </motion.div>
        </section>

        {/* Bento Grid スタイルのコンテンツ */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          
          {/* Skills Card */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-4">Core Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {["Python", "C#", "Next.js", "PostgreSQL", "AWS", "DX Strategy"].map((tech) => (
                <span key={tech} className="px-3 py-1 text-sm bg-zinc-800 text-zinc-300 rounded-md border border-zinc-700/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Latest Diary Card (Vibe Coding) */}
          <Link href="/diaries" className="group p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-blue-900/50 transition-all hover:bg-zinc-900">
            <div className="flex justify-between items-start mb-4">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">Latest Diary</span>
              <span className="text-zinc-600 text-xs">2025.11.01</span>
            </div>
            <h4 className="text-lg font-bold text-zinc-100 group-hover:text-blue-300 transition-colors">
              エンジニア応援プログラム for バイブコーダー
            </h4>
            <p className="text-sm text-zinc-500 mt-2 line-clamp-2">
              GMO flatt security株式会社のバイブコーダー向けプログラムに参加した学びや体験記...
            </p>
          </Link>

          {/* Reviews Card (Small grid) */}
          <div className="md:col-span-3 p-8 rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-900/50 border border-zinc-800">
             <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Obsessions</h3>
                <Link href="/reviews" className="text-sm text-zinc-500 hover:text-white transition-colors">See all →</Link>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* ダミーデータを入れていますが、実際のデータに合わせてマッピングしてください */}
                {[{t:"パルテノペ", c:"Movie"}, {t:"サピエンス全史", c:"Book"}, {t:"Bohemian Rhapsody", c:"Music"}, {t:"SPY×FAMILY", c:"Comic"}].map((item, i) => (
                  <div key={i} className="aspect-video bg-zinc-800 rounded-xl flex flex-col justify-center items-center text-center p-2 hover:bg-zinc-700 transition-colors cursor-pointer">
                    <span className="text-xs text-zinc-500 mb-1">{item.c}</span>
                    <span className="text-sm font-medium text-zinc-200">{item.t}</span>
                  </div>
                ))}
             </div>
          </div>

        </motion.div>

      </main>
    </div>
  );
}