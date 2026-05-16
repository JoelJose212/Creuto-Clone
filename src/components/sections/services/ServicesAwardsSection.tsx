"use client";

import React from "react";

const awardLabels = [
  "App Developers",
  "Top Award",
  "Design Award",
  "Best 2024",
  "Top 50",
  "Enterprise",
  "Clutch Top",
  "React Native",
  "Custom Dev"
];

function ServicesAwardsSectionComponent() {
  return (
    <section className="bg-[#ffffff] py-[48px] w-full overflow-hidden">
      <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#666666] text-center mb-[32px]">
        AWARDS & RECOGNITIONS
      </div>
      
      <div className="w-full relative group">
        <div className="absolute top-0 bottom-0 left-0 w-[100px] bg-gradient-to-r from-white to-transparent z-[2] pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-[100px] bg-gradient-to-l from-white to-transparent z-[2] pointer-events-none" />
        
        <div className="flex flex-row w-max animate-marqueeLeft group-hover:[animation-play-state:paused]">
          {[...awardLabels, ...awardLabels].map((label, index) => (
            <div 
              key={index} 
              className="w-[140px] h-[56px] flex-shrink-0 rounded-[10px] bg-[#f8f8f8] border-[0.8px] border-[#f7f8ff] shadow-[0_2px_8px_0_rgba(0,0,0,0.02)] flex items-center justify-center mr-[20px] hover:bg-[#f0f4ff] hover:border-[rgba(23,70,234,0.2)] transition-colors duration-200"
            >
              <span className="font-bricolage text-[10px] font-bold uppercase text-[#666666] tracking-[0.08em] text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ServicesAwardsSectionComponent);
