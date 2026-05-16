"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { howWeWork } from "@/constants/howWeWork";

function AboutHowWeWorkSectionComponent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    },
  };

  return (
    <section className="bg-[#f8f8f8] border-y border-[#e5e7eb] py-[80px] px-[5%] w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] text-center mb-[20px]">
          OUR APPROACH
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] text-center mb-[64px]">
          How We Work
        </h2>

        <motion.div 
          ref={ref}
          className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-0"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {howWeWork.map((step, index) => (
            <React.Fragment key={index}>
              {/* Step Card */}
              <motion.div 
                className={`relative rounded-[24px] bg-[#ffffff] p-[36px_28px] w-full max-w-[320px] md:w-[220px] text-center shadow-[var(--shadow-deep-about)] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_0_rgba(0,0,0,0.12)] transition-all duration-300 ease-in-out md:border-none
                  ${index !== 0 ? 'mt-[32px] md:mt-0 before:content-[""] md:before:hidden before:absolute before:left-1/2 before:-top-[32px] before:w-[2px] before:h-[32px] before:border-l-[2px] before:border-dashed before:border-[rgba(23,70,234,0.3)]' : ''}
                `}
                variants={cardVariants}
              >
                <div className="font-bricolage text-[13px] font-bold text-[#1746ea] bg-[#e8edff] rounded-[50px] px-[14px] py-[4px] inline-block mb-[20px]">
                  {step.number}
                </div>
                <h3 className="font-bricolage text-[20px] font-semibold text-[#23272e] tracking-[-0.5px] mb-[10px]">
                  {step.title}
                </h3>
                <p className="text-[14.4px] font-medium text-[#666666] leading-[1.65]">
                  {step.description}
                </p>
              </motion.div>

              {/* Connector Arrow (Desktop Only) */}
              {index < howWeWork.length - 1 && (
                <motion.div 
                  className="hidden md:flex w-[60px] flex-shrink-0 items-center justify-center -mx-[10px] z-10"
                  variants={arrowVariants}
                >
                  <Image 
                    src="/icons/About_How_We_Work_Vector.svg" 
                    alt="Arrow" 
                    width={60} 
                    height={24} 
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default React.memo(AboutHowWeWorkSectionComponent);
