import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export function generateMetadata(): Metadata {
  return {
    title: "Creuto Services - Custom Software, Mobile Apps, AI & Cloud Development",
    description: "Discover how Creuto can help your business succeed by providing customised, high-impact solutions that promote creativity and drive towards long-term achievement.",
    alternates: {
      canonical: "https://creuto.com/services",
    },
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}

