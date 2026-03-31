"use client";

import { motion } from "framer-motion";
import { numberReveal, staggerFast } from "@/lib/motion";

interface Stat {
  value: string;
  label: string;
}

interface StatDisplayProps {
  stats: Stat[];
  className?: string;
}

export default function StatDisplay({
  stats,
  className = "",
}: StatDisplayProps) {
  return (
    <motion.div
      className={`flex items-center gap-8 ${className}`}
      variants={staggerFast}
      initial="hidden"
      animate="visible"
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-8">
          {i > 0 && <div className="h-12 w-px bg-white-10" />}
          <motion.div variants={numberReveal} className="text-center">
            <div className="text-h1 font-extrabold text-amber-400">
              {stat.value}
            </div>
            <div className="mt-1 text-caption text-white-40">{stat.label}</div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}
