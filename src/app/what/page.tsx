"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import Link from "next/link";
import HorizontalScroll, {
  ScrollContext,
} from "@/components/layout/HorizontalScroll";
import { fadeUp, staggerNormal } from "@/lib/motion";
import SectionLabel from "@/components/ui/SectionLabel";

/* ─── Config ─── */
const ease = [0.625, 0.05, 0, 1] as const;
const SECTION_COUNT = 13;

/* ─── Active Context ─── */
const ActiveContext = createContext(false);

/* ─── WhatSection ─── */
function WhatSection({
  index,
  children,
  center = false,
}: {
  index: number;
  children: React.ReactNode;
  center?: boolean;
}) {
  const current = useContext(ScrollContext);
  const isActive = current === index;

  return (
    <ActiveContext.Provider value={isActive}>
      <section
        className="relative flex h-screen w-screen shrink-0 overflow-hidden"
        style={{ height: "100dvh" }}
      >
        <motion.div
          className={`relative z-10 mx-auto flex w-full max-w-2xl flex-col justify-center px-6 md:px-12 ${center ? "items-center text-center" : ""}`}
          style={{ wordBreak: "keep-all" }}
          variants={staggerNormal}
          initial="hidden"
          animate={isActive ? "visible" : "hidden"}
        >
          {children}
        </motion.div>
      </section>
    </ActiveContext.Provider>
  );
}

