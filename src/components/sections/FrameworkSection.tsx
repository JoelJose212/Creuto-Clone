"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import SectionWrapper from "@/components/shared/SectionWrapper"

const CS = [
  {
    title: "Craftsmanship",
    desc: "Code engineered for performance and longevity.",
  },
  {
    title: "Consistency",
    desc: "Reliable results and uniform quality standards.",
  },
  {
    title: "Confidence",
    desc: "Secure, scalable, and robust software solutions.",
  },
  {
    title: "Creativity",
    desc: "Innovation that drives unique and engaging experiences.",
  },
  {
    title: "Clarity",
    desc: "Clear communication and transparent processes.",
  },
]

export default function FrameworkSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 })

  useEffect(() => {
    if (carouselRef.current) {
      setDragConstraints({
        right: 0,
        left: -carouselRef.current.scrollWidth + carouselRef.current.offsetWidth,
      })
    }
  }, [])

  return (
    <SectionWrapper className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl overflow-hidden">
        <div className="mb-[48px] text-center md:text-left">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            OUR FRAMEWORK
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            C Is for CREUTO. C Is How We Build.
          </h2>
          <p className="font-sans text-[16px] font-[300] text-muted">
            We built our engineering culture around the Cs that define world-class software.
          </p>
        </div>

        <motion.div ref={carouselRef} className="cursor-grab overflow-hidden active:cursor-grabbing">
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            className="flex gap-[20px]"
          >
            {CS.map((c, i) => (
              <motion.div
                key={i}
                className="w-[220px] shrink-0 rounded-[14px] border border-border bg-bg p-[24px] pt-[28px] transition-all duration-250 hover:-translate-y-[4px] hover:border-blue"
              >
                <div className="mb-[16px] font-display text-[48px] font-[800] leading-[1] text-[#1531FF] opacity-25">
                  C
                </div>
                <h3 className="mb-[8px] font-display text-[16px] font-[700] text-white">
                  {c.title}
                </h3>
                <p className="font-sans text-[13px] font-[300] leading-[1.6] text-muted">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
