"use client";

import { useRef, useEffect, useState, useCallback, createContext } from "react";

export const ScrollContext = createContext(0);

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

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
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
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [current, goTo]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <ScrollContext.Provider value={current}>
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
      </ScrollContext.Provider>

      {/* Page indicator — minimal "1/3" style */}
      <div className="fixed right-6 bottom-8 z-50 lg:right-10 lg:bottom-10">
        <span className="text-caption tabular-nums tracking-wider text-white-40">
          {current + 1}
          <span className="mx-1 text-white-10">/</span>
          {sectionCount}
        </span>
      </div>
    </div>
  );
}
