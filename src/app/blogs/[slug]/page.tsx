import { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"

// Slugs mapping to provide high-fidelity dynamic SEO configurations
const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = {
  "how-smes-can-leverage-ai": {
    title: "How SMEs Can Leverage AI to Scale | Aanandi TechnoSoft Blog",
    description: "Learn how Small and Medium Enterprises can leverage artificial intelligence to optimize workflows, decrease operational costs, and build smarter capabilities.",
  },
  "your-customers-are-on-mobile": {
    title: "Your Customers Are On Mobile: Why Mobile First Matters | Aanandi TechnoSoft Blog",
    description: "Why building a custom, responsive mobile app is critical for customer retention, direct engagement, and scaling your modern business footprint.",
  },
  "why-every-business-owner-should-invest-in-custom-software": {
    title: "Why Business Owners Should Invest in Custom Software | Aanandi TechnoSoft Blog",
    description: "Generic software limits your operational scale. Learn why custom-engineered product solutions provide higher ROI, better efficiency, and a robust competitive advantage.",
  },
  "how-aanandi-help-businesses-scale-smartly": {
    title: "How Aanandi TechnoSoft Helps Businesses Scale Smartly | Aanandi TechnoSoft Blog",
    description: "Explore our framework for scaling engineering infrastructure, team alignment, and rapid product development tailored for high-growth enterprises.",
  },
  "the-beginning-of-something-real": {
    title: "The Beginning of Something Real | Aanandi TechnoSoft Blog",
    description: "Deep dive into the vision, culture, and core engineering philosophy that inspired the launch of Aanandi TechnoSoft as an elite AI-first design and software agency.",
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
      title: "Aanandi TechnoSoft Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: [meta.title.split(" | ")[0], "Aanandi TechnoSoft Blog", "AI Insights", "Software Development"],
    alternates: {
      canonical: `https://aanandi.in/blogs/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://aanandi.in/blogs/${slug}`,
      siteName: "Aanandi TechnoSoft",
      images: [
        {
          url: "/img/meta/meta-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/img/meta/meta-image.png"],
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
          #aanandi-blogpost-cloned-page,
          #aanandi-blogpost-cloned-page h1,
          #aanandi-blogpost-cloned-page h2,
          #aanandi-blogpost-cloned-page h3,
          #aanandi-blogpost-cloned-page h4,
          #aanandi-blogpost-cloned-page h5,
          #aanandi-blogpost-cloned-page h6,
          #aanandi-blogpost-cloned-page p,
          #aanandi-blogpost-cloned-page span,
          #aanandi-blogpost-cloned-page li,
          #aanandi-blogpost-cloned-page a,
          #aanandi-blogpost-cloned-page button,
          #aanandi-blogpost-cloned-page label,
          #aanandi-blogpost-cloned-page div,
          #aanandi-blogpost-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }
        `}} />

        <div id="aanandi-blogpost-cloned-page" dangerouslySetInnerHTML={{ __html: cachedData.processedHtml }} />
      </>
    )
  }

  // 3. Read cloned dynamic template file from disk
  const filePath = path.join(process.cwd(), "public", "cloned_html", "blogs", `${slug}.html`)
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
    .replace(/href="(how-smes-can-leverage-ai|your-customers-are-on-mobile|why-every-business-owner-should-invest-in-custom-software|how-aanandi-help-businesses-scale-smartly|the-beginning-of-something-real)\.html"/g, 'href="/blogs/$1"')

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
        #aanandi-blogpost-cloned-page,
        #aanandi-blogpost-cloned-page h1,
        #aanandi-blogpost-cloned-page h2,
        #aanandi-blogpost-cloned-page h3,
        #aanandi-blogpost-cloned-page h4,
        #aanandi-blogpost-cloned-page h5,
        #aanandi-blogpost-cloned-page h6,
        #aanandi-blogpost-cloned-page p,
        #aanandi-blogpost-cloned-page span,
        #aanandi-blogpost-cloned-page li,
        #aanandi-blogpost-cloned-page a,
        #aanandi-blogpost-cloned-page button,
        #aanandi-blogpost-cloned-page label,
        #aanandi-blogpost-cloned-page div,
        #aanandi-blogpost-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a scoped container */}
      <div id="aanandi-blogpost-cloned-page" dangerouslySetInnerHTML={{ __html: computedData.processedHtml }} />
    </>
  )
}
