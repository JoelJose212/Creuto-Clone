"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image"

const G = "cubic-bezier(0.22, 1, 0.36, 1)"

const CS = [
  {
    label: "Creativity",
    description: "Innovation that drives unique and engaging experiences.",
    src: "/img/home/1.webp"
  },
  {
    label: "Clarity",
    description: "Clear communication and transparent processes.",
    src: "/img/home/2.webp"
  },
  {
    label: "Craftsmanship",
    description: "Code engineered for performance and longevity.",
    src: "/img/home/Craftmanship.webp"
  },
  {
    label: "Consistency",
    description: "Reliable results and uniform quality standards.",
    src: "/img/home/3.webp"
  },
  {
    label: "Confidence",
    description: "Secure, scalable, and robust software solutions.",
    src: "/img/home/4.webp"
  }
]

export default function FrameworkSection() {
  const [t, setT] = useState(20)
  const [i, n] = useState(1002) // Starting active index (Craftsmanship)
  const [isDragging, setIsDragging] = useState(false)

  const o = useRef<HTMLDivElement>(null)
  const d = useRef<any>(null)
  const c = useRef<any>(null)
  const m = useRef({
    active: false,
    startX: 0,
    offset: 0,
    startIdx: 0,
    moved: false
  })

  // Responsive slide widths: 15rem for mobile (<640px), 20rem for desktop (>=640px)
  useEffect(() => {
    const updateT = () => {
      setT(window.innerWidth < 640 ? 15 : 20)
    }
    updateT()
    window.addEventListener("resize", updateT)
    return () => window.removeEventListener("resize", updateT)
  }, [])

  const p = useCallback(() => {
    if (d.current) {
      clearInterval(d.current)
      d.current = null
    }
    if (c.current) {
      clearTimeout(c.current)
      c.current = null
    }
  }, [])

  const u = useCallback(() => {
    p()
    d.current = setInterval(() => {
      n(e => e + 1)
    }, 4000)
  }, [p])

  useEffect(() => {
    u()
    return p
  }, [u, p])

  const x = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    p()
    m.current = {
      active: true,
      startX: e.clientX,
      offset: 0,
      startIdx: i,
      moved: false
    }
    setIsDragging(true)
    if (o.current) {
      o.current.style.transition = "none"
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [i, p])

  const g = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!m.current.active) return
    const diffX = e.clientX - m.current.startX
    if (Math.abs(diffX) > 4) {
      m.current.moved = true
    }
    m.current.offset = diffX
    if (o.current) {
      const baseOffsetRem = m.current.startIdx * t + t / 2
      o.current.style.transform = `translateX(calc(-${baseOffsetRem}rem + ${diffX}px))`
    }
  }, [t])

  const f = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!m.current.active) return
    m.current.active = false
    setIsDragging(false)
    const offset = m.current.offset
    const remValue = t * parseFloat(getComputedStyle(document.documentElement).fontSize)
    
    let targetIdx = m.current.startIdx
    if (Math.abs(offset) > 0.2 * remValue) {
      const delta = Math.max(1, Math.round(Math.abs(offset) / remValue))
      targetIdx += offset > 0 ? -delta : delta
    }

    // Reset inline overrides immediately so React can render the transition seamlessly
    if (o.current) {
      o.current.style.transition = ""
      o.current.style.transform = ""
    }

    n(targetIdx)
    e.currentTarget.releasePointerCapture(e.pointerId)

    c.current = setTimeout(() => u(), 3000)
  }, [t, u])

  const y = useCallback((e: number) => {
    if (m.current.moved) return
    n(e)
  }, [])

  const b = i - 15
  const v = i + 15
  const w = []

  for (let e = b; e <= v; e++) {
    const slideIndex = (e % CS.length + CS.length) % CS.length
    const oSlide = CS[slideIndex]
    const a = e === i
    const dPos = e * t

    w.push(
      <div
        key={e}
        style={{
          left: `${dPos}rem`,
          width: `${t}rem`
        }}
        className="absolute top-0 h-full flex flex-col items-center select-none"
      >
        {/* Top Section with Icon and Title - Animated via pure GPU Tailwind classes */}
        <div
          className={`flex flex-col items-center w-full transition-transform duration-700 ease-out-quart ${
            a ? "translate-y-0" : "translate-y-[5.5rem] md:translate-y-[7.5rem]"
          }`}
        >
          {/* Icon Container */}
          <div
            onClick={() => y(e)}
            className={`rounded-[1.25rem] flex justify-center items-center backdrop-blur-[10px] cursor-pointer transition-all duration-700 ease-out-quart ${
              a
                ? "w-[5rem] md:w-[6.5rem] h-[5rem] md:h-[6.5rem] bg-white/20 hover:bg-white/25 mb-4 md:mb-6"
                : "w-[3.75rem] md:w-[5rem] h-[3.75rem] md:h-[5rem] bg-white/10 hover:bg-white/15 mb-4 md:mb-6"
            }`}
          >
            {/* Image Wrapper */}
            <div
              className={`relative transition-all duration-500 ease-out-quart ${
                a
                  ? "w-[2rem] sm:w-[2.5rem] md:w-[3rem] h-[2rem] sm:h-[2.5rem] md:h-[3rem]"
                  : "w-[1.5rem] sm:w-[2rem] md:w-[2.5rem] h-[1.5rem] sm:h-[2rem] md:h-[2.5rem]"
              }`}
            >
              <Image
                src={oSlide.src}
                alt={oSlide.label}
                fill
                sizes="(max-width: 768px) 50px, 100px"
                className="object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Title Label */}
          <h3
            className={`font-jakarta font-[600] text-center transition-all duration-700 ease-out-quart ${
              a
                ? "text-[1.25rem] md:text-[1.75rem] opacity-100"
                : "text-[1rem] md:text-[1.25rem] opacity-70"
            }`}
          >
            {oSlide.label}
          </h3>
        </div>

        {/* Middle Section with Description & Arrow Dropdown - Animated via pure GPU Tailwind classes */}
        <div
          className={`absolute top-[8.5rem] md:top-[11.25rem] flex flex-col items-center w-full px-4 transition-all duration-700 ease-out-quart ${
            a 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 -translate-y-[0.9375rem] pointer-events-none"
          }`}
        >
          <p className="text-center text-white font-[500] leading-[1.6] tracking-[-0.015em] text-[0.85rem] md:text-[1rem] mb-1 max-w-[90%] md:max-w-full">
            {oSlide.description}
          </p>
          
          {/* Custom SVG MUI ArrowDropDown replica */}
          <svg
            className="w-[2.5rem] md:w-[3.125rem] h-[2.5rem] md:h-[3.125rem] text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 10l5 5 5-5H7z" />
          </svg>
        </div>

        {/* Bottom Ticks Dial Indicator (Scale Ruler Structure) */}
        <div className="absolute bottom-0 w-full h-[4.5rem] md:h-[6.25rem] flex">
          {[...Array(11)].map((_, tickIdx) => {
            const isCenterTick = tickIdx === 5
            return (
              <div
                key={tickIdx}
                className="flex-1 flex justify-center items-end h-full"
              >
                <div
                  className={`rounded-[0.125rem] transition-all duration-700 ease-out-quart ${
                    isCenterTick
                      ? "w-[0.1875rem] h-[4.5rem] md:h-[6.25rem] bg-white"
                      : "w-[0.125rem] h-[4.5rem] md:h-[6.25rem] bg-white/20"
                  }`}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-[36rem] md:min-h-[50.375rem] bg-[#1746EA] text-white py-12 sm:py-16 md:py-20 flex flex-col items-center relative overflow-hidden w-full">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none" />

      <div className="w-full mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center mb-8 md:mb-16 flex flex-col items-center gap-2 px-4 sm:px-8 md:px-20 max-w-[75rem] mx-auto select-none">
          <span className="px-4 py-1.5 rounded-full border border-white/20 font-bold text-xs tracking-[0.2em] text-[#1746EA] bg-white uppercase">
            OUR FRAMEWORK
          </span>
          <h2 className="font-jakarta text-[clamp(28px,4vw,40px)] md:text-[2.75rem] font-[800] tracking-tight leading-[1.2] text-center text-white mt-4 mb-2 md:mb-4">
            C Is for CREUTO. C Is How We Build.
          </h2>
          <p className="text-center opacity-80 max-w-[50rem] text-white font-[500] text-[1rem] md:text-[1.25rem]">
            We built our engineering culture around the Cs that define world-class software.
          </p>
        </div>

        {/* Carousel Wheel */}
        <div
          onPointerDown={x}
          onPointerMove={g}
          onPointerUp={f}
          onPointerCancel={f}
          className="w-full relative mt-4 md:mt-8 h-[20rem] md:h-[25rem] touch-y select-none overflow-hidden"
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {/* Side blur gradients */}
          <div className="absolute top-0 left-0 w-[4rem] md:w-[15.625rem] h-full z-10 pointer-events-none bg-gradient-to-r from-[#1746EA] to-transparent" />
          <div className="absolute top-0 right-0 w-[4rem] md:w-[15.625rem] h-full z-10 pointer-events-none bg-gradient-to-l from-[#1746EA] to-transparent" />

          {/* Sliding Track container */}
          <div
            ref={o}
            style={{
              left: "50%",
              transform: `translateX(-${i * t + t / 2}rem)`,
              transition: isDragging ? "none" : `transform 0.7s ${G}`
            }}
            className="absolute top-0 h-full will-change-transform"
          >
            {w}
          </div>
        </div>
      </div>
    </section>
  )
}
