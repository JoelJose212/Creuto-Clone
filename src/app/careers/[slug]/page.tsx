import { Metadata } from "next"
import { notFound } from "next/navigation"
import CareersDetailHydration from "@/components/layout/CareersDetailHydration"
import { careersComponents } from "./data"

interface Props {
  params: Promise<{ slug: string }>
}

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const roleTitle = formatSlugToTitle(slug)

  return {
    title: `${roleTitle} Jobs at MoolSap - Join Our Product Team`,
    description: `Apply for the ${roleTitle} position at MoolSap. Join our high-performance engineering, product, and design team. Review candidate requirements and submit your application online today.`,
    alternates: {
      canonical: `https://moolsap.com/careers/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(careersComponents).map((slug) => ({
    slug,
  }))
}

export default async function JobDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const getComponent = (careersComponents as any)[slug];

  if (!getComponent) {
    notFound()
  }

  const roleTitle = formatSlugToTitle(slug)
  const Component = (await getComponent()).default;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #moolsap-job-detail-page,
        #moolsap-job-detail-page h1,
        #moolsap-job-detail-page h2,
        #moolsap-job-detail-page h3,
        #moolsap-job-detail-page h4,
        #moolsap-job-detail-page h5,
        #moolsap-job-detail-page h6,
        #moolsap-job-detail-page p,
        #moolsap-job-detail-page span,
        #moolsap-job-detail-page li,
        #moolsap-job-detail-page a,
        #moolsap-job-detail-page button,
        #moolsap-job-detail-page label,
        #moolsap-job-detail-page div,
        #moolsap-job-detail-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <div id="moolsap-job-detail-page">
        <CareersDetailHydration roleTitle={roleTitle}>
          <Component />
        </CareersDetailHydration>
      </div>
    </>
  )
}
