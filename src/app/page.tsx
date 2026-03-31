"use client";

import HorizontalScroll from "@/components/layout/HorizontalScroll";
import SectionPanel from "@/components/layout/SectionPanel";
import Navigation from "@/components/layout/Navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import { motion } from "framer-motion";
import { fadeUp, scaleReveal } from "@/lib/motion";

export default function Home() {
  return (
    <>
      <Navigation />
      <HorizontalScroll sectionCount={3}>
        {/* === WHY === */}
        <SectionPanel id="why">
          <div className="flex items-center gap-16">
            <div className="flex flex-1 flex-col gap-8">
              <SectionLabel label="WHY" subtitle="왜 지금 시작해야 하는가" />
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
                className="max-w-md text-body text-white-70"
              >
                규제와 시장이 동시에 바뀌고 있습니다.
                <br />
                기존 방식으로는 생존이 안 됩니다.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <Button variant="text" href="/why/regulation" className="text-h3">
                  규제 변화
                </Button>
                <Button variant="text" href="/why/market" className="text-h3">
                  시장 대이동
                </Button>
              </motion.div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <ImagePlaceholder imageId="why-hero" />
            </div>
          </div>
        </SectionPanel>

        {/* === HOW === */}
        <SectionPanel id="how">
          <div className="flex items-center gap-16">
            <div className="flex flex-1 flex-col gap-8">
              <SectionLabel label="HOW" subtitle="어떻게 할 것인가" />
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
                className="max-w-md text-body text-white-70"
              >
                경쟁사가 못하는 블루오션을 발굴하고,
                <br />
                AI 무기를 쓸 수 있는 새로운 팀을 만듭니다.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <Button
                  variant="text"
                  href="/how/blue-ocean"
                  className="text-h3"
                >
                  블루오션 발굴
                </Button>
                <Button variant="text" href="/how/team" className="text-h3">
                  AI 무기 + 새로운 팀
                </Button>
              </motion.div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <ImagePlaceholder imageId="how-hero" />
            </div>
          </div>
        </SectionPanel>

        {/* === WHAT === */}
        <SectionPanel id="what">
          <div className="flex items-center gap-16">
            <div className="flex flex-1 flex-col gap-8">
              <SectionLabel label="WHAT" subtitle="무엇을 할 것인가" />
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
                className="max-w-md text-body text-white-70"
              >
                검증된 로드맵, 헝그리한 인재,
                <br />
                그리고 고객과 설계사를 잇는 AI 솔루션.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <Button variant="text" href="/what/roadmap" className="text-h3">
                  서비스 로드맵
                </Button>
                <Button variant="text" href="/what/recruit" className="text-h3">
                  인재 모집
                </Button>
                <Button
                  variant="text"
                  href="/what/matching"
                  className="text-h3"
                >
                  솔루션 매칭
                </Button>
              </motion.div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <ImagePlaceholder imageId="what-hero" />
            </div>
          </div>
        </SectionPanel>
      </HorizontalScroll>
    </>
  );
}
