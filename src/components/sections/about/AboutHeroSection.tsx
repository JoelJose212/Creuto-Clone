"use client";

import { motion, Variants } from "framer-motion";

export default function AboutHeroSection() {
  const h1Text = "Why AANANDI Was Started";
  const words = h1Text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="bg-[#ffffff] min-h-[60vh] flex items-center pt-[100px] pb-[80px] px-[5%]">
      <div className="max-w-[900px] mx-auto text-center w-full flex flex-col items-center">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[20px]">
          ABOUT US
        </div>
        
        <motion.h1 
          className="font-bricolage text-[48px] sm:text-[88px] font-bold text-[#23272e] tracking-[-1px] sm:tracking-[-2px] leading-[1.0] text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words.map((word, index) => (
            <motion.span key={index} className="inline-block mr-[0.25em] last:mr-0" variants={child}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.h2 
          className="font-bricolage text-[28px] sm:text-[44px] font-semibold text-[#1746ea] tracking-[-0.88px] leading-[1.15] text-center max-w-[760px] mt-[24px] mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Most development teams are &ldquo;order takers.&rdquo;
        </motion.h2>

        <motion.div 
          className="h-[1px] w-full max-w-[120px] bg-[#1746ea] mt-[40px] mx-auto origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
      </div>
    </section>
  );
}
