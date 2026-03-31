"use client";

import HorizontalScroll from "@/components/layout/HorizontalScroll";
import SectionPanel from "@/components/layout/SectionPanel";
import SectionLabel from "@/components/ui/SectionLabel";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Link from "next/link";

function NavLink({
  href,
  children,
  num,
}: {
  href: string;
  children: React.ReactNode;
  num: string;
}) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        href={href}
        className="group flex items-center gap-5 rounded-2xl border border-white-10 bg-white-05 px-6 py-5 transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/5"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-label text-amber-400 transition-colors group-hover:bg-amber-400/20">
          {num}
        </span>
        <span className="text-h3 text-white-90 transition-colors group-hover:text-white">
          {children}
        </span>
        <span className="ml-auto text-white-40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400">
          →
        </span>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  return (
    <HorizontalScroll sectionCount={3}>
      {/* === WHY === */}
      <SectionPanel id="why">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8">
            <SectionLabel label="WHY" subtitle="왜 지금 시작해야 하는가" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              쓰나미가
              <br />
              <span className="text-amber-400">오고 있다</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-body leading-relaxed text-white-70"
            >
              규제와 시장이 동시에 바뀌고 있습니다.
              <br />
              기존 방식으로는 생존이 안 됩니다.
            </motion.p>
            <div className="mt-2 flex flex-col gap-3">
              <NavLink href="/why/regulation" num="01">
                규제 변화
              </NavLink>
              <NavLink href="/why/market" num="02">
                시장 대이동
              </NavLink>
            </div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center"
          >
            <ImagePlaceholder imageId="why-hero" />
          </motion.div>
        </div>
      </SectionPanel>

      {/* === HOW === */}
      <SectionPanel id="how">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8">
            <SectionLabel label="HOW" subtitle="어떻게 할 것인가" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              빈틈을
              <br />
              <span className="text-amber-400">선점한다</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-body leading-relaxed text-white-70"
            >
              경쟁사가 못하는 블루오션을 발굴하고,
              <br />
              AI 무기를 쓸 수 있는 새로운 팀을 만듭니다.
            </motion.p>
            <div className="mt-2 flex flex-col gap-3">
              <NavLink href="/how/blue-ocean" num="01">
                블루오션 발굴
              </NavLink>
              <NavLink href="/how/team" num="02">
                AI 무기 + 새로운 팀
              </NavLink>
            </div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center"
          >
            <ImagePlaceholder imageId="how-hero" />
          </motion.div>
        </div>
      </SectionPanel>

      {/* === WHAT === */}
      <SectionPanel id="what">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8">
            <SectionLabel label="WHAT" subtitle="무엇을 할 것인가" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              실행으로
              <br />
              <span className="text-amber-400">증명한다</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-body leading-relaxed text-white-70"
            >
              검증된 로드맵, 헝그리한 인재,
              <br />
              그리고 고객과 설계사를 잇는 AI 솔루션.
            </motion.p>
            <div className="mt-2 flex flex-col gap-3">
              <NavLink href="/what/roadmap" num="01">
                서비스 로드맵
              </NavLink>
              <NavLink href="/what/recruit" num="02">
                인재 모집
              </NavLink>
              <NavLink href="/what/matching" num="03">
                솔루션 매칭
              </NavLink>
            </div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center"
          >
            <ImagePlaceholder imageId="what-hero" />
          </motion.div>
        </div>
      </SectionPanel>
    </HorizontalScroll>
  );
}
