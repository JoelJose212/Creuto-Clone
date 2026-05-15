"use client"

import SectionWrapper from "@/components/shared/SectionWrapper"

const INDUSTRIES = [
  "Healthcare",
  "Fitness",
  "E-commerce & Retail",
  "Social Media & Wellness",
  "Education",
  "ERP",
  "Travel & Hospitality",
  "Streaming",
  "Fintech",
  "Real Estate",
  "Logistics",
  "SaaS",
]

export default function Industries() {
  return (
    <SectionWrapper className="border-y border-border bg-surface overflow-hidden">
      <div className="mb-[48px] text-center">
        <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
          OUR EXPERTISE
        </span>
        <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
          Industries We Specialise In.
        </h2>
        <p className="mx-auto max-w-[700px] font-sans text-[16px] font-[300] text-muted">
          Explore our comprehensive suite of solutions. From software development to digital transformation, we adapt to each sector&apos;s specific needs.
        </p>
      </div>

      <div className="group flex w-full overflow-hidden">
        <div className="flex w-max animate-marqueeLeftFast group-hover:[animation-play-state:paused]">
          {/* First Set */}
          <div className="flex shrink-0 gap-[16px] pr-[16px]">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={`set1-${i}`}
                className="inline-flex cursor-pointer items-center gap-[10px] whitespace-nowrap rounded-[100px] border border-border bg-bg px-[24px] py-[14px] font-sans text-[14px] font-[500] text-text transition-colors duration-200 hover:border-blue hover:text-white"
              >
                <div className="h-[8px] w-[8px] rounded-full bg-blue" />
                {industry}
              </div>
            ))}
          </div>
          {/* Second Set */}
          <div className="flex shrink-0 gap-[16px] pr-[16px]">
            {INDUSTRIES.map((industry, i) => (
              <div
                key={`set2-${i}`}
                className="inline-flex cursor-pointer items-center gap-[10px] whitespace-nowrap rounded-[100px] border border-border bg-bg px-[24px] py-[14px] font-sans text-[14px] font-[500] text-text transition-colors duration-200 hover:border-blue hover:text-white"
              >
                <div className="h-[8px] w-[8px] rounded-full bg-blue" />
                {industry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
