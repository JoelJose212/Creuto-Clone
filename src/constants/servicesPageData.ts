export interface ServicePageContent {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  canonical: string;
  hero: {
    category: string;
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
  };
  intro: {
    paragraphs: string[];
    goalTitle: string;
    goalDescription: string;
  };
  capabilities: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      imageSrc: string;
      imageAlt: string;
    }[];
  };
  process: {
    title: string;
    steps: {
      stepNumber: string;
      title: string;
      description: string;
    }[];
  };
  stats: {
    title: string;
    subtitle: string;
    items: {
      number: string;
      label: string;
    }[];
  };
  whyChoose: {
    title: string;
    items: {
      title: string;
      description: string;
      imageSrc: string;
      imageAlt: string;
    }[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES_PAGE_DATA: Record<string, ServicePageContent> = {
  "crm-development": {
    metaTitle: "Custom CRM Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft designs and develops high-adoption custom CRM software to automate sales pipelines, centralize customer data, and drive revenue growth.",
    keywords: ["Custom CRM Development", "Customer Relationship Management", "Sales Pipeline Automation", "CRM Software Bhubaneswar", "Custom Sales Tool"],
    canonical: "https://aananditechnosoft.com/services/crm-development",
    hero: {
      category: "Custom Software Development",
      title: "CRM Development Services",
      subtitle: "Build Customer Relationships That Drive Revenue Growth",
      description: "We design and build custom CRM systems that align with your unique sales pipelines, automate customer communication, and deliver actionable sales intelligence.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "CRM Development Services"
    },
    intro: {
      paragraphs: [
        "A standard off-the-shelf CRM often forces your sales and customer support teams to adapt to rigid structures and pay high monthly seat fees for unused features.",
        "At Aanandi TechnoSoft, we build custom CRMs designed specifically around your customer lifecycle and sales workflows. This increases sales team adoption and eliminates manual administration.",
        "We focus on deep integrations—syncing your CRM directly with email servers, telephony services, billing software, and custom communication channels to ensure data is always updated.",
        "Whether you need to streamline multi-channel lead intake, automate follow-up schedules, or equip executives with real-time pipeline analytics, we build a tool tailored for your success."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Build a highly adopted CRM that simplifies lead management, automates workflows, and secures customer relationships."
    },
    capabilities: {
      title: "Our CRM Development Capabilities",
      subtitle: "Six core pillars built to empower your sales force and elevate customer experiences.",
      items: [
        {
          title: "Visual Pipeline & Lead Management",
          description: "Track deals from lead generation to close with highly customizable Kanban boards and pipelines.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Pipeline & Lead Management"
        },
        {
          title: "Automated Workflows & Triggers",
          description: "Automate task creation, email outreach, quote generation, and status updates based on customer actions.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Automated Workflows"
        },
        {
          title: "Multi-Channel Communication Sync",
          description: "Connect call logs, SMS channels, emails, and WhatsApp histories directly into a unified customer profile timeline.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Communication Sync"
        },
        {
          title: "Sales Forecasting & Analytics",
          description: "Custom intelligence dashboards that track win rates, sales velocities, and performance forecasts.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Sales Forecasting"
        },
        {
          title: "Custom Billing & ERP Integration",
          description: "Seamlessly link completed deals to invoicing tools, client contracts, and backend project management systems.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Billing & ERP Integration"
        },
        {
          title: "Granular Security & Permissions",
          description: "Protect client files and contact numbers with strict role-based access controls and audit logging.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Granular Security"
        }
      ]
    },
    process: {
      title: "Our CRM Development Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Sales Pipeline & Workflow Mapping",
          description: "We map your current sales lifecycle, identify manual bottlenecks, and align on pipeline milestones."
        },
        {
          stepNumber: "STEP 2",
          title: "System Architecture & Integration Planning",
          description: "Planning APIs for communication channels, email gateways, telephony networks, and accounting links."
        },
        {
          stepNumber: "STEP 3",
          title: "UI/UX & Interactive Prototyping",
          description: "Designing simple, speed-optimized dashboards that sales representatives will actually want to use daily."
        },
        {
          stepNumber: "STEP 4",
          title: "Custom CRM Engineering & Syncing",
          description: "Writing clean React and Node.js code to develop modules, workflow engines, and automated databases."
        },
        {
          stepNumber: "STEP 5",
          title: "Data Migration, Testing & Training",
          description: "Writing scripts to safely import your legacy customer spreadsheets and testing core pipeline flows."
        },
        {
          stepNumber: "STEP 6",
          title: "Deployment & Team Onboarding Support",
          description: "Deploying your custom CRM and offering ongoing support to ensure maximum team adoption and uptime."
        }
      ]
    },
    stats: {
      title: "Impact Metrics",
      subtitle: "A trace record of boosting business efficiency through tailored CRM implementations.",
      items: [
        { number: "35%+", label: "Average Increase in Sales Rep Productivity" },
        { number: "100%", label: "Ownership of Custom Software IP & Data" },
        { number: "0", label: "Monthly Per-User Licensing Fees" },
        { number: "95%+", label: "User Adoption Rate Post Onboarding" }
      ]
    },
    whyChoose: {
      title: "Why Choose Aanandi for CRM Development?",
      items: [
        {
          title: "Strategic Product Thinking",
          description: "We design custom CRMs to match your winning sales habits, not standard vendor templates.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Product Thinking"
        },
        {
          title: "Zero License Lock-In",
          description: "Say goodbye to licensing fees. You own the software and database completely from day one.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Zero License Lock-In"
        },
        {
          title: "High Adoption Speed",
          description: "We create clean, intuitive screens that remove unnecessary clicks, helping reps focus on selling.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "High Adoption Speed"
        },
        {
          title: "Customized & Extensible",
          description: "As your company grows and offers new services, your CRM is built to evolve along with you.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Customized & Extensible"
        },
        {
          title: "Secure & Compliant",
          description: "Protect client data with secure storage architectures matching industry-standard data protection policies.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Secure & Compliant"
        },
        {
          title: "Experienced Team",
          description: "We bring years of CRM engineering expertise to solve complex data flows and multi-system syncing.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Experienced Team"
        }
      ]
    },
    faqs: [
      {
        question: "Why should we build a custom CRM instead of Salesforce or HubSpot?",
        answer: "Custom CRMs have zero per-user monthly licensing costs, allow you to own your databases entirely, and fit your exact workflows. This saves major costs at scale and prevents complex UI workarounds."
      }
    ]
  },
  "legacy-application-modernization": {
    metaTitle: "Legacy Application Modernization Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft modernizes outdated software systems, migrating legacy applications to scalable Next.js and cloud environments safely.",
    keywords: ["Legacy Software Modernization", "System Migration", "Cloud Migration", "Software Re-platforming", "App Migration Services"],
    canonical: "https://aananditechnosoft.com/services/legacy-application-modernization",
    hero: {
      category: "Custom Software Development",
      title: "Legacy Application Modernization",
      subtitle: "Transform Outdated Software into Modern Cloud Applications",
      description: "We migrate, refactor, and modernize legacy software systems to scalable cloud architectures, Next.js UI/UX frameworks, and secure databases with zero business disruption.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "Legacy Application Modernization"
    },
    intro: {
      paragraphs: [
        "Keeping legacy software running can be a major liability, resulting in high maintenance costs, security vulnerabilities, and blockages to scaling.",
        "We help businesses transition outdated legacy programs to modern Next.js and Cloud infrastructures. We rewrite old logic carefully, preserving your historical rules and databases.",
        "Our re-platforming approach is modular. We ensure that you can transition your day-to-day operations progressively, preventing expensive and risky 'big bang' deployments.",
        "Ensure your corporate knowledge and core processes are fully retained in a modern dashboard built for high performance, API flexibility, and modern security compliance."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a secure, high-performance web dashboard that replicates and improves upon your core business logic with zero system downtime."
    },
    capabilities: {
      title: "Our Modernization Capabilities",
      subtitle: "Six engineering practices designed to upgrade systems safely and efficiently.",
      items: [
        {
          title: "System Re-Platforming",
          description: "Porting old visual layers and backend stacks to responsive React, Next.js, and Node.js solutions.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "System Re-Platforming"
        },
        {
          title: "Database Migration & Schema Fixes",
          description: "Normalizing old databases, migrating schema structures, and securing query transactions.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Database Migration"
        },
        {
          title: "API-First Architecture Wrapper",
          description: "Building wrapper microservices around legacy databases to allow integrations with newer web services.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "API-First Wrapper"
        },
        {
          title: "Legacy Code Refactoring",
          description: "Cleaning and converting old spaghetti codebases into robust, modular, and maintainable systems.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Code Refactoring"
        },
        {
          title: "Cloud Infrastructure Setup",
          description: "Migrating legacy local servers to serverless cloud hosting on AWS, Azure, or GCP.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Cloud Hosting"
        },
        {
          title: "Security & Compliance Upgrades",
          description: "Implementing modern token-based auth (JWT/OAuth), data encryption, and corporate security filters.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Security Upgrades"
        }
      ]
    },
    process: {
      title: "Our Modernization Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "System Analysis & Code Audit",
          description: "We audit your existing legacy stack, database constraints, and dependencies to plan a safe migration path."
        },
        {
          stepNumber: "STEP 2",
          title: "Risk Analysis & Migration Design",
          description: "Formulating a step-by-step decoupling plan to migrate databases and server engines with zero business downtime."
        },
        {
          stepNumber: "STEP 3",
          title: "Modern UI/UX Dashboard Prototyping",
          description: "Designing a responsive, modern admin dashboard that matches the features of the legacy desktop system."
        },
        {
          stepNumber: "STEP 4",
          title: "Incremental Module Engineering",
          description: "Building new services and portals in parallel, verifying data integrity before decommissioning old systems."
        },
        {
          stepNumber: "STEP 5",
          title: "Parallel Run & Data Integrity Checks",
          description: "Running old and new systems concurrently to verify database sync, load capacity, and query performance."
        },
        {
          stepNumber: "STEP 6",
          title: "Cutover & Post-Launch Support",
          description: "Switching operations permanently to the cloud platform with expert engineering support on stand-by."
        }
      ]
    },
    stats: {
      title: "Modernization Impact",
      subtitle: "Helping organizations run faster and reduce operational overhead by upgrading legacy stacks.",
      items: [
        { number: "50%+", label: "Reduction in IT Maintenance & Hosting Overhead" },
        { number: "10x", label: "Faster Application Response & Loading Speeds" },
        { number: "0", label: "Critical Unresolved Security Vulnerabilities" },
        { number: "100%", label: "Operational Continuity During System Cutover" }
      ]
    },
    whyChoose: {
      title: "Why Trust Aanandi with Your Modernization?",
      items: [
        {
          title: "Risk-First Engineering",
          description: "We prioritize safety and business continuity above all else, ensuring zero data loss.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Risk-First Engineering"
        },
        {
          title: "Historical Rule Preservation",
          description: "We map and document your original software's business rules, keeping what makes your business unique.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Historical Preservation"
        },
        {
          title: "Modern Stack Experts",
          description: "We leverage modern React, Next.js, Node, and Tailwind styles to build clean interfaces.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Modern Stacks"
        },
        {
          title: "Modular Deployment",
          description: "We roll out code module by module, allowing team validation at every key step.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Modular Rollout"
        },
        {
          title: "Data Integrity Focus",
          description: "Our database migration experts ensure that decades of client histories remain intact.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Data Integrity"
        },
        {
          title: "Dedicated Training",
          description: "We help onboard your admin staff, turning a technical update into an easy team win.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Dedicated Training"
        }
      ]
    },
    faqs: [
      {
        question: "Will modernization disrupt our day-to-day operations?",
        answer: "No. We utilize modular migration strategies and run the old and new systems in parallel, ensuring that switching data handles does not stop your business flow."
      }
    ]
  },
  "mvp-development": {
    metaTitle: "MVP Development Services for Startups | Aanandi",
    metaDescription: "Aanandi TechnoSoft designs and develops high-performance Minimum Viable Products (MVPs) in 6-8 weeks to help startups validate ideas.",
    keywords: ["MVP Development", "Minimum Viable Product", "Startup Engineering", "Prototype Development", "Rapid Prototyping"],
    canonical: "https://aananditechnosoft.com/services/mvp-development",
    hero: {
      category: "Custom Software Development",
      title: "MVP Development Services",
      subtitle: "Launch Your Startup Product in 6 to 8 Weeks",
      description: "We translate startup concepts into investor-ready, high-performance Minimum Viable Products (MVPs) that validate ideas, attract funding, and delight early adopters.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "MVP Development Services"
    },
    intro: {
      paragraphs: [
        "In the startup ecosystem, velocity is everything. Spending months building features without user feedback increases market risk and drains capital.",
        "We build clean, focused, and reliable MVPs. We strip away non-essential features to construct a functional product centered on your core value proposition.",
        "Our engineering uses scalable startup architectures (Next.js, Node, PostgreSQL, and serverless hosting) to ensure that the code is structured to scale as you grow.",
        "Partner with a product-focused dev team that knows how to balance speed-to-market with engineering quality to impress early adopters and secure venture capital."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a fully functional, high-adoption MVP in 6-8 weeks with clean code that serves as a permanent foundation."
    },
    capabilities: {
      title: "Our MVP Development Capabilities",
      subtitle: "Six rapid execution services to move from whiteboard sketches to a live product.",
      items: [
        {
          title: "Product Definition & Scope Control",
          description: "Scoping sessions to lock down a 6-week roadmap focusing strictly on the features that matter.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Scope Control"
        },
        {
          title: "Rapid Interactive Prototyping",
          description: "High-fidelity Figma wireframes and visual workflows created to test look and feel before coding.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Interactive Prototyping"
        },
        {
          title: "Full-Stack MVP Engineering",
          description: "Fast frontend interfaces with Next.js integrated with secure backends and REST APIs.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Full-Stack MVP"
        },
        {
          title: "Core Feature Focus",
          description: "Tailored builds of key modules, including user authentication, Stripe payment steps, and data grids.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Core Feature Build"
        },
        {
          title: "Third-Party Integration Hookup",
          description: "Connecting essential startup utilities like SendGrid, Stripe, Twilio, and CRM trackers.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Integrations Hookup"
        },
        {
          title: "Cloud Infrastructure Setup",
          description: "Setting up cheap, auto-scaling serverless cloud hosting on AWS, Vercel, or Heroku.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Infrastructure Setup"
        }
      ]
    },
    process: {
      title: "Our MVP Roadmap",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Product Discovery & Scoping",
          description: "We define user personas, map core features, and finalize a highly structured 6-week roadmap."
        },
        {
          stepNumber: "STEP 2",
          title: "UX/UI Prototyping",
          description: "Creating key layouts and screen flows to ensure a premium user experience and clear visual design."
        },
        {
          stepNumber: "STEP 3",
          title: "Database Design & API Setup",
          description: "Structuring simple, scalable relational databases and setting up backend endpoints."
        },
        {
          stepNumber: "STEP 4",
          title: "Iterative Frontend/Backend Coding",
          description: "Building the main features in rapid sprints, reviewing progress with you every week."
        },
        {
          stepNumber: "STEP 5",
          title: "Testing, Integrations & QA",
          description: "Verifying that authentication, payments, database updates, and email notifications work correctly."
        },
        {
          stepNumber: "STEP 6",
          title: "Production Deployment & Launch",
          description: "Deploying to production, setting up tracking tools, and helping you launch live."
        }
      ]
    },
    stats: {
      title: "Startup Acceleration",
      subtitle: "Helping startups ship software quickly and iterate based on real feedback.",
      items: [
        { number: "6-8 Weeks", label: "Average Time to Design, Build, and Launch" },
        { number: "100%", label: "Data & Code IP Ownership Secured" },
        { number: "1/3", label: "Development Costs Compared to Traditional Scopes" },
        { number: "Investor-Ready", label: "Prototyped & Engineered Demos" }
      ]
    },
    whyChoose: {
      title: "Why Startups Partner with Aanandi?",
      items: [
        {
          title: "Startup Speed & Focus",
          description: "We think like startup founders, focusing on launch velocity over bloated backlogs.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Startup Speed"
        },
        {
          title: "Clean, Scalable Codebases",
          description: "We don't write throwaway code. Our MVPs are engineered with clear architecture ready to scale.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Clean Code"
        },
        {
          title: "Experienced Leads",
          description: "Our projects are guided by senior engineers and product consultants with years of experience.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Experienced Leads"
        },
        {
          title: "Transparent & Pragmatic",
          description: "We are honest about what you should leave out of the MVP to secure launch dates.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Pragmatic Focus"
        },
        {
          title: "Stripe & Auth Templates",
          description: "We utilize ready-to-run configurations for auth and billing, saving weeks of dev time.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Ready Integrations"
        },
        {
          title: "Investor-Ready Quality",
          description: "Our design-first screens are built to impress users and potential venture capital investors.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Investor-Ready Quality"
        }
      ]
    },
    faqs: [
      {
        question: "What happens after the MVP is launched?",
        answer: "We support you post-launch to monitor metrics, optimize performance, and continuously build version 2.0 based on real feedback."
      }
    ]
  },
  "e-commerce-solutions": {
    metaTitle: "Custom E-commerce Software Development | Aanandi",
    metaDescription: "Aanandi TechnoSoft develops custom E-commerce web applications, headless commerce systems, subscription portals, and API integrations.",
    keywords: ["Custom E-commerce", "Headless Commerce", "E-commerce Development Bhubaneswar", "Subscription Portals", "E-commerce Software"],
    canonical: "https://aananditechnosoft.com/services/e-commerce-solutions",
    hero: {
      category: "Custom Software Development",
      title: "E-commerce Solutions",
      subtitle: "Custom Shopping Platforms Built for High Conversion",
      description: "We build custom E-commerce websites, headless commerce systems, subscription portals, and complex payment syncs designed to handle heavy traffic and drive sales.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "Custom E-commerce Solutions"
    },
    intro: {
      paragraphs: [
        "While standard templates like Shopify or WooCommerce work for basic shops, they become limiting when you require custom checkouts, complex subscriptions, or API integrations.",
        "We build bespoke E-commerce platforms. We focus on lightning-fast product pages, high-converting checkout flows, and custom inventory databases.",
        "Our headless commerce experience allows us to decouple user dashboards from the database backend. This increases page loading speeds and secures customer transactions.",
        "Whether you need to manage custom B2B bulk ordering workflows, subscription billing engines, or connect your site to an ERP system, we build it to scale."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a lightning-fast custom shopping cart and checkout platform that integrates with your inventory and boosts revenue."
    },
    capabilities: {
      title: "Our Custom E-commerce Capabilities",
      subtitle: "Six specialized features to help you sell more online with zero platform restrictions.",
      items: [
        {
          title: "Custom Shopping Cart & Checkout",
          description: "Optimized one-page checkouts designed to reduce cart abandonment and increase average order values.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Custom Checkout"
        },
        {
          title: "Headless E-commerce Design",
          description: "Blazing fast product pages that rank higher on search engines and load in under 1 second.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Headless Commerce"
        },
        {
          title: "Subscription & Billing Portals",
          description: "Flexible subscription systems supporting weekly/monthly billing, coupon engines, and custom discounts.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Subscription Portals"
        },
        {
          title: "Real-Time Inventory Sync",
          description: "Centralized product databases that sync inventory levels across websites, apps, and warehouse tools.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Inventory Sync"
        },
        {
          title: "Multi-Gateway Payment Integration",
          description: "Secure integrations with Stripe, Razorpay, PayPal, Apple Pay, and local banking APIs.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Payment Integrations"
        },
        {
          title: "B2B Bulk Pricing & Wholesaling",
          description: "Customer accounts supporting bulk discounts, custom tier pricing, purchase orders, and tax exemptions.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "B2B Wholesaling"
        }
      ]
    },
    process: {
      title: "Our E-commerce Development Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Discovery & User Flow Mapping",
          description: "We map your catalog structure, purchase paths, billing rules, and third-party syncs."
        },
        {
          stepNumber: "STEP 2",
          title: "Architecture & Security Planning",
          description: "Designing secure database schemas, SSL configs, payment token flows, and API sync speeds."
        },
        {
          stepNumber: "STEP 3",
          title: "Conversion-Focused UI/UX Design",
          description: "Designing beautiful, responsive checkouts and catalog filtering systems built for mobile speed."
        },
        {
          stepNumber: "STEP 4",
          title: "Next.js Frontend & API Coding",
          description: "Developing fast, static catalog lists with responsive cart states and secure transaction controllers."
        },
        {
          stepNumber: "STEP 5",
          title: "Payment, Cart, & Shipping Testing",
          description: "Testing checkout flows under high load and checking automated shipping APIs and email notifications."
        },
        {
          stepNumber: "STEP 6",
          title: "Launch & Load Optimization",
          description: "Deploying your storefront to high-speed cloud networks and configuring caching rules."
        }
      ]
    },
    stats: {
      title: "E-commerce Impact",
      subtitle: "Helping brands drive online revenue with custom shopping cart platforms.",
      items: [
        { number: "Under 1s", label: "Average Page Load Speed for Catalogs" },
        { number: "25%+", label: "Average Increase in Cart Conversion Rate" },
        { number: "100%", label: "Platform Independence & Freedom from App Fees" },
        { number: "Auto-Scale", label: "Cloud Hosting Prepared for Traffic Spikes" }
      ]
    },
    whyChoose: {
      title: "Why Choose Aanandi for E-commerce?",
      items: [
        {
          title: "Speed for Conversions",
          description: "A 100ms lag can drop sales. We build Next.js frontends designed for speed.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Speed Focus"
        },
        {
          title: "No App Store Bloat",
          description: "Avoid third-party apps slowing down your site. We build custom features directly into the codebase.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "No App Bloat"
        },
        {
          title: "Complex Billing Experts",
          description: "We build custom subscription engines, split-payment systems, and automated tax reporting.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Billing Experts"
        },
        {
          title: "ERP & Inventory Sync",
          description: "We connect your storefront directly to ERP systems and shipping solutions.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Inventory Sync"
        },
        {
          title: "SEO Friendly by Design",
          description: "Clean schema tags, automated sitemaps, and optimized metadata structure to help you rank higher.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "SEO Optimization"
        },
        {
          title: "Extensible Platform",
          description: "Your platform is built to support your custom features, integrations, and apps as you grow.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Extensible Platform"
        }
      ]
    },
    faqs: [
      {
        question: "Can a custom store integrate with our legacy ERP systems?",
        answer: "Yes. We build custom API endpoints and syncing bridges to automatically push orders and update warehouse quantities."
      }
    ]
  },
  "software-consulting-services": {
    metaTitle: "Custom Software Consulting & Advisory | Aanandi",
    metaDescription: "Aanandi TechnoSoft provides expert software consulting, technical architecture design, stack auditing, and product planning services.",
    keywords: ["Software Consulting", "Tech Stack Audit", "Technical Architecture", "IT Advisory Services", "Product Roadmapping"],
    canonical: "https://aananditechnosoft.com/services/software-consulting-services",
    hero: {
      category: "Custom Software Development",
      title: "Software Consulting Services",
      subtitle: "Align Technical Decisions with Business Goals",
      description: "We partner with leaders to audit existing stacks, design reliable system architectures, choose technology solutions, and plan software development pipelines.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "Software Consulting Services"
    },
    intro: {
      paragraphs: [
        "Making the wrong technical decision early in a project can lead to expensive rewrites, maintenance headaches, and scaling bottlenecks later.",
        "Our consulting services provide senior architectural advice. We help you choose the right tech stack, define database schemas, and map development budgets.",
        "We audit legacy systems, looking for performance leaks, security vulnerabilities, and code bloat, providing clear steps for improvements.",
        "Whether you need an independent architecture review, a product roadmap, or advice on scaling team workflows, we are here to support you."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Provide a clear, detailed technical roadmap that prevents expensive mistakes and sets up your software for success."
    },
    capabilities: {
      title: "Our Software Consulting Services",
      subtitle: "Six strategic advisory areas to guide your engineering decisions.",
      items: [
        {
          title: "Technology Stack Audit & Selection",
          description: "Analyzing your requirements to recommend the best frameworks, databases, and hosting solutions.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Stack Audit"
        },
        {
          title: "System Architecture Design",
          description: "Creating detailed system topology designs, database layouts, and API boundaries.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Architecture Design"
        },
        {
          title: "Codebase Security & Audit",
          description: "Reviewing code for vulnerabilities, dependency security, SQL injections, and API risks.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Code Security Audit"
        },
        {
          title: "Performance & Cost Optimization",
          description: "Identifying bottlenecks, query lags, and high hosting bills to help you reduce cloud costs.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Performance Optimization"
        },
        {
          title: "Product Roadmapping & Scoping",
          description: "Translating features into structured engineering sprints, budgets, and timelines.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Product Roadmapping"
        },
        {
          title: "DevOps & Deployment Strategy",
          description: "Advising on CI/CD pipelines, container orchestration, and serverless hosting options.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "DevOps Strategy"
        }
      ]
    },
    process: {
      title: "Our Consulting Approach",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Discovery & Context Review",
          description: "We review your business goals, target user counts, current challenges, and budgets."
        },
        {
          stepNumber: "STEP 2",
          title: "Technical Audits & Interviews",
          description: "Auditing database structures, codebase patterns, and hosting configurations."
        },
        {
          stepNumber: "STEP 3",
          title: "Architecture Design & Modeling",
          description: "Modeling system interactions, API patterns, data flows, and security policies."
        },
        {
          stepNumber: "STEP 4",
          title: "Roadmapping & Recommendations",
          description: "Formulating a step-by-step implementation guide detailing tech selections, budgets, and risks."
        },
        {
          stepNumber: "STEP 5",
          title: "Stakeholder Alignment Session",
          description: "Presenting findings to your executive and technical teams to ensure alignment."
        },
        {
          stepNumber: "STEP 6",
          title: "On-Call Implementation Support",
          description: "Providing ongoing architectural advice and oversight as your engineering team builds the project."
        }
      ]
    },
    stats: {
      title: "Consulting Outcomes",
      subtitle: "Helping organizations save time and budget through structured technical planning.",
      items: [
        { number: "30%+", label: "Average Reduction in Monthly Cloud Hosting Costs" },
        { number: "0", label: "Critical Security Flaws Left Unresolved" },
        { number: "Weeks Saved", label: "By Preventing Unnecessary Feature Scopes" },
        { number: "100%", label: "Alignment Between Technical Stack and Growth Goals" }
      ]
    },
    whyChoose: {
      title: "Why Partner with Aanandi for Tech Advisory?",
      items: [
        {
          title: "Senior Developers Only",
          description: "Your architecture is designed by tech leads with years of experience building scalable systems.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Senior Developers"
        },
        {
          title: "Pragmatic Stack Selections",
          description: "We recommend practical technologies that suit your budget and talent pool, not complex trends.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Pragmatic Stacks"
        },
        {
          title: "Business-First Approach",
          description: "We ensure every engineering choice is backed by a clear commercial business case.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Business First"
        },
        {
          title: "Deep Security Focus",
          description: "We identify and fix security gaps before they become critical vulnerabilities.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Security Focus"
        },
        {
          title: "Clear Roadmaps",
          description: "We deliver easy-to-read, actionable blueprints, not long reports filled with jargon.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Clear Roadmaps"
        },
        {
          title: "Ongoing Architecture Support",
          description: "We stick around post-consultation to ensure your team implements our designs correctly.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Ongoing Support"
        }
      ]
    },
    faqs: [
      {
        question: "Do you help recruit developers to implement the designs?",
        answer: "Yes. We help clients vet internal development hires, review technical test submissions, and onboard new teams."
      }
    ]
  },
  "enterprise-application-development": {
    metaTitle: "Enterprise Application Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft develops scalable, secure, and robust custom enterprise applications, integrating business systems, legacy data, and APIs.",
    keywords: ["Enterprise Software Development", "Enterprise Applications", "Software Engineering Bhubaneswar", "Bespoke Enterprise Apps", "System Integration"],
    canonical: "https://aananditechnosoft.com/services/enterprise-application-development",
    hero: {
      category: "Custom Software Development",
      title: "Enterprise Application Development",
      subtitle: "Scalable Software Built for Complex Operations",
      description: "We engineer secure, high-performance enterprise applications designed to centralize backend data, automate multi-department workflows, and scale securely.",
      imageSrc: "/img/services/Custom-Sofware.webp",
      imageAlt: "Enterprise Application Development"
    },
    intro: {
      paragraphs: [
        "As organizations grow, they often rely on multiple disconnected systems, resulting in siloed data, duplicate work, and administrative overhead.",
        "We build bespoke enterprise software that connects your organization. We focus on centralizing data, automating cross-department workflows, and securing access.",
        "Our development practices focus on strict performance testing, clean database normalization, and robust API endpoints that handle heavy traffic.",
        "Whether you need a custom ERP system, a logistics portal, a multi-tenant client platform, or to connect legacy databases, we build it to last."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a secure, scalable enterprise platform that connects your systems, automates workflows, and drives efficiency."
    },
    capabilities: {
      title: "Our Enterprise Capabilities",
      subtitle: "Six core pillars built for reliability, security, and performance at scale.",
      items: [
        {
          title: "Custom Enterprise Portal Design",
          description: "Single-page responsive dashboards designed to handle complex administrative workflows.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Enterprise Portals"
        },
        {
          title: "Multi-System Integrations",
          description: "Connecting databases, billing tools, CRMs, and email gateways to keep data synced.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Multi-System Sync"
        },
        {
          title: "Role-Based Access Control (RBAC)",
          description: "Securing access with custom user permissions, two-factor authentication, and detail audit logs.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Access Control"
        },
        {
          title: "Automated Data Processing",
          description: "Bespoke workflow engines that process invoices, generate PDF reports, and trigger syncs automatically.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Data Processing"
        },
        {
          title: "Scalable Relational Databases",
          description: "Database architectures built with Postgres or SQL Server to handle millions of transactions safely.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Enterprise Databases"
        },
        {
          title: "Secure Enterprise Web APIs",
          description: "Documented REST or GraphQL APIs that connect internal services safely and quickly.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Enterprise Web APIs"
        }
      ]
    },
    process: {
      title: "Our Enterprise Development Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Operational Discovery & Alignment",
          description: "We study your workflows, system endpoints, database dependencies, and compliance goals."
        },
        {
          stepNumber: "STEP 2",
          title: "Architecture & Integration Design",
          description: "Designing database schemas, network security controls, and API specifications."
        },
        {
          stepNumber: "STEP 3",
          title: "High-Adoption Dashboard UI/UX Design",
          description: "Designing simple, responsive admin screens designed to reduce administrative clicks."
        },
        {
          stepNumber: "STEP 4",
          title: "Custom Core Engineering & Security",
          description: "Writing clean frontend and backend code to implement key features and security protocols."
        },
        {
          stepNumber: "STEP 5",
          title: "Data Migration & Rigorous QA",
          description: "Migrating legacy data, performing security penetration tests, and verifying APIs under heavy load."
        },
        {
          stepNumber: "STEP 6",
          title: "Deployment & On-Site Rollout Support",
          description: "Deploying to secure cloud environments and providing ongoing support during onboarding."
        }
      ]
    },
    stats: {
      title: "Enterprise Outcomes",
      subtitle: "A proven track record of boosting business efficiency through custom software engineering.",
      items: [
        { number: "99.99%", label: "Uptime and Reliability for Cloud Infrastructures" },
        { number: "100%", label: "Custom Code Ownership & Database Control" },
        { number: "40%+", label: "Reduction in Administrative Tasks and Processing Times" },
        { number: "SSO/MFA", label: "Enterprise Security Integration Standards Ready" }
      ]
    },
    whyChoose: {
      title: "Why Choose Aanandi for Enterprise Software?",
      items: [
        {
          title: "Engineered for Scale",
          description: "We build clean architectures designed to support millions of database records from day one.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Scale Focus"
        },
        {
          title: "Integration Experts",
          description: "We specialize in connecting disparate databases, legacy systems, and web APIs cleanly.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Integration Experts"
        },
        {
          title: "Deep Security Audits",
          description: "We deploy secure servers utilizing encryption and role-based permissions to protect customer data.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Security Focus"
        },
        {
          title: "Zero Vendor Lock-In",
          description: "You own the custom codebase and database, eliminating monthly per-seat licensing fees.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Zero Lock-In"
        },
        {
          title: "Responsive Admin Panels",
          description: "We build clean, intuitive screens that speed up team workflows and reduce input errors.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Clean Interfaces"
        },
        {
          title: "Dedicated Dev Support",
          description: "We stick around post-launch to monitor performance, deploy updates, and support your team.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Dev Support"
        }
      ]
    },
    faqs: [
      {
        question: "Can this system integrate with active Active Directory or Okta for login?",
        answer: "Yes. We support SAML, OAuth, Okta, Active Directory, and custom single sign-on (SSO) login systems."
      }
    ]
  }
};
