"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasStarted, setHasStarted] = useState(false);
  
  const springValue = useSpring(0, {
    duration: 2000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => Math.floor(current));

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      springValue.set(end);
    }
  }, [isInView, end, springValue, hasStarted]);

  return (
    <span ref={ref} className="inline-flex">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export default function ServicesStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section className="bg-[#23272e] py-[64px] px-[5%] w-full">
      <motion.div 
        ref={ref}
        className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row justify-evenly items-center border-y border-[rgba(255,255,255,0.08)] py-[24px]"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Stat 1 */}
        <motion.div className="text-center p-[24px_40px]" variants={itemVariants}>
          <div className="font-bricolage text-[56px] font-bold text-[#ffffff] tracking-[-2px] leading-none">
            <CountUp end={108} suffix="+" />
          </div>
          <div className="font-bricolage text-[13px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.5)] mt-[8px]">
            Projects Delivered
          </div>
        </motion.div>

        {/* Divider 1 */}
        <motion.div 
          className="hidden md:block w-[1px] h-[60px] bg-[rgba(255,255,255,0.15)] self-center"
          variants={itemVariants}
        />

        {/* Stat 2 */}
        <motion.div className="text-center p-[24px_40px]" variants={itemVariants}>
          <div className="font-bricolage text-[56px] font-bold text-[#ffffff] tracking-[-2px] leading-none">
            <CountUp end={99} suffix="%" />
          </div>
          <div className="font-bricolage text-[13px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.5)] mt-[8px]">
            Client Retention Rate
          </div>
        </motion.div>

        {/* Divider 2 */}
        <motion.div 
          className="hidden md:block w-[1px] h-[60px] bg-[rgba(255,255,255,0.15)] self-center"
          variants={itemVariants}
        />

        {/* Stat 3 */}
        <motion.div className="text-center p-[24px_40px]" variants={itemVariants}>
          <div className="font-bricolage text-[56px] font-bold text-[#ffffff] tracking-[-2px] leading-none">
            <CountUp end={34} suffix="+" />
          </div>
          <div className="font-bricolage text-[13px] font-semibold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.5)] mt-[8px]">
            Technology Expertise
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
