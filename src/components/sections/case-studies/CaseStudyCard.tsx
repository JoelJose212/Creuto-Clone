"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { CaseStudyItem } from "@/types/caseStudies";

function CaseStudyCardComponent({ item }: { item: CaseStudyItem }) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const firstLetter = item.title.charAt(0).toUpperCase();

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" exit="exit" layout className="h-full">
      <Link 
        href={item.href}
        className="block relative rounded-[24px] overflow-hidden bg-[#ffffff] border-[0.8px] border-[#f8faff] shadow-[0_0_12px_0_rgba(77,77,77,0.08)] cursor-pointer transition-all duration-250 ease-in-out hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] hover:-translate-y-[6px] hover:border-[rgba(23,70,234,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1746ea] focus-visible:outline-offset-2 focus-visible:shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] focus-visible:-translate-y-[6px] focus-visible:border-[rgba(23,70,234,0.15)] group flex flex-col h-full"
      >
        {/* Image Area */}
        <div 
          className="h-[200px] w-full relative overflow-hidden flex items-center justify-center"
          style={{ background: item.gradient }}
        >
          {/* Visual Placeholder */}
          <div className="w-[64px] h-[64px] rounded-[16px] bg-[rgba(255,255,255,0.4)] backdrop-blur-[8px] flex items-center justify-center">
            <span className="font-bricolage text-[28px] font-bold text-[rgba(0,0,0,0.4)]">
              {firstLetter}
            </span>
          </div>

          {/* Category Badge */}
          <div 
            className="absolute top-[16px] left-[16px] rounded-[100px] bg-[rgba(255,255,255,0.9)] border-[0.8px] border-[rgba(23,70,234,0.15)] px-[12px] py-[5px] font-bricolage text-[10.4px] font-semibold tracking-[1.04px] backdrop-blur-[8px] uppercase"
            style={{ color: item.accentColor }}
          >
            {item.category}
          </div>

          {/* ArrowUpRight Icon container */}
          <div className="absolute top-[16px] right-[16px] w-[28px] h-[28px] rounded-full bg-[rgba(255,255,255,0.9)] flex items-center justify-center transition-all duration-250 group-hover:bg-[#1746ea] group-hover:scale-110">
            <ArrowUpRight size={14} className="text-[#1746ea] group-hover:text-white transition-colors duration-250" />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-[24px] flex flex-col flex-1">
          <h3 className="font-bricolage text-[18px] font-bold text-[#23272e] leading-[1.35] mb-[10px]">
            {item.title}
          </h3>
          <p className="font-bricolage text-[14.4px] font-medium text-[#666666] leading-[1.7] line-clamp-3 mb-[16px] flex-1">
            {item.description}
          </p>

          {/* Bottom Row */}
          <div className="flex items-center text-[#1746ea] font-bricolage text-[13px] font-semibold mt-auto group">
            <span>View Case Study</span>
            <div className="ml-[6px] transition-transform duration-250 group-hover:translate-x-[4px]">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default React.memo(CaseStudyCardComponent);
