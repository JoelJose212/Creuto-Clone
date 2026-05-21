import { Metadata } from "next"
import { notFound } from "next/navigation"
import { caseStudiesData } from "@/constants/caseStudiesData"
import { caseStudiesComponents } from "./data"

export async function generateStaticParams() {
  return caseStudiesData.flatMap(cs => [
    { slug: cs.slug },
    { slug: `${cs.slug}.html` }
  ])
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

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cleanSlug = slug.endsWith(".html") ? slug.slice(0, -5) : slug;

  const getComponent = (caseStudiesComponents as any)[cleanSlug];

  
  if (!getComponent) {
    notFound();
  }

  const Component = (await getComponent()).default;

  return (
    <>
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

      <div id="creuto-casestudy-cloned-page">
        <Component />
      </div>
    </>
  )
}
