"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Constants ─── */
const STEPS = [
  { label: "랜딩", title: "서비스 첫 화면" },
  { label: "로그인", title: "소셜 로그인" },
  { label: "동의", title: "개인정보 동의" },
  { label: "인증", title: "카카오톡 간편인증" },
  { label: "AI 분석", title: "분석 중" },
  { label: "분석 결과", title: "AI 보험 진단" },
  { label: "갱신 예측", title: "보험료 예측" },
  { label: "상담 신청", title: "모자이크 해제" },
  { label: "숨은 보험금", title: "보험금 상세" },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ─── PhoneFrame ─── */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[320px] h-[693px] bg-black rounded-[44px] p-[12px] shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-b-[16px] z-30" />
      <div className="relative w-full h-full bg-white rounded-[34px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[48px] z-20 bg-white flex items-end justify-between px-7 pb-1">
          <span className="text-[12px] font-semibold text-toss-black">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="15" height="10" viewBox="0 0 18 12" fill="none"><rect x="0" y="3" width="3" height="9" rx="1" fill="#191F28"/><rect x="5" y="2" width="3" height="10" rx="1" fill="#191F28"/><rect x="10" y="0" width="3" height="12" rx="1" fill="#191F28"/><rect x="15" y="1" width="3" height="11" rx="1" fill="#B0B8C1"/></svg>
            <svg width="22" height="11" viewBox="0 0 27 13" fill="none"><rect x="0" y="1" width="23" height="11" rx="2.5" stroke="#191F28" strokeWidth="1"/><rect x="1.5" y="2.5" width="18" height="8" rx="1.5" fill="#191F28"/><rect x="24.5" y="4.5" width="2" height="4" rx="1" fill="#191F28"/></svg>
          </div>
        </div>
        <div className="h-full overflow-hidden pt-[48px]">{children}</div>
      </div>
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-white/30 rounded-full" />
    </div>
  );
}

/* ─── Step Components ─── */

function StepLanding({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[11px] font-bold text-toss-blue tracking-wider">AI 보험 진단</p>
      <h1 className="mt-3 text-[22px] font-bold text-toss-black leading-tight">
        내 보험,
        <br />
        30초 만에 진단받기
      </h1>
      <p className="mt-3 text-[13px] text-toss-gray-600 leading-relaxed">
        AI가 내 보험의 부족한 부분과
        <br />
        숨은 보험금을 찾아드립니다.
      </p>
      <button
        onClick={onNext}
        className="mt-8 w-full max-w-[240px] h-[44px] bg-toss-blue text-white text-[14px] font-bold rounded-xl active:scale-[0.98] transition-transform"
      >
        무료 진단받기
      </button>
    </div>
  );
}

function StepLogin({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <h2 className="text-[18px] font-bold text-toss-black mb-8">로그인</h2>
      <div className="w-full max-w-[260px] space-y-3">
        <button
          onClick={onNext}
          className="w-full h-[44px] rounded-xl text-[14px] font-bold active:scale-[0.98] transition-transform"
          style={{ backgroundColor: "#FEE500", color: "#191919" }}
        >
          카카오로 시작하기
        </button>
        <button
          className="w-full h-[44px] rounded-xl text-[14px] font-bold text-white active:scale-[0.98] transition-transform"
          style={{ backgroundColor: "#03C75A" }}
        >
          네이버로 시작하기
        </button>
      </div>
    </div>
  );
}

function StepConsent({ onNext }: { onNext: () => void }) {
  const [all, setAll] = useState(false);
  return (
    <div className="h-full flex flex-col px-5 pt-4">
      <h2 className="text-[16px] font-bold text-toss-black mb-5">서비스 이용 동의</h2>
      <button
        onClick={() => setAll(!all)}
        className={`flex items-center gap-3 p-3 rounded-xl mb-4 transition-colors ${all ? "bg-toss-blue-light" : "bg-toss-gray-50"}`}
      >
        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${all ? "bg-toss-blue" : "bg-toss-gray-300"}`}>
          {all && <svg width="10" height="7" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
        </div>
        <span className={`text-[14px] font-bold ${all ? "text-toss-blue" : "text-toss-black"}`}>전체 동의</span>
      </button>
      <div className="space-y-3 text-[13px] text-toss-gray-700">
        {["[필수] 개인정보 수집·이용 동의", "[필수] 제3자 제공 동의 — CODEF", "[선택] 마케팅 정보 수신 동의"].map((t) => (
          <div key={t} className="flex items-center gap-3 px-1">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${all ? "bg-toss-blue" : "bg-toss-gray-200"}`}>
              {all && <svg width="8" height="6" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
            </div>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pb-8 px-1">
        <button
          onClick={onNext}
          disabled={!all}
          className={`w-full h-[44px] rounded-xl text-[14px] font-bold transition-all ${all ? "bg-toss-blue text-white active:scale-[0.98]" : "bg-toss-gray-100 text-toss-gray-400"}`}
        >
          동의하고 계속하기
        </button>
      </div>
    </div>
  );
}

