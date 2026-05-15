"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { useCountUp } from "@/hooks/useCountUp"
import SectionWrapper from "@/components/shared/SectionWrapper"

const STATS_DATA = [
  { end: 124, suffix: "+", label: "Projects Delivered" },
  { end: 34, suffix: "+", label: "Technology Experts" },
  { end: 99, suffix: "%", label: "Client Satisfaction" },
  { end: 10, suffix: "+", label: "Years of Excellence" },
  { end: 20, suffix: "+", label: "Global Clients" },
]

function StatCell({ stat, startWhen }: { stat: typeof STATS_DATA[0]; startWhen: boolean }) {
  const count = useCountUp(stat.end, 2000, startWhen)

  return (
    <div className="flex flex-col items-center justify-center border-b border-border bg-bg px-[24px] py-[40px] text-center transition-colors duration-250 hover:bg-surface-2 md:border-b-0 md:border-r last:border-r-0 last:border-b-0">
      <div className="mb-[8px] font-display text-[48px] font-[800] tracking-[-2px] text-[#1531FF]">
        {count}
        {stat.suffix}
      </div>
      <div className="font-sans text-[11px] font-[600] uppercase tracking-[0.1em] text-muted">
        {stat.label}
      </div>
    </div>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <SectionWrapper className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl">
        <div
          ref={ref}
          className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-border sm:grid-cols-2 lg:grid-cols-5"
        >
          {STATS_DATA.map((stat, i) => (
            <StatCell key={i} stat={stat} startWhen={isInView} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
