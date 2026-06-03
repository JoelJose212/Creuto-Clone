export interface SubService {
  name: string;
  slug: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string; // Key for Lucide icons
  iconColor: string; // Tailwind color class
  bgColor: string; // Tailwind bg color class
  description: string;
  subServices: SubService[];
}

export const SERVICES_MENU_DATA: ServiceCategory[] = [
  {
    id: "custom-software",
    name: "Custom Software Development",
    iconName: "Code",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Your business is unique, and your software should be too. We craft powerful tools that blend tech and strategy – built to perform, built to last.",
    subServices: [
      { name: "Custom ERP Development", slug: "custom-erp-development" },
      { name: "CRM Development", slug: "crm-development" },
      { name: "Enterprise Application Development", slug: "enterprise-application-development" },
      { name: "Legacy Application Modernization", slug: "legacy-application-modernization" },
      { name: "Web App Development", slug: "web-app-development" },
      { name: "MVP Development", slug: "mvp-development" },
      { name: "Software Consulting Services", slug: "software-consulting-services" },
      { name: "E-commerce Solutions", slug: "e-commerce-solutions" }
    ]
  },
  {
    id: "mobile-apps",
    name: "Mobile App Development",
    iconName: "Smartphone",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    description: "We build modern mobile apps that are fast, reliable, and easy to use. Whether it's Android, iOS, or both, our apps are customized to your goals.",
    subServices: [
      { name: "Android App Development", slug: "android-app-development" },
      { name: "iOS App Development", slug: "ios-app-development" },
      { name: "React Native App Development", slug: "react-native-app-development" },
      { name: "Flutter App Development", slug: "flutter-app-development" },
      { name: "Mobile App QA and Testing", slug: "mobile-app-qa-and-testing" },
      { name: "Mobile App Modernization", slug: "mobile-app-modernization" },
      { name: "Legacy Application Modernization", slug: "legacy-application-modernization" }
    ]
  },
  {
    id: "web-development",
    name: "Web Development",
    iconName: "Globe",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "We craft high-performance web applications that blend cutting-edge technology with intuitive design, transforming ideas into seamless digital experiences.",
    subServices: [
      { name: "Customized Web Development", slug: "customized-web-development" },
      { name: "Enterprise Web Development", slug: "enterprise-web-development" },
      { name: "Cross-Platform Development", slug: "cross-platform-development" },
      { name: "PWA (Product Web App) Development", slug: "pwa-development" },
      { name: "On-site SEO Development", slug: "on-site-seo-development" },
      { name: "CMS Development", slug: "cms-development" }
    ]
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud Engineering",
    iconName: "Cloud",
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Scalable DevOps and cloud solutions that streamline deployment, enhance security, and optimize performance - enabling businesses to innovate faster.",
    subServices: [
      { name: "AWS / GCP / Azure Consulting", slug: "aws-gcp-azure-consulting" },
      { name: "CI/CD Implementation", slug: "ci-cd-implementation" },
      { name: "Kubernetes Implementation", slug: "kubernetes-implementation" },
      { name: "Serverless Architecture", slug: "serverless-architecture" },
      { name: "Cloud Consulting & Cost Optimisation", slug: "cloud-consulting-cost-optimisation" },
      { name: "Infrastructure Management and Monitoring", slug: "infrastructure-management-and-monitoring" }
    ]
  },
  {
    id: "ai-engineering",
    name: "AI Engineering Services",
    iconName: "Brain",
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    description: "Harness the power of AI to transform your business. From custom machine learning models to generative AI solutions and natural language systems.",
    subServices: [
      { name: "Artificial Intelligence Development", slug: "artificial-intelligence-development" },
      { name: "AI Consulting", slug: "ai-consulting" },
      { name: "AI-Powered Mobile App Development", slug: "ai-powered-mobile-app-development" },
      { name: "Machine Learning & Analytics", slug: "machine-learning-and-analytics" },
      { name: "Generative AI", slug: "generative-ai" },
      { name: "ChatGPT Solutions", slug: "chatgpt-solutions" }
    ]
  },
  {
    id: "startup-engineering",
    name: "Startup Product Engineering",
    iconName: "Rocket",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    description: "Launch your product swiftly and correctly. From concept definition and investor-ready prototyping to rapid post-launch product iterations.",
    subServices: [
      { name: "MVP Development", slug: "mvp-development" },
      { name: "Product Strategy & Roadmapping", slug: "product-strategy-and-roadmapping" },
      { name: "Rapid Prototyping", slug: "rapid-prototyping" },
      { name: "Technical Architecture", slug: "technical-architecture" },
      { name: "Investor-Ready Demos", slug: "investor-ready-demos" },
      { name: "Post-Launch Iteration", slug: "post-launch-iteration" }
    ]
  }
];
