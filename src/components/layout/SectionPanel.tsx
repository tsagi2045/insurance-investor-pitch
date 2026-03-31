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
      className={`relative flex h-screen w-screen shrink-0 overflow-hidden ${className}`}
      style={{ height: "100dvh" }}
    >
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col justify-center px-6 pt-28 pb-24 md:px-12 md:pt-20 lg:px-16"
        variants={staggerNormal}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
}
