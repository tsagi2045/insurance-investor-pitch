"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionLabelProps {
  label: string;
  subtitle: string;
}

export default function SectionLabel({ label, subtitle }: SectionLabelProps) {
  return (
    <motion.div variants={fadeUp}>
      <span className="text-label text-amber-400">● {label}</span>
      <p className="mt-1 text-caption text-white-40">{subtitle}</p>
    </motion.div>
  );
}
