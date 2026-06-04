"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Link from "next/link";

export default function CaseStudiesCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="bg-[#1746ea] py-[100px] px-[5%] w-full shadow-[inset_0_0_36px_0_rgba(172,206,255,0.22)] flex justify-center text-center">
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-full max-w-[800px] flex flex-col items-center"
      >
        <motion.div 
          variants={itemVariants}
          className="rounded-[100px] border-[0.8px] border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-[18px] py-[6px] font-bricolage text-[10.4px] font-semibold tracking-[1.04px] text-white uppercase mb-[24px] inline-block"
        >
          LET&apos;S CONNECT
        </motion.div>

        <motion.h2 
          variants={itemVariants}
          className="font-bricolage text-[36px] md:text-[44px] font-bold text-white leading-[1.2] max-w-[500px] mx-auto mb-[16px]"
        >
          Connect with MoolSap!
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-[16px] md:text-[17px] font-normal text-[rgba(255,255,255,0.78)] leading-[1.75] max-w-[500px] mx-auto mb-[40px]"
        >
          Ready to take the first step towards unlocking opportunities, realizing goals, and embracing innovation? We&apos;re here and eager to connect.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-row gap-[16px] flex-wrap justify-center"
        >
          <motion.button 
            className="bg-white text-[#23272e] border-none rounded-[8px] p-[12px_32px] font-bricolage text-[14px] font-medium"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Schedule a Call
          </motion.button>
          
          <Link href="/contact" className="inline-block">
            <motion.button 
              className="bg-transparent text-white border-[0.8px] border-white rounded-[8px] p-[12px_32px] font-bricolage text-[14px] font-medium"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
