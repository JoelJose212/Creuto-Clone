import { Metadata } from "next"
import { notFound } from "next/navigation"
import fs from "fs"
import path from "path"
import { caseStudiesData } from "@/constants/caseStudiesData"

export async function generateStaticParams() {
  const caseStudiesDir = path.join("D:", "clone", "Clone", "creuto.com", "case-studies")
  if (!fs.existsSync(caseStudiesDir)) {
    return caseStudiesData.flatMap(cs => [
      { slug: cs.slug },
      { slug: `${cs.slug}.html` }
    ])
  }

  const files = fs.readdirSync(caseStudiesDir)
  const params: { slug: string }[] = []
  
  files.forEach((file) => {
    const name = file.toLowerCase()
    if (name.endsWith(".html")) {
      const base = file.replace(/\.html$/, "")
      params.push({ slug: base })
      params.push({ slug: file }) // support slug with .html extension natively
    }
  })

  return params
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cleanSlug = slug.endsWith(".html") ? slug.slice(0, -5) : slug;
  
  const study = caseStudiesData.find(cs => cs.slug === cleanSlug);
  
  if (!study) {
    const fallbackTitle = cleanSlug
      .split("-")
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") + " | Creuto Case Study";
    return {
      title: fallbackTitle,
    }
  }

  return {
    title: `${study.title} | Creuto Case Study`,
    description: study.description,
    alternates: {
      canonical: `https://creuto.com/case-studies/${cleanSlug}`,
    },
    openGraph: {
      title: study.title,
      description: study.description,
      url: `https://creuto.com/case-studies/${cleanSlug}`,
      siteName: "Creuto",
      type: "article",
    },
  }
}

interface CacheData {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

const postCache = new Map<string, CacheData>()

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

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cleanSlug = slug.endsWith(".html") ? slug.slice(0, -5) : slug;

  const cachedData = postCache.get(cleanSlug)
  if (cachedData) {
    return (
      <>
        {cachedData.styles.map((href, index) => {
          const processedHref = href.replace(/\.\.\/_next\//g, "cloned_next/")
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
          #creuto-casestudy-cloned-page,
          #creuto-casestudy-cloned-page h1,
          #creuto-casestudy-cloned-page h2,
          #creuto-casestudy-cloned-page h3,
          #creuto-casestudy-cloned-page h4,
          #creuto-casestudy-cloned-page h5,
          #creuto-casestudy-cloned-page h6,
          #creuto-casestudy-cloned-page p,
          #creuto-casestudy-cloned-page span,
          #creuto-casestudy-cloned-page li,
          #creuto-casestudy-cloned-page a,
          #creuto-casestudy-cloned-page button,
          #creuto-casestudy-cloned-page label,
          #creuto-casestudy-cloned-page div,
          #creuto-casestudy-cloned-page .MuiTypography-root {
            font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          }
        `}} />

        <div id="creuto-casestudy-cloned-page" dangerouslySetInnerHTML={{ __html: cachedData.processedHtml }} />
      </>
    )
  }

  const filePath = path.join("D:", "clone", "Clone", "creuto.com", "case-studies", `${cleanSlug}.html`)
  let htmlContent = ""

  try {
    htmlContent = fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading case study file at ${filePath}:`, error)
    notFound()
  }

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

  let processedHtml = bodyHtml
    .replace(/(["'\s])\.\.\/(img|icons|favicon)\//g, "$1/$2/")
    .replace(/(["'\s])\.\.\/_next\//g, "$1/cloned_next/")
    .replace(/(["'\s])(favicon652a\.ico)/g, "$1/$2")

  processedHtml = processedHtml
    .replace(/href="\.\.\/ai\.html"/g, 'href="/ai"')
    .replace(/href="\.\.\/about\.html"/g, 'href="/about"')
    .replace(/href="\.\.\/services\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/case-studies\.html"/g, 'href="/case-studies"')
    .replace(/href="\.\.\/contact\.html"/g, 'href="/contact"')
    .replace(/href="\.\.\/careers\.html"/g, 'href="/careers"')
    .replace(/href="\.\.\/blog\.html"/g, 'href="/blogs"')
    .replace(/href="\.\.\/index\.html"/g, 'href="/"')

  processedHtml = processedHtml
    .replace(/href="\.\.\/case-studies\/([^"]+)\.html"/g, 'href="/case-studies/$1"')
    .replace(/href="\.\.\/case-studies\/([^"]+)"/g, 'href="/case-studies/$1"')

  processedHtml = processedHtml
    .replace(/href="\.\.\/services\/custom-software-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/mobile-apps-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/web-app-development\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/ai-engineering-services\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/devops-cloud-engineering\.html"/g, 'href="/services"')
    .replace(/href="\.\.\/services\/mvp-development\.html"/g, 'href="/services"')

  processedHtml = processedHtml
    .replace(/\ssrcset="[^"]*"/gi, '')
    .replace(/\ssrcSet="[^"]*"/gi, '')
    .replace(/opacity\s*:\s*0/gi, 'opacity:1')
    .replace(/transform\s*:\s*translateY\(30px\)/gi, 'transform:none')
    .replace(/transform\s*:\s*translateY\(40px\)/gi, 'transform:none')

  const unlayeredInlineStyles = inlineStyles.map((styleBlock) => {
    const cssContent = styleBlock
      .replace(/<style[^>]*>/, "")
      .replace(/<\/style>/, "")
    return unlayerCSS(cssContent)
  })

  const computedData: CacheData = {
    processedHtml,
    styles: links,
    unlayeredInlineStyles,
  }
  postCache.set(cleanSlug, computedData)

  return (
    <>
      {computedData.styles.map((href, index) => {
        const processedHref = href.replace(/\.\.\/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {computedData.unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        #creuto-casestudy-cloned-page,
        #creuto-casestudy-cloned-page h1,
        #creuto-casestudy-cloned-page h2,
        #creuto-casestudy-cloned-page h3,
        #creuto-casestudy-cloned-page h4,
        #creuto-casestudy-cloned-page h5,
        #creuto-casestudy-cloned-page h6,
        #creuto-casestudy-cloned-page p,
        #creuto-casestudy-cloned-page span,
        #creuto-casestudy-cloned-page li,
        #creuto-casestudy-cloned-page a,
        #creuto-casestudy-cloned-page button,
        #creuto-casestudy-cloned-page label,
        #creuto-casestudy-cloned-page div,
        #creuto-casestudy-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <div id="creuto-casestudy-cloned-page" dangerouslySetInnerHTML={{ __html: computedData.processedHtml }} />
    </>
  )
}
