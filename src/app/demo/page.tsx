"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══ CONSTANTS ═══ */
const STEPS = [
  { label: "랜딩", title: "서비스 첫 화면" },
  { label: "로그인", title: "소셜 로그인" },
  { label: "동의", title: "약관 동의" },
  { label: "인증", title: "간편인증" },
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

const INSURANCE_LIST = [
  { co: "메리츠화재", name: "내Mom대로 보장보험", premium: "89,360", status: "조정", color: "#FFC34E", bg: "#FFF8E8" },
  { co: "메리츠화재", name: "The가비로운 건강보험", premium: "165,630", status: "유지", color: "#30B050", bg: "#E8F8EE" },
  { co: "우정사업본부", name: "우리가족건보보험", premium: "15,800", status: "주의", color: "#3182F6", bg: "#E8F3FF" },
  { co: "우정사업본부", name: "실손보험", premium: "23,800", status: "유지", color: "#30B050", bg: "#E8F8EE" },
  { co: "우정사업본부", name: "연금보험", premium: "10,000", status: "유지", color: "#30B050", bg: "#E8F8EE" },
];

const PRIORITIES = [
  { title: "암 보장 1,300만원 부족", detail: "30대 위암 진료비 2,800만 vs 현재 1,500만", badge: "시급", bg: "#FEF2F2", border: "#F04452", badgeBg: "#F04452" },
  { title: "실손보험 2건 중복", detail: "1건 정리 시 월 3만원 절약", badge: "절약", bg: "#FFF8E8", border: "#FFC34E", badgeBg: "#FFC34E" },
  { title: "갱신형 50세에 보험료 2.3배", detail: "비갱신형 전환 검토 필요", badge: "주의", bg: "#E8F3FF", border: "#3182F6", badgeBg: "#3182F6" },
];

const COVERAGE = [
  { name: "암 진단", pct: 54, current: "1,500만", target: "2,800만" },
  { name: "수술비", pct: 72, current: "500만", target: "700만" },
  { name: "뇌혈관", pct: 0, current: "미가입", target: "2,000만" },
  { name: "입원비", pct: 85, current: "3,000만", target: "3,500만" },
];

/* ═══ PHONE FRAME ═══ */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-[375px] h-[812px] rounded-[50px] p-[12px] bg-[#2A2A2C]"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.1), 0 20px 60px rgba(0,0,0,0.6)" }}>
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-30" />
      <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
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
        <div className="h-full pt-[54px] overflow-hidden">{children}</div>
      </div>
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
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="relative bg-white rounded-t-3xl max-h-[80%] flex flex-col">
            <div className="flex justify-center pt-3 pb-1"><div className="w-10 h-1 rounded-full bg-[#E5E8EB]" /></div>
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F2F4F6]">
              <h3 className="text-[16px] font-bold text-[#191F28]">{title}</h3>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F9FAFB]"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="#8B95A1" strokeWidth="2" strokeLinecap="round"/></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 text-[13px] text-[#4E5968] leading-relaxed">{children}</div>
            <div className="px-5 pb-8 pt-3"><button onClick={onClose} className="w-full h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">확인</button></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ═══ BLUR NUMBER ═══ */
function B({ v, r }: { v: string; r: boolean }) {
  return <span className={`transition-all duration-700 inline-block ${r ? "" : "blur-[6px] select-none"}`}>{v}</span>;
}

