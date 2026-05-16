"use client";

import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import ServicesHeroSection from "@/components/sections/services/ServicesHeroSection";
import ServicesStatsSection from "@/components/sections/services/ServicesStatsSection";
import ServicesAwardsSection from "@/components/sections/services/ServicesAwardsSection";
import ServicesTechStackSection from "@/components/sections/services/ServicesTechStackSection";
import ServicesProcessSection from "@/components/sections/services/ServicesProcessSection";
import ServicesFAQSection from "@/components/sections/services/ServicesFAQSection";
import ServicesCTASection from "@/components/sections/services/ServicesCTASection";

const ServicesListSkeleton = () => (
  <div className="w-full flex flex-col">
    {[...Array(7)].map((_, i) => (
      <div key={i} className={`w-full min-h-[520px] flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse bg-[#f8f8f8]' : 'bg-[#ffffff]'}`}>
        <div className="w-full md:w-1/2 h-[240px] md:h-auto md:min-h-[520px] bg-gray-200 animate-pulse"></div>
        <div className="w-full md:w-1/2 flex items-center p-[32px_24px] md:p-[64px_80px]">
          <div className="flex flex-col items-start w-full max-w-[600px] mx-auto">
            <div className="w-[30px] h-[14px] bg-gray-200 animate-pulse mb-[12px] rounded"></div>
            <div className="w-[300px] h-[36px] bg-gray-200 animate-pulse mb-[16px] rounded"></div>
            <div className="w-full h-[60px] bg-gray-100 animate-pulse mb-[28px] rounded"></div>
            <div className="flex flex-row flex-wrap gap-[8px]">
              <div className="w-[80px] h-[26px] bg-gray-100 animate-pulse rounded-[100px]"></div>
              <div className="w-[100px] h-[26px] bg-gray-100 animate-pulse rounded-[100px]"></div>
              <div className="w-[90px] h-[26px] bg-gray-100 animate-pulse rounded-[100px]"></div>
            </div>
            <div className="w-[140px] h-[40px] bg-gray-200 animate-pulse mt-[32px] rounded-[10px]"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ServicesListSection = dynamic(
  () => import("@/components/sections/services/ServicesListSection"),
  { ssr: false }
);

export default function ServicesPageClient() {
  const { scrollYProgress } = useScroll();
  const listSectionRef = useRef<HTMLDivElement>(null);

  const scrollToServices = () => {
    if (listSectionRef.current) {
      listSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      <AnnouncementBanner />
      
      {/* Global Scroll Progress Indicator */}
      <motion.div
        className="fixed left-0 right-0 h-[3px] bg-[#1746ea] z-[49] transition-all duration-300"
        style={{ 
          scaleX: scrollYProgress, 
          transformOrigin: "left",
          top: "var(--announcement-height, 72px)"
        }}
      />

      {/* Page Transition Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ServicesHeroSection onExploreClick={scrollToServices} />
        
        <div ref={listSectionRef}>
          <Suspense fallback={<ServicesListSkeleton />}>
            <ServicesListSection />
          </Suspense>
        </div>
        
        <ServicesStatsSection />
        <ServicesAwardsSection />
        <ServicesTechStackSection />
        <ServicesProcessSection />
        <ServicesFAQSection />
        <ServicesCTASection />
      </motion.div>
      
      <Footer />
    </main>
  );
}
