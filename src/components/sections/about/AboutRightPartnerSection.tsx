"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { Check } from "lucide-react";
import { rightPartner } from "@/constants/rightPartner";

export default function AboutRightPartnerSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#1746ea] py-[100px] px-[5%] w-full shadow-[inset_0_0_36px_0_rgba(172,206,255,0.22)] relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row items-start gap-[64px]" ref={ref}>
        
        {/* Left Column */}
        <div className="flex-1 w-full">
          <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[rgba(255,255,255,0.6)] mb-[20px]">
            THE RIGHT FIT
          </div>
          
          <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#ffffff] tracking-[-0.88px] leading-[1.1] mb-[16px]">
            Is MOOLSAP the Right Partner for You?
          </h2>
          
          <p className="font-bricolage text-[18px] md:text-[20px] font-normal text-[rgba(255,255,255,0.75)] mb-[40px]">
            This works best if you believe:
          </p>

          <motion.div 
            className="flex flex-col gap-[20px]"
            variants={listVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {rightPartner.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-row items-start gap-[16px]"
                variants={itemVariants}
              >
                <div className="flex-shrink-0 mt-[2px] w-[24px] h-[24px] relative">
                  <Image 
                    src="/img/about/tick-circle.png" 
                    alt="Check" 
                    width={24} 
                    height={24} 
                    className="object-contain"
                  />
                </div>
                <div className="font-bricolage text-[16px] md:text-[17px] font-medium text-[rgba(255,255,255,0.9)] leading-[1.6]">
                  {item.text}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column (Card) */}
        <div className="w-full md:w-[480px] flex-shrink-0">
          <motion.div 
            className="rounded-[28px] bg-[rgba(255,255,255,0.1)] border-[0.8px] border-[rgba(255,255,255,0.2)] backdrop-blur-[12px] p-[40px] md:p-[48px_40px] w-full shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <h3 className="font-bricolage text-[22px] md:text-[26px] font-semibold text-[#ffffff] leading-[1.35] mb-[28px]">
              If this mindset resonates, a conversation is the right next step.
            </h3>
            
            <motion.button 
              className="w-full bg-[#ffffff] text-[#1746ea] rounded-[14px] p-[18px_36px] font-bricolage text-[16px] font-bold border-none text-center shadow-[0_16px_48px_0_rgba(0,0,0,0.12)] mb-[24px]"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Call with the Product Leadership Team
            </motion.button>
            
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-row items-center gap-[10px]">
                <Check size={16} className="text-[rgba(255,255,255,0.6)] flex-shrink-0" />
                <span className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">
                  No commitment required
                </span>
              </div>
              <div className="flex flex-row items-center gap-[10px]">
                <Check size={16} className="text-[rgba(255,255,255,0.6)] flex-shrink-0" />
                <span className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">
                  30-minute intro call
                </span>
              </div>
              <div className="flex flex-row items-center gap-[10px]">
                <Check size={16} className="text-[rgba(255,255,255,0.6)] flex-shrink-0" />
                <span className="text-[13px] font-medium text-[rgba(255,255,255,0.6)]">
                  Direct access to leadership.
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
