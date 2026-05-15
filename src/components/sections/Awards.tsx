"use client"

import { Award } from "lucide-react"
import SectionWrapper from "@/components/shared/SectionWrapper"

const BADGES = [
  "App Developers",
  "Top Software",
  "React Native",
  "Custom Dev",
  "B2B Leaders",
  "Top Mobile App",
  "Design Agency",
  "Tech Innovators",
  "Web Excellence",
]

export default function Awards() {
  return (
    <SectionWrapper className="bg-bg">
      <div className="mx-auto max-w-5xl">
        <div className="mb-[48px] text-center">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            OUR AWARDS & RECOGNITIONS
          </span>
          <h2 className="font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            Our Awards & Recognitions.
          </h2>
        </div>

        {/* Featured Awards */}
        <div className="mb-[48px] flex flex-col gap-[20px] md:flex-row">
          <div className="flex flex-1 flex-col rounded-[14px] border border-border bg-surface p-[32px]">
            <Award size={32} color="#1531FF" className="mb-[24px]" />
            <h3 className="mb-[12px] font-display text-[16px] font-[700] text-white">
              HONORED FOR EMERGING AI & TECHNOLOGY INNOVATION
            </h3>
            <p className="font-sans text-[13px] text-muted">
              Recognized for groundbreaking contributions in AI product engineering and innovation.
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-[14px] border border-border bg-surface p-[32px]">
            <Award size={32} color="#1531FF" className="mb-[24px]" />
            <h3 className="mb-[12px] font-display text-[16px] font-[700] text-white">
              HONORED FOR CONTRIBUTION TO TECHNOLOGY AND INNOVATION.
            </h3>
            <p className="font-sans text-[13px] text-muted">
              Awarded for excellence in delivering high-impact custom software solutions.
            </p>
          </div>
        </div>

        {/* Scrolling Badges */}
        <div className="group flex w-full overflow-hidden">
          <div className="flex w-max animate-marqueeLeft group-hover:[animation-play-state:paused]" style={{ animationDuration: "25s" }}>
            {/* First Set */}
            <div className="flex shrink-0 gap-[16px] pr-[16px]">
              {BADGES.map((badge, i) => (
                <div
                  key={`set1-${i}`}
                  className="flex h-[48px] w-[120px] shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface px-[12px] text-center"
                >
                  <span className="font-sans text-[10px] font-semibold uppercase text-muted">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
            {/* Second Set */}
            <div className="flex shrink-0 gap-[16px] pr-[16px]">
              {BADGES.map((badge, i) => (
                <div
                  key={`set2-${i}`}
                  className="flex h-[48px] w-[120px] shrink-0 items-center justify-center rounded-[8px] border border-border bg-surface px-[12px] text-center"
                >
                  <span className="font-sans text-[10px] font-semibold uppercase text-muted">
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
