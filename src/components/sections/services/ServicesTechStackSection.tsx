"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_CATEGORIES, TECH_DATA, TechCategory } from "@/constants/techStack";

function ServicesTechStackSectionComponent() {
  const [activeCategory, setActiveCategory] = useState<TechCategory>(TECH_CATEGORIES[0]);

  const activeTechs = TECH_DATA[activeCategory] || [];

  return (
    <section className="bg-[#f8f8f8] py-[120px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[16px]">
          OUR TECH STACK
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] leading-[1.2] max-w-[600px] mb-[16px]">
          The Technology Behind Your Success
        </h2>
        
        <p className="font-bricolage text-[15.2px] font-medium text-[#666666] mb-[56px]">
          Below are the latest tools we consider while crafting the best IT solutions for you!
        </p>

        <div className="flex flex-col md:grid md:grid-cols-[260px_1fr] gap-[32px]">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-row md:flex-col overflow-x-auto whitespace-nowrap md:whitespace-normal md:overflow-visible pb-[12px] md:pb-0 gap-[8px] md:gap-[4px] scrollbar-hide">
            {TECH_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative w-full text-left p-[16px_20px] rounded-[10px] font-bricolage text-[14.4px] font-semibold transition-all duration-200 border-none cursor-pointer flex-shrink-0 md:flex-shrink-1 ${
                    isActive 
                      ? "bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.1)] text-[#1746ea] before:content-[''] before:absolute before:left-0 before:top-[12px] before:bottom-[12px] before:w-[3px] before:bg-[#1746ea] before:rounded-r-[3px]" 
                      : "bg-transparent text-[#23272e] hover:bg-[rgba(23,70,234,0.04)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Tech Pills */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-row flex-wrap gap-[10px] content-start"
              >
                {activeTechs.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white border-[0.8px] border-[#f7f8ff] rounded-[100px] p-[8px_18px] font-bricolage text-[13px] font-semibold text-[#23272e] shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] hover:border-[#1746ea] hover:text-[#1746ea] hover:bg-[#f0f4ff] transition-colors duration-150 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default React.memo(ServicesTechStackSectionComponent);
