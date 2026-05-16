"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesProcess } from "@/constants/servicesProcess";

export default function ServicesProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#ffffff] py-[120px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-[32px] mb-[64px]">
          <div>
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[16px]">
              OUR PROCESS
            </div>
            <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] leading-[1.1] max-w-[680px] mb-[16px]">
              Why is Creuto your Top Choice?
            </h2>
            <p className="font-bricolage text-[15.2px] font-medium text-[#666666] leading-[1.7] max-w-[600px]">
              At Creuto, we specialize in developing customized software solutions to fit your unique needs, backed by industry expertise and a commitment to excellence.
            </p>
          </div>
          
          <motion.button 
            className="flex items-center text-[#1746ea] font-bricolage text-[14px] font-bold border-none bg-transparent cursor-pointer"
            whileHover="hover"
            initial="rest"
            animate="rest"
          >
            <span>View Services</span>
            <motion.div 
              className="flex items-center ml-[6px]"
              variants={{
                rest: { x: 0 },
                hover: { x: 6 }
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.div>
          </motion.button>
        </div>

        {/* Process Cards Grid */}
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(440px,1fr))] gap-[24px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {servicesProcess.map((step, index) => (
            <motion.div
              key={index}
              className="relative rounded-[20px] bg-[#f8f8f8] border-[0.8px] border-[#f7f8ff] p-[36px_32px] overflow-hidden hover:bg-white hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] hover:-translate-y-[4px] transition-all duration-[280ms] ease-in-out"
              variants={itemVariants}
            >
              <div className="flex flex-row items-center gap-[16px] relative z-10">
                <div className="font-bricolage text-[14px] font-bold text-white bg-[#1746ea] rounded-[50px] px-[16px] py-[6px] inline-block">
                  {step.number}
                </div>
                <h3 className="font-bricolage text-[20px] font-bold text-[#23272e] tracking-[-0.5px]">
                  {step.title}
                </h3>
              </div>
              
              <p className="font-bricolage text-[14.4px] font-medium text-[#666666] leading-[1.75] mt-[16px] relative z-10">
                {step.description}
              </p>

              {/* Watermark Number */}
              <div className="absolute bottom-[-12px] right-[20px] font-bricolage text-[80px] font-extrabold text-[rgba(23,70,234,0.05)] pointer-events-none select-none z-0">
                {step.number}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
