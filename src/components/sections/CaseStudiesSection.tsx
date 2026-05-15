"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import SectionWrapper from "@/components/shared/SectionWrapper"

const MotionLink = motion(Link)

const PROJECTS = [
  {
    badge: "AI POWERED",
    gradient: "linear-gradient(135deg, #0b0d1e, rgba(21,49,255,0.15))",
    title: "AI-Powered Sales Training App for Škoda Auto",
    desc: "Creuto built an AI-powered training platform for Škoda Auto, centralizing learning across its dealership network with personalized content based on role and behavior.",
  },
  {
    badge: "IOT SMART CITY",
    gradient: "linear-gradient(135deg, #0b0d1e, rgba(0,255,136,0.1))",
    title: "IoT Smart City Platform for Binimise",
    desc: "A cloud-native, IoT-powered smart city platform with web command dashboard, citizen mobile app, field staff app, and full IoT integration.",
  },
  {
    badge: "CUSTOM ERP",
    gradient: "linear-gradient(135deg, #0b0d1e, rgba(255,136,21,0.1))",
    title: "Custom Cloud ERP for Large-Scale Industrial Operations",
    desc: "A fully custom browser-based ERP system built to unify every department, eliminate silos, and scale with the business.",
  },
  {
    badge: "PAYROLL SYSTEM",
    gradient: "linear-gradient(135deg, #0b0d1e, rgba(136,21,255,0.1))",
    title: "Enterprise HR & Payroll Platform – Nomina",
    desc: "A complete end-to-end HR and payroll platform covering employee onboarding to exit, attendance, leave, payroll, compliance, and reporting.",
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

export default function CaseStudiesSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px] text-center md:text-left">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            OUR PROJECTS
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            Our success stories.
          </h2>
          <p className="font-sans text-[16px] font-[300] text-muted">
            Every business challenge is unique, and so is the solution.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-[48px] grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-[24px]"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-surface transition-all duration-250 hover:-translate-y-[4px] hover:border-blue"
            >
              <div
                className="relative flex h-[180px] w-full items-center justify-center overflow-hidden"
                style={{ background: project.gradient }}
              >
                <div className="absolute left-[12px] top-[12px] rounded-full border border-[rgba(21,49,255,0.4)] bg-[rgba(21,49,255,0.2)] px-[10px] py-[4px] text-[10px] uppercase text-blue">
                  {project.badge}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-[20px]">
                <h3 className="mb-[12px] font-display text-[16px] font-[700] text-white">
                  {project.title}
                </h3>
                <p className="mb-[24px] flex-1 font-sans text-[13px] font-[300] leading-[1.6] text-muted">
                  {project.desc}
                </p>
                <MotionLink
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block font-sans text-[13px] font-[600] text-[#1531FF]"
                >
                  View Case Study &rarr;
                </MotionLink>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center">
          <MotionLink
            href="#"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block rounded-[10px] border border-border bg-transparent px-[32px] py-[14px] font-sans text-[15px] font-[600] text-white transition-colors hover:border-blue"
          >
            Check All Our Case Studies
          </MotionLink>
        </div>
      </div>
    </SectionWrapper>
  )
}
