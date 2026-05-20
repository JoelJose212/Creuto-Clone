"use client"

import { motion, Variants } from "framer-motion"
import Link from "next/link"
import Image from "next/image"



const PROJECTS = [
  {
    category: "SKODA",
    title: "AI-Powered Sales Training App for Škoda Auto",
    desc: "Centralizing learning across its dealership network with personalized AI content.",
    image: "/img/projects/skoda.png",
    link: "/case-studies/skoda-auto-sales-training-platform"
  },
  {
    category: "AI POWERED",
    title: "IoT Smart City Platform for Binimise",
    desc: "A cloud-native, IoT-powered platform with full device integration and monitoring.",
    image: "/img/projects/binimise.png",
    link: "/case-studies/binimise-smart-city-platform"
  },
  {
    category: "ERP SYSTEM",
    title: "Custom Cloud ERP for Large-Scale Operations",
    desc: "A fully custom browser-based ERP system built to unify every department.",
    image: "/img/projects/erp.png",
    link: "/case-studies/custom-erp-large-scale-industries"
  },
  {
    category: "Nomina HR",
    title: "Enterprise HR & Payroll Platform – Nomina",
    desc: "A complete end-to-end HR and payroll platform for enterprise compliance.",
    image: "/img/projects/nomina.png",
    link: "/case-studies/enterprise-payroll-management-system"
  }
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

export default function CaseStudiesSection() {
  return (
    <section className="bg-white py-[120px] px-[5%]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[80px] text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.15em] text-[#2563eb]"
          >
            OUR PROJECTS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-[20px] font-jakarta text-[clamp(32px,5vw,52px)] font-[800] leading-[1.1] text-[#111827]"
          >
            Our Success Stories.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-[600px] font-jakarta text-[18px] font-[500] text-[#4B5563]"
          >
            Every business challenge is unique, and so is the solution. We build products that deliver measurable impact.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <Link href={project.link}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[32px] bg-[#F3F4F6] mb-8 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-blue/5">
                  <Image 
                    src={project.image} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#2563eb] shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="mb-4 font-jakarta text-[26px] font-[800] leading-tight text-[#111827] group-hover:text-[#2563eb] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="font-jakarta text-[17px] font-[500] leading-relaxed text-[#4B5563]">
                    {project.desc}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 font-jakarta text-[15px] font-[700] text-[#2563eb]">
                    View Case Study
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/case-studies"
              className="rounded-full bg-[#111827] px-10 py-4.5 text-[16px] font-bold text-white shadow-lg transition-all hover:bg-[#2563eb] hover:shadow-blue/20 block"
            >
              Check All Our Case Studies
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
