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
      className={`relative flex h-screen w-screen shrink-0 items-center ${className}`}
    >
      <motion.div
        className="mx-auto w-full max-w-[1280px] px-[5%]"
        variants={staggerNormal}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
}
