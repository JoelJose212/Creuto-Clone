import { Metadata } from "next"
import fs from "fs"
import path from "path"

export const metadata: Metadata = {
  title: "AI Engineering Services - Machine Learning, ChatGPT & MLOps | Aanandi TechnoSoft",
  description: "Aanandi TechnoSoft LLP builds AI-powered products — from intelligent apps and predictive platforms to ChatGPT integrations and ML pipelines. Custom AI development for businesses that move fast.",
  keywords: ["AI Engineering", "Product Development", "ChatGPT Integration", "Machine Learning", "Custom Software"],
  alternates: {
    canonical: "https://aanandi.in/ai",
  },
  openGraph: {
    title: "AI Engineering Services - Machine Learning, ChatGPT & MLOps | Aanandi TechnoSoft",
    description: "Aanandi TechnoSoft LLP builds AI-powered products — from intelligent apps and predictive platforms to ChatGPT integrations and ML pipelines. Custom AI development for businesses that move fast.",
    url: "https://aanandi.in/ai",
    siteName: "Aanandi TechnoSoft",
    images: [
      {
        url: "/img/meta/meta-image.png",
        width: 1200,
        height: 630,
        alt: "Aanandi TechnoSoft AI Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Engineering Services - Machine Learning, ChatGPT & MLOps | Aanandi TechnoSoft",
    description: "Aanandi TechnoSoft LLP builds AI-powered products — from intelligent apps and predictive platforms to ChatGPT integrations and ML pipelines.",
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

export default function AiPage() {
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

        {/* Inject a tiny client-side script to hydrate the MUI FAQ accordions without React payloads */}
        <script dangerouslySetInnerHTML={{ __html: `
          if (typeof window !== 'undefined') {
            document.addEventListener('click', function(e) {
              const summary = e.target.closest('.MuiAccordionSummary-root') || e.target.closest('[class*="MuiAccordionSummary"]');
              if (summary) {
                const content = summary.nextElementSibling;
                if (content) {
                  const computed = window.getComputedStyle(content);
                  const isHidden = computed.display === 'none' || computed.visibility === 'hidden' || computed.height === '0px' || content.style.height === '0px';
                  
                  if (isHidden) {
                    content.style.display = 'block';
                    content.style.height = 'auto';
                    content.style.visibility = 'visible';
                    content.style.opacity = '1';
                  } else {
                    content.style.display = 'none';
                    content.style.height = '0px';
                    content.style.visibility = 'hidden';
                  }
                }
              }
            });
          }
        `}} />

        {/* Force override Tailwind global heading colors and enforce correct Bricolage Grotesque font family */}
        <style dangerouslySetInnerHTML={{ __html: `
          #aanandi-ai-cloned-page,
          #aanandi-ai-cloned-page h1,
          #aanandi-ai-cloned-page h2,
          #aanandi-ai-cloned-page h3,
          #aanandi-ai-cloned-page h4,
          #aanandi-ai-cloned-page h5,
          #aanandi-ai-cloned-page h6,
          #aanandi-ai-cloned-page p,
          #aanandi-ai-cloned-page span,
          #aanandi-ai-cloned-page li,
          #aanandi-ai-cloned-page a,
          #aanandi-ai-cloned-page button,
          #aanandi-ai-cloned-page label,
          #aanandi-ai-cloned-page div,
          #aanandi-ai-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }

          #aanandi-ai-cloned-page h1,
          #aanandi-ai-cloned-page h2,
          #aanandi-ai-cloned-page h3,
          #aanandi-ai-cloned-page h4,
          #aanandi-ai-cloned-page h5,
          #aanandi-ai-cloned-page h6,
          #aanandi-ai-cloned-page p,
          #aanandi-ai-cloned-page span,
          #aanandi-ai-cloned-page li,
          #aanandi-ai-cloned-page label,
          #aanandi-ai-cloned-page .MuiTypography-root {
            color: #ffffff !important;
          }

          /* Explicitly keep dark text on the cloned page's light/white sections (.mui-k7w9dk) */
          #aanandi-ai-cloned-page .mui-k7w9dk,
          #aanandi-ai-cloned-page .mui-k7w9dk h1,
          #aanandi-ai-cloned-page .mui-k7w9dk h2,
          #aanandi-ai-cloned-page .mui-k7w9dk h3,
          #aanandi-ai-cloned-page .mui-k7w9dk h4,
          #aanandi-ai-cloned-page .mui-k7w9dk h5,
          #aanandi-ai-cloned-page .mui-k7w9dk h6,
          #aanandi-ai-cloned-page .mui-k7w9dk p,
          #aanandi-ai-cloned-page .mui-k7w9dk span,
          #aanandi-ai-cloned-page .mui-k7w9dk li,
          #aanandi-ai-cloned-page .mui-k7w9dk label,
          #aanandi-ai-cloned-page .mui-k7w9dk .MuiTypography-root,
          #aanandi-ai-cloned-page .mui-k7w9dk strong {
            color: #23272e !important;
          }
        `}} />

        {/* Render the beautifully processed page body inside a white text wrapper */}
        <div id="aanandi-ai-cloned-page" className="text-white" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
      </>
    )
  }

  // Paths to extracted content files
  const bodyPath = path.join(process.cwd(), "extracted_body.html")
  const stylesPath = path.join(process.cwd(), "extracted_styles.json")

  let bodyHtml = ""
  let stylesConfig = { styles: [] as string[], inlineStyles: [] as string[] }

  try {
    bodyHtml = fs.readFileSync(bodyPath, "utf8")
  } catch (error) {
    console.error("Error reading extracted_body.html:", error)
  }

  try {
    const stylesContent = fs.readFileSync(stylesPath, "utf8")
    stylesConfig = JSON.parse(stylesContent)
  } catch (error) {
    console.error("Error reading extracted_styles.json:", error)
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

      {/* Inject a tiny client-side script to hydrate the MUI FAQ accordions without React payloads */}
      <script dangerouslySetInnerHTML={{ __html: `
        if (typeof window !== 'undefined') {
          document.addEventListener('click', function(e) {
            const summary = e.target.closest('.MuiAccordionSummary-root') || e.target.closest('[class*="MuiAccordionSummary"]');
            if (summary) {
              const content = summary.nextElementSibling;
              if (content) {
                const computed = window.getComputedStyle(content);
                const isHidden = computed.display === 'none' || computed.visibility === 'hidden' || computed.height === '0px' || content.style.height === '0px';
                
                if (isHidden) {
                  content.style.display = 'block';
                  content.style.height = 'auto';
                  content.style.visibility = 'visible';
                  content.style.opacity = '1';
                } else {
                  content.style.display = 'none';
                  content.style.height = '0px';
                  content.style.visibility = 'hidden';
                }
              }
            }
          });
        }
      `}} />

      {/* Force override Tailwind global heading colors and enforce correct Bricolage Grotesque font family in cloned content */}
      <style dangerouslySetInnerHTML={{ __html: `
        #aanandi-ai-cloned-page,
        #aanandi-ai-cloned-page h1,
        #aanandi-ai-cloned-page h2,
        #aanandi-ai-cloned-page h3,
        #aanandi-ai-cloned-page h4,
        #aanandi-ai-cloned-page h5,
        #aanandi-ai-cloned-page h6,
        #aanandi-ai-cloned-page p,
        #aanandi-ai-cloned-page span,
        #aanandi-ai-cloned-page li,
        #aanandi-ai-cloned-page a,
        #aanandi-ai-cloned-page button,
        #aanandi-ai-cloned-page label,
        #aanandi-ai-cloned-page div,
        #aanandi-ai-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }

        #aanandi-ai-cloned-page h1,
        #aanandi-ai-cloned-page h2,
        #aanandi-ai-cloned-page h3,
        #aanandi-ai-cloned-page h4,
        #aanandi-ai-cloned-page h5,
        #aanandi-ai-cloned-page h6,
        #aanandi-ai-cloned-page p,
        #aanandi-ai-cloned-page span,
        #aanandi-ai-cloned-page li,
        #aanandi-ai-cloned-page label,
        #aanandi-ai-cloned-page .MuiTypography-root {
          color: #ffffff !important;
        }

        /* Explicitly keep dark text on the cloned page's light/white sections (.mui-k7w9dk) */
        #aanandi-ai-cloned-page .mui-k7w9dk,
        #aanandi-ai-cloned-page .mui-k7w9dk h1,
        #aanandi-ai-cloned-page .mui-k7w9dk h2,
        #aanandi-ai-cloned-page .mui-k7w9dk h3,
        #aanandi-ai-cloned-page .mui-k7w9dk h4,
        #aanandi-ai-cloned-page .mui-k7w9dk h5,
        #aanandi-ai-cloned-page .mui-k7w9dk h6,
        #aanandi-ai-cloned-page .mui-k7w9dk p,
        #aanandi-ai-cloned-page .mui-k7w9dk span,
        #aanandi-ai-cloned-page .mui-k7w9dk li,
        #aanandi-ai-cloned-page .mui-k7w9dk label,
        #aanandi-ai-cloned-page .mui-k7w9dk .MuiTypography-root,
        #aanandi-ai-cloned-page .mui-k7w9dk strong {
          color: #23272e !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a white text wrapper */}
      <div id="aanandi-ai-cloned-page" className="text-white" dangerouslySetInnerHTML={{ __html: cache.processedHtml }} />
    </>
  )
}
