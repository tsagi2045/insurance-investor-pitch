"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, staggerNormal } from "@/lib/motion";

const ease = [0.625, 0.05, 0, 1] as const;

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={staggerNormal}
      >
        <motion.p
          className="text-label tracking-[0.2em] text-white-40"
          variants={fadeUp}
        >
          404
        </motion.p>
        <motion.h1
          className="mt-6 text-h1 text-white-90"
          variants={fadeUp}
        >
          페이지를 찾을 수 없습니다
        </motion.h1>
        <motion.p
          className="mt-4 text-body text-white-70"
          variants={fadeUp}
        >
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </motion.p>
        <motion.div className="mt-10" variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white-10 px-8 py-3 text-body font-medium text-white-90 transition-colors hover:border-white-40"
          >
            ← 메인으로 돌아가기
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
