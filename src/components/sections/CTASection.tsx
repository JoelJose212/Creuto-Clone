"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

const MotionLink = motion(Link)

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section className="relative overflow-hidden px-[5%] py-[120px] text-center border-y border-border">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(21,49,255,0.12) 0%, transparent 70%)",
        }}
      />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
          LET&apos;S CONNECT
        </span>
        
        <h2 className="mb-[24px] font-display text-[clamp(36px,5vw,64px)] font-[800] leading-[1.1] text-heading">
          Connect with Creuto!
        </h2>
        
        <p className="mx-auto mb-[40px] max-w-[500px] font-sans text-[16px] font-[300] leading-[1.75] text-muted">
          Ready to take the first step towards unlocking opportunities, realizing goals, and embracing innovation? We&apos;re here and eager to connect.
        </p>

        <div className="flex justify-center gap-[14px]">
          <MotionLink
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[10px] bg-[#1531FF] px-[28px] py-[14px] font-sans text-[15px] font-[600] text-[#ffffff] transition-colors duration-200 hover:bg-[#3d57ff]"
          >
            Schedule a Call
          </MotionLink>
          <MotionLink
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[10px] border border-border bg-transparent px-[28px] py-[14px] font-sans text-[15px] font-[600] text-heading transition-colors duration-200 hover:border-[#1531FF]"
          >
            Contact Us
          </MotionLink>
        </div>
      </motion.div>
    </section>
  )
}
