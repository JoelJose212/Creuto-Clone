"use client"

import { useState } from "react"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { cn } from "@/lib/cn"

const PARTNERS = [
  "Škoda Auto",
  "Binimise",
  "Nomina HR",
  "Edverise",
  "Bloomally",
  "Indus AI",
  "QUIV",
  "Breuto",
  "Lazystay",
  "NEEDS NGO",
  "Chromaceutic",
]

export default function MarqueeSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <SectionWrapper className="border-y border-border bg-surface px-0 py-[40px]">
      <div className="flex flex-col items-center">
        <h2 className="mb-[28px] text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          TRUSTED BY INNOVATIVE COMPANIES WORLDWIDE
        </h2>

        <div 
          className="flex w-full overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={cn("flex w-max animate-marqueeLeft", isHovered && "[animation-play-state:paused]")}>
            {/* First Set */}
            <div className="flex shrink-0">
              {PARTNERS.map((partner, i) => (
                <div
                  key={`set1-${i}`}
                  className="mx-8 inline-flex items-center gap-[12px] whitespace-nowrap font-sans text-[16px] font-[700] text-muted opacity-60 transition-opacity duration-200 hover:opacity-100"
                >
                  <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-blue" />
                  {partner}
                </div>
              ))}
            </div>
            {/* Second Set */}
            <div className="flex shrink-0">
              {PARTNERS.map((partner, i) => (
                <div
                  key={`set2-${i}`}
                  className="mx-8 inline-flex items-center gap-[12px] whitespace-nowrap font-sans text-[16px] font-[700] text-muted opacity-60 transition-opacity duration-200 hover:opacity-100"
                >
                  <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-blue" />
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
