"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { servicesData, ServiceItem } from "@/constants/servicesData";

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const isEven = index % 2 === 0;
  
  const contentVariants: Variants = {
    hidden: { opacity: 0, x: isEven ? 40 : -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0.6, scale: 1.03 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  // Helper to convert hex to rgb string for rgba
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
  };
  
  const rgbColor = hexToRgb(service.color);

  return (
    <div 
      className={`w-full min-h-[520px] flex flex-col md:flex-row ${!isEven ? 'md:flex-row-reverse' : ''} ${index % 2 !== 0 ? 'bg-[#f8f8f8]' : 'bg-[#ffffff]'} relative overflow-hidden`}
      ref={ref}
    >
      {/* Image Side */}
      <motion.div 
        className="w-full md:w-1/2 h-[240px] md:h-auto md:min-h-[520px] relative overflow-hidden"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Image 
          src={service.image} 
          alt={service.title} 
          fill 
          className="object-cover" 
        />
      </motion.div>

      {/* Content Side */}
      <motion.div 
        className="w-full md:w-1/2 flex items-center p-[32px_24px] md:p-[64px_80px]"
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col items-start w-full max-w-[600px] mx-auto">
          <div 
            className="font-bricolage text-[11px] font-bold uppercase tracking-[0.15em] mb-[12px]"
            style={{ color: service.color }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
          
          <h2 className="font-bricolage text-[28px] md:text-[32px] font-bold tracking-[-0.64px] text-[#23272e] leading-[1.2] md:leading-[36.8px] mb-[16px]">
            {service.title}
          </h2>
          
          <p className="font-bricolage text-[15.2px] font-medium text-[#666666] leading-[1.7] mb-[28px]">
            {service.description}
          </p>

          <div className="flex flex-row flex-wrap gap-[8px]">
            {service.tags.map((tag, i) => (
              <div 
                key={i}
                className="rounded-[100px] border-[0.8px] px-[14px] py-[5px] font-bricolage text-[12px] font-semibold transition-all duration-300"
                style={{ 
                  borderColor: `rgba(${rgbColor}, 0.3)`,
                  backgroundColor: `rgba(${rgbColor}, 0.08)`,
                  color: service.color
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${rgbColor}, 0.15)`;
                  e.currentTarget.style.borderColor = `rgba(${rgbColor}, 0.6)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = `rgba(${rgbColor}, 0.08)`;
                  e.currentTarget.style.borderColor = `rgba(${rgbColor}, 0.3)`;
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <motion.button
            className="mt-[32px] rounded-[10px] border-[0.8px] bg-transparent font-bricolage text-[14px] font-bold px-[24px] py-[10px] flex items-center justify-center gap-[8px] transition-all duration-300"
            style={{ 
              borderColor: service.color,
              color: service.color
            }}
            whileHover="hover"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = service.color;
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.boxShadow = `0px 4px 12px 0px rgba(${rgbColor}, 0.3)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = service.color;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>Check More</span>
            <motion.div variants={{ hover: { x: 4 } }}>
              <ArrowRight size={16} />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesListSection() {
  return (
    <section className="flex flex-col w-full">
      {servicesData.map((service, index) => (
        <ServiceRow key={service.id} service={service} index={index} />
      ))}
    </section>
  );
}
