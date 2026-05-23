"use client";

import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

export default function AboutMeaningSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1.0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <section className="bg-[#ffffff] py-[80px] px-[5%] w-full flex flex-col items-center">
      <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] text-center mb-[20px]">
        OUR NAME
      </div>
      
      <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] text-center mb-[64px]">
        What AANANDI Means
      </h2>

      <motion.div 
        ref={ref}
        className="flex flex-row justify-center items-center gap-[24px] flex-wrap max-w-[1280px] w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* CREATE Card */}
        <motion.div 
          className="rounded-[24px] bg-[#f8f8f8] border-[0.8px] border-[#f7f8ff] p-[40px_32px] text-center flex-shrink-0 w-full sm:w-[260px] shadow-[var(--shadow-deep-about)] flex flex-col items-center"
          variants={cardVariants}
        >
          <div className="w-[80px] h-[80px] relative mb-[20px]">
            <Image src="/icons/Create.svg" alt="Create" fill className="object-contain" />
          </div>
          <div className="font-bricolage text-[24px] font-bold text-[#1746ea] tracking-[0.05em] mb-[8px]">
            CREATE
          </div>
          <div className="text-[14.4px] font-medium text-[#666666] leading-[1.6]">
            Intentional, Disciplined Craftsmanship
          </div>
        </motion.div>

        {/* PLUS Operator */}
        <motion.div 
          className="w-[48px] h-[48px] bg-[#e8edff] rounded-full flex items-center justify-center font-bricolage text-[28px] font-bold text-[#1746ea] flex-shrink-0"
          variants={cardVariants}
        >
          +
        </motion.div>

        {/* PLUTO Card */}
        <motion.div 
          className="rounded-[24px] bg-[#f8f8f8] border-[0.8px] border-[#f7f8ff] p-[40px_32px] text-center flex-shrink-0 w-full sm:w-[260px] shadow-[var(--shadow-deep-about)] flex flex-col items-center"
          variants={cardVariants}
        >
          <div className="w-[80px] h-[80px] relative mb-[20px]">
            <Image src="/icons/Pluto.svg" alt="Pluto" fill className="object-contain" />
          </div>
          <div className="font-bricolage text-[24px] font-bold text-[#1746ea] tracking-[0.05em] mb-[8px]">
            PLUTO
          </div>
          <div className="text-[14.4px] font-medium text-[#666666] leading-[1.6]">
            The Edge Of The Known; The Misunderstood And Unexplored.
          </div>
        </motion.div>

        {/* EQUALS Operator */}
        <motion.div 
          className="w-[48px] h-[48px] bg-[#e8edff] rounded-full flex items-center justify-center font-bricolage text-[28px] font-bold text-[#1746ea] flex-shrink-0"
          variants={cardVariants}
        >
          =
        </motion.div>

        {/* AANANDI Card */}
        <motion.div 
          className="rounded-[24px] bg-[rgba(23,70,234,0.04)] border-[1.5px] border-[rgba(23,70,234,0.3)] p-[40px_32px] text-center flex-shrink-0 w-full sm:w-[280px] shadow-[var(--shadow-deep-about)] flex flex-col items-center"
          variants={cardVariants}
        >
          <div className="w-[80px] h-[80px] relative mb-[20px]">
            <Image src="/icons/Aanandi_Single_Logo.svg" alt="Aanandi Logo" fill className="object-contain" />
          </div>
          <div className="font-bricolage text-[24px] font-bold text-[#1746ea] tracking-[0.05em] mb-[8px]">
            AANANDI
          </div>
          <div className="text-[14.4px] font-medium text-[#23272e] leading-[1.65]">
            AANANDI Means Building Beyond The Obvious. Looking Further Into A Product&apos;s Future Than Most Are Willing To See.
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full max-w-[900px] mt-[64px] flex justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <Image 
          src="/icons/What_Aanandi_Means_Vector.svg" 
          alt="What Aanandi Means Vector" 
          width={900} 
          height={300} 
          className="w-full h-auto"
        />
      </motion.div>
    </section>
  );
}
