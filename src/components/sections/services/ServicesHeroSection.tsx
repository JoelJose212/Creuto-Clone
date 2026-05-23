"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const servicesNames = [
  "App Development",
  "UI/UX Design",
  "Custom Software",
  "Artificial Intelligence",
  "Web Development",
  "DevOps Operation"
];

const marqueeColors = [
  "#f59e0b", // amber
  "#ec4899", // pink
  "#1746ea", // blue
  "#8b5cf6", // purple
  "#22c55e", // green
  "#06b6d4", // cyan
  "#f43f5e"  // rose
];

interface ServicesHeroSectionProps {
  onExploreClick?: () => void;
}

export default function ServicesHeroSection({ onExploreClick }: ServicesHeroSectionProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="bg-[#ffffff] flex flex-col w-full">
      <div className="min-h-[85vh] flex items-center pt-[120px] pb-[80px] px-[5%] w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-0 w-full">
          
          {/* Left Column */}
          <motion.div 
            className="flex flex-col justify-center lg:pr-[64px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[20px]">
              OUR SERVICES
            </div>
            
            <h1 className="font-bricolage text-[36px] md:text-[44px] font-bold tracking-[-0.88px] leading-[1.2] md:leading-[48.4px] text-[#23272e] mb-[24px]">
              Comprehensive solutions built to empower growth
            </h1>
            
            <div className="flex flex-col gap-[12px]">
              {[
                "Our team brings deep industry and domain expertise to every project.",
                "We utilize the latest technology to build innovative, future-ready products.",
                "We create design and user interfaces that blend both beauty and scalability.",
                "We follow agile practices to ensure fast and efficient delivery."
              ].map((text, i) => (
                <div key={i} className="flex flex-row items-start gap-[12px]">
                  <div className="w-[20px] h-[20px] rounded-full bg-[rgba(23,70,234,0.08)] flex items-center justify-center flex-shrink-0 mt-[2px]">
                    <Check size={12} className="text-[#1746ea]" />
                  </div>
                  <div className="font-bricolage text-[15.2px] font-medium text-[#666666] leading-[1.6]">
                    {text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-[36px] flex flex-row items-center gap-[24px]">
              <button className="bg-[#1746ea] text-white rounded-[10px] px-[28px] py-[12px] font-bricolage text-[14px] font-bold hover:bg-[#1d4ed8] transition-colors">
                Free Strategy Call
              </button>
              <button 
                onClick={onExploreClick}
                className="bg-transparent text-[#23272e] border-none p-0 font-bricolage text-[14px] font-bold hover:text-[#1746ea] transition-colors"
              >
                Explore Services ↓
              </button>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="w-full h-[400px] lg:h-[520px] relative rounded-[24px] overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.1)]"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <Image 
              src="/img/services/hero.webp" 
              alt="Aanandi Services Hero" 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

        </div>
      </div>

      {/* Marquee Strip */}
      <div className="w-full border-y border-[#f7f8ff] py-[16px] bg-[#f8faff] overflow-hidden relative group">
        <div className="absolute top-0 bottom-0 left-0 w-[80px] bg-gradient-to-r from-[#f8faff] to-transparent z-[2]" />
        <div className="absolute top-0 bottom-0 right-0 w-[80px] bg-gradient-to-l from-[#f8faff] to-transparent z-[2]" />
        
        <div className="flex flex-row w-max animate-marqueeLeft group-hover:[animation-play-state:paused]">
          {[...servicesNames, ...servicesNames].map((name, index) => (
            <div key={index} className="inline-flex items-center gap-[12px] mr-[48px]">
              <div 
                className="w-[8px] h-[8px] rounded-full" 
                style={{ backgroundColor: marqueeColors[index % marqueeColors.length] }} 
              />
              <span className="font-bricolage text-[14px] font-bold text-[#23272e] tracking-[0.01em] whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
