"use client";

import { useScroll, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Footer from "@/components/layout/Footer";

import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutStorySection from "@/components/sections/about/AboutStorySection";
import AboutProblemsSection from "@/components/sections/about/AboutProblemsSection";
import AboutHowWeWorkSection from "@/components/sections/about/AboutHowWeWorkSection";
import AboutNeverDoneSection from "@/components/sections/about/AboutNeverDoneSection";
import AboutWhyChooseSection from "@/components/sections/about/AboutWhyChooseSection";
import AboutRightPartnerSection from "@/components/sections/about/AboutRightPartnerSection";

const MeaningSkeleton = () => (
  <div className="w-full py-[80px] px-[5%] bg-[#ffffff] flex flex-col items-center">
    <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse mb-[20px] rounded-full"></div>
    <div className="w-[300px] h-[48px] bg-gray-200 animate-pulse mb-[64px] rounded-[10px]"></div>
    <div className="flex flex-row justify-center items-center gap-[24px] flex-wrap max-w-[1280px] w-full">
      <div className="w-[260px] h-[300px] bg-gray-100 animate-pulse rounded-[24px]"></div>
      <div className="w-[48px] h-[48px] bg-gray-100 animate-pulse rounded-full"></div>
      <div className="w-[260px] h-[300px] bg-gray-100 animate-pulse rounded-[24px]"></div>
      <div className="w-[48px] h-[48px] bg-gray-100 animate-pulse rounded-full"></div>
      <div className="w-[280px] h-[300px] bg-gray-100 animate-pulse rounded-[24px]"></div>
    </div>
  </div>
);

const LeadershipSkeleton = () => (
  <div className="w-full py-[80px] px-[5%] bg-[#f8f8f8]">
    <div className="max-w-[1280px] mx-auto w-full">
      <div className="w-[100px] h-[14px] bg-gray-200 animate-pulse mb-[16px] rounded-full"></div>
      <div className="w-[300px] h-[48px] bg-gray-200 animate-pulse mb-[48px] rounded-[10px]"></div>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[20px]">
        {[...Array(11)].map((_, i) => (
          <div key={i} className="bg-gray-100 animate-pulse rounded-[24px] h-[280px] w-full"></div>
        ))}
      </div>
    </div>
  </div>
);

const AboutMeaningSection = dynamic(
  () => import("@/components/sections/about/AboutMeaningSection"),
  { ssr: false }
);

const AboutLeadershipSection = dynamic(
  () => import("@/components/sections/about/AboutLeadershipSection"),
  { ssr: false }
);

export default function AboutPageClient() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="flex flex-col min-h-screen">
      <motion.div
        className="fixed top-[72px] left-0 right-0 h-[3px] bg-[#1746ea] z-[49]"
        style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <AboutHeroSection />
        <AboutStorySection />
        <AboutProblemsSection />
        
        <Suspense fallback={<MeaningSkeleton />}>
          <AboutMeaningSection />
        </Suspense>
        
        <AboutHowWeWorkSection />
        <AboutNeverDoneSection />
        <AboutWhyChooseSection />
        
        <Suspense fallback={<LeadershipSkeleton />}>
          <AboutLeadershipSection />
        </Suspense>
        
        <AboutRightPartnerSection />
      </motion.div>
      
      <Footer />
    </main>
  );
}
