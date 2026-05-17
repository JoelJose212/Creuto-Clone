import { Metadata } from "next"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "Careers at Creuto - Join an AI-First Software Development Team",
  description: "Join Creuto and build AI-powered software used by real businesses. We're hiring engineers, designers, and product thinkers who ship fast and own what they build. Apply now.",
  keywords: ["Creuto Careers", "Software Engineer Jobs Odisha", "AI developer openings", "Product Manager roles", "Remote tech careers"],
  alternates: {
    canonical: "https://creuto.com/careers",
  },
}

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

export default function CareersListPage() {
  if (cache !== null) {
    return renderPage(cache)
  }

  const bodyPath = path.join(process.cwd(), "careers_extracted_body.html")
  const stylesPath = path.join(process.cwd(), "careers_extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading careers_extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading careers_extracted_styles.json:", error)
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
    .replace(/href="careers\/apply\.html"/g, 'href="/careers"')
    .replace(/href="careers\/apply[a-zA-Z0-9]*\.html"/g, 'href="/careers"')
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

  // 3. Map dynamic job card links (careers/[role-name].html -> /careers/[role-name])
  processedHtml = processedHtml.replace(/href="careers\/([a-zA-Z0-9_-]+)\.html"/g, 'href="/careers/$1"')

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
  return (
    <>
      {/* Load original compiled CSS stylesheets */}
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
        #creuto-careers-list-page,
        #creuto-careers-list-page h1,
        #creuto-careers-list-page h2,
        #creuto-careers-list-page h3,
        #creuto-careers-list-page h4,
        #creuto-careers-list-page h5,
        #creuto-careers-list-page h6,
        #creuto-careers-list-page p,
        #creuto-careers-list-page span,
        #creuto-careers-list-page li,
        #creuto-careers-list-page a,
        #creuto-careers-list-page button,
        #creuto-careers-list-page label,
        #creuto-careers-list-page div,
        #creuto-careers-list-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the processed body */}
      <div id="creuto-careers-list-page" dangerouslySetInnerHTML={{ __html: data.processedHtml }} />
    </>
  )
}
