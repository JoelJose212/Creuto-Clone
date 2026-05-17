"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { X } from "lucide-react";
import { neverDone } from "@/constants/neverDone";

export default function AboutNeverDoneSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#000000] py-[80px] px-[5%] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-center md:items-start gap-[64px]">
        
        {/* Left Column */}
        <div className="flex-1 w-full">
          <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[20px]">
            OUR INTEGRITY
          </div>
          
          <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#ffffff] tracking-[-0.88px] leading-[1.1] mb-[16px]">
            What We&apos;ve Never Done
          </h2>
          
          <p className="font-bricolage text-[18px] md:text-[20px] font-medium text-[rgba(255,255,255,0.6)] mb-[48px]">
            Integrity is our baseline.
          </p>

          <motion.div 
            ref={ref}
            className="flex flex-col gap-[20px]"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {neverDone.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-row items-center gap-[16px]"
                variants={itemVariants}
              >
                <div className="w-[40px] h-[40px] rounded-full bg-[rgba(239,68,68,0.12)] border-[0.8px] border-[rgba(239,68,68,0.25)] flex items-center justify-center flex-shrink-0">
                  <X size={18} className="text-[#ef4444]" />
                </div>
                <div className="font-bricolage text-[16px] md:text-[18px] font-medium text-[rgba(255,255,255,0.85)] leading-[1.5]">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column (Illustration) */}
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <motion.div 
            className="w-full max-w-[280px] md:max-w-[420px] relative"
            animate={{ translateY: [-12, 12, -12] }}
            transition={{ 
              duration: 4, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          >
            <Image 
              src="/icons/No_Vector.svg" 
              alt="No Shortcuts Vector" 
              width={420} 
              height={420} 
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
