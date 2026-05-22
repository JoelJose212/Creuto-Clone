import { Metadata } from "next"
import { notFound } from "next/navigation"
import { blogsComponents } from "./data"
import Footer from "@/components/layout/Footer"

const BLOG_METADATA_MAP: Record<string, { title: string; description: string }> = {
  "how-smes-can-leverage-ai": {
    "title": "AI Isn&#x27;t Just for Big Companies : Here&#x27;s How SME&#x27;s Can Leverage it Today | Creuto Blog",
    "description": "AI Isn&#x27;t Just for Big Companies : Here&#x27;s How SME&#x27;s Can Leverage it Today"
  },
  "how-creuto-help-businesses-scale-smartly": {
    "title": "Behind the Code : How Creuto Helps Businesses Scale Smartly | Creuto Blog",
    "description": "Behind the Code : How Creuto Helps Businesses Scale Smartly"
  },
  "why-every-business-owner-should-invest-in-custom-software": {
    "title": "Why Every Business Owner Should Invest in Custom Software? | Creuto Blog",
    "description": "Why Every Business Owner Should Invest in Custom Software?"
  },
  "the-beginning-of-something-real": {
    "title": "The Creuto Journey: Built with Belief, Growing with You | Creuto Blog",
    "description": "The Creuto Journey: Built with Belief, Growing with You"
  },
  "your-customers-are-on-mobile": {
    "title": "Your Customers Are on Mobile — Why Isn’t Your Business? | Creuto Blog",
    "description": "Your Customers Are on Mobile — Why Isn’t Your Business?"
  },
  "custom-crm": {
    "title": "Custom CRM vs Ready-Made CRM: What’s Right for Your Business? | Creuto Blog",
    "description": "Custom CRM vs Ready-Made CRM: What’s Right for Your Business?"
  },
  "software-partner": {
    "title": "Questions to Ask Before Hiring a Software Development Partner | Creuto Blog",
    "description": "Questions to Ask Before Hiring a Software Development Partner"
  },
  "custom-software-development": {
    "title": "Top 5 Reasons Growing Businesses Are Switching to Custom Software | Creuto Blog",
    "description": "Top 5 Reasons Growing Businesses Are Switching to Custom Software"
  },
  "customsoftware-roi": {
    "title": "Is Custom Software Worth the Investment? Here’s the ROI You Can Expect | Creuto Blog",
    "description": "Is Custom Software Worth the Investment? Here’s the ROI You Can Expect"
  },
  "startup": {
    "title": "The Creuto Journey: Built with Belief, Growing with You | Creuto Blog",
    "description": "The Creuto Journey: Built with Belief, Growing with You"
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
      title: "Creuto Blog Post",
    }
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://creuto.com/${slug}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://creuto.com/${slug}`,
      siteName: "Creuto",
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
          padding-top: 130px;
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
      `}} />

      <div id="creuto-blogpost-cloned-page">
        <Component />
      </div>
      <Footer />
    </>
  )
}
