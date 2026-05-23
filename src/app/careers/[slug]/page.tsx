import { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import CareersDetailHydration from "@/components/layout/CareersDetailHydration"

interface Props {
  params: {
    slug: string
  }
}

// Memory Cache for Job Detail pages
interface DetailCache {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
  roleTitle: string
}

const detailCacheMap = new Map<string, DetailCache>()

// Helper to format slug to pretty role title
function formatSlugToTitle(slug: string): string {
  const overrides: Record<string, string> = {
    "ai-ml-engineer": "AI/ML Engineer",
    "ai-product-manager": "AI Product Manager",
    "ui-ux-designer": "UI/UX Designer",
    "nodejs-developer": "Node.js Developer",
    "devops-engineer": "DevOps Engineer",
    "mern-stack-developer": "MERN Stack Developer",
    "mern-stack": "MERN Stack Developer",
    "mlops-engineer": "MLOps Engineer",
    "nlp-engineer": "NLP Engineer",
    "seo-content-strategist": "SEO Content Strategist",
    "seo-manager": "SEO Manager",
    "technical-seo-specialist": "Technical SEO Specialist",
  }

  if (overrides[slug.toLowerCase()]) {
    return overrides[slug.toLowerCase()]
  }

  return slug
    .split("-")
    .map((word) => {
      if (word.toLowerCase() === "ai") return "AI"
      if (word.toLowerCase() === "ml") return "ML"
      if (word.toLowerCase() === "seo") return "SEO"
      if (word.toLowerCase() === "mern") return "MERN"
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

// 1. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  const roleTitle = formatSlugToTitle(slug)

  return {
    title: `${roleTitle} Jobs at Aanandi TechnoSoft - Join Our Product Team`,
    description: `Apply for the ${roleTitle} position at Aanandi TechnoSoft. Join our high-performance engineering, product, and design team. Review candidate requirements and submit your application online today.`,
    alternates: {
      canonical: `https://aanandi.in/careers/${slug}`,
    },
    openGraph: {
      title: `${roleTitle} Jobs at Aanandi TechnoSoft - Join Our Product Team`,
      description: `Apply for the ${roleTitle} position at Aanandi TechnoSoft. Join our high-performance engineering, product, and design team.`,
      url: `https://aanandi.in/careers/${slug}`,
      siteName: "Aanandi TechnoSoft",
      images: [
        {
          url: "/img/meta/meta-image.png",
          width: 1200,
          height: 630,
          alt: `${roleTitle} position at Aanandi TechnoSoft`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${roleTitle} Jobs at Aanandi TechnoSoft - Join Our Product Team`,
      description: `Apply for the ${roleTitle} position at Aanandi TechnoSoft. Join our high-performance engineering, product, and design team.`,
      images: ["/img/meta/meta-image.png"],
    },
  }
}

// 2. Pre-compile all 30+ static slugs during build time!
export async function generateStaticParams() {
  const careersDir = path.join(process.cwd(), "public", "cloned_html", "careers")
  if (!fs.existsSync(careersDir)) {
    return []
  }

  const files = fs.readdirSync(careersDir)
  const slugs = files
    .filter((file) => {
      const name = file.toLowerCase()
      return name.endsWith(".html") && !name.startsWith("apply")
    })
    .map((file) => {
      return { slug: file.replace(/\.html$/, "") }
    })

  console.log(`[Static Params] Pre-compiling ${slugs.length} careers slugs.`)
  return slugs
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

export default function JobDetailPage({ params }: Props) {
  const { slug } = params

  if (detailCacheMap.has(slug)) {
    return renderDetailPage(detailCacheMap.get(slug)!)
  }

  const filePath = path.join(process.cwd(), "public", "cloned_html", "careers", `${slug}.html`)

  if (!fs.existsSync(filePath)) {
    notFound()
  }

  const roleTitle = formatSlugToTitle(slug)
  let htmlContent = ""

  try {
    htmlContent = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading job detail file for ${slug}:`, error)
    notFound()
  }

  // Extract body content
  const bodyRegex = /<body[^>]*?>([\s\S]*?)<\/body>/i
  const bodyMatch = bodyRegex.exec(htmlContent)
  const bodyHtml = bodyMatch ? bodyMatch[1] : ""

  // Extract external style sheets
  const linkRegex = /<link[^>]*?rel="stylesheet"[^>]*?>/g
  let m
  const styles: string[] = []
  while ((m = linkRegex.exec(htmlContent)) !== null) {
    const hrefMatch = /href="([^"]+)"/.exec(m[0])
    if (hrefMatch) {
      styles.push(hrefMatch[1])
    }
  }

  // Extract block style tags
  const styleRegex = /<style[^>]*?>([\s\S]*?)<\/style>/g
  const inlineStyles: string[] = []
  while ((m = styleRegex.exec(htmlContent)) !== null) {
    inlineStyles.push(m[1])
  }

  // 1. Map relative paths and assets (../img/ -> /img/)
  let processedHtml = bodyHtml
    .replace(/(["'\s])\.\.\/(img|icons|favicon)\//g, "$1/$2/")
    .replace(/(["'\s])\.\.\/_next\//g, "$1/cloned_next/")
    .replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2")

  // 2. Map static navigation .html links to clean Next.js routes
  processedHtml = processedHtml
    .replace(/href="\.\.\/ai\.html"/g, 'href="/ai"')
    .replace(/href="\.\.\/about\.html"/g, 'href="/about"')
    .replace(/href="\.\.\/services\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/case-studies\.html"/g, 'href="/case-studies"')
    .replace(/href="\.\.\/contact\.html"/g, 'href="/contact"')
    .replace(/href="\.\.\/careers\.html"/g, 'href="/careers"')
    .replace(/href="\.\.\/blog\.html"/g, 'href="/blogs"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/"')

  // Map sub-services inside the footer
  processedHtml = processedHtml
    .replace(/href="\.\.\/services\/custom-software-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/mobile-apps-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/web-app-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/ai-engineering-services\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/devops-cloud-engineering\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/mvp-development\.html"/g, 'href="/services"')

  // 3. Overwrite entrance pre-rendered animation opacities (opacity:0 -> opacity:1)
  processedHtml = processedHtml
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/transform\s*:\s*translateX\(-40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateX\(40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(20px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(30px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(40px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*scale\(0\.95\)/gi, 'transform:none')
    .replace(/transform\s*:\s*scale\(0\.98\)/gi, 'transform:none')

  // 4. Compute unlayered inline styles
  const unlayeredInlineStyles = inlineStyles.map((styleContent) => {
    return unlayerCSS(styleContent)
  })

  // Cache compiled payload
  const cacheData = {
    processedHtml,
    styles,
    unlayeredInlineStyles,
    roleTitle,
  }

  detailCacheMap.set(slug, cacheData)

  return renderDetailPage(cacheData)
}

function renderDetailPage(data: DetailCache) {
  return (
    <>
      {/* Load original CSS stylesheets */}
      {data.styles.map((href, index) => {
        const processedHref = href.replace(/\.\.\/_next\//g, "cloned_next/")
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

      {/* Enforce Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #aanandi-job-detail-page,
        #aanandi-job-detail-page h1,
        #aanandi-job-detail-page h2,
        #aanandi-job-detail-page h3,
        #aanandi-job-detail-page h4,
        #aanandi-job-detail-page h5,
        #aanandi-job-detail-page h6,
        #aanandi-job-detail-page p,
        #aanandi-job-detail-page span,
        #aanandi-job-detail-page li,
        #aanandi-job-detail-page a,
        #aanandi-job-detail-page button,
        #aanandi-job-detail-page label,
        #aanandi-job-detail-page div,
        #aanandi-job-detail-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the hydrated interactive page body */}
      <div id="aanandi-job-detail-page">
        <CareersDetailHydration
          html={data.processedHtml}
          roleTitle={data.roleTitle}
        />
      </div>
    </>
  )
}