function Check({ on, small }: { on: boolean; small?: boolean }) {
  const s = small ? "w-[18px] h-[18px]" : "w-[22px] h-[22px]";
  return <div className={`${s} rounded-full flex items-center justify-center shrink-0 transition-colors ${on ? "bg-[#3182F6]" : "bg-[#D1D6DB]"}`}>{on && <svg width={small ? 9 : 11} height={small ? 7 : 8} viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>;
}

/* ═══ STEP 0: LANDING ═══ */
function StepLanding({ onNext }: { onNext: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      <span className="inline-block px-3 py-1 rounded-full bg-[#E8F3FF] text-[11px] font-bold text-[#3182F6]">무료 AI 보험 분석</span>
      <h1 className="mt-4 text-[24px] font-bold text-[#191F28] leading-tight">내 보험,<br />30초 만에 진단받기</h1>
      <p className="mt-3 text-[13px] text-[#6B7684] leading-relaxed">AI가 내 보험의 부족한 부분과<br />숨은 보험금을 찾아드립니다.</p>
      <button onClick={onNext} className="mt-8 w-full max-w-[260px] h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">무료 진단받기</button>
      <div className="mt-4 flex items-center gap-3">{["AI 보장 분석", "숨은 보험금", "갱신 예측"].map((t) => <span key={t} className="text-[11px] text-[#B0B8C1]">{t}</span>)}</div>
    </div>
  );
}

/* ═══ STEP 1: SOCIAL LOGIN (3-Phase) ═══ */
function StepLogin({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState(0);
  const [provider, setProvider] = useState<"kakao" | "naver">("kakao");

  const isKakao = provider === "kakao";
  const bg = isKakao ? "#FEE500" : "#03C75A";
  const txt = isKakao ? "#191919" : "#FFFFFF";
  const name = isKakao ? "카카오" : "네이버";

  const kakaoIcon = <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill={isKakao ? "#191919" : "#FFFFFF"}/></svg>;
  const providerIcon = isKakao
    ? <svg width="32" height="32" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg>
    : <span className="text-[28px] font-black text-white">N</span>;

  const selectProvider = (p: "kakao" | "naver") => { setProvider(p); setPhase(1); };

  return (
    <AnimatePresence mode="wait">
      {phase === 0 && (
        <motion.div key="p0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
          className="h-full flex flex-col items-center justify-center px-8">
          <h2 className="text-[22px] font-bold text-[#191F28] leading-tight text-center">시작하기</h2>
          <p className="mt-2 text-[14px] text-[#6B7684] text-center">카카오, 네이버 중 하나로<br />로그인해 주세요.</p>
          <div className="mt-8 w-full space-y-3">
            <button onClick={() => selectProvider("kakao")} className="w-full h-[48px] rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: "#FEE500", color: "#191919" }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg>
              카카오로 시작하기
            </button>
            <button onClick={() => selectProvider("naver")} className="w-full h-[48px] rounded-2xl text-[15px] font-bold text-white active:scale-[0.98] transition-transform flex items-center justify-center gap-2" style={{ backgroundColor: "#03C75A" }}>
              <span className="text-[18px] font-black">N</span> 네이버로 시작하기
            </button>
          </div>
        </motion.div>
      )}

      {phase === 1 && (
        <motion.div key="p1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
          className="h-full flex flex-col items-center justify-center px-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
            {providerIcon}
          </div>
          <h2 className="text-[18px] font-bold text-[#191919] mb-8">{name} 아이디로 로그인</h2>
          <div className="w-full space-y-3 mb-6">
            <div className="w-full h-[48px] rounded-xl bg-[#F5F5F5] px-4 flex items-center">
              <span className="text-[14px] text-[#999]">user@example.com</span>
            </div>
            <div className="w-full h-[48px] rounded-xl bg-[#F5F5F5] px-4 flex items-center">
              <span className="text-[14px] text-[#999]">••••••••</span>
            </div>
          </div>
          <button onClick={() => setPhase(2)} className="w-full h-[48px] rounded-xl text-[15px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: bg, color: txt }}>
            로그인
          </button>
        </motion.div>
      )}

      {phase === 2 && (
        <motion.div key="p2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
          className="h-full flex flex-col px-6 pt-10">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
              {isKakao ? kakaoIcon : <span className="text-[16px] font-black text-white">N</span>}
            </div>
            <div>
              <p className="text-[16px] font-bold text-[#191F28]">보험분석 서비스</p>
              <p className="text-[13px] text-[#999]">다음 정보 제공에 동의합니다</p>
            </div>
          </div>
          <div className="mt-8 space-y-5">
            {["닉네임", "이메일", "전화번호", "생년월일·성별"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check on={true} small />
                <span className="text-[15px] font-medium text-[#191F28]">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[12px] text-[#999] leading-relaxed text-center">
            서비스 이용을 위해 위 정보가 제공되며,
            <br />
            {name} 계정 설정에서 언제든 연결을 해제할 수 있습니다.
          </p>
          <div className="mt-auto mb-8">
            <button onClick={onNext} className="w-full h-[48px] rounded-xl text-[15px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: bg, color: txt }}>
              동의하고 계속하기
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══ STEP 2: CONSENT ═══ */
function StepConsent({ onNext }: { onNext: () => void }) {
  const [checks, setChecks] = useState([false, false, false, false]);
  const [sheet, setSheet] = useState<number | null>(null);
  const labels = ["[필수] 서비스 이용약관 동의", "[필수] 개인정보 수집·이용 동의", "[필수] 제3자 제공 동의 (보험 데이터 조회)", "[선택] 마케팅 정보 수신 동의"];
  const details = [
    "본 서비스는 AI 기반 보험 보장 분석 서비스입니다.\n\n제1조 (목적)\n본 약관은 서비스 이용에 관한 기본적인 사항을 규정함을 목적으로 합니다.\n\n제2조 (서비스 내용)\n- 보험 계약 조회 및 보장 분석\n- AI 기반 보장 부족/과잉/중복 진단\n- 갱신형 보험료 예측\n- 숨은 보험금 조회",
    "수집 항목: 이름, 연락처, 생년월일, 성별\n이용 목적: 보험 보장 분석 서비스 제공\n보유 기간: 서비스 이용 종료 후 1년\n\n동의를 거부할 권리가 있으나, 거부 시 서비스 이용이 제한됩니다.",
    "제공받는 자: 금융데이터 전문기업\n제공 항목: 이름, 생년월일, 휴대폰번호\n제공 목적: 보험 계약 조회를 위한 본인인증\n보유 기간: 인증 완료 후 즉시 파기",
    "수신 항목: 보험 분석 결과 알림, 맞춤 보장 추천\n수신 방법: 카카오톡 알림톡, 문자\n\n선택사항이며, 동의하지 않아도 서비스 이용이 가능합니다.",
  ];
  const allChecked = checks.every(Boolean);
  const requiredOk = checks[0] && checks[1] && checks[2];
  const toggleAll = () => { const n = !allChecked; setChecks([n, n, n, n]); };
  const toggle = (i: number) => setChecks((p) => p.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="h-full flex flex-col px-5 pt-4 relative">
      <p className="text-[12px] text-[#6B7684]">약관 동의</p>
      <h2 className="mt-2 text-[20px] font-bold text-[#191F28] leading-tight">서비스 이용을 위해<br />동의가 필요해요</h2>
      <div className="mt-5" />
      <button onClick={toggleAll} className={`flex items-center gap-3 p-3.5 rounded-2xl mb-3 transition-colors ${allChecked ? "bg-[#E8F3FF]" : "bg-[#F9FAFB]"}`}>
        <Check on={allChecked} /><span className={`text-[15px] font-bold ${allChecked ? "text-[#3182F6]" : "text-[#191F28]"}`}>전체 동의</span>
      </button>
      <div className="space-y-0.5">
        {labels.map((label, i) => (
          <div key={label} className="flex items-center justify-between py-2.5 px-1">
            <button onClick={() => toggle(i)} className="flex items-center gap-3 flex-1 min-w-0"><Check on={checks[i]} small /><span className={`text-[13px] transition-colors ${checks[i] ? "text-[#191F28]" : "text-[#B0B8C1]"}`}>{label}</span></button>
            <button onClick={() => setSheet(i)} className="shrink-0 ml-2 p-1 text-[#B0B8C1]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>
          </div>
        ))}
      </div>
      <div className="mt-auto pb-6">
        <button onClick={onNext} disabled={!requiredOk} className={`w-full h-[48px] rounded-2xl text-[15px] font-bold transition-all ${requiredOk ? "bg-[#3182F6] text-white active:scale-[0.98]" : "bg-[#F2F4F6] text-[#B0B8C1]"}`}>동의하고 계속하기</button>
      </div>
      <BottomSheet isOpen={sheet !== null} onClose={() => setSheet(null)} title={sheet !== null ? labels[sheet] : ""}><p className="whitespace-pre-line">{sheet !== null ? details[sheet] : ""}</p></BottomSheet>
    </div>
  );
}

/* ═══ STEP 3: VERIFY (4-Phase) ═══ */
function StepVerify({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<"select" | "requesting" | "confirm" | "complete">("select");
  const [verifyProvider, setVerifyProvider] = useState<"kakao" | "naver">("kakao");
  useEffect(() => { if (phase !== "requesting") return; const t = setTimeout(() => setPhase("confirm"), 1500); return () => clearTimeout(t); }, [phase]);
  useEffect(() => { if (phase !== "complete") return; const t = setTimeout(onNext, 1000); return () => clearTimeout(t); }, [phase, onNext]);
  const vIsKakao = verifyProvider === "kakao";
  const vBg = vIsKakao ? "#FEE500" : "#03C75A";
  const vTxt = vIsKakao ? "#191919" : "#FFFFFF";
  const vName = vIsKakao ? "카카오톡" : "네이버";

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "select" && (
          <motion.div key="sel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}
            className="h-full flex flex-col px-5 pt-4">
            <p className="text-[12px] text-[#6B7684]">본인인증</p>
            <h2 className="mt-2 text-[20px] font-bold text-[#191F28] leading-tight">보험 조회를 위해<br />본인인증이 필요해요</h2>
            <p className="mt-2 text-[13px] text-[#6B7684]">간편인증으로 빠르게 본인 확인을 진행합니다</p>
            <div className="mt-6 space-y-3">
              <button onClick={() => { setVerifyProvider("kakao"); setPhase("requesting"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB] active:scale-[0.98] transition-transform">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#FEE500" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg>
                </div>
                <div className="flex-1 text-left"><p className="text-[14px] font-bold text-[#191F28]">카카오톡 인증</p><p className="text-[12px] text-[#6B7684]">카카오톡 앱에서 확인</p></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#B0B8C1" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button onClick={() => { setVerifyProvider("naver"); setPhase("requesting"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-[#F9FAFB] active:scale-[0.98] transition-transform">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#03C75A" }}>
                  <span className="text-[18px] font-black text-white">N</span>
                </div>
                <div className="flex-1 text-left"><p className="text-[14px] font-bold text-[#191F28]">네이버 인증</p><p className="text-[12px] text-[#6B7684]">네이버 앱에서 확인</p></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#B0B8C1" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <p className="mt-6 text-[11px] text-[#B0B8C1] text-center">인증 정보는 보험 조회에만 사용되며 안전하게 처리됩니다</p>
          </motion.div>
        )}
        {phase === "requesting" && (
          <motion.div key="req" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="h-full flex flex-col items-center justify-center px-8">
            <div className="relative w-16 h-16 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: vBg }}>
                {vIsKakao ? <svg width="28" height="28" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg> : <span className="text-[24px] font-black text-white">N</span>}
              </div>
              <div className="absolute -inset-1 rounded-full border-[3px] border-transparent border-t-[#3182F6] animate-spin" />
            </div>
            <p className="text-[18px] font-bold text-[#191F28] mb-2">인증 요청을 보냈습니다</p>
            <p className="text-[14px] text-[#6B7684] text-center">{vName} 앱에서 확인해 주세요</p>
            <div className="mt-8 bg-[#F9FAFB] rounded-2xl p-4 w-full"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0"><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="#4E5968" strokeWidth="1.5"/><circle cx="12" cy="18" r="1" fill="#4E5968"/></svg></div><div><p className="text-[13px] font-semibold text-[#191F28]">{vName} 앱 알림 확인</p><p className="text-[11px] text-[#6B7684] mt-0.5">앱에서 인증 요청을 확인하고 승인해 주세요</p></div></div></div>
          </motion.div>
        )}
        {phase === "confirm" && (
          <motion.div key="cfm" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }} className="h-full flex flex-col">
            <div className="flex items-center justify-center h-12" style={{ backgroundColor: vBg }}><span className="text-[15px] font-bold" style={{ color: vTxt }}>{vName}</span></div>
            <div className="flex-1 px-6 pt-6">
              <div className="text-center mb-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: vBg }}>
                {vIsKakao ? <svg width="28" height="28" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.029 2 1 5.216 1 9.146c0 2.547 1.703 4.785 4.262 6.045l-1.084 3.95a.3.3 0 00.45.337l4.573-3.015c.263.02.526.033.799.033 4.971 0 9-3.216 9-7.146C19 5.216 14.971 2 10 2z" fill="#191919"/></svg> : <span className="text-[22px] font-black text-white">N</span>}
              </div><p className="text-[16px] font-bold text-[#191F28]">본인인증 요청</p><p className="text-[13px] text-[#6B7684] mt-1">보험분석 서비스</p></div>
              <div className="bg-[#F9FAFB] rounded-2xl p-4 space-y-3 mb-6">{[["이름","김*수"],["생년월일","1991.**.**"],["요청 서비스","보험 계약 조회"],["인증 유형","간편인증"]].map(([k,v])=><div key={k} className="flex justify-between"><span className="text-[13px] text-[#6B7684]">{k}</span><span className="text-[13px] font-medium text-[#191F28]">{v}</span></div>)}</div>
              <p className="text-[11px] text-[#B0B8C1] text-center leading-relaxed">위 정보로 본인인증을 진행합니다.<br/>인증 정보는 보험 조회 목적으로만 사용됩니다.</p>
            </div>
            <div className="px-6 pb-8 pt-3 space-y-2"><button onClick={() => setPhase("complete")} className="w-full h-[50px] rounded-xl text-[15px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: vBg, color: vTxt }}>인증하기</button><button onClick={() => setPhase("select")} className="w-full h-[44px] text-[14px] text-[#6B7684]">취소</button></div>
          </motion.div>
        )}
        {phase === "complete" && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center px-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.1 }} className="w-16 h-16 rounded-full bg-[#3182F6] flex items-center justify-center mb-4"><svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></motion.div>
            <p className="text-[18px] font-bold text-[#191F28] mb-2">본인인증 완료</p><p className="text-[14px] text-[#6B7684]">보험 데이터를 조회합니다...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══ STEP 4: LOADING ═══ */
function StepLoading({ onNext }: { onNext: () => void }) {
  const stages = [{ text: "보험 계약 조회 중", ms: 1000 },{ text: "보장 내역 분석 중", ms: 800 },{ text: "갱신형 보험료 예측 중", ms: 1000 },{ text: "숨은 보험금 확인 중", ms: 1200 },{ text: "AI 분석 리포트 생성 중", ms: 1000 }];
  const total = stages.reduce((a,s) => a + s.ms, 0);
  const [elapsed, setElapsed] = useState(0);
  const [stage, setStage] = useState(0);
  useEffect(() => { const i = setInterval(() => setElapsed((e) => Math.min(e+50, total)), 50); return () => clearInterval(i); }, [total]);
  useEffect(() => { let acc = 0; const ts = stages.map((s,i) => { acc += s.ms; return setTimeout(() => setStage(i+1), acc); }); const f = setTimeout(onNext, total+800); return () => { ts.forEach(clearTimeout); clearTimeout(f); }; }, [onNext, total]);

  return (
    <div className="h-full flex flex-col items-center justify-center px-6">
      <div className="w-12 h-12 border-[3px] border-[#3182F6] border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-[18px] font-bold text-[#191F28]">AI가 분석하고 있습니다</p>
      <p className="mt-2 text-[13px] text-[#3182F6]">{stages[Math.min(stage, stages.length-1)].text}...</p>
      <div className="mt-5 w-full max-w-[220px] h-[3px] bg-[#F2F4F6] rounded-full overflow-hidden"><div className="h-full bg-[#3182F6] rounded-full transition-all duration-100" style={{ width: `${(elapsed/total)*100}%` }} /></div>
      <div className="mt-6 space-y-3 w-full max-w-[240px]">
        {stages.map((s,i) => (
          <div key={s.text} className={`flex items-center gap-3 transition-opacity duration-300 ${i <= stage ? "opacity-100" : "opacity-30"}`}>
            {i < stage ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#30B050"/><path d="M4.5 8L7 10.5L11.5 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            : i === stage ? <div className="w-4 h-4 rounded-full border-2 border-[#3182F6] flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-[#3182F6]" /></div>
            : <div className="w-4 h-4 rounded-full border-2 border-[#D1D6DB]" />}
            <span className={`text-[12px] ${i < stage ? "text-[#191F28]" : "text-[#B0B8C1]"}`}>{s.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-[#E8F3FF] rounded-2xl px-4 py-3 w-full max-w-[280px] text-center"><p className="text-[12px] text-[#3182F6]">💡 대한민국 숨은 보험금 총 <span className="font-bold">11.2조원</span> — 내 몫을 찾아보세요</p></div>
    </div>
  );
}

/* ═══ STEP 5: DIAGNOSIS ═══ */
function StepDiagnosis({ revealed, showBanner, onConsult, onRenewal, onAnalysis }: { revealed: boolean; showBanner: boolean; onConsult: () => void; onRenewal: () => void; onAnalysis: () => void }) {
  const r = revealed;
  return (
    <div className="h-full flex flex-col overflow-y-auto px-5 pt-3 pb-20" style={{ WebkitOverflowScrolling: "touch" }}>
      {/* 배너 */}
      {showBanner && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 p-2.5 rounded-xl bg-[#E8F8EE] flex items-center gap-2">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="#30B050" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-[11px] font-bold text-[#30B050]">상담 신청 완료 — 전체 결과가 공개되었습니다</span>
        </motion.div>
      )}

      <p className="text-[11px] font-bold text-[#3182F6] tracking-wider">분석 완료</p>
      <h2 className="mt-1 text-[18px] font-bold text-[#191F28]">김민수님의 보험 진단</h2>

      {/* 보장지수 */}
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-[56px] h-[56px] shrink-0">
          <svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="23" fill="none" stroke="#F2F4F6" strokeWidth="5" /><circle cx="28" cy="28" r="23" fill="none" stroke="#F04452" strokeWidth="5" strokeDasharray={`${23*2*Math.PI*0.46} ${23*2*Math.PI}`} strokeLinecap="round" transform="rotate(-90 28 28)" /></svg>
          <span className="absolute inset-0 flex items-center justify-center text-[14px] font-bold text-[#F04452]">46%</span>
        </div>
        <div><p className="text-[14px] font-bold text-[#191F28]">보장지수 46%</p><p className="text-[11px] text-[#6B7684]">부족 7 · 우수 15 · 미가입 19</p></div>
      </div>

      {/* 판정 요약 */}
      <div className="mt-4 flex items-center gap-3">
        {[{ label: "유지", count: 2, color: "#30B050" }, { label: "조정", count: 2, color: "#FFC34E" }, { label: "주의", count: 1, color: "#3182F6" }].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-[11px] text-[#6B7684]">{s.label} {s.count}건</span>
          </div>
        ))}
      </div>

      {/* 우선순위 카드 — 제목 공개, 금액만 blur */}
      <p className="mt-5 text-[12px] font-bold text-[#6B7684]">핵심 진단</p>
      <div className="mt-2 space-y-2">
        {[
          { title: "암 보장", amount: "1,300만원", suffix: " 부족", detail: "30대 위암 진료비 vs 현재 보장", badge: "시급", bg: "#FEF2F2", border: "#F04452", badgeBg: "#F04452" },
          { title: "실손보험 2건 중복", amount: "3만원", suffix: " 절약", detail: "1건 정리 시", badge: "절약", bg: "#FFF8E8", border: "#FFC34E", badgeBg: "#FFC34E" },
          { title: "갱신형 보험료", amount: "2.3배", suffix: " 상승", detail: "50세 기준 비갱신형 전환 검토", badge: "주의", bg: "#E8F3FF", border: "#3182F6", badgeBg: "#3182F6", clickable: true },
        ].map((p) => (
          <button key={p.title} onClick={p.clickable ? onRenewal : undefined} className="w-full flex rounded-2xl overflow-hidden text-left group shadow-sm" style={{ backgroundColor: p.bg }}>
            <div className="w-1 shrink-0" style={{ backgroundColor: p.border }} />
            <div className="flex-1 p-3 flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-1.5" style={{ backgroundColor: p.badgeBg }}>{p.badge}</span>
                <p className="text-[12px] font-bold text-[#191F28]">{p.title} <B v={p.amount} r={r} />{p.suffix}</p>
                <p className="text-[11px] text-[#6B7684] mt-0.5">{p.detail}</p>
              </div>
              {p.clickable && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-1 text-[#B0B8C1] group-hover:text-[#3182F6] transition-colors"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}
            </div>
          </button>
        ))}
      </div>

      {/* 보험 목록 — 상품명+상태 공개, 보험료만 blur */}
      <p className="mt-5 text-[12px] font-bold text-[#6B7684]">보유 보험 5건</p>
      <div className="mt-2 space-y-1.5">
        {INSURANCE_LIST.map((ins) => (
          <div key={ins.name} className="flex items-center justify-between p-2.5 rounded-xl bg-[#F9FAFB]">
            <div className="min-w-0 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#F2F4F6] flex items-center justify-center shrink-0">
                <span className="text-[8px] font-bold text-[#6B7684]">{ins.co.slice(0, 2)}</span>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[#191F28] truncate">{ins.name}</p>
                <p className="text-[10px] text-[#B0B8C1]">월 {ins.premium}원</p>
              </div>
            </div>
            <span className="shrink-0 ml-2 px-2 py-0.5 rounded-lg text-[10px] font-bold" style={{ backgroundColor: ins.bg, color: ins.color }}>{ins.status}</span>
          </div>
        ))}
      </div>

      {/* 숨은 보험금 — 상담 신청 후에만 최하단 표시 */}

      {/* Detour 버튼 */}
      <div className="mt-4 space-y-2">
        <button onClick={onAnalysis} className="w-full p-3 rounded-xl bg-[#F9FAFB] text-left flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#191F28]">보장 충족률, 중복 보장, 보장 공백</p>
            <p className="text-[11px] text-[#6B7684] mt-0.5">충족률: 암 54% · 뇌혈관 0%</p>
          </div>
          <span className="text-[12px] font-bold text-[#3182F6] shrink-0 ml-2">상세 →</span>
        </button>
        <button onClick={onRenewal} className="w-full p-3 rounded-xl bg-[#F9FAFB] text-left flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#191F28]">갱신형 보험료 예측</p>
            <p className="text-[11px] text-[#6B7684] mt-0.5">연평균 9% 인상 시 30년 후 예측</p>
          </div>
          <span className="text-[12px] font-bold text-[#3182F6] shrink-0 ml-2">보기 →</span>
        </button>
      </div>

      {/* 액션 플랜 */}
      <div className="mt-4 p-3 rounded-xl bg-[#F9FAFB]">
        <p className="text-[12px] font-bold text-[#191F28]">✓ 지금 할 수 있는 것</p>
        <p className="text-[11px] text-[#6B7684] mt-1">• 실손보험 중복 정리 → 월 <B v="3만원" r={r} /> 절약</p>
        <p className="text-[12px] font-bold text-[#191F28] mt-3">💡 FC와 상의할 것</p>
        <p className="text-[11px] text-[#6B7684] mt-1">• 암 진단비 <B v="1,300만원" r={r} /> 보충</p>
        <p className="text-[11px] text-[#6B7684]">• 갱신형 → 비갱신형 전환 검토</p>
      </div>

      {/* CTA */}
      {!r && (
        <div className="mt-5">
          <button onClick={onConsult} className="w-full h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">전체 분석 결과 보기</button>
          <p className="mt-1.5 text-[11px] text-[#B0B8C1] text-center">전체 결과를 보려면 상담 신청이 필요합니다</p>
        </div>
      )}

      {/* 숨은 보험금 — 상담 신청 후 최하단 */}
      {r && (
        <div className="mt-5 p-3 rounded-xl bg-[#E8F3FF]">
          <p className="text-[11px] font-bold text-[#3182F6]">💰 숨은 보험금 발견</p>
          <p className="text-[20px] font-bold text-[#3182F6] mt-1">50만원</p>
          <p className="text-[11px] text-[#6B7684] mt-1">휴면보험금 32만원 + 만기보험금 18만원</p>
          <KakaoButton />
        </div>
      )}
    </div>
  );
}

function KakaoButton() {
  const [sent, setSent] = useState(false);
  return sent ? <div className="mt-2 flex items-center gap-2"><svg width="12" height="8" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="#30B050" strokeWidth="2" strokeLinecap="round"/></svg><span className="text-[11px] font-bold text-[#30B050]">알림톡 발송 완료</span></div>
  : <button onClick={() => setSent(true)} className="mt-2 w-full h-[36px] rounded-xl text-[12px] font-bold active:scale-[0.98] transition-transform" style={{ backgroundColor: "#FEE500", color: "#191919" }}>카카오톡으로 청구 방법 안내받기</button>;
}

/* ═══ STEP 5-DETAIL: ANALYSIS (detour) ═══ */
function StepAnalysis({ revealed, onBack, onRenewal }: { revealed: boolean; onBack: () => void; onRenewal: () => void }) {
  return (
    <div className="h-full flex flex-col overflow-y-auto px-5 pt-3 pb-5" style={{ WebkitOverflowScrolling: "touch" }}>
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6B7684] mb-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>돌아가기</button>
      <h2 className="text-[18px] font-bold text-[#191F28]">상세 보장 분석</h2>

      <div className={`mt-4 transition-all duration-500 ${revealed ? "" : "select-none"}`} style={{ filter: revealed ? "none" : "blur(4px)" }}>
        {/* 보장 충족률 */}
        <p className="text-[12px] font-bold text-[#6B7684] mb-3">보장 충족률</p>
        <div className="space-y-3">
          {COVERAGE.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between mb-1"><span className="text-[12px] text-[#191F28]">{c.name}</span><span className="text-[12px] font-bold" style={{ color: c.pct < 30 ? "#F04452" : c.pct < 70 ? "#FFC34E" : "#30B050" }}>{c.pct}%</span></div>
              <div className="h-2 w-full bg-[#F2F4F6] rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${c.pct}%`, backgroundColor: c.pct < 30 ? "#F04452" : c.pct < 70 ? "#FFC34E" : "#30B050" }} /></div>
              <p className="text-[10px] text-[#B0B8C1] mt-0.5">{c.current} / {c.target}</p>
            </div>
          ))}
        </div>

        {/* 보험료 진단 */}
        <p className="mt-5 text-[12px] font-bold text-[#6B7684]">보험료 진단</p>
        <div className="mt-2 p-3 rounded-xl bg-[#F9FAFB]"><p className="text-[13px] text-[#191F28]">월 <span className="font-bold">30.4만원</span></p><p className="text-[11px] text-[#6B7684] mt-0.5">30대 남성 평균 25만원 대비 121%</p></div>

        {/* 중복 보장 */}
        <p className="mt-5 text-[12px] font-bold text-[#6B7684]">중복 보장</p>
        <div className="mt-2 p-3 rounded-xl bg-[#FFF8E8]"><p className="text-[12px] text-[#191F28]">⚠ 실손보험 <span className="font-bold">2건 중복</span></p><p className="text-[11px] text-[#6B7684] mt-0.5">1건 정리 시 월 3만원 절약</p></div>

        {/* 보장 공백 */}
        <p className="mt-5 text-[12px] font-bold text-[#6B7684]">보장 공백 기간</p>
        <div className="mt-2 p-3 rounded-xl bg-[#FEF2F2]"><p className="text-[12px] text-[#191F28]">기대수명 <span className="font-bold">83세</span> vs 보험 만기 <span className="font-bold">60세</span></p><p className="text-[11px] text-[#F04452] mt-0.5 font-bold">23년 무보장 기간</p></div>
      </div>

    </div>
  );
}

/* ═══ STEP 6: RENEWAL ═══ */
function StepRenewal({ onBack }: { onBack: () => void }) {
  const data = [
    { age: "현재\n35세", amount: "2만원", height: 40, color: "#D1D6DB" },
    { age: "10년 후\n45세", amount: "4.7만원", height: 100, color: "#B0B8C1" },
    { age: "20년 후\n55세", amount: "11만원", height: 190, color: "#6B7684" },
    { age: "30년 후\n65세", amount: "27만원", height: 300, color: "#F04452" },
  ];
  return (
    <div className="h-full flex flex-col px-5 pt-3 pb-5 bg-white">
      <button onClick={onBack} className="flex items-center gap-1 text-[13px] text-[#6B7684] mb-3"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>돌아가기</button>
      <h2 className="text-[18px] font-bold text-[#191F28]">갱신형 보험료 예측</h2>
      <p className="mt-1 text-[12px] text-[#6B7684]">연평균 인상률 9% 기준</p>
      <div className="mt-6 flex-1 flex items-end justify-center gap-4 pb-2">
        {data.map((d, i) => (
          <div key={d.age} className="flex flex-col items-center gap-2 flex-1">
            <motion.span className="text-[11px] font-bold" style={{ color: d.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3+i*0.2 }}>{d.amount}</motion.span>
            <motion.div className="w-full max-w-[52px] rounded-t-lg" style={{ backgroundColor: d.color }} initial={{ height: 0 }} animate={{ height: d.height }} transition={{ duration: 0.8, delay: 0.2+i*0.2, ease: [0.16,1,0.3,1] }} />
            <span className="text-[10px] text-[#6B7684] text-center whitespace-pre-line leading-tight">{d.age}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 rounded-xl bg-[#FEF2F2]"><p className="text-[13px] text-[#333D4B] leading-relaxed text-center">은퇴 후 소득은 줄어드는데<br />보험료는 <span className="font-bold text-[#F04452]">13배</span> 올라갑니다</p></div>
      <p className="mt-2 text-[10px] text-[#B0B8C1] text-center">출처: 보험저널 / 금융위원회 (2025)</p>
    </div>
  );
}

/* ═══ STEP 7: CONSULT ═══ */
function StepConsult({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"ask"|"done">("ask");
  const handleClick = () => { setPhase("done"); setTimeout(onComplete, 2000); };
  return (
    <div className="h-full flex flex-col items-center justify-center px-6 text-center">
      {phase === "ask" ? (<><h2 className="text-[20px] font-bold text-[#191F28] leading-tight">전체 분석 결과를<br/>확인하세요</h2><p className="mt-4 text-[13px] text-[#6B7684] leading-relaxed">상담을 신청하시면<br/>모든 분석 결과를 확인할 수 있습니다.<br/>담당 FC가 분석 리포트를 가지고 연락드립니다.</p><button onClick={handleClick} className="mt-8 w-full max-w-[260px] h-[48px] bg-[#3182F6] text-white text-[15px] font-bold rounded-2xl active:scale-[0.98] transition-transform">상담 신청하기</button></>)
      : (<motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center"><div className="w-16 h-16 rounded-full bg-[#30B050] flex items-center justify-center mb-5"><svg width="28" height="20" viewBox="0 0 14 10" fill="none"><path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg></div><h2 className="text-[20px] font-bold text-[#191F28]">상담이 신청되었습니다</h2><p className="mt-2 text-[13px] text-[#6B7684]">분석 결과를 확인하세요</p></motion.div>)}
    </div>
  );
}

/* ═══ PAGE ═══ */
export default function DemoPage() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [detour, setDetour] = useState<"renewal"|"analysis"|null>(null);
  const [revealed, setRevealed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const goNext = useCallback(() => { setDir(1); setStep((s) => Math.min(s+1, STEPS.length-1)); }, []);
  const goTo = useCallback((t: number) => { if (t === step) return; setDir(t > step ? 1 : -1); setStep(t); }, [step]);

  const handleConsult = () => goTo(7);
  const handleConsultComplete = () => {
    setRevealed(true);
    setShowBanner(true);
    goTo(5);
    setTimeout(() => setShowBanner(false), 4000);
  };

  const getStepContent = () => {
    if (detour === "renewal") return <StepRenewal key="renewal" onBack={() => setDetour(null)} />;
    if (detour === "analysis") return <StepAnalysis key="analysis" revealed={revealed} onBack={() => setDetour(null)} onRenewal={() => setDetour("renewal")} />;
    switch (step) {
      case 0: return <StepLanding key="s0" onNext={goNext} />;
      case 1: return <StepLogin key="s1" onNext={goNext} />;
      case 2: return <StepConsent key="s2" onNext={goNext} />;
      case 3: return <StepVerify key="s3" onNext={goNext} />;
      case 4: return <StepLoading key="s4" onNext={goNext} />;
      case 5: return <StepDiagnosis key="s5" revealed={revealed} showBanner={showBanner} onConsult={handleConsult} onRenewal={() => setDetour("renewal")} onAnalysis={() => setDetour("analysis")} />;
      case 6: return <StepRenewal key="s6" onBack={() => goTo(5)} />;
      case 7: return <StepConsult key="s7" onComplete={handleConsultComplete} />;
      default: return null;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#060912] flex flex-col" style={{ height: "100dvh" }}>
      <nav className="shrink-0 flex items-center justify-between px-6 py-3 md:px-12">
        <Link href="/" className="group inline-flex items-center gap-2 text-[13px] text-white-40 transition-colors hover:text-white-90"><span className="transition-transform group-hover:-translate-x-1">←</span> 메인으로</Link>
        <span className="text-[11px] font-medium tracking-[0.2em] text-white-40 uppercase">Demo</span>
      </nav>
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-16 px-6">
        <div className="hidden lg:block w-[280px] shrink-0">
          <p className="text-[11px] font-bold tracking-wider text-white-40">인터랙티브 데모</p>
          <h1 className="mt-2 text-[22px] font-bold text-white-90 leading-tight">고객이 경험하는 화면</h1>
          <p className="mt-2 text-[13px] text-white-40">버튼을 눌러 단계별로 체험해 보세요</p>
          <div className="mt-5 p-3 rounded-2xl border border-white-10"><div className="flex items-center gap-2"><span className="inline-flex w-5 h-5 items-center justify-center rounded-full bg-white-10 text-[10px] font-bold text-white-90">{step+1}</span><span className="text-[13px] font-bold text-white-90">{STEPS[step]?.title}</span></div></div>
          <div className="mt-3 flex items-center gap-1.5 flex-wrap">
            {STEPS.map((_,i) => <button key={i} onClick={() => { setDetour(null); goTo(i); }} className={`w-7 h-7 rounded-full text-[11px] font-bold transition-all ${i === step ? "bg-white-90 text-[#060912]" : i < step ? "bg-white-10 text-white-90" : "bg-white-05 text-white-40"}`}>{i+1}</button>)}
          </div>
          {step > 0 && <button onClick={() => { setDetour(null); setRevealed(false); setShowBanner(false); goTo(0); }} className="mt-3 text-[12px] text-white-40 hover:text-white-90 transition-colors">← 처음부터 다시</button>}
        </div>
        <div className="shrink-0 scale-[0.7] sm:scale-[0.75] lg:scale-[0.62] xl:scale-[0.68] origin-center">
          <PhoneFrame>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div key={detour || step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: [0.4,0,0.2,1] }} className="h-full">
                {getStepContent()}
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>
      <div className="shrink-0 lg:hidden flex items-center justify-center gap-1.5 pb-4">
        {step > 0 && (
          <button onClick={() => { setDetour(null); setRevealed(false); setShowBanner(false); goTo(0); }}
            className="mr-2 text-[11px] text-white-40 active:text-white-90">← 처음</button>
        )}
        {STEPS.map((_,i) => <button key={i} onClick={() => { setDetour(null); goTo(i); }} className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-white-90 w-5" : i < step ? "bg-white-40" : "bg-white-10"}`} />)}
      </div>
    </div>
  );
}
