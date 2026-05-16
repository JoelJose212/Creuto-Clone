"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function CaseStudiesPartnerMarquee() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const partners = Array.from({ length: 14 }, (_, i) => `/img/partners/${i + 1}.webp`);

  return (
    <motion.section 
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="bg-[#ffffff] border-y border-[#f8faff] py-[36px] w-full overflow-hidden relative"
    >
      <div className="absolute top-0 bottom-0 left-0 w-[100px] bg-gradient-to-r from-white to-transparent z-[2] pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-[100px] bg-gradient-to-l from-white to-transparent z-[2] pointer-events-none" />
      
      <div className="flex flex-row w-max animate-marqueeLeft group hover:[animation-play-state:paused]">
        {[...partners, ...partners].map((src, index) => (
          <div key={index} className="mr-[48px] flex-shrink-0 opacity-55 grayscale-[20%] hover:opacity-100 hover:grayscale-0 transition-all duration-200">
            <Image 
              src={src} 
              alt={`Partner Logo ${index + 1}`} 
              width={120} 
              height={40} 
              className="object-contain"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
