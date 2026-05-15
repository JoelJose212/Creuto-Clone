"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import SectionWrapper from "@/components/shared/SectionWrapper"

import { TESTIMONIALS } from "@/constants/testimonials"

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" })
    }
  }

  return (
    <SectionWrapper className="border-y border-border bg-surface overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px] flex flex-col items-start justify-between gap-[24px] md:flex-row md:items-end">
          <div>
            <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
              TESTIMONIALS
            </span>
            <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-heading md:text-[48px]">
              What Our Clients Have to Say About Us.
            </h2>
            <p className="font-sans text-[16px] font-[300] text-muted">
              A leading product engineering company, creating adaptive software solutions to improve operations.
            </p>
          </div>
          <div className="flex gap-[12px]">
            <button
              onClick={scrollLeft}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-border bg-transparent text-heading transition-colors duration-200 hover:border-blue"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-border bg-transparent text-heading transition-colors duration-200 hover:border-blue"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-[20px] overflow-x-auto pb-[12px]"
          style={{ scrollbarWidth: "none" }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex w-[340px] shrink-0 flex-col rounded-[14px] border border-border bg-bg p-[28px] transition-all duration-250 hover:-translate-y-[4px] hover:border-blue"
            >
              <div className="mb-[16px]">
                <span
                  className="mr-[8px] font-display text-[36px] text-[#1531FF]"
                  style={{ lineHeight: 0, verticalAlign: "-14px" }}
                >
                  &quot;
                </span>
                <span className="font-sans text-[14px] font-[300] italic leading-[1.75] text-text">
                  {t.text}
                </span>
              </div>
              <div className="mb-[20px] mt-auto h-[1px] w-full bg-border" />
              <div className="flex items-center gap-[16px]">
                <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full border border-[rgba(21,49,255,0.3)] bg-[rgba(21,49,255,0.15)]">
                  <span className="font-display text-[13px] font-[700] text-blue">
                    {t.initials}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[14px] font-[600] text-heading">
                    {t.name}
                  </span>
                  <span className="font-sans text-[12px] text-muted">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
