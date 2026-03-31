"use client";

import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "framer-motion";

interface UseHorizontalScrollReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollXProgress: MotionValue<number>;
  x: MotionValue<string>;
  sectionCount: number;
}

export function useHorizontalScroll(
  sectionCount: number
): UseHorizontalScrollReturn {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((sectionCount - 1) / sectionCount) * 100}%`]
  );

  return {
    containerRef,
    scrollXProgress: scrollYProgress,
    x,
    sectionCount,
  };
}

export function useSectionProgress(
  scrollXProgress: MotionValue<number>,
  sectionIndex: number,
  sectionCount: number
): MotionValue<number> {
  const sectionSize = 1 / sectionCount;
  const start = sectionIndex * sectionSize;
  const end = start + sectionSize;

  return useTransform(scrollXProgress, [start, end], [0, 1]);
}
