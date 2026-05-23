import { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogsComponents } from "./data"
import Footer from "@/components/layout/Footer"
import TOCConnector from "./TOCConnector"

const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = {
  "how-smes-can-leverage-ai": {
    "title": "AI Isn&#x27;t Just for Big Companies : Here&#x27;s How SME&#x27;s Can Leverage it Today | Aanandi Blog",
    "description": "AI Isn&#x27;t Just for Big Companies : Here&#x27;s How SME&#x27;s Can Leverage it Today"
  },
  "how-aanandi-help-businesses-scale-smartly": {
    "title": "Behind the Code : How Aanandi Helps Businesses Scale Smartly | Aanandi Blog",
    "description": "Behind the Code : How Aanandi Helps Businesses Scale Smartly"
  },
  "why-every-business-owner-should-invest-in-custom-software": {
    "title": "Why Every Business Owner Should Invest in Custom Software? | Aanandi Blog",
    "description": "Why Every Business Owner Should Invest in Custom Software?"
  },
  "the-beginning-of-something-real": {
    "title": "The Aanandi Journey: Built with Belief, Growing with You | Aanandi Blog",
    "description": "The Aanandi Journey: Built with Belief, Growing with You"
  },
  "your-customers-are-on-mobile": {
    "title": "Your Customers Are on Mobile — Why Isn’t Your Business? | Aanandi Blog",
    "description": "Your Customers Are on Mobile — Why Isn’t Your Business?"
  },
  "custom-crm": {
    "title": "Custom CRM vs Ready-Made CRM: What’s Right for Your Business? | Aanandi Blog",
    "description": "Custom CRM vs Ready-Made CRM: What’s Right for Your Business?"
  },
  "software-partner": {
    "title": "Questions to Ask Before Hiring a Software Development Partner | Aanandi Blog",
    "description": "Questions to Ask Before Hiring a Software Development Partner"
  },
  "custom-software-development": {
    "title": "Top 5 Reasons Growing Businesses Are Switching to Custom Software | Aanandi Blog",
    "description": "Top 5 Reasons Growing Businesses Are Switching to Custom Software"
  },
  "customsoftware-roi": {
    "title": "Is Custom Software Worth the Investment? Here’s the ROI You Can Expect | Aanandi Blog",
    "description": "Is Custom Software Worth the Investment? Here’s the ROI You Can Expect"
  },
  "startup": {
    "title": "The Aanandi Journey: Built with Belief, Growing with You | Aanandi Blog",
    "description": "The Aanandi Journey: Built with Belief, Growing with You"
  }
};

export async function generateStaticParams() {
  return Object.keys(BLOG_METADATA_MAP).map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const meta = BLOG_METADATA_MAP[slug];

  if (!meta) {
    return {
      title: "Aanandi Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://aananditechnosoft.com/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://aananditechnosoft.com/${slug}`,
      siteName: "Aanandi",
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
        #creuto-blogpost-cloned-page {
          background-color: #ffffff;
        }
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

        /* Premium Table of Contents Styles */
        .mui-rjqn30 {
          position: sticky !important;
          top: 160px !important;
          background: #F8FAFF !important;
          border-radius: 12px !important;
          padding: 24px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02) !important;
          border: 1px solid #E2E8F0 !important;
          transition: all 0.3s ease !important;
        }
        .mui-plk8wk {
          font-weight: 700 !important;
          color: #0F172A !important;
          font-size: 1.1rem !important;
          margin-bottom: 16px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          border-bottom: 2px solid #E2E8F0 !important;
          padding-bottom: 8px !important;
        }
        .mui-rjqn30 ul {
          list-style: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        .mui-rjqn30 ul li {
          position: relative !important;
          padding-left: 16px !important;
          margin-bottom: 14px !important;
          color: #475569 !important;
          font-size: 0.95rem !important;
          font-weight: 500 !important;
          line-height: 1.4 !important;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          cursor: pointer !important;
        }
        .mui-rjqn30 ul li::before {
          content: '' !important;
          position: absolute !important;
          left: 0 !important;
          top: 50% !important;
          transform: translateY(-50%) scaleY(0) !important;
          width: 3px !important;
          height: 14px !important;
          background-color: #1746EA !important;
          border-radius: 2px !important;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .mui-rjqn30 ul li:hover {
          color: #1746EA !important;
          padding-left: 22px !important;
        }
        .mui-rjqn30 ul li:hover::before {
          transform: translateY(-50%) scaleY(1) !important;
        }

        /* Premium Dynamic Article Styles for Parsed Markdown */
        .mui-1uz8ey3 h2 {
          color: #0F172A !important;
          font-weight: 700 !important;
          font-size: 1.8rem !important;
          margin-top: 32px !important;
          margin-bottom: 16px !important;
          line-height: 1.3 !important;
        }
        .mui-1uz8ey3 h3 {
          color: #1E293B !important;
          font-weight: 600 !important;
          font-size: 1.4rem !important;
          margin-top: 24px !important;
          margin-bottom: 12px !important;
          line-height: 1.3 !important;
        }
      `}} />

      <TOCConnector slug={slug} />

      <div id="creuto-blogpost-cloned-page">
        <Component />
      </div>
      <Footer />
    </>
  )
}
