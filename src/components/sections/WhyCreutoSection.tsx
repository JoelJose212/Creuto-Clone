"use client"

import { motion, Variants } from "framer-motion"
import SectionWrapper from "@/components/shared/SectionWrapper"

const CARDS = [
  {
    num: "/01",
    title: "Go-to-Market Thinking",
    desc: "We design and build products ready for users, revenue, and market traction — not just code delivery.",
  },
  {
    num: "/02",
    title: "Tier-1 Engineering Talent",
    desc: "Your solution is architected and built exclusively by senior practitioners — no time wasted on on-the-job training.",
  },
  {
    num: "/03",
    title: "On-Time Delivery Discipline",
    desc: "Predictable execution, structured sprints, and zero excuses. We deliver what we promise, when we promise it.",
  },
  {
    num: "/04",
    title: "Enterprise-Grade Architecture",
    desc: "Stability, security, scalability — the same standards used by high-growth and enterprise teams.",
  },
  {
    num: "/05",
    title: "Practical, ROI-Driven AI Integration",
    desc: "AI is used purposefully — where it actually improves performance, efficiency, or customer experience.",
  },
  {
    num: "/06",
    title: "Total Transparency",
    desc: "Clear communication, weekly updates, trackable work — you always know what's happening.",
  },
  {
    num: "/07",
    title: "Ownership Mindset",
    desc: "We build with the seriousness of co-founders, not vendors. Your product becomes our responsibility.",
  },
  {
    num: "/08",
    title: "Zero-Compromise Quality",
    desc: "If it doesn't meet the CREUTO standard, it doesn't ship. Simple as that.",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function WhyCreutoSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px]">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            THE CREUTO DIFFERENCE
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-heading md:text-[48px]">
            Why Businesses Choose CREUTO?
          </h2>
          <p className="font-sans text-[16px] font-[300] text-muted">
            In a cluttered market, your product demands certainty.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-[48px] grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] overflow-hidden rounded-[16px] border border-border"
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="border-b border-r border-border bg-surface px-[32px] py-[36px] transition-colors duration-250 hover:bg-surface-2"
            >
              <div className="mb-[20px] font-display text-[12px] font-[700] tracking-[0.08em] text-blue">
                {card.num}
              </div>
              <h3 className="mb-[12px] font-display text-[17px] font-[700] text-heading">
                {card.title}
              </h3>
              <p className="font-sans text-[14px] font-[300] leading-[1.6] text-muted">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-[32px] rounded-[16px] border border-border bg-surface p-[40px]"
        >
          <div className="flex gap-[24px]">
            <div className="w-[4px] self-stretch rounded-[4px] bg-blue" />
            <blockquote className="font-sans text-[18px] font-[300] italic leading-[1.75] text-text">
              &quot;At CREUTO, we bypass theoretical delivery models, opting instead for a strict engineering discipline. We combine advanced AI expertise with a commitment to measurable ROI, ensuring every product we ship is ready for real users, real revenue, and real market traction.&quot;
            </blockquote>
          </div>
          <div className="flex items-center gap-[16px] ml-[28px]">
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border-[2px] border-[#1531FF] bg-[rgba(21,49,255,0.15)]">
              <span className="font-display text-[14px] font-[700] text-blue">NR</span>
            </div>
            <div>
              <div className="font-sans text-[14px] font-[600] text-heading">
                Nihar Ranjan Rout
              </div>
              <div className="font-sans text-[12px] text-muted">
                CEO & CO-FOUNDER, Creuto
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
