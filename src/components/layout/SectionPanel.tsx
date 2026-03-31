"use client";

import { motion } from "framer-motion";
import { staggerNormal } from "@/lib/motion";

interface SectionPanelProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionPanel({
  children,
  className = "",
  id,
}: SectionPanelProps) {
  return (
    <section
      id={id}
      className={`relative flex h-screen w-screen shrink-0 items-center overflow-hidden ${className}`}
    >
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.03),transparent)]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-[1280px] px-[5%] md:px-[8%]"
        variants={staggerNormal}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
}
