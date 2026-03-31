"use client";

import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/motion";
import Link from "next/link";

type ButtonVariant = "primary" | "ghost" | "text";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center gap-2 font-medium transition-colors";

  const variants = {
    primary:
      "btn-curtain rounded-full bg-amber-400 px-8 py-3 text-navy-950 hover:bg-amber-300",
    ghost:
      "rounded-full border border-white-10 px-8 py-3 text-white-90 hover:border-amber-400 hover:text-amber-400",
    text: "text-white-70 hover:text-amber-400 group",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {variant === "text" && <span className="text-amber-400">▸</span>}
      {children}
      {variant === "text" && (
        <span className="ml-1 inline-block transition-transform group-hover:translate-x-1.5">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.div whileHover={buttonHover} whileTap={buttonTap}>
        <Link href={href} className={classes}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      whileHover={buttonHover}
      whileTap={buttonTap}
    >
      {content}
    </motion.button>
  );
}
