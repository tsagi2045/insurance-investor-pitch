"use client";

import { motion } from "framer-motion";
import { useHorizontalScroll } from "@/lib/useHorizontalScroll";

interface HorizontalScrollProps {
  children: React.ReactNode;
  sectionCount: number;
}

export default function HorizontalScroll({
  children,
  sectionCount,
}: HorizontalScrollProps) {
  const { containerRef, x } = useHorizontalScroll(sectionCount);

  return (
    <div
      ref={containerRef}
      style={{ height: `${sectionCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{
            width: `${sectionCount * 100}vw`,
            x,
          }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
