import { Metadata } from "next"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "AI & Custom Software Insights | Aanandi TechnoSoft Blog",
  description: "Read the latest engineering articles, product strategy guides, and AI development insights from Aanandi TechnoSoft's design and software engineering team.",
  keywords: ["AI Engineering Blog", "Custom CRM Strategy", "Mobile Application Trends", "Aanandi TechnoSoft Blog", "Software Development Insights"],
  alternates: {
    canonical: "https://aanandi.in/blogs",
  },
  openGraph: {
    title: "AI & Custom Software Insights | Aanandi TechnoSoft Blog",
    description: "Read the latest engineering articles, product strategy guides, and AI development insights from Aanandi TechnoSoft's design and software engineering team.",
    url: "https://aanandi.in/blogs",
    siteName: "Aanandi TechnoSoft",
    images: [
      {
        url: "/img/meta/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Aanandi TechnoSoft Engineering Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

// Cache interface to completely eliminate disk I/O, regex replacements, and CSS parsing overhead on subsequent requests.
interface CacheData {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

let cache: CacheData | null = null

// Helper to remove CSS cascade layers (like "@layer mui { ... }") dynamically.
// Unlayered class styles are required so they can override Tailwind's unlayered resets (Preflight).
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

export default function BlogsPage() {
  // If static contents are already processed and cached in memory, serve them instantly (<1ms)
  if (cache !== null) {
    return (
      <>
        {/* Load original compiled CSS stylesheets */}
        {cache.styles.map((href, index) => {
          const processedHref = href.replace(/_next\//g, "cloned_next/")
          const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
          return <link key={index} rel="stylesheet" href={absoluteHref} />
        })}

        {/* Inject unlayered CSS style blocks directly from memory cache */}
        {cache.unlayeredInlineStyles.map((unlayeredCss, index) => (
          <style
            key={`inline-${index}`}
            dangerouslySetInnerHTML={{ __html: unlayeredCss }}
          />
        ))}

        {/* Enforce correct Bricolage Grotesque font family */}
        <style dangerouslySetInnerHTML={{ __html: `
          #aanandi-blogs-cloned-page,
          #aanandi-blogs-cloned-page h1,
          #aanandi-blogs-cloned-page h2,
          #aanandi-blogs-cloned-page h3,
          #aanandi-blogs-cloned-page h4,
          #aanandi-blogs-cloned-page h5,
          #aanandi-blogs-cloned-page h6,
          #aanandi-blogs-cloned-page p,
          #aanandi-blogs-cloned-page span,
          #aanandi-blogs-cloned-page li,
          #aanandi-blogs-cloned-page a,
          #aanandi-blogs-cloned-page button,
          #aanandi-blogs-cloned-page label,
          #aanandi-blogs-cloned-page div,
          #aanandi-blogs-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }
        `}} />

        {/* Render the beautifully processed page body */}
        <div id="aanandi-blogs-cloned-page" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
      </>
    )
  }

  // Paths to extracted content files
  const bodyPath = path.join(process.cwd(), "blog_extracted_body.html")
  const stylesPath = path.join(process.cwd(), "blog_extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading blog_extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading blog_extracted_styles.json:", error)
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

  // 3. Map list card links to clean dynamic Next.js blog slug routes
  processedHtml = processedHtml
    .replace(/href="(how-smes-can-leverage-ai|your-customers-are-on-mobile|why-every-business-owner-should-invest-in-custom-software|how-aanandi-help-businesses-scale-smartly|the-beginning-of-something-real)\.html"/g, 'href="/blogs/$1"')

  // 4. Strip all dynamic srcset / srcSet attributes
  processedHtml = processedHtml
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssrcSet="[^"]*"/gi, '')

  // 5. Overwrite pre-rendered entrance animation opacities (opacity:0)
  processedHtml = processedHtml
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/translateY\(30px\)/gi, 'translateY(0)')

  // 6. Compute unlayered inline styles
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
    <>
      {/* Load original compiled CSS stylesheets */}
      {cache.styles.map((href, index) => {
        const processedHref = href.replace(/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {/* Inject Emotion/MUI global and local inline styling layers */}
      {cache.unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      {/* Enforce correct Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #aanandi-blogs-cloned-page,
        #aanandi-blogs-cloned-page h1,
        #aanandi-blogs-cloned-page h2,
        #aanandi-blogs-cloned-page h3,
        #aanandi-blogs-cloned-page h4,
        #aanandi-blogs-cloned-page h5,
        #aanandi-blogs-cloned-page h6,
        #aanandi-blogs-cloned-page p,
        #aanandi-blogs-cloned-page span,
        #aanandi-blogs-cloned-page li,
        #aanandi-blogs-cloned-page a,
        #aanandi-blogs-cloned-page button,
        #aanandi-blogs-cloned-page label,
        #aanandi-blogs-cloned-page div,
        #aanandi-blogs-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a scoped container */}
      <div id="aanandi-blogs-cloned-page" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
    </>
  )
}
