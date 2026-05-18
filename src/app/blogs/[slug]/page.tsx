import { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"

// Slugs mapping to provide high-fidelity dynamic SEO configurations
const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = {
  "how-smes-can-leverage-ai": {
    title: "How SMEs Can Leverage AI to Scale | Creuto Blog",
    description: "Learn how Small and Medium Enterprises can leverage artificial intelligence to optimize workflows, decrease operational costs, and build smarter capabilities.",
  },
  "your-customers-are-on-mobile": {
    title: "Your Customers Are On Mobile: Why Mobile First Matters | Creuto Blog",
    description: "Why building a custom, responsive mobile app is critical for customer retention, direct engagement, and scaling your modern business footprint.",
  },
  "why-every-business-owner-should-invest-in-custom-software": {
    title: "Why Business Owners Should Invest in Custom Software | Creuto Blog",
    description: "Generic software limits your operational scale. Learn why custom-engineered product solutions provide higher ROI, better efficiency, and a robust competitive advantage.",
  },
  "how-creuto-help-businesses-scale-smartly": {
    title: "How Creuto Helps Businesses Scale Smartly | Creuto Blog",
    description: "Explore our framework for scaling engineering infrastructure, team alignment, and rapid product development tailored for high-growth enterprises.",
  },
  "the-beginning-of-something-real": {
    title: "The Beginning of Something Real | Creuto Blog",
    description: "Deep dive into the vision, culture, and core engineering philosophy that inspired the launch of Creuto as an elite AI-first design and software agency.",
  },
}

export async function generateStaticParams() {
  return Object.keys(BLOG_METADATA_MAP).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const meta = BLOG_METADATA_MAP[slug]

  if (!meta) {
    return {
      title: "Creuto Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://creuto.com/blogs/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://creuto.com/blogs/${slug}`,
      siteName: "Creuto",
      type: "article",
    },
  }
}

// In-memory dynamic post cache map to prevent disk reads and HTML regex parsing on subsequent routing events.
interface CacheData {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

const postCache = new Map<string, CacheData>()

// Helper to remove CSS cascade layers (like "@layer mui { ... }") dynamically.
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

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. Guard against invalid slugs
  if (!BLOG_METADATA_MAP[slug]) {
    notFound()
  }

  // 2. Serve instantly from server RAM cache if already processed
  const cachedData = postCache.get(slug)
  if (cachedData) {
    return (
      <>
        {cachedData.styles.map((href, index) => {
          const processedHref = href.replace(/_next\//g, "cloned_next/")
          const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
          return <link key={index} rel="stylesheet" href={absoluteHref} />
        })}

        {cachedData.unlayeredInlineStyles.map((unlayeredCss, index) => (
          <style
            key={`inline-${index}`}
            dangerouslySetInnerHTML={{ __html: unlayeredCss }}
          />
        ))}

        <style dangerouslySetInnerHTML={{ __html: `
          #creuto-blogpost-cloned-page,
          #creuto-blogpost-cloned-page h1,
          #creuto-blogpost-cloned-page h2,
          #creuto-blogpost-cloned-page h3,
          #creuto-blogpost-cloned-page h4,
          #creuto-blogpost-cloned-page h5,
          #creuto-blogpost-cloned-page h6,
          #creuto-blogpost-cloned-page p,
          #creuto-blogpost-cloned-page span,
          #creuto-blogpost-cloned-page li,
          #creuto-blogpost-cloned-page a,
          #creuto-blogpost-cloned-page button,
          #creuto-blogpost-cloned-page label,
          #creuto-blogpost-cloned-page div,
          #creuto-blogpost-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }
        `}} />

        <div id="creuto-blogpost-cloned-page" dangerouslySetInnerHTML={{ __html: cachedData.processedHtml }} />
      </>
    )
  }

  // 3. Read cloned dynamic template file from disk
  const filePath = path.join("D:", "clone", "Clone", "creuto.com", `${slug}.html`)
  let htmlContent = ""

  try {
    htmlContent = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading blog post file at ${filePath}:`, error)
    notFound()
  }

  // 4. Parse links, styles, and body content using server regex preprocessors
  const linkRegex = /<link[^>]*?rel="stylesheet"[^>]*?>/g
  let m
  const links: string[] = []
  while ((m = linkRegex.exec(htmlContent)) !== null) {
    const hrefMatch = /href="([^"]+)"/.exec(m[0])
    if (hrefMatch) {
      links.push(hrefMatch[1])
    }
  }

  const styleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/g
  const inlineStyles: string[] = []
  while ((m = styleRegex.exec(htmlContent)) !== null) {
    inlineStyles.push(m[0])
  }

  const bodyRegex = /<body[^>]*?>([\s\S]*?)<\/body>/i
  const bodyMatch = bodyRegex.exec(htmlContent)
  const bodyHtml = bodyMatch ? bodyMatch[1] : ""

  // 5. Apply dynamic asset mappings
  let processedHtml = bodyHtml
    .replace(/(["'\s])(img|icons|favicon)\//g, "$1/$2/")
    .replace(/(["'\s])_next\//g, "$1/cloned_next/")
    .replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2")

  // 6. Map cloned navigation and relative links
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

  // Map sub-post card click elements recursively
  processedHtml = processedHtml
    .replace(/href="(how-smes-can-leverage-ai|your-customers-are-on-mobile|why-every-business-owner-should-invest-in-custom-software|how-creuto-help-businesses-scale-smartly|the-beginning-of-something-real)\.html"/g, 'href="/blogs/$1"')

  // 7. Strip srcsets and fix pre-rendered animation delays
  processedHtml = processedHtml
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssrcSet="[^"]*"/gi, '')
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/translateY\(30px\)/gi, 'translateY(0)')

  // 8. Compute unlayered inline styles
  const unlayeredInlineStyles = inlineStyles.map((styleBlock) => {
    const cssContent = styleBlock
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "")
    return unlayerCSS(cssContent)
  })

  // 9. Save to map cache
  const computedData: CacheData = {
    processedHtml,
    styles: links,
    unlayeredInlineStyles,
  }
  postCache.set(slug, computedData)

  return (
    <>
      {/* Load original compiled CSS stylesheets */}
      {computedData.styles.map((href, index) => {
        const processedHref = href.replace(/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {/* Inject Emotion/MUI global and local inline styling layers */}
      {computedData.unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      {/* Enforce correct Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #creuto-blogpost-cloned-page,
        #creuto-blogpost-cloned-page h1,
        #creuto-blogpost-cloned-page h2,
        #creuto-blogpost-cloned-page h3,
        #creuto-blogpost-cloned-page h4,
        #creuto-blogpost-cloned-page h5,
        #creuto-blogpost-cloned-page h6,
        #creuto-blogpost-cloned-page p,
        #creuto-blogpost-cloned-page span,
        #creuto-blogpost-cloned-page li,
        #creuto-blogpost-cloned-page a,
        #creuto-blogpost-cloned-page button,
        #creuto-blogpost-cloned-page label,
        #creuto-blogpost-cloned-page div,
        #creuto-blogpost-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a scoped container */}
      <div id="creuto-blogpost-cloned-page" dangerouslySetInnerHTML={{ __html: computedData.processedHtml }} />
    </>
  )
}
