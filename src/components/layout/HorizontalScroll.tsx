"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface HorizontalScrollProps {
  children: React.ReactNode;
  sectionCount: number;
}

export default function HorizontalScroll({
  children,
  sectionCount,
}: HorizontalScrollProps) {
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= sectionCount || isAnimating.current) return;
      isAnimating.current = true;
      setCurrent(index);
      setTimeout(() => {
        isAnimating.current = false;
      }, 900);
    },
    [sectionCount]
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;
      if (e.deltaY > 30) goTo(current + 1);
      else if (e.deltaY < -30) goTo(current - 1);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (delta > 50) goTo(current + 1);
      else if (delta < -50) goTo(current - 1);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(current - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, goTo]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="flex h-full transition-transform duration-[800ms]"
        style={{
          width: `${sectionCount * 100}vw`,
          transform: `translateX(-${current * 100}vw)`,
          transitionTimingFunction: "cubic-bezier(0.625, 0.05, 0, 1)",
        }}
      >
        {children}
      </div>

      {/* Section Indicator */}
      <div className="fixed right-8 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3">
        {Array.from({ length: sectionCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? "h-8 w-2 bg-amber-400"
                : "h-2 w-2 bg-white-40 hover:bg-white-70"
            }`}
            aria-label={`섹션 ${i + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
