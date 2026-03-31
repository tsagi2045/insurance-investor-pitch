"use client";

import HorizontalScroll from "@/components/layout/HorizontalScroll";
import SectionPanel from "@/components/layout/SectionPanel";
import SectionLabel from "@/components/ui/SectionLabel";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Link from "next/link";

function DetailLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-body text-white-40 transition-colors duration-300 hover:text-white-90"
    >
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <HorizontalScroll sectionCount={3}>
      {/* === WHY === */}
      <SectionPanel id="why">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-1 flex-col gap-6">
            <SectionLabel label="WHY" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              쓰나미가
              <br />
              오고 있다
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-md text-body leading-relaxed text-white-40"
            >
              규제와 시장이 동시에 바뀌고 있습니다.
              <br />
              기존 방식으로는 생존이 안 됩니다.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8"
            >
              <DetailLink href="/why/regulation">규제 변화</DetailLink>
              <DetailLink href="/why/market">시장 대이동</DetailLink>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center lg:justify-end"
          >
            <ImagePlaceholder imageId="why-hero" className="max-w-lg" />
          </motion.div>
        </div>
      </SectionPanel>

      {/* === HOW === */}
      <SectionPanel id="how">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-1 flex-col gap-6">
            <SectionLabel label="HOW" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              빈틈을
              <br />
              선점한다
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-md text-body leading-relaxed text-white-40"
            >
              경쟁사가 못하는 블루오션을 발굴하고,
              <br />
              AI 무기를 쓸 수 있는 새로운 팀을 만듭니다.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8"
            >
              <DetailLink href="/how/blue-ocean">블루오션 발굴</DetailLink>
              <DetailLink href="/how/team">새로운 팀 구축</DetailLink>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center lg:justify-end"
          >
            <ImagePlaceholder imageId="how-hero" className="max-w-lg" />
          </motion.div>
        </div>
      </SectionPanel>

      {/* === WHAT === */}
      <SectionPanel id="what">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
          <div className="flex flex-1 flex-col gap-6">
            <SectionLabel label="WHAT" />
            <motion.h1
              variants={fadeUp}
              className="text-display text-white-90"
            >
              실행으로
              <br />
              증명한다
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="max-w-md text-body leading-relaxed text-white-40"
            >
              검증된 로드맵, 헝그리한 인재,
              <br />
              고객과 설계사를 잇는 AI 솔루션.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8"
            >
              <DetailLink href="/what/roadmap">서비스 로드맵</DetailLink>
              <DetailLink href="/what/recruit">인재 모집</DetailLink>
              <DetailLink href="/what/matching">솔루션 매칭</DetailLink>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center lg:justify-end"
          >
            <ImagePlaceholder imageId="what-hero" className="max-w-lg" />
          </motion.div>
        </div>
      </SectionPanel>
    </HorizontalScroll>
  );
}
