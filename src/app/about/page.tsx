import { Metadata } from "next"
import fs from "fs"
import path from "path"

export function generateMetadata(): Metadata {
  return {
    title: "About Aanandi TechnoSoft - Our Story, Team & Mission in AI Software Development",
    description: "Meet the team behind Aanandi TechnoSoft - building AI-powered software, mobile apps, and custom platforms for businesses worldwide. Our story, values, and vision.",
    keywords: ["Aanandi TechnoSoft", "AI Software Team", "Custom Software Agency", "Aanandi TechnoSoft Mission", "AI Development Company"],
    alternates: {
      canonical: "https://aanandi.in/about",
    },
    openGraph: {
      title: "About Aanandi TechnoSoft - Our Story, Team & Mission in AI Software Development",
      description: "Meet the team behind Aanandi TechnoSoft - building AI-powered software, mobile apps, and custom platforms for businesses worldwide. Our story, values, and vision.",
      url: "https://aanandi.in/about",
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
      title: "About Aanandi TechnoSoft - Our Story, Team & Mission in AI Software Development",
      description: "Meet the team behind Aanandi TechnoSoft - building AI-powered software, mobile apps, and custom platforms for businesses worldwide.",
      images: ["/img/meta/meta-image.png"],
    },
  }
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

export default function AboutPage() {
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
          #aanandi-about-cloned-page,
          #aanandi-about-cloned-page h1,
          #aanandi-about-cloned-page h2,
          #aanandi-about-cloned-page h3,
          #aanandi-about-cloned-page h4,
          #aanandi-about-cloned-page h5,
          #aanandi-about-cloned-page h6,
          #aanandi-about-cloned-page p,
          #aanandi-about-cloned-page span,
          #aanandi-about-cloned-page li,
          #aanandi-about-cloned-page a,
          #aanandi-about-cloned-page button,
          #aanandi-about-cloned-page label,
          #aanandi-about-cloned-page div,
          #aanandi-about-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }
        `}} />

        {/* Render the beautifully processed page body */}
        <div id="aanandi-about-cloned-page" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
      </>
    )
  }

  // Paths to extracted content files
  const bodyPath = path.join(process.cwd(), "about_extracted_body.html")
  const stylesPath = path.join(process.cwd(), "about_extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading about_extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading about_extracted_styles.json:", error)
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

  // 3. Strip all dynamic srcset / srcSet attributes
  processedHtml = processedHtml
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssrcSet="[^"]*"/gi, '')

  // 4. Overwrite pre-rendered entrance animation opacities (opacity:0)
  processedHtml = processedHtml
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/translateY\(30px\)/gi, 'translateY(0)')

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
        #aanandi-about-cloned-page,
        #aanandi-about-cloned-page h1,
        #aanandi-about-cloned-page h2,
        #aanandi-about-cloned-page h3,
        #aanandi-about-cloned-page h4,
        #aanandi-about-cloned-page h5,
        #aanandi-about-cloned-page h6,
        #aanandi-about-cloned-page p,
        #aanandi-about-cloned-page span,
        #aanandi-about-cloned-page li,
        #aanandi-about-cloned-page a,
        #aanandi-about-cloned-page button,
        #aanandi-about-cloned-page label,
        #aanandi-about-cloned-page div,
        #aanandi-about-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a scoped container */}
      <div id="aanandi-about-cloned-page" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
    </>
  )
}
