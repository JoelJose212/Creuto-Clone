"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CS = [
  {
    title: "Consistency",
    desc: "Reliable results and uniform quality standards. We follow rigid engineering protocols to ensure uniform quality across every module and sprint.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
      </svg>
    )
  },
  {
    title: "Confidence",
    desc: "Secure, scalable, and robust software solutions. Your product is backed by enterprise-grade security and architectural stability you can depend on.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Creativity",
    desc: "Innovation that drives unique and engaging experiences. We don't just solve technical problems; we find innovative ways to improve user engagement and business ROI.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Clarity",
    desc: "Clear communication and transparent processes. Precise documentation means you are never in the dark about your project's status.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    title: "Craftsmanship",
    desc: "Code engineered for performance and longevity. Every line of code is written with intent, optimized for performance, scalability, and long-term maintainability.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
]

export default function FrameworkSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="bg-[#2563eb] py-[120px] px-[5%] text-white overflow-hidden relative">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10">
        <div className="mb-[64px] text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.2em] text-white/80"
          >
            OUR FRAMEWORK
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-[20px] font-jakarta text-[clamp(32px,5vw,48px)] font-[800] leading-[1.1] tracking-tight text-white"
          >
            C Is for CREUTO. C Is How We Build.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-[600px] font-jakarta text-[17px] font-[500] text-white/70"
          >
            We built our engineering culture around the 5 Cs that define world-class software development.
          </motion.p>
        </div>

        {/* Central Display Card */}
        <div className="relative mb-[48px] overflow-hidden rounded-[32px] border border-white/10 bg-[#1d4ed8]/80 p-[40px] md:p-[64px] backdrop-blur-md shadow-2xl shadow-black/20">
          {/* Giant Watermark 'C' */}
          <div className="absolute -right-10 -bottom-20 font-jakarta text-[260px] font-[900] leading-none text-white/5 pointer-events-none select-none">
            C
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="relative z-10 min-h-[180px] flex flex-col justify-center"
            >
              <div className="mb-6 font-jakarta text-[13px] font-[800] uppercase tracking-[0.2em] text-white/50">
                Framework {activeIdx + 1}
              </div>
              <h3 className="mb-4 font-jakarta text-[36px] md:text-[44px] font-[800] leading-none tracking-tight text-white">
                {CS[activeIdx].title}
              </h3>
              <p className="font-jakarta text-[18px] md:text-[20px] font-[500] leading-[1.6] text-white/80 max-w-[640px]">
                {CS[activeIdx].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Selector */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {CS.map((c, i) => {
            const isActive = activeIdx === i
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                className="relative flex flex-col items-center group cursor-pointer focus:outline-none"
              >
                {/* Active Indicator Ring using Shared Layout Animation */}
                <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full transition-all duration-300">
                  {isActive && (
                    <motion.div
                      layoutId="activeFrameworkRing"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Icon */}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[#2563eb]" : "text-white/60 group-hover:text-white"}`}>
                    {c.icon}
                  </span>
                </div>
                {/* Text Label */}
                <span className={`mt-3 font-jakarta text-[13px] font-[700] tracking-wide transition-all duration-300 ${isActive ? "text-white opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100 group-hover:text-white/70"}`}>
                  {c.title}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
