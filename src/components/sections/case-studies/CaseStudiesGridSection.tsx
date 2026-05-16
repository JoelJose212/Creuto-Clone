"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { CaseStudyItem } from "@/types/caseStudies";
import CaseStudyCard from "./CaseStudyCard";

const SkeletonCard = () => (
  <div className="rounded-[24px] bg-[#ffffff] border-[0.8px] border-[#f8faff] shadow-[0_0_12px_0_rgba(77,77,77,0.08)] overflow-hidden flex flex-col">
    <div className="h-[200px] w-full bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
    <div className="p-[24px] flex flex-col gap-[12px]">
      <div className="h-[24px] w-[80%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
      <div className="h-[16px] w-[60%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
      <div className="h-[16px] w-[100%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded mt-[4px]" />
    </div>
  </div>
);

export default function CaseStudiesGridSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: caseStudies = [], isLoading, isError } = useQuery<CaseStudyItem[]>({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const res = await fetch("/api/case-studies");
      if (!res.ok) throw new Error("Failed to fetch case studies");
      return res.json();
    },
  });

  const categories = ["All", ...Array.from(new Set(caseStudies.map(cs => cs.category)))];
  
  const filteredCaseStudies = activeFilter === "All" 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  return (
    <section className="bg-[#ffffff] py-[80px] px-[5%] w-full min-h-[500px]">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Header */}
        <h2 className="font-bricolage text-[32px] font-bold text-[#23272e] leading-[38.4px] mb-[8px]">
          Our Works
        </h2>
        <p className="font-bricolage text-[16px] font-medium text-[#666666] leading-[1.65] mb-[40px]">
          A curation of projects where design meets strategy to create measurable business value.
        </p>

        {/* Filters */}
        <div className="flex flex-row flex-wrap gap-[8px] mb-[48px]" role="tablist">
          {categories.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(category)}
                className={`rounded-[100px] border-[0.8px] font-bricolage text-[12px] font-semibold px-[16px] py-[8px] cursor-pointer transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1746ea] focus-visible:outline-offset-2
                  ${isActive 
                    ? "bg-[#1746ea] text-white border-[#1746ea] shadow-[0_4px_12px_0_rgba(23,70,234,0.25)]" 
                    : "bg-transparent text-[#1746ea] border-[rgba(23,70,234,0.2)] hover:bg-[rgba(23,70,234,0.06)] hover:border-[rgba(23,70,234,0.4)]"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid Container */}
        <div 
          className="w-full relative" 
          aria-live="polite" 
          aria-label={`Case studies, ${isLoading ? "loading" : filteredCaseStudies.length} results`}
        >
          {isError && (
            <div className="flex flex-col items-center justify-center py-[64px] text-center">
              <SearchX size={48} className="text-[#e5e7eb] mb-[16px]" />
              <p className="font-bricolage text-[16px] text-[#666666]">
                Failed to load case studies. Please refresh.
              </p>
            </div>
          )}

          {isLoading && !isError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[24px]">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredCaseStudies.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-[64px] text-center"
            >
              <SearchX size={48} className="text-[#e5e7eb] mb-[16px]" />
              <p className="font-bricolage text-[16px] text-[#666666]">
                No case studies found for this category.
              </p>
            </motion.div>
          )}

          {!isLoading && !isError && filteredCaseStudies.length > 0 && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[24px]"
            >
              <AnimatePresence mode="popLayout">
                {filteredCaseStudies.map((item) => (
                  <CaseStudyCard key={item.slug} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
        
      </div>
    </section>
  );
}
