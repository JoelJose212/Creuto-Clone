"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { X } from "lucide-react";

const problems = [
  "Product quality was inconsistent",
  "Business goals were rarely considered",
  "Ownership disappeared after hand-off",
  "UI looked outdated and unpolished",
  "Shortcuts were taken to save time",
  "Teams followed instructions without questioning",
  "No guidance for launch or GTM",
  "Products struggled to scale after launch",
  "Founders were left to figure out what comes next",
  "Decisions were made without product thinking",
  "Support ended once delivery was done."
];

export default function AboutProblemsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-[#f8f8f8] py-[80px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[24px]">
          THE PROBLEMS WE SAW
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px]">
          The Problems We Saw
        </h2>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-[16px] mt-[48px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-row items-center gap-[16px] bg-[#ffffff] rounded-[14px] px-[24px] py-[20px] shadow-[var(--shadow-mid-about)] border-[0.8px] border-[#f7f8ff] hover:shadow-[var(--shadow-deep-about)] hover:-translate-y-[3px] transition-all duration-250 ease-in-out"
            >
              <div className="w-[36px] h-[36px] min-w-[36px] rounded-[10px] bg-red-500/10 flex items-center justify-center">
                <X size={18} className="text-[#ef4444]" />
              </div>
              <div className="font-bricolage text-[16px] font-medium text-[#23272e] leading-[1.5]">
                {problem}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
