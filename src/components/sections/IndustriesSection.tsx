"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const INDUSTRIES = [
  {
    title: "Travel & Hospitality",
    image: "/img/industries/travel.png"
  },
  {
    title: "Streaming",
    image: "/img/industries/streaming.png"
  },
  {
    title: "Healthcare",
    image: "/img/industries/healthcare.png"
  },
  {
    title: "Fitness",
    image: "/img/industries/fitness.png"
  },
  {
    title: "E-commerce & Retail",
    image: "/img/industries/ecommerce.png"
  }
]

export default function IndustriesSection() {
  return (
    <section className="bg-white py-[120px] px-[5%] overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-[64px]">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-[16px] inline-block text-[13px] font-bold uppercase tracking-[0.2em] text-[#2563eb]"
          >
            OUR EXPERTISE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-[20px] font-jakarta text-[clamp(32px,5vw,52px)] font-[800] leading-[1.1] text-[#111827] tracking-tight"
          >
            Industries We Specialise In.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-[640px] font-jakarta text-[17px] font-[500] text-[#4B5563]"
          >
            Explore our comprehensive suite of solutions. From software development to digital transformation, we adapt to each sector&apos;s specific needs.
          </motion.p>
        </div>

        {/* Gorgeous Horizontal Photograph Slider */}
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-2 -mx-2">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative h-[420px] w-[300px] md:h-[480px] md:w-[360px] shrink-0 overflow-hidden rounded-[32px] snap-start shadow-xl shadow-black/5 cursor-pointer"
            >
              {/* Background Image with Hover Scale */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                <Image
                  src={ind.image}
                  alt={ind.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 360px"
                />
              </div>

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Text elements at bottom left */}
              <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="mb-3 font-jakarta text-[12px] font-[800] uppercase tracking-[0.2em] text-[#2563eb]">
                  Sector {i + 1}
                </div>
                <h3 className="font-jakarta text-[26px] md:text-[30px] font-[800] leading-tight text-white tracking-tight">
                  {ind.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
