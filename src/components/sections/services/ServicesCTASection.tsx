"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

export default function ServicesCTASection() {
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#1746ea] py-[120px] px-[5%] w-full shadow-[inset_0_0_36px_0_rgba(172,206,255,0.22)] flex justify-center">
      <motion.div 
        ref={ref}
        className="w-full max-w-[800px] flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="rounded-[50px] border-[0.8px] border-[rgba(255,255,255,0.25)] bg-[rgba(255,255,255,0.1)] p-[6px_18px] font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-white mb-[24px] inline-block text-center"
          variants={itemVariants}
        >
          LET&apos;S CONNECT
        </motion.div>
        
        <motion.h2 
          className="font-bricolage text-[36px] md:text-[44px] font-bold text-white tracking-[-0.88px] leading-[1.2] text-center max-w-[560px] mb-[16px]"
          variants={itemVariants}
        >
          Connect with Aanandi!
        </motion.h2>
        
        <motion.p 
          className="text-[16px] md:text-[17px] font-normal text-[rgba(255,255,255,0.8)] leading-[1.75] text-center max-w-[520px] mb-[40px]"
          variants={itemVariants}
        >
          Ready to take the first step towards unlocking opportunities, realizing goals, and embracing innovation? We&apos;re here and eager to connect.
        </motion.p>
        
        <motion.div 
          className="flex flex-row flex-wrap justify-center items-center gap-[14px]"
          variants={itemVariants}
        >
          <motion.button 
            className="bg-white text-[#1746ea] rounded-[14px] p-[14px_32px] font-bricolage text-[15px] font-bold border-none shadow-[0_16px_48px_0_rgba(0,0,0,0.12)] hover:bg-[#f0f4ff] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Free Consultation
          </motion.button>
          
          <motion.button 
            className="bg-transparent text-white rounded-[14px] p-[14px_32px] font-bricolage text-[15px] font-bold border-[0.8px] border-[rgba(255,255,255,0.35)] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule a Call
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
