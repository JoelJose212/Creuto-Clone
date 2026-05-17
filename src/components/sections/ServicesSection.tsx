"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Code2, Smartphone, Cpu, Globe, Database, Server } from "lucide-react"
import Link from "next/link"

const SERVICES = [
  {
    icon: Cpu,
    title: "AI Engineering Services",
    desc: "Transform your data into a true competitive advantage. We design and deploy production-ready AI solutions – from machine learning models and NLP pipelines to intelligent automation and LLM-powered applications. Our AI engineering services are built for real business impact, helping you work smarter, move faster, and stay ahead.",
    link: "/services/ai-solutions"
  },
  {
    icon: Globe,
    title: "Startup Product Engineering",
    desc: "Speed to market is everything for early-stage startups. We partner with founders to turn ideas into fully functional, market-ready products – fast. From MVP scoping and rapid prototyping to full-scale product engineering, we bring the technical expertise and startup mindset you need to validate, launch, and scale.",
    link: "/services/mvp-development"
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "We build fast, scalable, and visually compelling web platforms that drive growth and deliver exceptional user experiences. From marketing websites to complex web applications, our development process combines clean architecture, modern frameworks, and SEO best practices – so your web presence performs at its peak.",
    link: "/services/web-development"
  },
  {
    icon: Server,
    title: "DevOps & Cloud Engineering",
    desc: "Accelerate your delivery cycles and scale with complete confidence. Our DevOps and cloud engineering services help teams automate infrastructure, streamline CI/CD pipelines, and reduce operational overhead. We work across AWS, GCP, and Azure to build resilient, cost-efficient cloud architectures.",
    link: "/services/devops-cloud"
  },
  {
    icon: Database,
    title: "Custom Software Development",
    desc: "Your business deserves software built around its exact needs – not the other way around. We design and develop custom software solutions that align with your workflows, goals, and growth strategy. From enterprise platforms to internal tools, we deliver high-performance applications that are scalable, secure, and robust.",
    link: "/services/custom-software"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "We build modern, high-performance mobile applications for iOS and Android that users love to engage with. From intuitive UI design to seamless backend integration, every app we deliver is optimized for speed, reliability, and usability. We turn your mobile vision into reality.",
    link: "/services/mobile-apps"
  }
]

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <section className="bg-[#F9FAFB] py-[120px] px-[5%] overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[80px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.2em] text-[#2563eb]"
            >
              OUR SERVICES
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-[20px] font-jakarta text-[clamp(32px,5vw,52px)] font-[800] leading-[1.1] text-[#111827] tracking-tight"
            >
              Services tailored to your specific need.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/services" 
              className="group inline-flex items-center gap-2 font-jakarta text-[16.5px] font-[700] text-[#2563eb]"
            >
              Explore All Services
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Dynamic Interactive Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-2 -mx-2">
          {SERVICES.map((service, i) => {
            const isActive = activeIdx === i
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                whileHover={{ y: -6 }}
                className={`group w-[340px] md:w-[380px] shrink-0 rounded-[32px] p-10 snap-start border transition-all duration-500 cursor-pointer ${
                  isActive 
                    ? "bg-[#2563eb] border-[#2563eb] text-white shadow-2xl shadow-blue-500/25" 
                    : "bg-white border-[#E5E7EB] text-[#111827] hover:border-[#2563eb]/30 hover:shadow-xl"
                }`}
              >
                {/* Icon box */}
                <div className={`mb-10 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "bg-[#F3F4F6] text-[#2563eb] group-hover:bg-[#2563eb]/5"
                }`}>
                  <service.icon size={30} />
                </div>
                
                <h3 className={`mb-4 font-jakarta text-[24px] font-[800] leading-tight transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#111827]"
                }`}>
                  {service.title}
                </h3>
                <p className={`mb-10 font-jakarta text-[15.5px] font-[500] leading-relaxed transition-colors duration-300 min-h-[144px] ${
                  isActive ? "text-white/80" : "text-[#4B5563]"
                }`}>
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className={`font-jakarta text-[14px] font-[700] uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white/60" : "text-[#9CA3AF] group-hover:text-[#2563eb]"
                  }`}>
                    Learn More
                  </span>
                  <Link 
                    href={service.link}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                      isActive 
                        ? "bg-white border-white text-[#2563eb]" 
                        : "border-[#E5E7EB] text-[#111827] group-hover:bg-[#2563eb] group-hover:border-[#2563eb] group-hover:text-white"
                    }`}
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Scroll Instruction */}
        <div className="mt-8 flex items-center gap-4 text-[#9CA3AF] font-jakarta text-[13px] font-[700] uppercase tracking-widest">
          <div className="h-[1px] w-12 bg-[#E5E7EB]" />
          Hover or scroll to explore services
        </div>
      </div>
    </section>
  )
}
