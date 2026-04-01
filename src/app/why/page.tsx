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
const SECTION_COUNT = 12;

/* ─── Active Context ─── */
const ActiveContext = createContext(false);

/* ─── WhySection ─── */
function WhySection({
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
      <section className="relative flex h-screen w-screen shrink-0 overflow-hidden" style={{ height: "100dvh" }}>
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

/* ─── Source ─── */
function Source({ children }: { children: React.ReactNode }) {
  return (
    <motion.p className="mt-8 text-caption text-white-40" variants={fadeUp}>
      {children}
    </motion.p>
  );
}

/* ─── SourceLink ─── */
function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-white-10 underline-offset-2 transition-colors hover:text-white-70"
    >
      {children}
    </a>
  );
}

/* ═══ PAGE ═══ */
export default function WhyPage() {
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
        <span className="text-label tracking-[0.2em] text-white-40">WHY</span>
      </motion.nav>

      {/* ─── Horizontal Scroll ─── */}
      <HorizontalScroll sectionCount={SECTION_COUNT}>
        {/* ═══ S1: Hero ═══ */}
        <WhySection index={0} center>
          <SectionLabel label="WHY" />
          <motion.h1
            className="mt-8 text-display text-white-90"
            variants={fadeUp}
          >
            돈으로 설계사를
            <br />
            모으던 시대가
            <br />
            끝나고 있습니다
          </motion.h1>
        </WhySection>

        {/* ═══ S2: 1200% 룰 설명 ═══ */}
        <WhySection index={1}>
          <SectionLabel label="POINT 1 · 1200% 룰" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            보험설계사 수수료 상한제
          </motion.h2>
          <motion.p
            className="mt-4 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            설계사가 보험 1건을 팔 때 받는 수수료와 시책금의 합계가
            월 보험료의 1,200%를 넘을 수 없도록 제한하는 규제입니다.
          </motion.p>
          <motion.p className="mt-4 text-body text-white-70" variants={fadeUp}>
            예: 월 보험료 10만원 보험 1건 → 수수료+시책 합계{" "}
            <span className="font-bold text-white-90">최대 120만원</span>
          </motion.p>
          <motion.p className="mt-6 text-body text-white-70" variants={fadeUp}>
            2020년 1월, 전속 설계사에 적용.
            <br />
            26년 3월 현재, 시행 6년 경과.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.fsc.go.kr/no010101/83638">
              금융위원회 보도자료
            </SourceLink>{" "}
            (2024.12)
          </Source>
        </WhySection>

        {/* ═══ S3: 전속→GA 이동 ═══ */}
        <WhySection index={2} center>
          <motion.div variants={fadeUp}>
            <CountUp
              target={1729}
              suffix="명"
              className="text-h1 font-extrabold tabular-nums text-white-90"
            />
          </motion.div>
          <motion.p className="mt-4 text-body text-white-70" variants={fadeUp}>
            2024~2025, 한 대형 보험사에서
            <br />
            GA로 이동한 전속 설계사.
            <br />
            12,935건의 보험계약이 해지.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.mt.co.kr/finance/2025/12/23/2025122209023513744">
              머니투데이
            </SourceLink>{" "}
            (2025.12)
          </Source>
        </WhySection>

        {/* ═══ S4: GA 설계사 30만 ═══ */}
        <WhySection index={3}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            GA 소속 설계사, 30만 돌파 전망
          </motion.h2>
          <motion.div className="mt-10 flex flex-col gap-5" variants={fadeUp}>
            {[
              { year: "2021", value: 24.7, label: "24.7만" },
              { year: "2022", value: 24.9, label: "24.9만" },
              { year: "2023", value: 26.3, label: "26.3만" },
              { year: "2024", value: 28.8, label: "28.8만" },
              { year: "2025", value: 30, label: "30만(전망)" },
            ].map((d, i) => (
              <div key={d.year} className="flex items-center gap-4">
                <span className="w-10 text-caption tabular-nums text-white-40">
                  {d.year}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white-05">
                  <motion.div
                    className="h-full rounded-full bg-white-40"
                    variants={{
                      hidden: { width: 0 },
                      visible: {
                        width: `${(d.value / 30) * 100}%`,
                        transition: {
                          duration: 1,
                          ease,
                          delay: 0.3 + i * 0.12,
                        },
                      },
                    }}
                  />
                </div>
                <span className="w-24 text-right tabular-nums text-body font-bold text-white-90">
                  {d.label}
                </span>
              </div>
            ))}
          </motion.div>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.newsway.co.kr/news/view?ud=2025081215022024121">
              뉴스웨이
            </SourceLink>{" "}
            (2025.08)
          </Source>
        </WhySection>

        {/* ═══ S5: 1,003억원 ═══ */}
        <WhySection index={4} center>
          <motion.div variants={fadeUp}>
            <CountUp
              target={1003}
              suffix="억원"
              className="text-h1 font-extrabold tabular-nums text-white-90"
            />
          </motion.div>
          <motion.p className="mt-4 text-body text-white-70" variants={fadeUp}>
            분기 정착지원금. 전분기 대비 +19.7%.
            <br />
            일부 GA는 1억 이상의 스카우트비를 제시.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.insjournal.co.kr/news/articleView.html?idxno=27497">
              보험저널
            </SourceLink>{" "}
            (2025),{" "}
            <SourceLink href="https://www.seoul.co.kr/news/economy/2024/04/03/20240403018008">
              서울신문
            </SourceLink>{" "}
            (2024.04)
          </Source>
        </WhySection>

        {/* ═══ S6: 7월 예측 ═══ */}
        <WhySection index={5}>
          <SectionLabel label="예측" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            올해 7월, 같은 규제가
            <br />
            GA에도 적용됩니다
          </motion.h2>
          <motion.p
            className="mt-4 text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            수수료 + 정착지원금 + 시책, 전부 합산 기준.
          </motion.p>
          <motion.ul
            className="mt-6 flex flex-col gap-3 text-body text-white-70"
            variants={fadeUp}
          >
            <li>▸ GA가 설계사에게 목돈을 줄 재원이 사라집니다.</li>
            <li>
              ▸ 더 이상{" "}
              <span className="font-bold text-white-90">
                돈으로 설계사를 끌어올 수 없습니다.
              </span>
            </li>
            <li>
              ▸ 중소형 GA는 대형 GA와 돈으로 경쟁할 수 없게 됩니다.
            </li>
          </motion.ul>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.insjournal.co.kr/news/articleView.html?idxno=29258">
              보험저널
            </SourceLink>{" "}
            (2026)
          </Source>
        </WhySection>

        {/* ═══ S7: 인사이트 1 ═══ */}
        <WhySection index={6} center>
          <motion.div
            className="mx-auto h-px w-12 bg-white-10"
            variants={fadeUp}
          />
          <motion.h2 className="mt-8 text-h1 text-white-90" variants={fadeUp}>
            남는 경쟁력은
            <br />
            기술뿐입니다
          </motion.h2>
          <motion.p className="mt-6 text-body text-white-70" variants={fadeUp}>
            전속에서 GA로의 대이동은 돈 때문이었습니다.
            <br />
            7월부터 그 돈이 사라집니다.
          </motion.p>
          <motion.div
            className="mx-auto mt-8 h-px w-12 bg-white-10"
            variants={fadeUp}
          />
        </WhySection>

        {/* ═══ S8: 분급제 ═══ */}
        <WhySection index={7} center>
          <SectionLabel label="POINT 2 · 분급제" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            2027년 1월, 수입 구조가 바뀝니다
          </motion.h2>
          <motion.p
            className="mt-3 text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            수수료를 4~7년에 걸쳐 나눠 받는 분급제.
          </motion.p>
          <motion.div className="mt-10" variants={fadeUp}>
            <p className="text-caption text-white-40">선지급 수수료</p>
            <p className="mt-3">
              <CountUp
                target={37}
                suffix="%"
                duration={2.5}
                className="text-display font-extrabold text-white-90"
              />
              <span className="ml-3 text-h2 text-white-40">감소</span>
            </p>
            <p className="mt-3 text-caption text-white-40">
              1~2차년도 선지급 합계 2,000% → 1,250%
            </p>
          </motion.div>
          <motion.p
            className="mt-8 max-w-md text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            핵심은 총액이 아니라 현금흐름.
            <br />
            이번 달 DB를 사야 하는 설계사에게
            &ldquo;3년 뒤에 받는다&rdquo;는 건 의미가 없습니다.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.insjournal.co.kr/news/articleView.html?idxno=26829">
              보험저널
            </SourceLink>{" "}
            (2025.05),{" "}
            <SourceLink href="https://www.fsc.go.kr/no010101/84721">
              금융위원회
            </SourceLink>
          </Source>
        </WhySection>

        {/* ═══ S9: 호주 26,500 → 15,000 ═══ */}
        <WhySection index={8} center>
          <SectionLabel label="선례 — 호주" />
          <motion.p className="mt-6 text-body text-white-70" variants={fadeUp}>
            같은 규제를 2018년에 도입한 나라가 있습니다.
          </motion.p>
          <motion.div
            className="mt-8 flex items-baseline justify-center gap-4"
            variants={fadeUp}
          >
            <span className="text-h2 tabular-nums text-white-40">
              26,500명
            </span>
            <span className="text-white-40">→</span>
            <CountUp
              target={15000}
              suffix="명"
              className="text-h1 font-extrabold tabular-nums text-white-90"
            />
          </motion.div>
          <motion.p className="mt-4 text-body text-white-70" variants={fadeUp}>
            호주 보험 FC 수 (2019→2024).
            <br />
            6년간 약 42% 감소.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.rainmaker.com.au/media-release/australias-financial-adviser-numbers-in-2024">
              Rainmaker
            </SourceLink>{" "}
            (2024),{" "}
            <SourceLink href="https://www.adviserratings.com.au/news/six-years-later-life-insurance-finally-finds-its-post-crisis-footing/">
              Adviser Ratings
            </SourceLink>{" "}
            (2024)
          </Source>
        </WhySection>

        {/* ═══ S10: 생존자의 공통점 ═══ */}
        <WhySection index={9} center>
          <motion.p className="text-body text-white-40" variants={fadeUp}>
            생존한 호주 보험 사무소 중
          </motion.p>
          <motion.div className="mt-4" variants={fadeUp}>
            <CountUp
              target={64}
              suffix="%"
              duration={2.5}
              className="text-display font-extrabold tabular-nums text-white-90"
            />
          </motion.div>
          <motion.p className="mt-4 text-body text-white-70" variants={fadeUp}>
            가 디지털 기술을 적극 활용.
            <br />
            41%는 AI가 업무를 지원할 것으로 예상.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.adviserratings.com.au/news/six-years-later-life-insurance-finally-finds-its-post-crisis-footing/">
              Adviser Ratings
            </SourceLink>{" "}
            (2024)
          </Source>
        </WhySection>

        {/* ═══ S11: 한국 예측 ═══ */}
        <WhySection index={10}>
          <SectionLabel label="한국 시장 전망" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            한국도 같은 길을 갑니다
          </motion.h2>
          <motion.p
            className="mt-4 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            분급제 시행 후, 설계사의 수입은 37% 줄지만
            DB 구매 비용은 변하지 않습니다.
            수입 대비 DB 비용 부담이 현행의 1.5~2.5배로 증가합니다.
          </motion.p>
          <motion.p
            className="mt-4 max-w-lg text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            DB를 저렴하게 확보하거나,
            적은 DB로도 높은 전환율을 만드는 것이 생존 조건.
          </motion.p>
          <Source>
            자체 추정 (금융위 확정 37% 감소 기준, DB 비용 불변 가정)
          </Source>
        </WhySection>

        {/* ═══ S12: 결론 + CTA ═══ */}
        <WhySection index={11} center>
          <motion.h2 className="text-display text-white-90" variants={fadeUp}>
            기술을 가진 곳만
            <br />
            살아남습니다
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-md text-body leading-relaxed text-white-70"
            variants={fadeUp}
          >
            규제는 확정됐습니다. 되돌릴 수 없습니다.
            <br />
            그 기술을 지금 만들어야 합니다.
          </motion.p>
          <motion.div className="mt-12" variants={fadeUp}>
            <Link
              href="/?s=1"
              className="inline-flex items-center gap-2 rounded-full border border-white-10 px-8 py-3 text-body font-medium text-white-90 transition-colors hover:border-white-40"
            >
              어떻게 만드는가 →
            </Link>
          </motion.div>
        </WhySection>
      </HorizontalScroll>
    </>
  );
}