function StepVerify({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 2000);
    const t2 = setTimeout(onNext, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onNext]);
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-[16px] font-bold text-toss-black mb-4">본인인증</h2>
      {!done ? (
        <>
          <div className="w-8 h-8 border-2 border-toss-blue border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[14px] text-toss-gray-600">카카오톡으로 인증 요청을 보냈습니다</p>
          <p className="mt-2 text-[12px] text-toss-gray-400">인증 대기 중...</p>
        </>
      ) : (
        <>
          <div className="w-10 h-10 rounded-full bg-toss-green flex items-center justify-center mb-4">
            <svg width="18" height="14" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <p className="text-[14px] font-bold text-toss-black">인증 완료 ✓</p>
        </>
      )}
    </div>
  );
}

function StepLoading({ onNext }: { onNext: () => void }) {
  const items = ["보험 계약 조회 완료", "보장 내역 분석 완료", "갱신형 보험료 예측 완료", "숨은 보험금 확인 완료", "AI 종합 분석 중..."];
  const [done, setDone] = useState(0);
  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setDone(i + 1), (i + 1) * 700)
    );
    const finish = setTimeout(onNext, items.length * 700 + 800);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); };
  }, [onNext]);
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <div className="space-y-3 w-full max-w-[240px]">
        {items.map((text, i) => (
          <div key={text} className={`flex items-center gap-3 transition-opacity duration-300 ${i < done ? "opacity-100" : "opacity-30"}`}>
            {i < done - 1 || (i === items.length - 1 && done > items.length - 1) ? (
              <span className="text-toss-green text-[14px]">✓</span>
            ) : i === done - 1 ? (
              <div className="w-3.5 h-3.5 border-2 border-toss-blue border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="text-toss-gray-300 text-[14px]">○</span>
            )}
            <span className="text-[13px] text-toss-gray-700">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepDiagnosis({ onNext, onRenewal }: { onNext: () => void; onRenewal: () => void }) {
  return (
    <div className="h-full flex flex-col overflow-y-auto px-5 pt-4 pb-6 scrollbar-hide">
      <p className="text-[11px] font-bold text-toss-blue tracking-wider">AI 보험 진단</p>
      <h2 className="mt-1 text-[18px] font-bold text-toss-black">김민수님의 보험 분석</h2>

      {/* 보장지수 */}
      <div className="mt-5 flex items-center gap-4">
        <div className="relative w-16 h-16">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#F2F4F6" strokeWidth="6" />
            <circle cx="32" cy="32" r="28" fill="none" stroke="#F04452" strokeWidth="6"
              strokeDasharray={`${28 * 2 * Math.PI * 0.46} ${28 * 2 * Math.PI}`}
              strokeLinecap="round" transform="rotate(-90 32 32)" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[16px] font-bold text-toss-red">46%</span>
        </div>
        <div>
          <p className="text-[14px] font-bold text-toss-black">보장지수 46%</p>
          <p className="text-[12px] text-toss-gray-600">부족 항목 7개 발견</p>
        </div>
      </div>

      {/* 숨은 보험금 */}
      <div className="mt-4 p-3 rounded-xl bg-toss-blue-light">
        <p className="text-[12px] text-toss-blue font-bold">숨은 보험금 발견</p>
        <p className="text-[20px] font-bold text-toss-blue mt-1">50만원</p>
      </div>

      {/* 보험 목록 */}
      <p className="mt-5 text-[12px] text-toss-gray-600">보유 보험 5건</p>
      <div className="mt-2 space-y-2">
        {["메리츠화재 (무)건강보험", "메리츠화재 운전자보험", "우정사업본부 실손보험", "우정사업본부 종신보험", "우정사업본부 연금보험"].map((name) => (
          <div key={name} className="flex items-center justify-between p-2.5 rounded-lg bg-toss-gray-50">
            <span className="text-[12px] text-toss-black">{name}</span>
          </div>
        ))}
      </div>

      {/* 모자이크 영역 */}
      <div className="mt-5 space-y-2">
        <p className="text-[12px] font-bold text-toss-gray-600">상세 분석</p>
        <div className="p-3 rounded-xl bg-toss-gray-50 select-none" style={{ filter: "blur(4px)" }}>
          <p className="text-[13px] text-toss-gray-700">암 보장: 1,500만원 (적정 2,800만원 대비 46% 부족)</p>
          <p className="text-[13px] text-toss-gray-700">뇌혈관: 미가입 (적정 2,000만원 필요)</p>
        </div>
        <button onClick={onRenewal} className="w-full p-3 rounded-xl bg-toss-gray-50 text-left select-none relative overflow-hidden">
          <div style={{ filter: "blur(4px)" }}>
            <p className="text-[13px] text-toss-gray-700">갱신형 보험료 10년 후 2.8배 예측...</p>
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-toss-blue">
            갱신 예측 미리보기 →
          </span>
        </button>
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        className="mt-5 w-full h-[44px] bg-toss-blue text-white text-[14px] font-bold rounded-xl active:scale-[0.98] transition-transform"
      >
        전체 분석 결과 보기
      </button>
      <p className="mt-2 text-[11px] text-toss-gray-400 text-center">전체 결과를 보려면 상담 신청이 필요합니다</p>
    </div>
  );
}

function StepRenewal({ onBack }: { onBack: () => void }) {
  const data = [
    { age: "현재\n35세", amount: "2만원", height: 15, color: "#30B050" },
    { age: "10년 후\n45세", amount: "5.6만원", height: 40, color: "#FFC34E" },
    { age: "20년 후\n55세", amount: "12만원", height: 65, color: "#FF8C00" },
    { age: "30년 후\n65세", amount: "30만원+", height: 95, color: "#F04452" },
  ];
  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-6">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-toss-gray-600 mb-4">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        돌아가기
      </button>
      <h2 className="text-[16px] font-bold text-toss-black">갱신형 보험료 예측</h2>
      <p className="mt-1 text-[12px] text-toss-gray-600">현재 갱신형 보험 기준</p>

      {/* 바 차트 */}
      <div className="mt-8 flex-1 flex items-end justify-center gap-5">
        {data.map((d, i) => (
          <div key={d.age} className="flex flex-col items-center gap-2 flex-1">
            <motion.span
              className="text-[12px] font-bold"
              style={{ color: d.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.2 }}
            >
              {d.amount}
            </motion.span>
            <motion.div
              className="w-full max-w-[48px] rounded-t-lg"
              style={{ backgroundColor: d.color }}
              initial={{ height: 0 }}
              animate={{ height: `${d.height * 2}px` }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="text-[10px] text-toss-gray-600 text-center whitespace-pre-line leading-tight">
              {d.age}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-3 rounded-xl bg-toss-red/5">
        <p className="text-[13px] text-toss-gray-700 leading-relaxed text-center">
          은퇴 후 소득은 줄어드는데
          <br />
          보험료는 <span className="font-bold text-toss-red">15배</span> 올라갑니다
        </p>
      </div>
    </div>
  );
}

function StepConsultRequest({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"request" | "reveal">("request");

  const handleClick = () => {
    setPhase("reveal");
    setTimeout(onNext, 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      {phase === "request" ? (
        <>
          <h2 className="text-[18px] font-bold text-toss-black">전체 분석 결과를 확인하세요</h2>
          <p className="mt-3 text-[13px] text-toss-gray-600 leading-relaxed">
            상담을 신청하시면
            <br />
            모든 분석 결과를 확인할 수 있습니다.
            <br />
            담당 FC가 분석 리포트를 가지고 연락드립니다.
          </p>
          <button
            onClick={handleClick}
            className="mt-8 w-full max-w-[240px] h-[44px] bg-toss-blue text-white text-[14px] font-bold rounded-xl active:scale-[0.98] transition-transform"
          >
            상담 신청하기
          </button>
        </>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-toss-green flex items-center justify-center mb-4">
            <svg width="20" height="16" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <h2 className="text-[18px] font-bold text-toss-black">상담이 신청되었습니다</h2>
          <p className="mt-2 text-[13px] text-toss-gray-600">담당 FC에게 분석 리포트가 전달되었습니다</p>
        </>
      )}
    </div>
  );
}

function StepHidden() {
  return (
    <div className="h-full flex flex-col px-5 pt-4 pb-6">
      <p className="text-[11px] font-bold text-toss-blue tracking-wider">숨은 보험금</p>
      <h2 className="mt-1 text-[18px] font-bold text-toss-black">찾은 보험금</h2>
      <p className="mt-2 text-[28px] font-bold text-toss-blue">50만원</p>

      <div className="mt-6 space-y-3">
        {[
          { type: "휴면보험금", company: "○○생명", amount: "32만원" },
          { type: "만기보험금", company: "△△화재", amount: "18만원" },
        ].map((item) => (
          <div key={item.type} className="flex items-center justify-between p-3 rounded-xl bg-toss-gray-50">
            <div>
              <p className="text-[13px] font-bold text-toss-black">{item.type}</p>
              <p className="text-[11px] text-toss-gray-600">{item.company}</p>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-bold text-toss-blue">{item.amount}</p>
              <p className="text-[10px] text-toss-gray-400">청구 안내 →</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-2">
        <button className="w-full h-[44px] rounded-xl text-[14px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: "#FEE500", color: "#191919" }}>
          카카오톡으로 청구 방법 안내받기
        </button>
      </div>
    </div>
  );
}

/* ═══ DEMO PAGE ═══ */
export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);

  const goNext = useCallback(() => {
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }, []);

  const goTo = useCallback(
    (target: number) => {
      if (target === step) return;
      setDir(target > step ? 1 : -1);
      setStep(target);
    },
    [step]
  );

  const [showRenewal, setShowRenewal] = useState(false);

  const stepComponents = [
    <StepLanding key="s0" onNext={goNext} />,
    <StepLogin key="s1" onNext={goNext} />,
    <StepConsent key="s2" onNext={goNext} />,
    <StepVerify key="s3" onNext={goNext} />,
    <StepLoading key="s4" onNext={goNext} />,
    <StepDiagnosis key="s5" onNext={() => goTo(7)} onRenewal={() => setShowRenewal(true)} />,
    <StepRenewal key="s6" onBack={() => goTo(5)} />,
    <StepConsultRequest key="s7" onNext={goNext} />,
    <StepHidden key="s8" />,
  ];

  return (
    <div className="min-h-screen bg-[#060912] flex flex-col" style={{ minHeight: "100dvh" }}>
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-[13px] text-white-40 transition-colors hover:text-white-90">
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>
          메인으로
        </Link>
        <span className="text-[11px] font-medium tracking-[0.2em] text-white-40 uppercase">Demo</span>
      </nav>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-6 pb-8">
        {/* Left — info (PC only) */}
        <div className="hidden lg:block w-[320px]">
          <p className="text-[11px] font-bold tracking-wider text-white-40">인터랙티브 데모</p>
          <h1 className="mt-2 text-[24px] font-bold text-white-90 leading-tight">고객이 경험하는 화면</h1>
          <p className="mt-2 text-[13px] text-white-40">버튼을 눌러 단계별로 체험해 보세요</p>

          <div className="mt-6 p-4 rounded-2xl border border-white-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white-10 text-[10px] font-bold text-white-90">{step + 1}</span>
              <span className="text-[12px] font-bold text-white-90">{STEPS[step].label}</span>
            </div>
            <p className="text-[14px] font-bold text-white-90">{STEPS[step].title}</p>
          </div>

          <div className="mt-4 flex items-center gap-1.5 flex-wrap">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-7 h-7 rounded-full text-[11px] font-bold transition-all ${
                  i === step ? "bg-white-90 text-[#060912]" : i < step ? "bg-white-10 text-white-90" : "bg-white-05 text-white-40"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              onClick={() => goTo(0)}
              className="mt-4 text-[12px] text-white-40 hover:text-white-90 transition-colors"
            >
              ← 처음부터 다시
            </button>
          )}
        </div>

        {/* Phone */}
        <div className="shrink-0 scale-[0.85] md:scale-100">
          <PhoneFrame>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={showRenewal ? "renewal" : step}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="h-full"
              >
                {showRenewal ? (
                  <StepRenewal onBack={() => setShowRenewal(false)} />
                ) : (
                  stepComponents[step]
                )}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>

      {/* Mobile step indicator */}
      <div className="lg:hidden flex items-center justify-center gap-1.5 pb-6">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === step ? "bg-white-90 w-5" : i < step ? "bg-white-40" : "bg-white-10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
