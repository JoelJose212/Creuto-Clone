"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Linkedin } from "lucide-react";
import { team } from "@/constants/team";

export default function AboutLeadershipSection() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-[#f8f8f8] py-[80px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[16px]">
          OUR PEOPLE
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] mb-[48px]">
          Leadership Team
        </h2>

        <motion.div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[20px]"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div 
              key={index}
              className="group rounded-[24px] bg-[#ffffff] border-[0.8px] border-[#f7f8ff] p-[28px_24px] text-center shadow-[0_4px_12px_0_rgba(0,0,0,0.04)] hover:shadow-[var(--shadow-deep-about)] hover:-translate-y-[6px] transition-all duration-300 ease-in-out relative overflow-hidden cursor-pointer flex flex-col items-center"
              variants={itemVariants}
              onClick={() => window.open(member.linkedin, "_blank")}
            >
              {/* Avatar */}
              <div className="w-[80px] h-[80px] rounded-[20px] bg-gradient-to-br from-[#e8edff] to-[#f0f4ff] mb-[16px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
                <span className="font-bricolage text-[24px] font-bold text-[#1746ea]">
                  {member.initials}
                </span>
              </div>
              
              {/* Info */}
              <h3 className="font-bricolage text-[18px] font-semibold text-[#23272e]">
                {member.name}
              </h3>
              <p className="text-[13px] font-medium text-[#666666] mt-[4px] leading-[1.4]">
                {member.role}
              </p>
              
              {/* LinkedIn Button */}
              <div className="mt-[16px] rounded-[50px] bg-[#e8edff] text-[#1746ea] font-bricolage text-[12px] font-bold px-[14px] py-[6px] inline-flex items-center gap-[6px] group-hover:bg-[#1746ea] group-hover:text-[#ffffff] transition-colors duration-200">
                <Linkedin size={12} className="currentColor" />
                <span>LinkedIn</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
