import { SERVICE_COLORS } from "./serviceColors";
import { ServiceItem } from "@/types/services";

export type { ServiceItem };

export const servicesData: ServiceItem[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "Our custom software solutions are built around your exact needs — not the other way around. We design, architect, and develop scalable, secure software that aligns with your workflows and grows with your business.",
    image: "/img/services/custom.webp",
    color: SERVICE_COLORS["custom-software"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/custom-software-development",
  },
  {
    id: "mobile-app",
    title: "Mobile App Development",
    description: "We build high-performance iOS and Android apps that users love to engage with — from intuitive UI to seamless backend integration. Every app is optimized for speed, stability, and real-world usability.",
    image: "/img/services/mobile.webp",
    color: SERVICE_COLORS["mobile-app"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/mobile-apps-development",
  },
  {
    id: "api",
    title: "API Development & Integration",
    description: "We design and build secure, scalable APIs and microservices that connect your systems, power your products, and enable third-party integrations without friction.",
    image: "/img/services/api.webp",
    color: SERVICE_COLORS["api"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/api-development",
  },
  {
    id: "uiux",
    title: "UI/UX Design",
    description: "We create interfaces that are beautiful, intuitive, and conversion-optimized. From wireframes and prototypes to full design systems, every pixel serves a purpose.",
    image: "/img/services/uiux.webp",
    color: SERVICE_COLORS["uiux"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/ui-ux-design",
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Accelerate delivery and scale with total confidence. We build resilient cloud infrastructure across AWS, GCP, and Azure, with CI/CD pipelines, Kubernetes orchestration, and cost-efficient serverless architectures.",
    image: "/img/services/devops.webp",
    color: SERVICE_COLORS["devops"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/devops-cloud-engineering",
  },
  {
    id: "qa",
    title: "QA & Automation",
    description: "We ensure your product is bug-free, performant, and secure before it reaches users. From end-to-end automation testing and VAPT to load testing and API validation, we hold quality to the highest standard.",
    image: "/img/services/qa.webp",
    color: SERVICE_COLORS["qa"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/qa-automation",
  },
  {
    id: "data",
    title: "Data Engineering & BI",
    description: "We turn raw data into actionable business intelligence. From data pipelines and warehouses to Power BI dashboards and real-time analytics, we make your data work as hard as your team.",
    image: "/img/services/data.webp",
    color: SERVICE_COLORS["data"],
    tags: ["Enterprise Application", "CRM", "Legacy App", "Custom ERP", "Web App", "E-commerce", "Software Consulting Services"],
    learnMoreHref: "/services/data-engineering",
  },
];
