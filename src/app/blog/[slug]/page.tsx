import { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogsComponents } from "./data"

const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = {
  "how-smes-can-leverage-ai": {
    title: "How SMEs Can Leverage AI to Scale | MoolSap Blog",
    description: "Learn how Small and Medium Enterprises can leverage artificial intelligence to optimize workflows, decrease operational costs, and build smarter capabilities.",
  },
  "your-customers-are-on-mobile": {
    title: "Your Customers Are On Mobile: Why Mobile First Matters | MoolSap Blog",
    description: "Why building a custom, responsive mobile app is critical for customer retention, direct engagement, and scaling your modern business footprint.",
  },
  "why-every-business-owner-should-invest-in-custom-software": {
    title: "Why Business Owners Should Invest in Custom Software | MoolSap Blog",
    description: "Generic software limits your operational scale. Learn why custom-engineered product solutions provide higher ROI, better efficiency, and a robust competitive advantage.",
  },
  "how-moolsap-help-businesses-scale-smartly": {
    title: "How MoolSap Helps Businesses Scale Smartly | MoolSap Blog",
    description: "Explore our framework for scaling engineering infrastructure, team alignment, and rapid product development tailored for high-growth enterprises.",
  },
  "the-beginning-of-something-real": {
    title: "The Beginning of Something Real | MoolSap Blog",
    description: "Deep dive into the vision, culture, and core engineering philosophy that inspired the launch of MoolSap as an elite AI-first design and software agency.",
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
      title: "MoolSap Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://moolsap.com/blogs/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://moolsap.com/blogs/${slug}`,
      siteName: "MoolSap",
      type: "article",
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!BLOG_METADATA_MAP[slug]) {
    notFound()
  }

  const getComponent = (blogsComponents as any)[slug];

  if (!getComponent) {
    notFound();
  }

  const Component = (await getComponent()).default;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        #moolsap-blogpost-cloned-page,
        #moolsap-blogpost-cloned-page h1,
        #moolsap-blogpost-cloned-page h2,
        #moolsap-blogpost-cloned-page h3,
        #moolsap-blogpost-cloned-page h4,
        #moolsap-blogpost-cloned-page h5,
        #moolsap-blogpost-cloned-page h6,
        #moolsap-blogpost-cloned-page p,
        #moolsap-blogpost-cloned-page span,
        #moolsap-blogpost-cloned-page li,
        #moolsap-blogpost-cloned-page a,
        #moolsap-blogpost-cloned-page button,
        #moolsap-blogpost-cloned-page label,
        #moolsap-blogpost-cloned-page div,
        #moolsap-blogpost-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      <div id="moolsap-blogpost-cloned-page">
        <Component />
      </div>
    </>
  )
}
