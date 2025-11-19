"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Projects", path: "/projects" },
  { name: "Reviews", path: "/reviews" },
  { name: "Diaries", path: "/diaries" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 py-4"
    >
      {/* ガラスのコンテナ */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-zinc-900/80 border border-zinc-800/50 backdrop-blur-md shadow-lg shadow-black/20">
        
        {/* ロゴ部分 */}
        <Link href="/" className="px-4 py-2 text-zinc-100 font-bold tracking-tighter hover:text-blue-400 transition-colors">
          Koichi.
        </Link>

        {/* 区切り線 */}
        <div className="w-[1px] h-4 bg-zinc-700/50 mx-1"></div>

        {/* ナビゲーションリンク */}
        <nav className="flex items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive 
                    ? "text-white bg-zinc-800/80 shadow-inner" 
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/30"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}