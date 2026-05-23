"use client"

import { motion } from "framer-motion"

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
    desc: "If it doesn't meet the AANANDI standard, it doesn't ship. Simple as that.",
  },
]

export default function WhyAanandiSection() {
  return (
    <section className="bg-[#2563eb] py-[100px] px-[5%]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[64px] text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.15em] text-white/90"
          >
            THE AANANDI DIFFERENCE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-[20px] font-jakarta text-[clamp(32px,5vw,52px)] font-[800] leading-[1.1] text-white"
          >
            Why Businesses Choose AANANDI?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-[600px] font-jakarta text-[18px] font-[500] text-white/80"
          >
            In a cluttered market, your product demands certainty. We provide the engineering discipline to ensure success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "#1e40af" }}
              className="group flex flex-col rounded-[24px] bg-[#1d4ed8] p-10 transition-shadow duration-300 hover:shadow-2xl hover:shadow-black/10"
            >
              <div className="mb-6 font-jakarta text-[30px] font-[800] leading-none text-white">
                {card.num}
              </div>
              <h3 className="mb-4 font-jakarta text-[22px] font-[700] leading-tight text-white">
                {card.title}
              </h3>
              <p className="font-jakarta text-[16px] font-[500] leading-relaxed text-white/80">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CEO Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="mt-16 flex flex-col gap-[40px] rounded-[32px] bg-white p-[48px] md:p-[64px] shadow-xl"
        >
          <div className="flex flex-col md:flex-row gap-[32px] items-start">
            <div className="w-[6px] self-stretch rounded-full bg-[#2563eb] hidden md:block" />
            <div className="flex-1">
              <blockquote className="font-jakarta text-[20px] md:text-[24px] font-[600] italic leading-[1.6] text-[#111827]">
                &quot;At AANANDI TECHNOSOFT, we bypass theoretical delivery models, opting instead for a strict engineering discipline. We combine advanced AI expertise with a commitment to measurable ROI, ensuring every product we ship is ready for real users, real revenue, and real market traction.&quot;
              </blockquote>
            </div>
          </div>
          <div className="flex items-center gap-[20px]">
            <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 border-2 border-[#2563eb]/20">
              <span className="font-jakarta text-[16px] font-[800] text-[#2563eb]">NR</span>
            </div>
            <div>
              <div className="font-jakarta text-[18px] font-[700] text-[#111827]">
                Nihar Ranjan Rout
              </div>
              <div className="font-jakarta text-[14px] font-[600] uppercase tracking-wider text-[#6B7280]">
                CEO & CO-FOUNDER, Aanandi TechnoSoft LLP
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
