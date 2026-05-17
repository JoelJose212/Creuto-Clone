"use client"

import { motion, Variants, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"



const headline = "AI-Driven Product Development, Designed To Accelerate Your Business."
const words = headline.split(" ")

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.3 },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] } },
}

export default function HeroSection() {
  // Motion values for interactive 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Maps mouse position to rotation degrees
  const rotateX = useTransform(y, [-400, 400], [6, -6])
  const rotateY = useTransform(x, [-400, 400], [-6, 6])
  const translateZ = 50

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden pt-[140px] pb-[40px] px-[5%] text-center cursor-default select-none"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_-20%,#f0f4ff_0%,transparent_50%)] opacity-40" />

      <div className="relative z-10 flex w-full max-w-[1000px] flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-[10px] rounded-full border border-border bg-white/40 px-[16px] py-[8px] backdrop-blur-[4px]"
        >
          <div className="h-[6px] w-[6px] animate-pulse-dot rounded-full bg-blue shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
          <span className="text-[10.5px] font-[700] uppercase tracking-[0.15em] text-blue">
            EITHER WE BUILD IT EXCEPTIONAL, OR WE DON&apos;T!
          </span>
        </motion.div>

        {/* H1 Heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8 font-jakarta text-[clamp(44px,7.5vw,84px)] font-[800] leading-[1.05] tracking-[-0.035em] text-heading"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-[0.22em] last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="mb-12 max-w-[780px] font-jakarta text-[17px] font-[500] leading-[1.7] text-muted md:text-[19px]"
        >
          We design and build high-performance, future-ready digital systems backed by enterprise-grade engineering and uncompromising execution.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="#"
              className="rounded-full bg-blue px-10 py-4.5 text-[15.5px] font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all hover:bg-blue-hover hover:shadow-[0_12px_24px_rgba(37,99,235,0.35)] block"
            >
              Free Discovery Call
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group"
          >
            <Link
              href="#"
              className="rounded-full border border-border bg-white px-10 py-4.5 text-[15.5px] font-bold text-heading transition-all hover:border-blue hover:text-blue block"
            >
              Explore Our Work <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Graphic - Interactive 3D Glass Planes */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000
        }}
        className="relative mt-16 w-full max-w-[1280px] transition-all duration-200 ease-out"
      >
        <div 
          className="relative aspect-[21/9] w-full"
          style={{ transform: `translateZ(${translateZ}px)` }}
        >
           <Image 
             src="/img/hero-graphic.png" 
             alt="Creuto Graphic" 
             fill 
             className="object-contain object-bottom scale-110"
             priority
           />
        </div>
        {/* Smooth fade to white at bottom to blend with next section */}
        <div className="absolute inset-x-0 bottom-[-2px] h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
      </motion.div>
    </section>
  )
}
