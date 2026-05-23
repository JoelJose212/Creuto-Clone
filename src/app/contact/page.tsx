import { Metadata } from "next"
import fs from "fs"
import path from "path"
import ContactHydration from "@/components/layout/ContactHydration"

export const metadata: Metadata = {
  title: "Contact Aanandi TechnoSoft - Book a Free Strategy Call",
  description: "Got an idea for an AI product, mobile app, or custom software? Talk to the Aanandi TechnoSoft team. Book a free strategy call  no commitment, just a clear roadmap to launch.",
  keywords: ["Aanandi TechnoSoft", "Book Call Aanandi TechnoSoft", "Custom Software Consultation", "AI Development Odisha", "Aanandi TechnoSoft Offices"],
  alternates: {
    canonical: "https://aanandi.in/contact",
  },
  openGraph: {
    title: "Contact Aanandi TechnoSoft - Book a Free Strategy Call",
    description: "Got an idea for an AI product, mobile app, or custom software? Talk to the Aanandi TechnoSoft team. Book a free strategy call.",
    url: "https://aanandi.in/contact",
    siteName: "Aanandi TechnoSoft",
    images: [
      {
        url: "/img/meta/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Aanandi TechnoSoft",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aanandi TechnoSoft - Book a Free Strategy Call",
    description: "Got an idea for an AI product, mobile app, or custom software? Talk to the Aanandi TechnoSoft team.",
    images: ["/img/meta/meta-image.png"],
  },
}

// Cache interface to completely eliminate disk I/O, regex replacements, and CSS parsing overhead on subsequent requests.
interface CacheData {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

let cache: CacheData | null = null

// Helper to remove CSS cascade layers dynamically.
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

export default function ContactPage() {
  // If static contents are already processed and cached in memory, serve them instantly (<1ms)
  if (cache !== null) {
    return (
      <ContactHydration
        processedHtml={cache.processedHtml}
        styles={cache.styles}
        unlayeredInlineStyles={cache.unlayeredInlineStyles}
      />
    )
  }

  // Paths to extracted content files
  const bodyPath = path.join(process.cwd(), "contact_extracted_body.html")
  const stylesPath = path.join(process.cwd(), "contact_extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading contact_extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading contact_extracted_styles.json:", error)
  }

  // 1. Convert all relative asset paths to absolute (starting with '/')
  let processedHtml = bodyHtml
    .replace(/(["'\s])(img|icons|favicon)\//g, "$1/$2/")
    .replace(/(["'\s])_next\//g, "$1/cloned_next/")
    .replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2")

  // 2. Map cloned static navigation .html links to clean Next.js routes
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

  // Map sub-services inside the footer
  processedHtml = processedHtml
    .replace(/href="services\/custom-software-development\.html"/g, 'href="/services"')
    .replace(/href="services\/mobile-apps-development\.html"/g, 'href="/services"')
    .replace(/href="services\/web-app-development\.html"/g, 'href="/services"')
    .replace(/href="services\/ai-engineering-services\.html"/g, 'href="/services"')
    .replace(/href="services\/devops-cloud-engineering\.html"/g, 'href="/services"')
    .replace(/href="services\/mvp-development\.html"/g, 'href="/services"')

  // 3. Strip all dynamic srcset / srcSet attributes
  processedHtml = processedHtml
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssrcSet="[^"]*"/gi, '')

  // 4. Overwrite pre-rendered entrance animation opacities (opacity:0)
  processedHtml = processedHtml
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/transform\s*:\s*translateX\(-40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateX\(40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(30px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(40px\)/gi, 'transform:none')

  // 5. Compute unlayered inline styles
  const unlayeredInlineStyles = stylesConfig.inlineStyles.map((styleBlock) => {
    const cssContent = styleBlock
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "")
    return unlayerCSS(cssContent)
  })

  // Populate server cache
  cache = {
    processedHtml,
    styles: stylesConfig.styles,
    unlayeredInlineStyles,
  }

  return (
    <ContactHydration
      processedHtml={cache.processedHtml}
      styles={cache.styles}
      unlayeredInlineStyles={cache.unlayeredInlineStyles}
    />
  )
}
