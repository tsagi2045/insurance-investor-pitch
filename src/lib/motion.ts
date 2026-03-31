import type { Variants, Transition } from "framer-motion";

// Signature easing — fast attack, smooth settle (inspired by elecctro.com)
const signatureEase = [0.625, 0.05, 0, 1] as const;
const smoothEase = [0.4, 0, 0.2, 1] as const;

// === Shared Transitions ===

export const transition = {
  signature: { duration: 0.8, ease: signatureEase } satisfies Transition,
  fast: { duration: 0.4, ease: signatureEase } satisfies Transition,
  smooth: { duration: 0.6, ease: smoothEase } satisfies Transition,
  slow: { duration: 1.2, ease: signatureEase } satisfies Transition,
};

// === Entry Animations ===

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.signature,
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition.signature,
  },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.signature,
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transition.signature,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transition.smooth,
  },
};

// === Text Line Reveal (SplitText alternative) ===

export const lineReveal: Variants = {
  hidden: { y: "105%", opacity: 0 },
  visible: (i: number = 0) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: signatureEase,
      delay: i * 0.08,
    },
  }),
};

// === Stagger Containers ===

export const stagger = (staggerMs: number = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerMs,
    },
  },
});

export const staggerFast = stagger(0.06);
export const staggerNormal = stagger(0.1);
export const staggerSlow = stagger(0.15);

// === Section Transitions (for horizontal scroll) ===

export const sectionEnter: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: signatureEase },
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

// === Button Hover ===

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: smoothEase },
};

export const buttonTap = {
  scale: 0.98,
};

// === Arrow Slide (for "자세히 알아보기" links) ===

export const arrowSlide: Variants = {
  rest: { x: 0 },
  hover: {
    x: 6,
    transition: { duration: 0.3, ease: signatureEase },
  },
};

// === Scale Reveal (for images/cards) ===

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: signatureEase },
  },
};

// === Number Count Up (for stat displays) ===

export const numberReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: signatureEase },
  },
};
