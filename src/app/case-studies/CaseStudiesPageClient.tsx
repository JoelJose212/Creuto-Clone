"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";

import Footer from "@/components/layout/Footer";
import CaseStudiesHeroSection from "@/components/sections/case-studies/CaseStudiesHeroSection";
import CaseStudiesPartnerMarquee from "@/components/sections/case-studies/CaseStudiesPartnerMarquee";
import CaseStudiesCTASection from "@/components/sections/case-studies/CaseStudiesCTASection";

const SkeletonGrid = () => (
  <section className="bg-[#ffffff] py-[80px] px-[5%] w-full min-h-[500px]">
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="w-[150px] h-[38px] bg-gray-200 animate-pulse mb-[8px] rounded" />
      <div className="w-[400px] h-[26px] bg-gray-100 animate-pulse mb-[40px] rounded" />
      <div className="flex flex-row flex-wrap gap-[8px] mb-[48px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-[100px] h-[32px] bg-gray-100 animate-pulse rounded-[100px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[24px]">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-[24px] bg-[#ffffff] border-[0.8px] border-[#f8faff] shadow-[0_0_12px_0_rgba(77,77,77,0.08)] overflow-hidden flex flex-col h-[380px]">
            <div className="h-[200px] w-full bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
            <div className="p-[24px] flex flex-col gap-[12px] flex-1">
              <div className="h-[24px] w-[80%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
              <div className="h-[16px] w-[60%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
              <div className="h-[16px] w-[100%] bg-[linear-gradient(90deg,#f0f0f0,#e0e0e0,#f0f0f0)] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded mt-[4px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CaseStudiesGridSection = dynamic(
  () => import("@/components/sections/case-studies/CaseStudiesGridSection"),
  { ssr: false }
);

export default function CaseStudiesPageClient() {
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll();
  
  // Transform background color from white to blue as user scrolls down from hero
  const barColor = useTransform(
    scrollY,
    [0, 200],
    ["#ffffff", "#1746ea"]
  );

  return (
    <main className="flex flex-col min-h-screen">
      {/* Global Scroll Progress Indicator */}
      <motion.div
        className="fixed left-0 right-0 h-[3px] z-[49] transition-all duration-300"
        style={{ 
          scaleX: scrollYProgress, 
          transformOrigin: "left",
          top: "72px",
          backgroundColor: barColor
        }}
      />

      {/* Page Transition Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <CaseStudiesHeroSection />
        <CaseStudiesPartnerMarquee />
        
        <Suspense fallback={<SkeletonGrid />}>
          <CaseStudiesGridSection />
        </Suspense>
        
        <CaseStudiesCTASection />
      </motion.div>
      
      <Footer />
    </main>
  );
}
