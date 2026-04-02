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
const SECTION_COUNT = 14;

/* ─── Active Context ─── */
const ActiveContext = createContext(false);

/* ─── HowSection ─── */
function HowSection({
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

/* ─── Source ─── */
function Source({ children }: { children: React.ReactNode }) {
  return (
    <motion.p className="mt-8 text-caption text-white-40" variants={fadeUp}>
      {children}
    </motion.p>
  );
}

function SourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-white-10 underline-offset-2 transition-colors hover:text-white-70">
      {children}
    </a>
  );
}

/* ═══ PAGE ═══ */
export default function HowPage() {
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
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          메인으로
        </Link>
        <span className="text-label tracking-[0.2em] text-white-40">HOW</span>
      </motion.nav>

      {/* ─── Horizontal Scroll ─── */}
      <HorizontalScroll sectionCount={SECTION_COUNT}>
        {/* ═══ S1: Hero ═══ */}
        <HowSection index={0} center>
          <SectionLabel label="HOW" />
          <motion.h1 className="mt-8 text-display text-white-90" variants={fadeUp}>
            기존 플랫폼이
            <br />
            놓치고 있는
            <br />
            시장이 있습니다
          </motion.h1>
        </HowSection>

        {/* ═══ S2: 경쟁사 비교표 ═══ */}
        <HowSection index={1}>
          <SectionLabel label="POINT 1 · 시장의 빈틈" />
          <motion.h2 className="mt-6 text-h2 text-white-90" variants={fadeUp}>
            주요 플랫폼이 분석하는 것
          </motion.h2>

          <motion.div className="mt-8 w-full overflow-x-auto" variants={fadeUp}>
            <table className="w-full text-[12px]">
              <thead>
                <tr className="text-white-40">
                  <th className="text-left py-2 pr-2 font-medium" />
                  <th className="px-2 py-2 font-medium text-center">보장<br/>분석</th>
                  <th className="px-2 py-2 font-medium text-center">숨은<br/>보험금</th>
                  <th className="px-2 py-2 font-medium text-center">갱신형<br/>보험료 예측</th>
                  <th className="px-2 py-2 font-medium text-center">연금<br/>현황 분석</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "보닥", vals: ["○", "○", "×", "×"] },
                  { name: "시그널플래너", vals: ["○", "○", "×", "×"] },
                  { name: "토스", vals: ["○", "○", "×", "×"] },
                  { name: "뱅크샐러드", vals: ["○", "○", "×", "×"] },
                ].map((row) => (
                  <tr key={row.name} className="border-t border-white-05">
                    <td className="py-1.5 pr-2 text-white-40">{row.name}</td>
                    {row.vals.map((v, i) => (
                      <td key={i} className={`px-2 py-1.5 text-center ${v === "○" ? "text-white-40" : "text-white-40"}`}>{v}</td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-white-10">
                  <td className="py-1.5 pr-2 font-bold text-white-90">우리</td>
                  {["○", "○", "○", "○"].map((v, i) => (
                    <td key={i} className="px-2 py-1.5 text-center font-bold text-white-90">{v}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>

          <Source>자체 경쟁사 조사 (2026.03, 각 서비스 공식 페이지 기반)</Source>
        </HowSection>

        {/* ═══ S3: 갱신 예측 숫자 ═══ */}
        <HowSection index={2} center>
          <motion.div className="flex items-baseline justify-center gap-4" variants={fadeUp}>
            <span className="text-h2 tabular-nums text-white-40">월 28,560원</span>
            <span className="text-h3 text-white-40">→</span>
            <span className="text-h1 font-extrabold tabular-nums text-white-90">
              월 <CountUp target={60} duration={2} className="text-h1 font-extrabold tabular-nums text-white-90" />,720원
            </span>
          </motion.div>
          <motion.p className="mt-6 max-w-md text-body leading-relaxed text-white-70" variants={fadeUp}>
            갱신형 암보험, 10년 후 첫 갱신.
            <br />
            예상하지 못한 112% 인상.
            <br />
            비갱신형이었다면 보험료는 그대로였습니다.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.insnews.co.kr/news/articleViewRedirect.html?hot=78447/Y&firstsec=1&secondsec=12&num=78447">
              한국보험신문
            </SourceLink>{" "}
            (2024.04)
          </Source>
        </HowSection>

        {/* ═══ S4: 갱신 예측이 왜 강력한가 ═══ */}
        <HowSection index={3}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            갱신 예측이 왜 강력한가
          </motion.h2>
          <motion.p className="mt-4 max-w-lg text-body leading-relaxed text-white-70" variants={fadeUp}>
            고객에게 &ldquo;10년 뒤 보험료&rdquo;를 보여주면
            비갱신형으로 전환하고 싶어집니다.
          </motion.p>
          <motion.p className="mt-4 max-w-lg text-body leading-relaxed text-white-70" variants={fadeUp}>
            비갱신형 전환 ={" "}
            <span className="font-bold text-white-90">보장성보험 신계약</span>.
            <br />
            갱신 예측은 고객에게는 정보를, FC에게는 계약을 만듭니다.
          </motion.p>
        </HowSection>

        {/* ═══ S5: 연금 시장 성장 ═══ */}
        <HowSection index={4}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            연금저축 적립금, 매년 성장 중
          </motion.h2>
          <motion.div className="mt-10 flex flex-col gap-5" variants={fadeUp}>
            {[
              { year: "2020", value: 152.5, label: "152.5조원" },
              { year: "2021", value: 160.1, label: "160.1조원" },
              { year: "2023", value: 167.8, label: "167.8조원" },
              { year: "2024", value: 178.6, label: "178.6조원" },
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
                        width: `${(d.value / 178.6) * 100}%`,
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
          <motion.p className="mt-8 text-body text-white-50" variants={fadeUp}>
            고객의 연금이 노후에 충분한지 분석하는
            <br />
            플랫폼은 아직 없습니다.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://eiec.kdi.re.kr/policy/materialView.do?num=269347">
              금융감독원
            </SourceLink>{" "}
            (2020~2024)
          </Source>
        </HowSection>

        {/* ═══ S6: 연금 가입률 ═══ */}
        <HowSection index={5} center>
          <motion.p className="text-body text-white-40" variants={fadeUp}>
            경제활동인구 중 연금저축 가입률
          </motion.p>
          <motion.div className="mt-4" variants={fadeUp}>
            <CountUp target={26} suffix="%" duration={2.5} className="text-display font-extrabold tabular-nums text-white-90" />
          </motion.div>
          <motion.p className="mt-6 text-body leading-relaxed text-white-70" variants={fadeUp}>
            764만 명만 가입. 나머지 74%는 미가입.
          </motion.p>
          <motion.p className="mt-4 text-body leading-relaxed text-white-40" variants={fadeUp}>
            내 연금이 노후에 충분한지
            <br />
            분석해주는 서비스는 아직 없습니다.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.segye.com/newsView/20250731515864">세계일보</SourceLink>{" "}(2025.07),{" "}
            <SourceLink href="https://www.korea.kr/news/policyNewsView.do?newsId=156721761">정책브리핑</SourceLink>{" "}(2024)
          </Source>
        </HowSection>

        {/* ═══ S7: 노인 빈곤율 ═══ */}
        <HowSection index={6} center>
          <motion.p className="text-body text-white-40" variants={fadeUp}>
            한국 노인 빈곤율
          </motion.p>
          <motion.div className="mt-4" variants={fadeUp}>
            <CountUp target={39.7} suffix="%" decimals={1} duration={2.5} className="text-display font-extrabold tabular-nums text-white-90" />
          </motion.div>
          <motion.p className="mt-6 text-body leading-relaxed text-white-70" variants={fadeUp}>
            OECD 평균 14.8%의 2.5배. 압도적 1위.
            <br />
            연금 시스템이 작동하지 않고 있다는 증거입니다.
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://alphabiz.co.kr/news/view/1065593449217702">알파비즈</SourceLink>{" "}(2025)
          </Source>
        </HowSection>

        {/* ═══ S8: 인사이트 1 ═══ */}
        <HowSection index={7} center>
          <motion.div className="mx-auto h-px w-12 bg-white-10" variants={fadeUp} />
          <motion.h2 className="mt-8 text-h1 text-white-90" variants={fadeUp}>
            경쟁사가 모두
            <br />
            같은 곳을 보고 있을 때
            <br />
            아무도 보지 않는 곳에
            <br />
            기회가 있습니다
          </motion.h2>
          <motion.div className="mx-auto mt-8 h-px w-12 bg-white-10" variants={fadeUp} />
        </HowSection>

        {/* ═══ S9: Hero — 포인트 2 ═══ */}
        <HowSection index={8} center>
          <SectionLabel label="POINT 2 · 새로운 팀" />
          <motion.h2 className="mt-8 text-h1 text-white-90" variants={fadeUp}>
            기술이 있으면
            <br />
            사람이 모입니다
          </motion.h2>
        </HowSection>

        {/* ═══ S10: 생산성 숫자 ═══ */}
        <HowSection index={9} center>
          <motion.div className="flex items-baseline justify-center gap-8" variants={fadeUp}>
            <div className="text-center">
              <p className="text-caption text-white-40">보닥</p>
              <p className="mt-1">
                <span className="text-h2 text-white-40">약 </span>
                <CountUp target={5} className="text-h1 font-extrabold text-white-90" />
                <span className="text-h2 text-white-40">배</span>
              </p>
            </div>
            <div className="text-center">
              <p className="text-caption text-white-40">시그널플래너</p>
              <p className="mt-1">
                <span className="text-h2 text-white-40">약 </span>
                <CountUp target={6.7} decimals={1} className="text-h1 font-extrabold text-white-90" />
                <span className="text-h2 text-white-40">배</span>
              </p>
            </div>
          </motion.div>
          <motion.p className="mt-6 max-w-md text-body leading-relaxed text-white-70" variants={fadeUp}>
            AI 기술을 도입한 플랫폼에서
            <br />
            FC 1인당 생산성이 업계 평균의 5~7배.
          </motion.p>
          <motion.p className="mt-3 text-caption text-white-40" variants={fadeUp}>
            보닥 13.3건/월 (업계 2.5건), 시그널플래너 200만원/월 (업계 30만원)
          </motion.p>
          <Source>
            출처:{" "}
            <SourceLink href="https://www.etoday.co.kr/news/view/2496558">이투데이</SourceLink>{" "}(2025),{" "}
            <SourceLink href="https://economist.co.kr/article/view/ecn202208110002">이코노미스트</SourceLink>{" "}(2022.08)
          </Source>
        </HowSection>

        {/* ═══ S11: 새로운 팀 ═══ */}
        <HowSection index={10}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            기존 FC가 아닌,
            <br />
            새로운 팀을 만듭니다
          </motion.h2>
          <motion.p className="mt-4 max-w-lg text-body leading-relaxed text-white-70" variants={fadeUp}>
            기존 인슈어테크 플랫폼은 자체 FC를 고용하려 했지만
            DB는 넘치는데 소화할 FC가 부족했습니다.
          </motion.p>
          <motion.p className="mt-4 max-w-lg text-body leading-relaxed text-white-70" variants={fadeUp}>
            기존 방식으로는 안 됩니다.
            <br />
            <span className="font-bold text-white-90">AI 기술을 활용할 수 있는 새로운 팀</span>을 구축합니다.
            <br />
            목돈이 아닌 기술로 모인 FC — 그들이 이 시장을 공략합니다.
          </motion.p>
        </HowSection>

        {/* ═══ S12: 우리가 찾는 FC ═══ */}
        <HowSection index={11}>
          <motion.h2 className="text-h2 text-white-90" variants={fadeUp}>
            우리가 찾는 FC
          </motion.h2>
          <motion.ul className="mt-8 flex flex-col gap-4 text-body text-white-70" variants={fadeUp}>
            <li>▸ AI 기술을 적극 활용할 수 있는 <span className="font-bold text-white-90">디지털 역량</span></li>
            <li>▸ 부업이 아닌, <span className="font-bold text-white-90">절실함</span>을 가진 실력자</li>
          </motion.ul>
        </HowSection>

        {/* ═══ S13: 인사이트 2 ═══ */}
        <HowSection index={12} center>
          <motion.div className="mx-auto h-px w-12 bg-white-10" variants={fadeUp} />
          <motion.h2 className="mt-8 text-h1 text-white-90" variants={fadeUp}>
            목돈으로 사람을 모으는
            <br />
            시대는 끝났습니다
          </motion.h2>
          <motion.p className="mt-6 text-body text-white-70" variants={fadeUp}>
            기술로 사람이 모이는 시대가 시작됩니다.
          </motion.p>
          <motion.div className="mx-auto mt-8 h-px w-12 bg-white-10" variants={fadeUp} />
        </HowSection>

        {/* ═══ S14: CTA ═══ */}
        <HowSection index={13} center>
          <motion.h2 className="text-display text-white-90" variants={fadeUp}>
            빈틈을 찾았고
            <br />
            팀도 준비됩니다
          </motion.h2>
          <motion.p className="mx-auto mt-6 max-w-md text-body leading-relaxed text-white-70" variants={fadeUp}>
            아무도 보지 않던 시장의 기회,
            <br />
            그리고 그 시장을 공략할 사람들.
          </motion.p>
          <motion.div className="mt-12" variants={fadeUp}>
            <Link
              href="/?s=2"
              className="inline-flex items-center gap-2 rounded-full border border-white-10 px-8 py-3 text-body font-medium text-white-90 transition-colors hover:border-white-40"
            >
              무엇을 만드는가 →
            </Link>
          </motion.div>
        </HowSection>
      </HorizontalScroll>
    </>
  );
}
