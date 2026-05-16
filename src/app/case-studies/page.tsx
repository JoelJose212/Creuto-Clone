import { Metadata } from "next";
import CaseStudiesPageClient from "./CaseStudiesPageClient";

export function generateMetadata(): Metadata {
  return {
    title: "Case Studies - AI Products & Custom Software Built by Creuto",
    description: "See how Creuto builds AI-powered software that drives real business results. Case studies across healthcare, fintech, e-commerce, and more. Your idea could be next.",
    alternates: {
      canonical: "https://creuto.com/case-studies",
    },
    openGraph: {
      images: [
        {
          url: "/img/meta/meta-image.png",
          width: 1200,
          height: 630,
          alt: "Creuto Case Studies",
        },
      ],
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
