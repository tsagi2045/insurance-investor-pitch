"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionLabelProps {
  label: string;
}

export default function SectionLabel({ label }: SectionLabelProps) {
  return (
    <motion.span
      variants={fadeUp}
      className="text-label tracking-[0.2em] text-white-40"
    >
      {label}
    </motion.span>
  );
}
