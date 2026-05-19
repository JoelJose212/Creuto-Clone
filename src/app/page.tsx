import { Metadata } from "next"
import fs from "fs"
import path from "path"
import HeroSection from "@/components/sections/HeroSection"
import ConnectStatsSection from "@/components/sections/ConnectStatsSection"
import BrandsSection from "@/components/sections/BrandsSection"
import WhyChooseSection from "@/components/sections/WhyChooseSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ServicesSection from "@/components/sections/ServicesSection"
import AwardsQuoteSection from "@/components/sections/AwardsQuoteSection"
import TechStackAISection from "@/components/sections/TechStackAISection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import ProcessSection from "@/components/sections/ProcessSection"
import IndustriesSection from "@/components/sections/IndustriesSection"
import FAQSection from "@/components/sections/FAQSection"
import ConnectSection from "@/components/sections/ConnectSection"
import FooterSection from "@/components/sections/FooterSection"

export const metadata: Metadata = {
  title: "AI-First Product Development - Build Intelligent Software | Creuto",
  description: "Creuto builds high-performance AI-powered software products for startups and enterprises. Custom software development, mobile apps, and AI solutions designed to accelerate business growth.",
  keywords: ["Custom Software Development", "AI Solutions", "Mobile App Development", "Creuto", "Product Engineering"],
  alternates: {
    canonical: "https://creuto.com",
  },
}

// Helper to remove CSS layers dynamically
function unlayerCSS(css: string): string {
  let result = ""
  let i = 0
  while (i < css.length) {
    if (css.substring(i, i + 12) === "@layer mui {") {
      i += 12
      let braceCount = 1
      let j = i
      while (j < css.length && braceCount > 0) {
        if (css[j] === "{") braceCount++
        else if (css[j] === "}") braceCount--
        j++
      }
      const layerContent = css.substring(i, j - 1)
      result += unlayerCSS(layerContent)
      i = j
    } else if (css.substring(i, i + 11) === "@layer mui{") {
      i += 11
      let braceCount = 1
      let j = i
      while (j < css.length && braceCount > 0) {
        if (css[j] === "{") braceCount++
        else if (css[j] === "}") braceCount--
        j++
      }
      const layerContent = css.substring(i, j - 1)
      result += unlayerCSS(layerContent)
      i = j
    } else {
      result += css[i]
      i++
    }
  }
  return result
}

export default function HomePage() {
  const stylesPath = path.join(process.cwd(), "index_extracted_styles.json")
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading index_extracted_styles.json:", error)
  }

  const unlayeredInlineStyles = stylesConfig.inlineStyles.map((styleBlock) => {
    const cssContent = styleBlock
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "")
    return unlayerCSS(cssContent)
  })

  return (
    <>
      {/* Load original CSS stylesheets */}
      {stylesConfig.styles.map((href, index) => {
        const processedHref = href.replace(/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {/* Inject Emotion/MUI global and local inline styling layers */}
      {unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      {/* Enforce correct Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #creuto-homepage,
        #creuto-homepage h1,
        #creuto-homepage h2,
        #creuto-homepage h3,
        #creuto-homepage h4,
        #creuto-homepage h5,
        #creuto-homepage h6,
        #creuto-homepage p,
        #creuto-homepage span,
        #creuto-homepage li,
        #creuto-homepage a,
        #creuto-homepage button,
        #creuto-homepage label,
        #creuto-homepage div,
        #creuto-homepage .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <main id="creuto-homepage">
        <HeroSection />
        <ConnectStatsSection />
        <BrandsSection />
        <WhyChooseSection />
        <ProjectsSection />
        <ServicesSection />
        <AwardsQuoteSection />
        <TechStackAISection />
        <TestimonialsSection />
        <ProcessSection />
        <IndustriesSection />
        <FAQSection />
        <ConnectSection />
        <FooterSection />
      </main>
    </>
  )
}
