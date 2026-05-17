"use client"

import { motion } from "framer-motion"

const STATS = [
  {
    value: "124+",
    label: "Projects Delivered",
    desc: "Innovative, robust software shipped worldwide."
  },
  {
    value: "34+",
    label: "Technology Experts",
    desc: "Engineers specialized in complex modern systems."
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    desc: "Outstanding feedback across long-term partners."
  },
  {
    value: "10+",
    label: "Years of Excellence",
    desc: "Delivering industry-grade software architecture."
  },
  {
    value: "20+",
    label: "Global Clients",
    desc: "Trusted by major businesses in multiple countries."
  }
]

export default function StatsSection() {
  return (
    <section className="bg-white py-[120px] px-[5%] border-t border-[#F3F4F6]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[80px] text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.15em] text-[#2563eb]"
          >
            OUR IMPACT
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-[20px] font-jakarta text-[clamp(32px,5vw,52px)] font-[800] leading-[1.1] text-[#111827]"
          >
            Driving Measurable Success.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              <div className="mb-4 font-jakarta text-[64px] font-[800] leading-none tracking-tight text-[#2563eb]">
                {stat.value}
              </div>
              <div className="mb-2 font-jakarta text-[20px] font-[700] text-[#111827]">
                {stat.label}
              </div>
              <p className="font-jakarta text-[16px] font-[500] text-[#6B7280]">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
