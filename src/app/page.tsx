"use client";

import HorizontalScroll from "@/components/layout/HorizontalScroll";
import SectionPanel from "@/components/layout/SectionPanel";
import SectionLabel from "@/components/ui/SectionLabel";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import Image from "next/image";
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
              2027년 분급제, 시장의 디지털 전환.
              <br />
              기존 방식으로는 생존할 수 없습니다.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-8"
            >
              <DetailLink href="/why">자세히 알아보기</DetailLink>
            </motion.div>
          </div>
          <motion.div
            variants={fadeUp}
            className="flex flex-1 items-center justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Image
                src="/images/why-hero-v2.png"
                alt="균열이 퍼지는 유리 큐브"
                width={1280}
                height={960}
                className="max-w-lg"
                priority
              />
            </motion.div>
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
              경쟁사가 놓치고 있는 시장을 찾고,
              <br />
              그 시장을 공략할 팀을 새로 만듭니다.
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
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <Image
                src="/images/how-hero-v2.png"
                alt="빈틈을 선점하는 큐브"
                width={1280}
                height={960}
                className="max-w-lg"
                priority
              />
            </motion.div>
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
              단계별 로드맵, 절실한 인재,
              <br />
              고객과 설계사를 연결하는 구조.
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
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
            >
              <Image
                src="/images/what-hero-v2.png"
                alt="단계별 유리 플레이트"
                width={1280}
                height={960}
                className="max-w-lg"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </SectionPanel>
    </HorizontalScroll>
  );
}
