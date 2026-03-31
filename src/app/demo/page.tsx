"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══ CONSTANTS ═══ */
const STEPS = [
  { label: "랜딩", title: "서비스 첫 화면" },
  { label: "동의+로그인", title: "약관 동의" },
  { label: "인증", title: "카카오톡 간편인증" },
  { label: "AI 분석", title: "분석 중" },
  { label: "분석 결과", title: "AI 보험 진단" },
  { label: "갱신 예측", title: "보험료 예측" },
  { label: "상담 신청", title: "상담 신청" },
];

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
};

/* ═══ PHONE FRAME ═══ */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[375px] h-[812px] rounded-[50px] p-[12px] shadow-[0_4px_60px_rgba(0,0,0,0.5)] bg-[#2A2A2C] ring-1 ring-white/[0.08]">
      {/* Dynamic Island */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-30" />
      {/* Screen */}
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-[54px] z-20 bg-white">
          <div className="flex items-end justify-between px-8 pb-1.5 h-full">
            <span className="text-[14px] font-semibold text-[#191F28]">9:41</span>
            <div className="flex items-center gap-[5px]">
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect y="3" width="3" height="9" rx="1" fill="#191F28"/><rect x="4.5" y="1.5" width="3" height="10.5" rx="1" fill="#191F28"/><rect x="9" width="3" height="12" rx="1" fill="#191F28"/><rect x="13.5" y="1.5" width="3" height="10.5" rx="1" fill="#B0B8C1"/></svg>
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2C9.7 2 11.6 3 13 4.5L14.2 3.3C12.5 1.5 10.1.5 7.5.5S2.5 1.5.8 3.3L2 4.5C3.4 3 5.3 2 7.5 2z" fill="#191F28"/><path d="M7.5 5.5c1.2 0 2.3.5 3.1 1.3l1.2-1.2C10.8 4.5 9.2 4 7.5 4s-3.3.5-4.3 1.6l1.2 1.2c.8-.8 1.9-1.3 3.1-1.3z" fill="#191F28"/><circle cx="7.5" cy="9" r="1.5" fill="#191F28"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="2" stroke="#191F28"/><rect x="2" y="2" width="17" height="8" rx="1" fill="#191F28"/><rect x="23" y="4" width="2" height="4" rx=".5" fill="#191F28"/></svg>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="h-full pt-[54px] overflow-hidden">{children}</div>
      </div>
      {/* Home indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[134px] h-[5px] bg-white/20 rounded-full" />
    </div>
  );
}

/* ═══ BOTTOM SHEET ═══ */
function BottomSheet({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-white rounded-t-3xl max-h-[80%] flex flex-col"
          >
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[#E5E8EB]" /></div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2F4F6]">
              <h3 className="text-[16px] font-bold text-[#191F28]">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#8B95A1" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 text-[13px] text-[#4E5968] leading-relaxed">{children}</div>
            <div className="px-5 pb-8 pt-3">
              <button onClick={onClose} className="w-full h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">확인</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ═══ STEP 0: LANDING ═══ */
function StepLanding({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <span className="inline-block px-3 py-1 rounded-full bg-[#E8F3FF] text-[11px] font-bold text-[#3182F6]">무료 AI 보험 분석</span>
      <h1 className="mt-4 text-[24px] font-bold text-[#191F28] leading-tight">
        내 보험,
        <br />
        30초 만에 진단받기
      </h1>
      <p className="mt-3 text-[13px] text-[#6B7684] leading-relaxed">
        AI가 내 보험의 부족한 부분과
        <br />
        숨은 보험금을 찾아드립니다.
      </p>
      <button onClick={onNext} className="mt-8 w-full max-w-[260px] h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">
        무료 진단받기
      </button>
      <div className="mt-4 flex items-center gap-3">
        {["AI 보장 분석", "숨은 보험금", "갱신 예측"].map((t) => (
          <span key={t} className="text-[11px] text-[#B0B8C1]">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══ STEP 1: LOGIN ═══ */
function StepLogin({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <h2 className="text-[20px] font-bold text-[#191F28] mb-8">간편 로그인</h2>
      <div className="w-full space-y-3">
        <button onClick={onNext} className="w-full h-[48px] rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: "#FEE500", color: "#191919" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg>
          카카오로 시작하기
        </button>
        <button className="w-full h-[48px] rounded-2xl text-[15px] font-bold text-white active:scale-[0.98] transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: "#03C75A" }}>
          <span className="text-[18px] font-black">N</span>
          네이버로 시작하기
        </button>
      </div>
    </div>
  );
}

/* ═══ STEP 2: CONSENT ═══ */
function StepConsent({ onNext }: { onNext: () => void }) {
  const [checks, setChecks] = useState([false, false, false, false]);
  const [sheet, setSheet] = useState<number | null>(null);
  const labels = [
    "[필수] 서비스 이용약관 동의",
    "[필수] 개인정보 수집·이용 동의",
    "[필수] 제3자 제공 동의 (보험 데이터 조회)",
    "[선택] 마케팅 정보 수신 동의",
  ];
  const details = [
    "본 서비스는 AI 기반 보험 보장 분석 서비스입니다.\n\n제1조 (목적)\n본 약관은 서비스 이용에 관한 기본적인 사항을 규정함을 목적으로 합니다.\n\n제2조 (서비스 내용)\n- 보험 계약 조회 및 보장 분석\n- AI 기반 보장 부족/과잉/중복 진단\n- 갱신형 보험료 예측\n- 숨은 보험금 조회\n\n제3조 (이용자의 의무)\n이용자는 정확한 본인 정보를 제공해야 하며, 타인의 정보를 도용할 수 없습니다.",
    "수집 항목: 이름, 연락처, 생년월일, 성별\n이용 목적: 보험 보장 분석 서비스 제공, 분석 결과 안내\n보유 기간: 서비스 이용 종료 후 1년\n\n동의를 거부할 권리가 있으나, 거부 시 서비스 이용이 제한됩니다.\n\n※ 수집된 개인정보는 목적 외 용도로 이용되지 않으며, 관련 법령에 따라 안전하게 관리됩니다.",
    "제공받는 자: 금융데이터 전문기업\n제공 항목: 이름, 생년월일, 휴대폰번호\n제공 목적: 보험 계약 조회를 위한 본인인증 및 보험사 데이터 조회\n보유 기간: 인증 완료 후 즉시 파기\n\n간편인증을 통해 생명보험사·손해보험사의 계약 데이터를 안전하게 조회합니다.",
    "수신 항목: 보험 분석 결과 알림, 맞춤 보장 추천, 이벤트 안내\n수신 방법: 카카오톡 알림톡, 문자\n\n마케팅 수신 동의는 선택사항이며, 동의하지 않아도 서비스 이용이 가능합니다.\n수신 동의 후에도 언제든지 수신을 거부할 수 있습니다.",
  ];
  const allChecked = checks.every(Boolean);
  const requiredOk = checks[0] && checks[1] && checks[2];

  const toggleAll = () => {
    const next = !allChecked;
    setChecks([next, next, next, next]);
  };
  const toggle = (i: number) => setChecks((prev) => prev.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="h-full flex flex-col px-5 pt-4 relative">
      <p className="text-[12px] text-[#6B7684]">약관 동의</p>
      <h2 className="mt-2 text-[20px] font-bold text-[#191F28] leading-tight">서비스 이용을 위해<br />동의가 필요해요</h2>
      <div className="mt-5" />

      <button onClick={toggleAll} className={`flex items-center gap-3 p-3.5 rounded-2xl mb-4 transition-colors ${allChecked ? "bg-[#E8F3FF]" : "bg-[#F9FAFB]"}`}>
        <Check on={allChecked} />
        <span className={`text-[15px] font-bold ${allChecked ? "text-[#3182F6]" : "text-[#191F28]"}`}>전체 동의</span>
      </button>

      <div className="space-y-1">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center justify-between py-3 px-1">
            <button onClick={() => toggle(i)} className="flex items-center gap-3 flex-1 min-w-0">
              <Check on={checks[i]} small />
              <span className={`text-[13px] transition-colors ${checks[i] ? "text-[#191F28]" : "text-[#B0B8C1]"}`}>{label}</span>
            </button>
            <button onClick={() => setSheet(i)} className="shrink-0 ml-2 p-1 text-[#B0B8C1]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto pb-6 space-y-2.5">
        <button onClick={onNext} disabled={!requiredOk}
          className={`w-full h-[48px] rounded-2xl text-[15px] font-bold transition-all flex items-center justify-center gap-2 ${requiredOk ? "active:scale-[0.98]" : "opacity-40 pointer-events-none"}`}
          style={{ backgroundColor: "#FEE500", color: "#191919" }}>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg>
          카카오로 시작하기
        </button>
        <button disabled={!requiredOk}
          className={`w-full h-[48px] rounded-2xl text-[15px] font-bold text-white transition-all flex items-center justify-center gap-2 ${requiredOk ? "active:scale-[0.98]" : "opacity-40 pointer-events-none"}`}
          style={{ backgroundColor: "#03C75A" }}>
          <span className="text-[18px] font-black">N</span>
          네이버로 시작하기
        </button>
      </div>

      <BottomSheet isOpen={sheet !== null} onClose={() => setSheet(null)} title={sheet !== null ? labels[sheet] : ""}>
        <p className="whitespace-pre-line">{sheet !== null ? details[sheet] : ""}</p>
      </BottomSheet>
    </div>
  );
}

function Check({ on, small }: { on: boolean; small?: boolean }) {
  const s = small ? "w-[18px] h-[18px]" : "w-[22px] h-[22px]";
  return (
    <div className={`${s} rounded-full flex items-center justify-center shrink-0 transition-colors ${on ? "bg-[#3182F6]" : "bg-[#D1D6DB]"}`}>
      {on && <svg width={small ? 9 : 11} height={small ? 7 : 8} viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}

/* ═══ STEP 3: VERIFY ═══ */
function StepVerify({ onNext }: { onNext: () => void }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 2200);
    const t2 = setTimeout(onNext, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onNext]);
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <h2 className="text-[18px] font-bold text-[#191F28] mb-6">본인인증</h2>
      {!done ? (
        <>
          <div className="w-10 h-10 border-[3px] border-[#3182F6] border-t-transparent rounded-full animate-spin mb-5" />
          <p className="text-[15px] text-[#191F28] font-medium">카카오톡으로 인증 요청을 보냈습니다</p>
          <p className="mt-2 text-[13px] text-[#B0B8C1]">카카오톡 앱에서 인증을 완료해 주세요</p>
        </>
      ) : (
        <>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15 }}
            className="w-14 h-14 rounded-full bg-[#30B050] flex items-center justify-center mb-5">
            <svg width="24" height="18" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </motion.div>
          <p className="text-[15px] font-bold text-[#191F28]">인증이 완료되었습니다</p>
        </>
      )}
    </div>
  );
}

/* ═══ STEP 4: LOADING ═══ */
function StepLoading({ onNext }: { onNext: () => void }) {
  const items = ["보험 계약 조회 완료", "보장 내역 분석 완료", "갱신형 보험료 예측 완료", "숨은 보험금 확인 완료", "AI 종합 분석 생성"];
  const [done, setDone] = useState(0);
  useEffect(() => {
    const timers = items.map((_, i) => setTimeout(() => setDone(i + 1), (i + 1) * 800));
    const finish = setTimeout(onNext, items.length * 800 + 1000);
    return () => { timers.forEach(clearTimeout); clearTimeout(finish); };
  }, [onNext]);
  return (
    <div className="h-full flex flex-col items-center justify-center px-8">
      <div className="w-10 h-10 border-[3px] border-[#3182F6] border-t-transparent rounded-full animate-spin mb-8" />
      <div className="space-y-4 w-full max-w-[260px]">
        {items.map((text, i) => {
          const completed = i < done;
          const active = i === done - 1 && done <= items.length;
          return (
            <div key={text} className={`flex items-center gap-3 transition-all duration-300 ${completed || active ? "opacity-100" : "opacity-30"}`}>
              {completed ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#30B050"/><path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <div className={`w-4 h-4 rounded-full border-2 ${active ? "border-[#3182F6]" : "border-[#D1D6DB]"}`} />
              )}
              <span className={`text-[13px] ${completed ? "text-[#191F28]" : "text-[#B0B8C1]"}`}>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ STEP 5: DIAGNOSIS ═══ */
function StepDiagnosis({ revealed, onConsult, onRenewal }: { revealed: boolean; onConsult: () => void; onRenewal: () => void }) {
  return (
    <div className="h-full flex flex-col overflow-y-auto px-5 pt-3 pb-5" style={{ WebkitOverflowScrolling: "touch" }}>
      <p className="text-[11px] font-bold text-[#3182F6] tracking-wider">AI 보험 진단</p>
      <h2 className="mt-1 text-[18px] font-bold text-[#191F28]">김민수님의 보험 분석</h2>

      {/* 보장지수 */}
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-[60px] h-[60px] shrink-0">
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="25" fill="none" stroke="#F2F4F6" strokeWidth="6" />
            <circle cx="30" cy="30" r="25" fill="none" stroke="#F04452" strokeWidth="6"
              strokeDasharray={`${25 * 2 * Math.PI * 0.46} ${25 * 2 * Math.PI}`}
              strokeLinecap="round" transform="rotate(-90 30 30)" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[15px] font-bold text-[#F04452]">46%</span>
        </div>
        <div>
          <p className="text-[15px] font-bold text-[#191F28]">보장지수 46%</p>
          <p className="text-[12px] text-[#6B7684]">부족 항목 7개 · 우수 15개 · 미가입 19개</p>
        </div>
      </div>

      {/* 보험 목록 */}
      <p className="mt-5 text-[12px] font-bold text-[#6B7684]">보유 보험 5건 · 월 304,590원</p>
      <div className="mt-2 space-y-1.5">
        {["메리츠화재 (무)건강보험", "메리츠화재 운전자보험", "우정사업본부 실손보험", "우정사업본부 종신보험", "우정사업본부 연금보험"].map((n) => (
          <div key={n} className="flex items-center p-2.5 rounded-xl bg-[#F9FAFB]">
            <span className="text-[12px] text-[#333D4B]">{n}</span>
          </div>
        ))}
      </div>

      {/* 모자이크 or 공개 영역 */}
      <div className="mt-5">
        <p className="text-[12px] font-bold text-[#6B7684] mb-2">상세 분석</p>

        <div className={`p-3 rounded-xl bg-[#F9FAFB] transition-all duration-500 ${revealed ? "" : "select-none"}`}
          style={{ filter: revealed ? "none" : "blur(4px)" }}>
          <p className="text-[12px] text-[#333D4B]">암 보장: 1,500만원 (적정 2,800만원 대비 46% 부족)</p>
          <p className="text-[12px] text-[#333D4B] mt-1">뇌혈관: 미가입 (적정 2,000만원 필요)</p>
          <p className="text-[12px] text-[#333D4B] mt-1">심장: 500만원 (적정 2,000만원 대비 75% 부족)</p>
        </div>

        <button onClick={onRenewal} className="mt-2 w-full p-3 rounded-xl bg-[#F9FAFB] text-left relative overflow-hidden">
          {!revealed && <div className="absolute inset-0 bg-[#F9FAFB]" style={{ filter: "blur(4px)" }}>
            <p className="p-3 text-[12px] text-[#333D4B]">갱신형 보험료 예측: 현재 2만원 → 10년 후 5.6만원...</p>
          </div>}
          <span className={`relative z-10 text-[12px] font-bold text-[#3182F6]`}>
            갱신 예측 {revealed ? "보기" : "미리보기"} →
          </span>
        </button>
      </div>

      {/* 숨은 보험금 — revealed 시에만 표시 */}
      {revealed && (
        <div className="mt-5 animate-[fade-in_0.5s_ease-out]">
          <p className="text-[12px] font-bold text-[#3182F6]">숨은 보험금 발견</p>
          <p className="text-[24px] font-bold text-[#3182F6] mt-1">50만원</p>
          <div className="mt-3 space-y-2">
            {[{ type: "휴면보험금", company: "○○생명", amount: "32만원" }, { type: "만기보험금", company: "△△화재", amount: "18만원" }].map((item) => (
              <div key={item.type} className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB]">
                <div>
                  <p className="text-[13px] font-bold text-[#191F28]">{item.type}</p>
                  <p className="text-[11px] text-[#6B7684]">{item.company}</p>
                </div>
                <p className="text-[14px] font-bold text-[#3182F6]">{item.amount}</p>
              </div>
            ))}
          </div>
          <KakaoButton />
        </div>
      )}

      {/* CTA — revealed=false 시에만 */}
      {!revealed && (
        <div className="mt-5">
          <button onClick={onConsult} className="w-full h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">
            전체 분석 결과 보기
          </button>
          <p className="mt-2 text-[11px] text-[#B0B8C1] text-center">전체 결과를 보려면 상담 신청이 필요합니다</p>
        </div>
      )}
    </div>
  );
}

/* ═══ KAKAO BUTTON ═══ */
function KakaoButton() {
  const [sent, setSent] = useState(false);
  return sent ? (
    <div className="mt-4 flex items-center justify-center gap-2 py-3">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="#30B050" strokeWidth="2" strokeLinecap="round"/></svg>
      <span className="text-[13px] font-bold text-[#30B050]">알림톡 발송 완료</span>
    </div>
  ) : (
    <button onClick={() => setSent(true)} className="mt-4 w-full h-[44px] rounded-2xl text-[14px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: "#FEE500", color: "#191919" }}>
      카카오톡으로 청구 방법 안내받기
    </button>
  );
}

/* ═══ STEP 6: RENEWAL ═══ */
function StepRenewal({ onBack }: { onBack: () => void }) {
  const data = [
    { age: "현재\n35세", amount: "2만원", height: 50, color: "#30B050" },
    { age: "10년 후\n45세", amount: "5.6만원", height: 120, color: "#FFC34E" },
    { age: "20년 후\n55세", amount: "12만원", height: 210, color: "#FF8C00" },
    { age: "30년 후\n65세", amount: "30만원+", height: 300, color: "#F04452" },
  ];
  return (
    <div className="h-full flex flex-col px-5 pt-3 pb-5">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6B7684] mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        돌아가기
      </button>
      <h2 className="text-[18px] font-bold text-[#191F28]">갱신형 보험료 예측</h2>
      <p className="mt-1 text-[12px] text-[#6B7684]">현재 갱신형 보험 기준</p>

      <div className="mt-6 flex-1 flex items-end justify-center gap-4 pb-2">
        {data.map((d, i) => (
          <div key={d.age} className="flex flex-col items-center gap-2 flex-1">
            <motion.span className="text-[11px] font-bold" style={{ color: d.color }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.2 }}>
              {d.amount}
            </motion.span>
            <motion.div className="w-full max-w-[52px] rounded-t-lg" style={{ backgroundColor: d.color }}
              initial={{ height: 0 }} animate={{ height: d.height }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <span className="text-[10px] text-[#6B7684] text-center whitespace-pre-line leading-tight">{d.age}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 rounded-xl bg-[#FEF2F2]">
        <p className="text-[13px] text-[#333D4B] leading-relaxed text-center">
          은퇴 후 소득은 줄어드는데
          <br />
          보험료는 <span className="font-bold text-[#F04452]">15배</span> 올라갑니다
        </p>
      </div>
    </div>
  );
}

/* ═══ STEP 7: CONSULT ═══ */
function StepConsult({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"ask" | "done">("ask");

  const handleClick = () => {
    setPhase("done");
    setTimeout(onComplete, 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      {phase === "ask" ? (
        <>
          <h2 className="text-[20px] font-bold text-[#191F28] leading-tight">전체 분석 결과를<br />확인하세요</h2>
          <p className="mt-4 text-[13px] text-[#6B7684] leading-relaxed">
            상담을 신청하시면
            <br />
            모든 분석 결과를 확인할 수 있습니다.
            <br />
            담당 FC가 분석 리포트를 가지고 연락드립니다.
          </p>
          <button onClick={handleClick} className="mt-8 w-full max-w-[260px] h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">
            상담 신청하기
          </button>
        </>
      ) : (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#30B050] flex items-center justify-center mb-5">
            <svg width="28" height="20" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
          </div>
          <h2 className="text-[20px] font-bold text-[#191F28]">상담이 신청되었습니다</h2>
          <p className="mt-2 text-[13px] text-[#6B7684]">모자이크가 해제됩니다</p>
        </motion.div>
      )}
    </div>
  );
}

/* ═══ PAGE ═══ */
export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [showRenewal, setShowRenewal] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const goNext = useCallback(() => { setDir(1); setStep((s) => Math.min(s + 1, STEPS.length - 1)); }, []);
  const goTo = useCallback((t: number) => { if (t === step) return; setDir(t > step ? 1 : -1); setStep(t); }, [step]);

  const handleConsult = () => goTo(6);
  const handleConsultComplete = () => { setRevealed(true); goTo(4); };

  const getStepContent = () => {
    if (showRenewal) return <StepRenewal key="renewal" onBack={() => setShowRenewal(false)} />;
    switch (step) {
      case 0: return <StepLanding key="s0" onNext={goNext} />;
      case 1: return <StepConsent key="s1" onNext={goNext} />;
      case 2: return <StepVerify key="s2" onNext={goNext} />;
      case 3: return <StepLoading key="s3" onNext={goNext} />;
      case 4: return <StepDiagnosis key="s4" revealed={revealed} onConsult={handleConsult} onRenewal={() => setShowRenewal(true)} />;
      case 5: return <StepRenewal key="s5" onBack={() => goTo(4)} />;
      case 6: return <StepConsult key="s6" onComplete={handleConsultComplete} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#060912] flex flex-col" style={{ height: "100dvh" }}>
      {/* Nav */}
      <nav className="shrink-0 flex items-center justify-between px-6 py-3 md:px-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-[13px] text-white-40 transition-colors hover:text-white-90">
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          메인으로
        </Link>
        <span className="text-[11px] font-medium tracking-[0.2em] text-white-40 uppercase">Demo</span>
      </nav>

      {/* Main */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 px-6">
        {/* Left info (PC) */}
        <div className="hidden lg:block w-[280px] shrink-0">
          <p className="text-[11px] font-bold tracking-wider text-white-40">인터랙티브 데모</p>
          <h1 className="mt-2 text-[22px] font-bold text-white-90 leading-tight">고객이 경험하는 화면</h1>
          <p className="mt-2 text-[13px] text-white-40">버튼을 눌러 단계별로 체험해 보세요</p>

          <div className="mt-5 p-3 rounded-2xl border border-white-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white-10 text-[10px] font-bold text-white-90">{step + 1}</span>
              <span className="text-[13px] font-bold text-white-90">{STEPS[step]?.title}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {STEPS.map((_, i) => (
              <button key={i} onClick={() => { setShowRenewal(false); goTo(i); }}
                className={`w-7 h-7 rounded-full text-[11px] font-bold transition-all ${i === step ? "bg-white-90 text-[#060912]" : i < step ? "bg-white-10 text-white-90" : "bg-white-05 text-white-40"}`}>
                {i + 1}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button onClick={() => { setShowRenewal(false); setRevealed(false); goTo(0); }}
              className="mt-3 text-[12px] text-white-40 hover:text-white-90 transition-colors">
              ← 처음부터 다시
            </button>
          )}
        </div>

        {/* Phone */}
        <div className="shrink-0 scale-[0.7] sm:scale-[0.75] lg:scale-[0.62] xl:scale-[0.68] origin-center">
          <PhoneFrame>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={showRenewal ? "renewal" : step} custom={dir} variants={slide}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }} className="h-full">
                {getStepContent()}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>

      {/* Mobile step indicator */}
      <div className="shrink-0 lg:hidden flex items-center justify-center gap-1.5 pb-4">
        {STEPS.map((_, i) => (
          <button key={i} onClick={() => { setShowRenewal(false); goTo(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-white-90 w-5" : i < step ? "bg-white-40" : "bg-white-10"}`} />
        ))}
      </div>
    </div>
  );
}
