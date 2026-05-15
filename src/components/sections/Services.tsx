"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Smartphone, Cloud, Brain, Globe, Rocket, ArrowRight } from "lucide-react"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { cn } from "@/lib/cn"

const SERVICES = [
  {
    num: "01",
    title: "Custom Software Development",
    desc: "Your business deserves software built around its exact needs. We design and develop custom software solutions that align with your workflows, goals, and growth strategy — scalable, secure, and built to evolve.",
    icon: Code2,
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "We build modern, high-performance mobile applications for iOS and Android that users love. From intuitive UI to seamless backend integration, every app is optimized for speed and reliability.",
    icon: Smartphone,
  },
  {
    num: "03",
    title: "DevOps & Cloud Engineering",
    desc: "Accelerate your delivery cycles and scale with complete confidence. We work across AWS, GCP, and Azure to build resilient, cost-efficient cloud architectures.",
    icon: Cloud,
  },
  {
    num: "04",
    title: "AI Engineering Services",
    desc: "We design and deploy production-ready AI solutions — from ML models and NLP pipelines to intelligent automation and LLM-powered applications.",
    icon: Brain,
  },
  {
    num: "05",
    title: "Web Development",
    desc: "We build fast, scalable, visually compelling web platforms using modern frameworks and SEO best practices.",
    icon: Globe,
  },
  {
    num: "06",
    title: "Startup Product Engineering",
    desc: "We partner with founders to turn ideas into fully functional, market-ready products fast — from MVP scoping to full-scale engineering.",
    icon: Rocket,
  },
]

export default function Services() {
  const [activeService, setActiveService] = useState<number | null>(null)

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-5xl">
        <div className="mb-[48px] text-center md:text-left">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            OUR SERVICES
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            Our services tailored to your specific need.
          </h2>
          <p className="font-sans text-[16px] font-[300] text-muted">
            Your vision, our expertise — shaping digital solutions that drive impact.
          </p>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((service, index) => {
            const isFirst = index === 0
            const isLast = index === SERVICES.length - 1
            const isActive = activeService === index

            return (
              <div
                key={index}
                className={cn(
                  "group flex flex-col border border-border bg-transparent md:grid md:grid-cols-2",
                  isFirst && "rounded-t-[14px]",
                  isLast && "rounded-b-[14px]",
                  !isLast && "border-b-0"
                )}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
              >
                {/* Info Pane */}
                <div
                  className={cn(
                    "flex flex-col justify-center border-r-0 border-border bg-surface px-[36px] py-[40px] transition-colors duration-300 md:border-r",
                    isActive && "bg-surface-2",
                    isFirst && "rounded-t-[13px] md:rounded-tr-none",
                    isLast && "rounded-b-[13px] md:rounded-br-none"
                  )}
                >
                  <div className="mb-[16px] font-display text-[11px] font-[700] tracking-[0.1em] text-blue">
                    {service.num} / {service.title}
                  </div>
                  <h3 className="mb-[16px] font-display text-[22px] font-[700] text-white">
                    {service.title}
                  </h3>
                  <p className="mb-[24px] max-w-[400px] font-sans text-[14px] font-[300] leading-[1.75] text-muted">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-[4px] font-sans text-[13px] font-[600] text-blue">
                    Learn More
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-[4px]"
                    />
                  </div>
                </div>

                {/* Icon Pane */}
                <div
                  className={cn(
                    "hidden items-center justify-center bg-transparent px-[36px] py-[40px] transition-colors duration-300 md:flex",
                    isActive && "bg-[rgba(26,30,58,0.3)]"
                  )}
                >
                  <motion.div
                    animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 2 }}
                    className="flex h-[80px] w-[80px] items-center justify-center rounded-[20px] border border-[rgba(21,49,255,0.25)] bg-[rgba(21,49,255,0.12)]"
                  >
                    <service.icon size={36} color="#1531FF" />
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
