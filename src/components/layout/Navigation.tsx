"use client";

import { motion } from "framer-motion";
import { fadeDown } from "@/lib/motion";
import Link from "next/link";

const SECTIONS = ["WHY", "HOW", "WHAT"] as const;

interface NavigationProps {
  currentSection?: number;
}

export default function Navigation({ currentSection = 0 }: NavigationProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-8 py-4"
      style={{
        background: "var(--nav-bg)",
        backdropFilter: `blur(var(--nav-blur))`,
        WebkitBackdropFilter: `blur(var(--nav-blur))`,
      }}
      variants={fadeDown}
      initial="hidden"
      animate="visible"
    >
      <Link href="/" className="text-label text-white-90 tracking-widest">
        AI 보험 분석
      </Link>

      <div className="flex items-center gap-3">
        {SECTIONS.map((section, i) => (
          <div key={section} className="flex items-center gap-3">
            {i > 0 && <div className="h-px w-4 bg-white-10" />}
            <button
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentSection ? "bg-amber-400" : "bg-white-40"
              }`}
              aria-label={`${section} 섹션으로 이동`}
            />
          </div>
        ))}
      </div>
    </motion.nav>
  );
}
