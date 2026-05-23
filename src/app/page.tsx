import { Metadata } from "next"
import fs from "fs"
import path from "path"
import ServicesSection from "@/components/sections/ServicesSection"

export const metadata: Metadata = {
  title: "AI-First Product Development - Build Intelligent Software | Aanandi TechnoSoft",
  description: "Aanandi TechnoSoft LLP builds high-performance AI-powered software products for startups and enterprises. Custom software development, mobile apps, and AI solutions designed to accelerate business growth.",
  keywords: ["Custom Software Development", "AI Solutions", "Mobile App Development", "Aanandi TechnoSoft", "Product Engineering"],
  alternates: {
    canonical: "https://aanandi.in",
  },
}

interface CacheData {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

let cache: CacheData | null = null

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
  if (cache !== null) {
    return renderPage(cache)
  }

  const bodyPath = path.join(process.cwd(), "index_extracted_body.html")
  const stylesPath = path.join(process.cwd(), "index_extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading index_extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading index_extracted_styles.json:", error)
  }

  // 1. Convert relative asset paths to absolute (starting with '/')
  let processedHtml = bodyHtml
    .replace(/(["'\s])(img|icons|favicon)\//g, "$1/$2/")
    .replace(/(["'\s])_next\//g, "$1/cloned_next/")
    .replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2")

  // 2. Map static navigation .html links to clean Next.js routes
  processedHtml = processedHtml
    .replace(/href="ai\.html"/g, 'href="/ai"')
    .replace(/href="about\.html"/g, 'href="/about"')
    .replace(/href="services\.html"/g, 'href="/services"')
    .replace(/href="case-studies\.html"/g, 'href="/case-studies"')
    .replace(/href="contact\.html"/g, 'href="/contact"')
    .replace(/href="careers\.html"/g, 'href="/careers"')
    .replace(/href="portfolio\.html"/g, 'href="/portfolio"')
    .replace(/href="blog\.html"/g, 'href="/blogs"')
    .replace(/href="index\.html"/g, 'href="/"')

  // Map sub-services inside body/footer
  processedHtml = processedHtml
    .replace(/href="services\/custom-software-development\.html"/g, 'href="/services"')
    .replace(/href="services\/mobile-apps-development\.html"/g, 'href="/services"')
    .replace(/href="services\/web-app-development\.html"/g, 'href="/services"')
    .replace(/href="services\/ai-engineering-services\.html"/g, 'href="/services"')
    .replace(/href="services\/devops-cloud-engineering\.html"/g, 'href="/services"')
    .replace(/href="services\/mvp-development\.html"/g, 'href="/services"')

  // 3. Map dynamic sub-routes (e.g. careers detail and blogs detail)
  processedHtml = processedHtml
    .replace(/href="careers\/([a-zA-Z0-9_-]+)\.html"/g, 'href="/careers/$1"')
    .replace(/href="blog\/([a-zA-Z0-9_-]+)\.html"/g, 'href="/blogs/$1"')

  // 4. Overwrite pre-rendered entrance animation opacities (opacity:0 -> opacity:1)
  processedHtml = processedHtml
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/transform\s*:\s*translateX\(-40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateX\(40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(20px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(30px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*scale\(0\.95\)/gi, 'transform:none')
    .replace(/transform\s*:\s*scale\(0\.98\)/gi, 'transform:none')

  // 5. Compute unlayered inline styles
  const unlayeredInlineStyles = stylesConfig.inlineStyles.map((styleBlock) => {
    const cssContent = styleBlock
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "")
    return unlayerCSS(cssContent)
  })

  // Populate cache
  cache = {
    processedHtml,
    styles: stylesConfig.styles,
    unlayeredInlineStyles,
  }

  return renderPage(cache)
}

function renderPage(data: CacheData) {
  const servicesStartMarker = '<div class="MuiBox-root mui-uzl9bz">'
  const servicesEndMarker = '<section class="MuiBox-root mui-157rcvf">'

  const startIdx = data.processedHtml.indexOf(servicesStartMarker)
  const endIdx = data.processedHtml.indexOf(servicesEndMarker)

  let beforeHtml = data.processedHtml
  let afterHtml = ""
  let hasSplit = false
  
  if (startIdx !== -1 && endIdx !== -1) {
    beforeHtml = data.processedHtml.substring(0, startIdx)
    afterHtml = data.processedHtml.substring(endIdx)
    hasSplit = true
  }

  return (
    <>
      {/* Load original CSS stylesheets */}
      {data.styles.map((href, index) => {
        const processedHref = href.replace(/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {/* Inject Emotion/MUI global and local inline styling layers */}
      {data.unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      {/* Enforce correct Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #aanandi-homepage,
        #aanandi-homepage h1,
        #aanandi-homepage h2,
        #aanandi-homepage h3,
        #aanandi-homepage h4,
        #aanandi-homepage h5,
        #aanandi-homepage h6,
        #aanandi-homepage p,
        #aanandi-homepage span,
        #aanandi-homepage li,
        #aanandi-homepage a,
        #aanandi-homepage button,
        #aanandi-homepage label,
        #aanandi-homepage div,
        #aanandi-homepage .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the dynamic parsed body layout */}
      <div id="aanandi-homepage">
        {hasSplit ? (
          <>
            <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />
            <ServicesSection />
            <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: data.processedHtml }} />
        )}
      </div>
    </>
  )
}
