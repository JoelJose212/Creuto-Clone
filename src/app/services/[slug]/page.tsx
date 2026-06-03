import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, ArrowUpRight } from "lucide-react"
import Footer from "@/components/layout/Footer"
import { SERVICES_MENU_DATA } from "@/constants/servicesMenuData"
import { SERVICES_PAGE_DATA } from "@/constants/servicesPageData"
import ServicePageClient from "./ServicePageClient"

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// Find a sub-service dynamically across all categories (for fallback metadata/names)
function findSubService(slug: string) {
  for (const category of SERVICES_MENU_DATA) {
    const sub = category.subServices.find((s) => s.slug === slug)
    if (sub) {
      return {
        sub,
        category
      }
    }
  }
  return null
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = []
  
  // 1. Gather slugs from main categories
  SERVICES_MENU_DATA.forEach((category) => {
    category.subServices.forEach((sub) => {
      if (!slugs.some((s) => s.slug === sub.slug)) {
        slugs.push({ slug: sub.slug })
      }
    })
  })

  // 2. Add any additional dynamic page data keys just in case
  Object.keys(SERVICES_PAGE_DATA).forEach((slug) => {
    if (!slugs.some((s) => s.slug === slug)) {
      slugs.push({ slug })
    }
  })

  return slugs
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Check if we have specific page metadata
  const dynamicContent = SERVICES_PAGE_DATA[slug];
  if (dynamicContent) {
    return {
      title: dynamicContent.metaTitle,
      description: dynamicContent.metaDescription,
      keywords: dynamicContent.keywords,
      alternates: {
        canonical: dynamicContent.canonical,
      },
    }
  }

  // Fallback to menu categories metadata
  const match = findSubService(slug)
  if (!match) {
    return {
      title: "Service Not Found | Aanandi",
    }
  }

  return {
    title: `${match.sub.name} - ${match.category.name} | Aanandi`,
    description: `Premium ${match.sub.name} services tailored for high growth. Expert engineering by Aanandi TechnoSoft.`,
    alternates: {
      canonical: `https://aananditechnosoft.com/services/${match.sub.slug}`,
    },
  }
}

export default async function ServiceSubPage({ params }: RouteParams) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. If we have dynamic page content, render the premium duplicated Custom ERP layout
  const dynamicContent = SERVICES_PAGE_DATA[slug];
  if (dynamicContent) {
    return <ServicePageClient pageData={dynamicContent} slug={slug} />;
  }

  // 2. Otherwise, fall back to the generic "Under Construction" template
  const match = findSubService(slug)
  if (!match) {
    notFound()
  }

  const { sub, category } = match

  return (
    <div className="min-h-screen bg-white text-[#1E293B] flex flex-col pt-32">
      {/* Premium Hero Header */}
      <div className="relative flex-1 container mx-auto px-4 md:px-8 max-w-5xl flex flex-col justify-center py-12 md:py-20 select-none">
        {/* Glow backdrop decorator */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -z-10" />

        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[14px] font-[600] text-blue/80 hover:text-blue transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Tag category */}
        <div className="inline-flex items-center gap-2 mb-4 self-start px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          <span className="font-jakarta text-[12px] font-[700] uppercase tracking-wider text-slate-500">
            {category.name}
          </span>
        </div>

        {/* Dynamic Title */}
        <h1 className="font-jakarta text-[36px] md:text-[56px] font-[800] tracking-tight text-heading leading-[1.1] mb-6 max-w-3xl">
          {sub.name}
        </h1>

        {/* Premium Placeholder Details Box */}
        <div className="bg-slate-50/70 border border-slate-100 rounded-3xl p-8 md:p-12 mb-12 shadow-sm max-w-4xl">
          <h2 className="font-jakarta text-[20px] md:text-[24px] font-[700] text-heading mb-4">
            Service Page Under Construction
          </h2>
          <p className="font-jakarta text-[15px] md:text-[16px] text-slate-600 leading-relaxed mb-6">
            We are currently crafting a fully bespoke, immersive detail page to showcase our comprehensive capabilities in <span className="font-[600] text-heading">{sub.name}</span>. 
            Aanandi's team of elite engineers and product leaders is dedicated to delivering state-of-the-art results for this specialization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center gap-2 bg-blue text-white font-jakarta text-[14.5px] font-[700] px-7 py-3 rounded-full shadow-lg shadow-blue/20 hover:bg-blue-hover transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar size={16} />
              <span>Discuss Your Project</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-heading font-jakarta text-[14.5px] font-[700] px-7 py-3 rounded-full border border-border hover:border-blue hover:text-blue transition-all duration-200"
            >
              <span>Contact Our Team</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              title: "Expert Engineering",
              desc: "Engineered by senior developers utilizing leading architectures for ultimate speed, security, and scalability."
            },
            {
              title: "Tailored Fit",
              desc: "Perfectly customized software systems designed specifically to integrate with and optimize your existing workflows."
            },
            {
              title: "End-to-End Success",
              desc: "Comprehensive product life cycle coverage from roadmapping and design to rapid iteration and live maintenance."
            }
          ].map((feat, index) => (
            <div key={index} className="flex flex-col gap-2 p-5 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-shadow duration-200">
              <h4 className="font-jakarta text-[15.5px] font-[700] text-heading">
                {feat.title}
              </h4>
              <p className="font-jakarta text-[13px] text-slate-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Shared Footer component */}
      <Footer />
    </div>
  )
}
