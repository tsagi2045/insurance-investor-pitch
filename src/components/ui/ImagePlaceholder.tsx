"use client";

import { motion } from "framer-motion";
import { scaleReveal } from "@/lib/motion";

interface ImagePlaceholderProps {
  imageId: string;
  aspectRatio?: "4/3" | "16/9" | "1/1";
  className?: string;
}

export default function ImagePlaceholder({
  imageId,
  aspectRatio = "4/3",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <motion.div
      variants={scaleReveal}
      data-image-id={imageId}
      className={`flex w-full items-center justify-center rounded-3xl bg-white-05 ${className}`}
      style={{ aspectRatio }}
    >
      <span className="text-caption text-white-10">image</span>
    </motion.div>
  );
}
