"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerNormal } from "@/lib/motion";

const STORAGE_KEY = "pitch-auth";
const EXPIRY_DAYS = 7;
const CORRECT_PASSWORD = "insurance";

function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  try {
    const { expiry } = JSON.parse(stored);
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

function setAuthenticated() {
  const expiry = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ expiry }));
}

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (authed === null) return null;

  if (authed) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === CORRECT_PASSWORD) {
      setAuthenticated();
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <motion.form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col items-center gap-6"
        initial="hidden"
        animate="visible"
        variants={staggerNormal}
      >
        <motion.p
          className="text-label tracking-[0.2em] text-white-40"
          variants={fadeUp}
        >
          ACCESS
        </motion.p>
        <motion.p className="text-body text-white-70" variants={fadeUp}>
          비밀번호를 입력해 주세요.
        </motion.p>
        <motion.input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Password"
          autoFocus
          className={`w-full rounded-full border bg-transparent px-6 py-3 text-center text-body text-white-90 outline-none transition-colors placeholder:text-white-40 ${error ? "border-red-500" : "border-white-10 focus:border-white-40"}`}
          variants={fadeUp}
        />
        {error && (
          <p className="text-caption text-red-400">
            비밀번호가 올바르지 않습니다.
          </p>
        )}
        <motion.button
          type="submit"
          className="w-full rounded-full border border-white-10 px-6 py-3 text-body font-medium text-white-90 transition-colors hover:border-white-40"
          variants={fadeUp}
        >
          입장하기
        </motion.button>
      </motion.form>
    </main>
  );
}