/* ─── CountUp ─── */
function CountUp({
  target,
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const isActive = useContext(ActiveContext);
  const [value, setValue] = useState(0);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (!isActive || hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    const timer = setTimeout(() => {
      animate(0, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) =>
          setValue(
            decimals > 0 ? parseFloat(v.toFixed(decimals)) : Math.round(v)
          ),
      });
    }, 600);
    return () => clearTimeout(timer);
  }, [isActive, target, duration, decimals]);

  return (
    <span className={className}>
      {decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ═══ PAGE ═══ */
export default function WhatPage() {
  return (
    <>
      {/* ─── Fixed Nav ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 md:px-12"
        style={{
          background: "rgba(6, 9, 18, 0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-caption text-white-40 transition-colors hover:text-white-90"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>
          메인으로
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/demo"
            className="inline-flex items-center gap-1.5 rounded-full border border-white-10 px-4 py-1.5 text-caption text-white-90 transition-colors hover:border-white-40"
          >
            데모 확인하기 →
          </Link>
          <span className="text-label tracking-[0.2em] text-white-40">WHAT</span>
        </div>
      </motion.nav>

      {/* ─── Horizontal Scroll ─── */}
      <HorizontalScroll sectionCount={SECTION_COUNT}>
        {/* ═══ S1: Hero ═══ */}
        <WhatSection index={0} center>
          <SectionLabel label="WHAT" />
          <motion.h1
            className="mt-8 text-display text-white-90"
            variants={fadeUp}
          >
            30초 만에
            <br />
            내 보험을
            <br />
            진단받는 경험
          </motion.h1>
        </WhatSection>

        {/* ═══ S2: 고객 여정 ═══ */}
        <WhatSection index={1}>
          <SectionLabel label="POINT 1 · 고객 여정" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            고객이 경험하는 것
          </motion.h2>
          <motion.ul
            className="mt-8 flex flex-col gap-4 text-body text-white-70"
            variants={fadeUp}
          >
            <li>
              ▸ 카카오 또는 네이버로{" "}
              <span className="font-bold text-white-90">로그인</span>
            </li>
            <li>
              ▸ 개인정보 수집·이용{" "}
              <span className="font-bold text-white-90">동의</span>
            </li>
            <li>
              ▸ 카카오 또는 네이버 간편인증 → 생보+손보 전체 보험{" "}
              <span className="font-bold text-white-90">자동 조회</span>
            </li>
            <li>
              ▸ AI가 보장 부족, 갱신 예측, 숨은 보험금을{" "}
              <span className="font-bold text-white-90">분석</span>
            </li>
          </motion.ul>
          <motion.p
            className="mt-8 text-caption text-white-40"
            variants={fadeUp}
          >
            보험증권 불필요. 간편인증만으로 전체 보험이 자동 조회됩니다.
          </motion.p>
        </WhatSection>

        {/* ═══ S3: AI 분석 항목 ═══ */}
        <WhatSection index={2}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            AI가 분석하는 것
          </motion.h2>
          <motion.ul
            className="mt-8 flex flex-col gap-5 text-body text-white-70"
            variants={fadeUp}
          >
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">보장분석</span>
              <br />
              <span className="text-caption text-white-40">
                암, 뇌, 심장 등 주요 보장이 부족한지, 과잉인지, 중복인지
              </span>
            </li>
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">갱신 예측</span>
              <br />
              <span className="text-caption text-white-40">
                갱신형 보험이 10년, 20년 뒤 얼마가 되는지 시각화
              </span>
            </li>
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">숨은 보험금</span>
              <br />
              <span className="text-caption text-white-40">
                휴면·만기·미청구 보험금을 찾아 금액으로 알려줌
              </span>
            </li>
          </motion.ul>
          <motion.p
            className="mt-8 text-caption text-white-40"
            variants={fadeUp}
          >
            기준: 연령/성별별 적정 보장금액 (KOSIS, NHIS, HIRA 공공통계)
          </motion.p>
        </WhatSection>

        {/* ═══ S4: 숨은 보험금 ═══ */}
        <WhatSection index={3} center>
          <motion.p className="text-body text-white-40" variants={fadeUp}>
            아직 찾아가지 않은 숨은 보험금
          </motion.p>
          <motion.div className="mt-4" variants={fadeUp}>
            <CountUp
              target={11.2}
              suffix="조원"
              duration={2.5}
              decimals={1}
              className="text-display font-extrabold tabular-nums text-white-90"
            />
          </motion.div>
          <motion.p className="mt-6 text-body leading-relaxed text-white-70" variants={fadeUp}>
            숨은 보험금이란, 보험 가입자가 받을 수 있지만
            <br />
            아직 청구하지 않은 돈입니다.
          </motion.p>
          <motion.p className="mt-4 text-body leading-relaxed text-white-40" variants={fadeUp}>
            만기 환급금, 휴면 보험금, 미청구 사고 보험금 —
            <br />
            본인도 모르는 사이 보험사에 잠들어 있습니다.
          </motion.p>
          <motion.p
            className="mt-6 text-body font-bold text-white-90"
            variants={fadeUp}
          >
            AI가 자동으로 찾아
            <br />
            금액과 청구 방법을 안내합니다.
          </motion.p>
          <motion.p
            className="mt-8 text-caption text-white-40"
            variants={fadeUp}
          >
            출처:{" "}
            <a href="https://fsc.go.kr/edu/news/84846" target="_blank" rel="noopener noreferrer" className="underline decoration-white-10 underline-offset-2 transition-colors hover:text-white-70">
              금융위원회 보도자료
            </a>{" "}
            (2025)
          </motion.p>
        </WhatSection>

        {/* ═══ S5: 모자이크 전략 ═══ */}
        <WhatSection index={4}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            결과는 일부만 공개합니다
          </motion.h2>
          <motion.p
            className="mt-6 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            보장지수, 핵심 진단 항목은{" "}
            <span className="font-bold text-white-90">즉시 공개</span>.
            <br />
            구체적인 부족 금액, 액션 플랜은{" "}
            <span className="font-bold text-white-90">모자이크 처리</span>.
          </motion.p>
          <motion.p
            className="mt-6 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            &ldquo;전체 결과 보기&rdquo; ={" "}
            <span className="font-bold text-white-90">상담 신청</span>.
            <br />
            모자이크가 해제되고, FC에게 분석 리포트가 전달됩니다.
          </motion.p>
        </WhatSection>

        {/* ═══ S6: FC가 받는 것 ═══ */}
        <WhatSection index={5}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            FC가 받는 것
          </motion.h2>
          <motion.ul
            className="mt-8 flex flex-col gap-4 text-body text-white-70"
            variants={fadeUp}
          >
            <li>▸ 고객의 보장 현황 + 부족 분석 리포트</li>
            <li>▸ 갱신형 보험료 예측 그래프</li>
            <li>
              ▸ &ldquo;이 고객에게 이렇게 말하세요&rdquo;{" "}
              <span className="font-bold text-white-90">상담 가이드</span>
            </li>
          </motion.ul>
          <motion.p
            className="mt-8 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            플랫폼이 고객을 모아, 분석까지 끝내고, FC에게 전달합니다.
            <br />
            FC의 DB 비용 부담을 줄이는 구조입니다.
          </motion.p>
        </WhatSection>

        {/* ═══ S7: 인사이트 ═══ */}
        <WhatSection index={6} center>
          <motion.div
            className="mx-auto h-px w-12 bg-white-10"
            variants={fadeUp}
          />
          <motion.h2 className="mt-8 text-h1 text-white-90" variants={fadeUp}>
            고객은 분석을 받고
            <br />
            FC는 계약을 얻고
            <br />
            플랫폼은 DB를 쌓습니다
          </motion.h2>
          <motion.div
            className="mx-auto mt-8 h-px w-12 bg-white-10"
            variants={fadeUp}
          />
        </WhatSection>

        {/* ═══ S8: Hero — 로드맵 진입 ═══ */}
        <WhatSection index={7} center>
          <SectionLabel label="POINT 2 · 로드맵" />
          <motion.h2
            className="mt-8 text-h1 text-white-90"
            variants={fadeUp}
          >
            한 번에 다 만들지 않습니다
            <br />
            검증하면서 넓혀갑니다
          </motion.h2>
        </WhatSection>

        {/* ═══ S9: Phase 1 ═══ */}
        <WhatSection index={8}>
          <SectionLabel label="PHASE 1 · 3~4개월" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            보장분석 + 갱신예측 + 숨은보험금
          </motion.h2>
          <motion.p
            className="mt-4 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            경쟁사와 동일한 기본 가치(보장분석)에
            아무도 하지 않는 갱신 예측을 더합니다.
            숨은 보험금은 고객을 끌어오는 즉시 가치.
          </motion.p>
          <motion.ul
            className="mt-6 flex flex-col gap-3 text-body text-white-70"
            variants={fadeUp}
          >
            <li>▸ 데이터: CODEF 간편인증 → 전체 보험 자동 조회</li>
            <li>▸ 분석: AI + 공공통계 기준</li>
            <li>
              ▸ 검증:{" "}
              <span className="text-white-90">
                &ldquo;고객이 쓰는가? DB가 모이는가?&rdquo;
              </span>
            </li>
          </motion.ul>
        </WhatSection>

        {/* ═══ S10: Phase 2 ═══ */}
        <WhatSection index={9}>
          <SectionLabel label="PHASE 2 · 1~2개월" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            연금 현황 분석 + 건강검진 연동
          </motion.h2>
          <motion.p
            className="mt-4 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            Phase 1에서 모은 고객에게 연금 서비스를 안내합니다.
          </motion.p>
          <motion.ul
            className="mt-6 flex flex-col gap-4 text-body text-white-70"
            variants={fadeUp}
          >
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">연금 현황 분석</span>
              <br />
              <span className="text-caption text-white-40">
                노후 적정 생활비 대비 현재 연금이 충분한지 진단. 부족분은 FC가 상담.
              </span>
            </li>
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">건강검진 연동</span>
              <br />
              <span className="text-caption text-white-40">
                건강 상태 기반 맞춤 보장 분석. 위험 항목은 FC가 상담.
              </span>
            </li>
          </motion.ul>
          <motion.p
            className="mt-6 text-body font-bold text-white-90"
            variants={fadeUp}
          >
            경쟁사가 아무도 하지 않는 시장. 블루오션 본격 진입.
          </motion.p>
        </WhatSection>

        {/* ═══ S11: Phase 3 ═══ */}
        <WhatSection index={10} center>
          <SectionLabel label="PHASE 3 · 6개월+" />
          <motion.h2
            className="mt-6 text-h2 text-white-90"
            variants={fadeUp}
          >
            전체 보험 통합 분석
          </motion.h2>
          <motion.p
            className="mt-4 max-w-md text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            궁극적으로는 간편인증 한 번으로
            고객의 모든 보험을 한 번에 분석합니다.
          </motion.p>
        </WhatSection>

        {/* ═══ S12: 기술 기반 ═══ */}
        <WhatSection index={11}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            기술은 준비되어 있습니다
          </motion.h2>
          <motion.ul
            className="mt-8 flex flex-col gap-5 text-body text-white-70"
            variants={fadeUp}
          >
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">데이터 조회</span>
              <br />
              <span className="text-caption text-white-40">
                CODEF API — 간편인증으로 생보+손보+연금+건강검진 통합 조회
              </span>
            </li>
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">분석 기준</span>
              <br />
              <span className="text-caption text-white-40">
                KOSIS, NHIS, HIRA 공공통계 (연령/성별별 적정 보장 기준)
              </span>
            </li>
            <li>
              ▸{" "}
              <span className="font-bold text-white-90">AI 엔진</span>
              <br />
              <span className="text-caption text-white-40">
                Claude API — 글로벌 최고 수준의 AI 언어 모델
              </span>
            </li>
          </motion.ul>
        </WhatSection>

        {/* ═══ S13: CTA ═══ */}
        <WhatSection index={12} center>
          <motion.p
            className="text-label tracking-[0.2em] text-white-40"
            variants={fadeUp}
          >
            AI × INSURANCE
          </motion.p>
          <motion.h2
            className="mt-8 text-display text-white-90"
            variants={fadeUp}
          >
            보험의 다음 시대는
            <br />
            이미 시작되고 있습니다
          </motion.h2>
          <motion.div className="mt-12" variants={fadeUp}>
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full border border-white-10 px-8 py-3 text-body font-medium text-white-90 transition-colors hover:border-white-40"
            >
              데모 확인하기 →
            </Link>
          </motion.div>
        </WhatSection>
      </HorizontalScroll>
    </>
  );
}
