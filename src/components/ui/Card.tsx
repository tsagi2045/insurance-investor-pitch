"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={`rounded-2xl border border-white-10 bg-navy-800 p-8 transition-colors hover:border-amber-400/30 ${className}`}
    >
      {children}
    </motion.div>
  );
}
