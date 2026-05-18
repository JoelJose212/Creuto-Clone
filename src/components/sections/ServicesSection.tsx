"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Code2, Smartphone, Cpu, Globe, Database, Server } from "lucide-react"
import Link from "next/link"

const SERVICES = [
  {
    icon: Cpu,
    title: "AI Engineering Services",
    desc: "Transform your data into a true competitive advantage. We design and deploy production-ready AI solutions – from machine learning models and NLP pipelines to intelligent automation and LLM-powered applications. Our AI engineering services are built for real business impact, helping you work smarter, move faster, and stay ahead.",
    link: "/services"
  },
  {
    icon: Globe,
    title: "Startup Product Engineering",
    desc: "Speed to market is everything for early-stage startups. We partner with founders to turn ideas into fully functional, market-ready products – fast. From MVP scoping and rapid prototyping to full-scale product engineering, we bring the technical expertise and startup mindset you need to validate, launch, and scale.",
    link: "/services"
  },
  {
    icon: Code2,
    title: "Web Development",
    desc: "We build fast, scalable, and visually compelling web platforms that drive growth and deliver exceptional user experiences. From marketing websites to complex web applications, our development process combines clean architecture, modern frameworks, and SEO best practices – so your web presence performs at its peak.",
    link: "/services"
  },
  {
    icon: Server,
    title: "DevOps & Cloud Engineering",
    desc: "Accelerate your delivery cycles and scale with complete confidence. Our DevOps and cloud engineering services help teams automate infrastructure, streamline CI/CD pipelines, and reduce operational overhead. We work across AWS, GCP, and Azure to build resilient, cost-efficient cloud architectures.",
    link: "/services"
  },
  {
    icon: Database,
    title: "Custom Software Development",
    desc: "Your business deserves software built around its exact needs – not the other way around. We design and develop custom software solutions that align with your workflows, goals, and growth strategy. From enterprise platforms to internal tools, we deliver high-performance applications that are scalable, secure, and robust.",
    link: "/services"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "We build modern, high-performance mobile applications for iOS and Android that users love to engage with. From intuitive UI design to seamless backend integration, every app we deliver is optimized for speed, reliability, and usability. We turn your mobile vision into reality.",
    link: "/services"
  }
]

export default function ServicesSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Autoplay functionality - rotates cards automatically
  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length)
    }, 3800)
    return () => clearInterval(interval)
  }, [isHovered])

  // Center active card with smooth kinetic alignment
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const cards = container.children
    if (cards[activeIdx]) {
      const activeCard = cards[activeIdx] as HTMLElement
      const containerWidth = container.offsetWidth
      const cardWidth = activeCard.offsetWidth
      const cardLeft = activeCard.offsetLeft
      
      const scrollPos = cardLeft - (containerWidth / 2) + (cardWidth / 2)
      
      container.scrollTo({
        left: scrollPos,
        behavior: "smooth"
      })
    }
  }, [activeIdx])

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)
  }

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SERVICES.length)
  }

  return (
    <section 
      className="bg-[#F8FAFF] py-[120px] px-[5%] overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative gradient glowing ambient backdrops */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="mb-[60px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.2em] text-[#1746EA]"
            >
              OUR SERVICES
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-[20px] text-[clamp(32px,5vw,48px)] font-[800] leading-[1.15] text-[#01083D] tracking-tight"
            >
              Our services tailored to your specific need
            </motion.h2>
            <p className="text-[16px] md:text-[18px] text-[#475569] font-[500] leading-relaxed max-w-xl">
              Your vision, our expertise—shaping digital solutions that drive impact. Whether it&apos;s software, cloud, or automation, we craft solutions designed to scale.
            </p>
          </div>

          {/* Navigation Controls and Link */}
          <div className="flex items-center gap-6 self-start md:self-end">
            <Link 
              href="/services" 
              className="group inline-flex items-center gap-2 text-[16px] font-[700] text-[#1746EA] transition-all duration-300 hover:text-[#01083D]"
            >
              Explore All Services
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePrev}
                aria-label="Previous service"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:bg-[#1746EA] hover:border-[#1746EA] hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={handleNext}
                aria-label="Next service"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:bg-[#1746EA] hover:border-[#1746EA] hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Horizontal Carousel */}
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-4 -mx-4 mask-edge-fading"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICES.map((service, i) => {
            const isActive = activeIdx === i
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                whileHover={{ y: isActive ? -4 : -8 }}
                className={`group w-[300px] sm:w-[340px] md:w-[380px] shrink-0 rounded-[2rem] p-8 md:p-10 snap-center border transition-all duration-500 cursor-pointer relative overflow-hidden ${
                  isActive 
                    ? "bg-gradient-to-br from-[#1746EA] to-[#0A2CB3] border-[#1746EA] text-white shadow-2xl shadow-blue-500/30 scale-[1.02]" 
                    : "bg-white border-[#E2E8F0] text-[#01083D] hover:border-[#1746EA]/30 hover:shadow-xl hover:shadow-slate-100"
                }`}
              >
                {/* Decorative glowing card circles */}
                {isActive && (
                  <>
                    <div className="absolute top-[-20%] right-[-20%] w-[150px] h-[150px] rounded-full bg-white/5 blur-2xl" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[150px] h-[150px] rounded-full bg-blue-300/10 blur-2xl" />
                  </>
                )}

                {/* Icon box */}
                <div className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? "bg-white/10 text-white rotate-6 scale-110" 
                    : "bg-[#F0F4FF] text-[#1746EA] group-hover:bg-[#1746EA]/5 group-hover:rotate-3"
                }`}>
                  <service.icon size={26} />
                </div>
                
                <h3 className={`mb-4 text-[20px] md:text-[24px] font-[800] leading-tight transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#01083D]"
                }`}>
                  {service.title}
                </h3>
                <p className={`mb-8 text-[14.5px] md:text-[15.5px] font-[500] leading-relaxed transition-colors duration-300 min-h-[144px] ${
                  isActive ? "text-white/85" : "text-[#475569]"
                }`}>
                  {service.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className={`text-[13px] font-[700] uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? "text-white/70" : "text-[#94A3B8] group-hover:text-[#1746EA]"
                  }`}>
                    Learn More
                  </span>
                  <Link 
                    href={service.link}
                    className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 ${
                      isActive 
                        ? "bg-white border-white text-[#1746EA] shadow-md shadow-black/10" 
                        : "border-[#E2E8F0] text-[#01083D] group-hover:bg-[#1746EA] group-hover:border-[#1746EA] group-hover:text-white group-hover:scale-105"
                    }`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        {/* Dynamic Glow Indicators (Dots) */}
        <div className="mt-8 flex justify-center items-center gap-2">
          {SERVICES.map((_, i) => {
            const isActive = activeIdx === i
            return (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  isActive 
                    ? "w-8 bg-[#1746EA] shadow-md shadow-blue-500/30" 
                    : "w-2.5 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            )
          })}
        </div>
      </div>
      
      {/* CSS Utilities for Scrollbar Hide and Mask edge */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-edge-fading {
          mask-image: linear-gradient(to right, transparent, white 4%, white 96%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 4%, white 96%, transparent);
        }
      `}</style>
    </section>
  )
}
