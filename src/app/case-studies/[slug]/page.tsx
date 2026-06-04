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
      .join(" ") + " | MoolSap Case Study";
    return {
      title: fallbackTitle,
    }
  }

  return {
    title: `${study.title} | MoolSap Case Study`,
    description: study.description,
    alternates: {
      canonical: `https://moolsap.com/case-studies/${cleanSlug}`,
    },
    openGraph: {
      title: study.title,
      description: study.description,
      url: `https://moolsap.com/case-studies/${cleanSlug}`,
      siteName: "MoolSap",
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
        #moolsap-casestudy-cloned-page,
        #moolsap-casestudy-cloned-page h1,
        #moolsap-casestudy-cloned-page h2,
        #moolsap-casestudy-cloned-page h3,
        #moolsap-casestudy-cloned-page h4,
        #moolsap-casestudy-cloned-page h5,
        #moolsap-casestudy-cloned-page h6,
        #moolsap-casestudy-cloned-page p,
        #moolsap-casestudy-cloned-page span,
        #moolsap-casestudy-cloned-page li,
        #moolsap-casestudy-cloned-page a,
        #moolsap-casestudy-cloned-page button,
        #moolsap-casestudy-cloned-page label,
        #moolsap-casestudy-cloned-page div,
        #moolsap-casestudy-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <div id="moolsap-casestudy-cloned-page">
        <Component />
      </div>
    </>
  )
}
