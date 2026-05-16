import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export function generateMetadata(): Metadata {
  return {
    title: "About Creuto - Our Story, Team & Mission in AI Software Development",
    description: "Meet the team behind Creuto - building AI-powered software, mobile apps, and custom platforms for businesses worldwide. Our story, values, and vision.",
    alternates: {
      canonical: "https://creuto.com/about",
    },
    openGraph: {
      title: "About Creuto - Our Story, Team & Mission in AI Software Development",
      description: "Meet the team behind Creuto - building AI-powered software, mobile apps, and custom platforms for businesses worldwide. Our story, values, and vision.",
      url: "https://creuto.com/about",
      images: [
        {
          url: "/img/meta/meta-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

export default function AboutPage() {
  return <AboutPageClient />;
}
