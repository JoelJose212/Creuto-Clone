"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"

const MotionLink = motion(Link)

const words = "AI-Driven Product Development, Designed To Accelerate Your Business.".split(" ")

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-[5%]">
      {/* Radial Gradient Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(21,49,255,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl pt-20">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-[8px] rounded-[100px] border border-[rgba(21,49,255,0.35)] px-[14px] py-[6px]"
        >
          <div className="h-[6px] w-[6px] animate-pulse-dot rounded-full bg-[#1531FF]" />
          <span className="text-[11px] font-[600] uppercase tracking-[0.12em] text-[#1531FF]">
            EITHER WE BUILD IT EXCEPTIONAL, OR WE DON&apos;T!
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-display text-[clamp(42px,6vw,80px)] font-[800] leading-[1.05] tracking-[-2px] text-white"
        >
          {words.map((word, index) => {
            const isHighlight = ["Designed", "To", "Accelerate"].includes(word)
            return (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`inline-block mr-[0.25em] ${isHighlight ? "text-[#1531FF]" : ""}`}
              >
                {word}
              </motion.span>
            )
          })}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-8 mb-[40px] max-w-[580px] font-sans text-[17px] font-[300] leading-[1.75] text-muted"
        >
          We design and build high-performance, future-ready digital systems backed by enterprise-grade engineering and uncompromising execution.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="flex items-center gap-[14px]"
        >
          <MotionLink
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[10px] bg-blue px-[28px] py-[14px] font-sans text-[15px] font-medium text-white transition-colors duration-200 hover:bg-blue-hover"
          >
            Free Discovery Call
          </MotionLink>
          <MotionLink
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-[10px] border border-border bg-transparent px-[28px] py-[14px] font-sans text-[15px] font-medium text-white transition-colors duration-200 hover:border-blue"
          >
            Explore Our Work &rarr;
          </MotionLink>
        </motion.div>
      </div>

      {/* Bottom Thin Line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--color-border), transparent)",
        }}
      />
    </section>
  )
}
