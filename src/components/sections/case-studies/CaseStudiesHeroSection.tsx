"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion";

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

export default function CaseStudiesHeroSection() {
  const headline = "We build the brands others follow.";
  const words = headline.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  const statsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8,
      },
    },
  };

  const statVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="bg-[#1746ea] min-h-[88vh] flex flex-col justify-end pb-[64px] pt-[120px] px-[5%] relative overflow-hidden">
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block rounded-[100px] border-[0.8px] border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] px-[18px] py-[6px] font-bricolage text-[10.4px] font-semibold tracking-[1.04px] text-white uppercase"
        >
          CRAFTING DIGITAL EXCELLENCE
        </motion.div>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-bricolage text-[clamp(44px,5vw,72px)] font-bold leading-[1.1] md:leading-[48.4px] text-white max-w-[780px] mt-[24px] flex flex-wrap"
        >
          {words.map((word, i) => (
            <motion.span key={i} variants={wordVariants} className="mr-[12px] md:mr-[16px] mb-[8px] md:mb-0 inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="font-bricolage text-[18px] font-normal text-[rgba(255,255,255,0.75)] leading-[1.7] max-w-[560px] mt-[16px]"
        >
          High-performance digital experiences tailored for forward-thinking companies ready to scale their impact globally.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          variants={statsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-row gap-[32px] md:gap-[48px] flex-wrap mt-[48px] items-center"
        >
          <motion.div variants={statVariants} className="flex flex-col">
            <div className="font-bricolage text-[32px] md:text-[44px] font-bold text-white">
              <CountUp end={124} suffix="+" />
            </div>
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[1.04px] text-[rgba(255,255,255,0.65)] mt-[4px]">
              Projects Delivered
            </div>
          </motion.div>

          <motion.div variants={statVariants} className="hidden sm:block w-[1px] h-[40px] bg-[rgba(255,255,255,0.2)]" />

          <motion.div variants={statVariants} className="flex flex-col">
            <div className="font-bricolage text-[32px] md:text-[44px] font-bold text-white">
              <CountUp end={12} suffix="" />
            </div>
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[1.04px] text-[rgba(255,255,255,0.65)] mt-[4px]">
              Design Awards
            </div>
          </motion.div>

          <motion.div variants={statVariants} className="hidden sm:block w-[1px] h-[40px] bg-[rgba(255,255,255,0.2)]" />

          <motion.div variants={statVariants} className="flex flex-col">
            <div className="font-bricolage text-[32px] md:text-[44px] font-bold text-white">
              <CountUp end={98} suffix="%" />
            </div>
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[1.04px] text-[rgba(255,255,255,0.65)] mt-[4px]">
              Retention Rate
            </div>
          </motion.div>

          <motion.div variants={statVariants} className="hidden sm:block w-[1px] h-[40px] bg-[rgba(255,255,255,0.2)]" />

          <motion.div variants={statVariants} className="flex flex-col">
            <div className="font-bricolage text-[32px] md:text-[44px] font-bold text-white">
              <CountUp end={10} suffix="+" />
            </div>
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[1.04px] text-[rgba(255,255,255,0.65)] mt-[4px]">
              Years of Excellence
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
