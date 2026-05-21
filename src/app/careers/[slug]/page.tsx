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
    title: `${roleTitle} Jobs at Creuto - Join Our Product Team`,
    description: `Apply for the ${roleTitle} position at Creuto. Join our high-performance engineering, product, and design team. Review candidate requirements and submit your application online today.`,
    alternates: {
      canonical: `https://creuto.com/careers/${slug}`,
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
        #creuto-job-detail-page,
        #creuto-job-detail-page h1,
        #creuto-job-detail-page h2,
        #creuto-job-detail-page h3,
        #creuto-job-detail-page h4,
        #creuto-job-detail-page h5,
        #creuto-job-detail-page h6,
        #creuto-job-detail-page p,
        #creuto-job-detail-page span,
        #creuto-job-detail-page li,
        #creuto-job-detail-page a,
        #creuto-job-detail-page button,
        #creuto-job-detail-page label,
        #creuto-job-detail-page div,
        #creuto-job-detail-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <div id="creuto-job-detail-page">
        <CareersDetailHydration roleTitle={roleTitle}>
          <Component />
        </CareersDetailHydration>
      </div>
    </>
  )
}
