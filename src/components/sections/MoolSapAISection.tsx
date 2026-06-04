"use client"

import { motion } from "framer-motion"
import { BrainCircuit } from "lucide-react"
import Link from "next/link"
import SectionWrapper from "@/components/shared/SectionWrapper"

export default function MoolSapAISection() {
  return (
    <SectionWrapper className="border-y border-border bg-surface px-[5%] py-[80px]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-[64px] md:flex-row">
        {/* Left Side */}
        <div className="flex flex-1 flex-col items-start text-left">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            INTRODUCING MOOLSAP AI
          </span>
          <h2 className="mb-[24px] font-display text-[40px] font-[800] leading-[1.1] text-heading md:text-[48px]">
            When Tech meets AI
          </h2>
          <p className="mb-[40px] max-w-[500px] font-sans text-[16px] font-[300] leading-[1.8] text-muted">
            MoolSap.AI builds custom AI products, automation workflows, and intelligent systems for businesses ready to move beyond manual. From early-stage startups to scaling enterprises — we turn AI potential into measurable business results.
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Link
              href="#"
              className="inline-block rounded-[8px] bg-blue px-[24px] py-[12px] font-sans text-[15px] font-[500] text-[#ffffff] transition-colors duration-200 hover:bg-blue-hover"
            >
              Know more about MoolSap AI &rarr;
            </Link>
          </motion.div>
        </div>

        {/* Right Side Visual */}
        <div className="flex flex-1 items-center justify-center">
          <div
            className="relative flex aspect-square w-full max-w-[400px] items-center justify-center rounded-[16px] border border-[rgba(21,49,255,0.3)]"
            style={{
              background: "linear-gradient(135deg, #ebedf5, rgba(21,49,255,0.08))",
            }}
          >
            {/* Radial Glow */}
            <div className="absolute h-[200px] w-[200px] rounded-full bg-[rgba(21,49,255,0.15)] blur-[40px]" />
            
            {/* Animated Icon */}
            <div className="relative animate-float text-[#1531FF]">
              <BrainCircuit size={80} />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
