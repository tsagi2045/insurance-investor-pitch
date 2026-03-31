"use client";

import { motion } from "framer-motion";
import { scaleReveal } from "@/lib/motion";

interface ImagePlaceholderProps {
  imageId: string;
  aspectRatio?: "4/3" | "16/9" | "1/1";
  label?: string;
  className?: string;
}

export default function ImagePlaceholder({
  imageId,
  aspectRatio = "4/3",
  label = "AI 생성 이미지 자리",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <motion.div
      variants={scaleReveal}
      data-image-id={imageId}
      className={`flex w-full items-center justify-center rounded-2xl border border-white-10 bg-gradient-to-br from-navy-800 to-navy-900 ${className}`}
      style={{ aspectRatio }}
    >
      <div className="text-center">
        <div className="text-h2 text-white-40">Image</div>
        <div className="mt-2 text-caption text-white-40">{label}</div>
      </div>
    </motion.div>
  );
}
