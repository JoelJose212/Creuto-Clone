import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import HeroSection from "@/components/sections/HeroSection"
import MarqueeSection from "@/components/sections/MarqueeSection"
import WhyCreutoSection from "@/components/sections/WhyCreutoSection"
import CaseStudiesSection from "@/components/sections/CaseStudiesSection"
import FrameworkSection from "@/components/sections/FrameworkSection"
import ServicesSection from "@/components/sections/ServicesSection"
import StatsSection from "@/components/sections/StatsSection"
import TechStackSection from "@/components/sections/TechStackSection"
import AwardsSection from "@/components/sections/AwardsSection"
import CreutoAISection from "@/components/sections/CreutoAISection"
import ProcessSection from "@/components/sections/ProcessSection"
import IndustriesSection from "@/components/sections/IndustriesSection"
import FAQSection from "@/components/sections/FAQSection"
import CTASection from "@/components/sections/CTASection"
import Footer from "@/components/layout/Footer"

// Lazy load Testimonials for performance
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center bg-surface">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue border-t-transparent"></div>
    </div>
  ),
})

export const metadata: Metadata = {
  title: "Creuto | Premier AI & Software Engineering Partner",
  description: "Creuto specializes in building high-performance custom software, mobile apps, and AI-driven solutions for ambitious startups and enterprises globally.",
  keywords: ["Software Development", "AI Engineering", "Mobile Apps", "MVP Builder", "Product Engineering"],
  openGraph: {
    title: "Creuto | Premier AI & Software Engineering Partner",
    description: "Creuto specializes in building high-performance custom software, mobile apps, and AI-driven solutions.",
    url: "https://creuto.com",
    siteName: "Creuto",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <WhyCreutoSection />
      <CaseStudiesSection />
      <FrameworkSection />
      <ServicesSection />
      <StatsSection />
      <TechStackSection />
      <AwardsSection />
      <Suspense fallback={<div>Loading Testimonials...</div>}>
        <TestimonialsSection />
      </Suspense>
      <CreutoAISection />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
