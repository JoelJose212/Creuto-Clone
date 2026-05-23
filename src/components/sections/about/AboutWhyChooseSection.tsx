"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { whyChoose } from "@/constants/whyChoose";

export default function AboutWhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#ffffff] py-[80px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[16px]">
          OUR VALUE
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] mb-[48px]">
          Why Teams Choose AANANDI
        </h2>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[20px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {whyChoose.map((item, index) => (
            <motion.div 
              key={index}
              className="rounded-[24px] bg-[#f8f8f8] border-[0.8px] border-[#f7f8ff] p-[32px] shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] hover:bg-[#ffffff] hover:shadow-[var(--shadow-deep-about)] hover:-translate-y-[4px] transition-all duration-280 ease-in-out"
              variants={itemVariants}
            >
              <div className="flex flex-row items-center gap-[14px]">
                <div className="w-[48px] h-[48px] rounded-full bg-[#e8edff] flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <Image 
                    src={item.icon} 
                    alt={item.title} 
                    width={24} 
                    height={24} 
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bricolage text-[20px] font-semibold text-[#23272e] tracking-[-0.5px]">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-[14.4px] font-medium text-[#666666] leading-[1.7] mt-[12px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
