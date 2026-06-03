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
  },
  "ios-app-development": {
    metaTitle: "iOS App Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft builds high-performance, secure, and beautiful native iOS applications using Swift and React Native tailored for your enterprise workflows.",
    keywords: ["iOS App Development", "iPhone App Development", "Swift Development", "React Native iOS", "Apple App Development", "Mobile App Development Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/ios-app-development",
    hero: {
      category: "Mobile App Development",
      title: "iOS App Development",
      subtitle: "Premium iOS Applications. Built to the Standard Apple Users Expect.",
      description: "We design and build high-performance iOS applications that combine seamless user experience with robust, scalable engineering crafted to meet the quality expectations of Apple users and the operational demands of growing businesses.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "iOS App Development"
    },
    intro: {
      paragraphs: [
        "iOS applications that fail to meet Apple's quality expectations quickly lose user trust and App Store credibility.",
        "We build native iOS applications using Swift, SwiftUI, UIKit, and modern architecture patterns focused on performance, maintainability, and long-term scalability.",
        "Every application is designed around user behaviour, business goals, and Apple ecosystem requirements before development begins.",
        "Our iOS applications integrate seamlessly with APIs, payment systems, cloud platforms, analytics tools, and enterprise systems.",
        "From startup consumer apps to enterprise-grade mobile platforms, we build iOS applications designed to evolve with your business and future iOS releases."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Build scalable and reliable solutions that drive business growth and user engagement."
    },
    capabilities: {
      title: "Our iOS App Development Services",
      subtitle: "We build iOS applications that align with Apple's standards while delivering measurable business outcomes.",
      items: [
        {
          title: "Custom iOS App Development",
          description: "Custom iOS applications designed and built around your users, your product goals, and your business context.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Custom iOS App Development"
        },
        {
          title: "Native iOS Development",
          description: "Native Swift development with modern architecture patterns for performance, reliability, and long-term maintainability.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Native iOS Development"
        },
        {
          title: "Enterprise iOS Applications",
          description: "Secure, scalable iOS applications built for enterprise teams, operational workflows, and complex integration environments.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Enterprise iOS Applications"
        },
        {
          title: "iOS UI/UX Design",
          description: "iOS UI/UX design that meets Apple's quality bar while creating a distinct, purposeful product experience.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "iOS UI/UX Design"
        },
        {
          title: "API & Backend Integration",
          description: "Robust API and backend integrations that connect your iOS app securely to the services and data it needs.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "API & Backend Integration"
        },
        {
          title: "iOS App Testing & QA",
          description: "Comprehensive iOS QA across devices and OS versions that validates performance, stability, and security before launch.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "iOS App Testing & QA"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Discovery & Requirement Analysis",
          description: "Understanding users, product goals, Apple ecosystem requirements, and technical constraints."
        },
        {
          stepNumber: "STEP 2",
          title: "Product Strategy & Architecture Planning",
          description: "Defining scalable iOS architecture, APIs, backend integrations, and technical structure."
        },
        {
          stepNumber: "STEP 3",
          title: "UI/UX Design & Prototyping",
          description: "Creating interactive prototypes and user flows aligned with Apple's Human Interface Guidelines."
        },
        {
          stepNumber: "STEP 4",
          title: "iOS App Development",
          description: "Building native Swift applications in structured sprints with continuous testing and integration."
        },
        {
          stepNumber: "STEP 5",
          title: "Testing & App Store Deployment",
          description: "Testing across iPhone and iPad devices while managing App Store submission and rollout."
        },
        {
          stepNumber: "STEP 6",
          title: "Support & Continuous Optimisation",
          description: "Monitoring, maintaining, and improving the application after launch based on real user feedback."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Delivering premium native iOS applications for startups, enterprises, and SaaS products.",
      items: [
        { number: "65+", label: "iOS Applications Designed & App Store Approved" },
        { number: "20+", label: "API, Payment & Cloud Platform Integrations" },
        { number: "40+", label: "iPhone & iPad Device Configurations Tested" },
        { number: "100+", label: "Consumer, Enterprise & SaaS Mobile Products Delivered" }
      ]
    },
    whyChoose: {
      title: "Why Choose Creuto for iOS App Development?",
      items: [
        {
          title: "Product-First iOS Development",
          description: "Every technical and design decision is aligned with user expectations and business goals.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Product First"
        },
        {
          title: "Native Swift Expertise",
          description: "Native Swift development using modern architecture patterns for long-term maintainability.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Swift"
        },
        {
          title: "Design That Meets Apple's Standard",
          description: "Interfaces crafted to align with Apple's quality expectations and platform conventions.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Design"
        },
        {
          title: "Performance Engineered In",
          description: "Speed, memory optimisation, and battery efficiency are considered from the first sprint.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Performance"
        },
        {
          title: "Agile, Transparent Delivery",
          description: "Short development cycles, regular demos, and continuous collaboration throughout the project.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Agile"
        },
        {
          title: "Long-Term Maintenance & iOS Compatibility",
          description: "Ongoing updates, compatibility support, and maintenance for future iOS releases.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Maintenance"
        }
      ]
    },
    faqs: [
      {
        question: "How long does iOS app development take?",
        answer: "Focused MVPs typically take 6–10 weeks, while full-featured applications generally require 3–6 months depending on complexity."
      },
      {
        question: "Do you build native iOS applications?",
        answer: "Yes. We build native iOS applications using Swift, SwiftUI, UIKit, and modern iOS frameworks."
      },
      {
        question: "Will the app remain compatible with future iOS updates?",
        answer: "Yes. We follow Apple's current standards and provide ongoing support to maintain compatibility with future iOS releases."
      },
      {
        question: "Can the app integrate with third-party systems and payment gateways?",
        answer: "Absolutely. We integrate with APIs, payment providers, cloud services, CRMs, analytics tools, and enterprise platforms."
      },
      {
        question: "Do you provide maintenance and support after the app launches?",
        answer: "Yes. We provide post-launch maintenance, bug fixes, performance optimisation, and ongoing feature updates."
      }
    ]
  },
  "android-app-development": {
    metaTitle: "Android App Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft develops secure, robust, and scalable native Android applications using Kotlin and Java for smartphones, tablets, and Android TV.",
    keywords: ["Android App Development", "Kotlin App Development", "Java Android", "Android Tablet App", "Android TV App", "Mobile App Development Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/android-app-development",
    hero: {
      category: "Mobile App Development",
      title: "Android App Development",
      subtitle: "High-Performance Android Applications. Built for the Global Android Ecosystem.",
      description: "We design and build robust Android applications using Kotlin and Java. Our engineering team ensures peak performance, seamless user experience, and secure integrations across a diverse range of devices.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "Android App Development"
    },
    intro: {
      paragraphs: [
        "Android's massive device fragmentation demands an app development approach focused on responsiveness, adaptive layouts, and performance optimization.",
        "We build native Android applications using Kotlin, Jetpack Compose, and modern Clean Architecture patterns, ensuring compatibility across thousands of device profiles.",
        "From intuitive UI/UX design to robust background processing and secure local databases, we engineer apps that run smoothly on every screen size.",
        "Our Android solutions connect seamlessly with Google Play Services, third-party REST APIs, IoT hardware, and custom enterprise databases.",
        "Whether you are launching a consumer SaaS app, a local utility tool, or an enterprise-wide mobile workflow system, we deliver apps built to scale."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Build highly compatible, feature-rich Android apps that capture market share and operate reliably at scale."
    },
    capabilities: {
      title: "Our Android App Development Services",
      subtitle: "We build Android applications that align with Google's Material Design standards while delivering major business value.",
      items: [
        {
          title: "Custom Android App Development",
          description: "Bespoke Android apps designed around user habits, custom features, and business logic.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Custom Android App Development"
        },
        {
          title: "Native Kotlin Engineering",
          description: "Modern Kotlin development with Jetpack Compose for fast, lightweight layouts and reactive UI states.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Native Kotlin Engineering"
        },
        {
          title: "Enterprise Android Apps",
          description: "Enterprise-grade Android apps featuring secure offline data syncing, MDM readiness, and secure local databases.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Enterprise Android Apps"
        },
        {
          title: "Material Design UI/UX",
          description: "Interfaces designed according to Google's Material Design principles, optimized for various screen shapes.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Material Design UI/UX"
        },
        {
          title: "API & Hardware Integration",
          description: "Integrations with BLE, NFC, camera APIs, GPS tracking, and corporate REST/GraphQL backends.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "API & Hardware Integration"
        },
        {
          title: "Android Testing & Optimization",
          description: "Comprehensive automated and manual testing on real devices to optimize battery usage and memory footprint.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Android Testing & Optimization"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Discovery & Device Strategy",
          description: "Analyzing target user bases, selecting specific OS targets, and scoping hardware integrations."
        },
        {
          stepNumber: "STEP 2",
          title: "Architecture & API Modeling",
          description: "Designing clean Android architecture boundaries, offline sync modes, and backend API contracts."
        },
        {
          stepNumber: "STEP 3",
          title: "Material UI/UX Design",
          description: "Creating responsive screens, state variations, and interactive mockups tailored for Android form factors."
        },
        {
          stepNumber: "STEP 4",
          title: "Native Android Development",
          description: "Writing clean Kotlin code in agile sprints, using Jetpack libraries for robust background handling."
        },
        {
          stepNumber: "STEP 5",
          title: "Device Grid Testing & Play Store Release",
          description: "Testing across a diverse device grid, resolving screen scaling issues, and managing Google Play Console release."
        },
        {
          stepNumber: "STEP 6",
          title: "Analytics & Performance Tuning",
          description: "Monitoring crash reports, tracking load performance, and rolling out regular feature updates."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Delivering premium native Android applications for global users and businesses.",
      items: [
        { number: "70+", label: "Android Apps Launched & Google Play Approved" },
        { number: "500+", label: "Device Configurations Verified and Supported" },
        { number: "99.9%", label: "Crash-Free Session Rates Maintained for Live Apps" },
        { number: "Millions", label: "Of Combined App Store Downloads and Interactions" }
      ]
    },
    whyChoose: {
      title: "Why Choose Creuto for Android App Development?",
      items: [
        {
          title: "Targeted Android Expertise",
          description: "Deep knowledge of Kotlin, Jetpack Compose, and background task management on Android OS.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Targeted Android Expertise"
        },
        {
          title: "Device Compatibility Focus",
          description: "We test apps on a wide grid of screens, processor speeds, and OS versions to ensure reliability.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Device Compatibility"
        },
        {
          title: "Google Material Design",
          description: "Crafting clean, accessible, and intuitive layouts that follow Google's design practices.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Google Design"
        },
        {
          title: "Battery & Memory Efficiency",
          description: "We optimize thread management and database queries to protect device resources and battery.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Resource Optimization"
        },
        {
          title: "Secure Offline Operation",
          description: "Implementing encrypted local databases like Room and SQLCipher for offline data access.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Offline Security"
        },
        {
          title: "Continuous Release Management",
          description: "Managing target SDK upgrades and Play Store compliance reviews seamlessly.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "SDK Upgrades"
        }
      ]
    },
    faqs: [
      {
        question: "How do you handle Android device fragmentation?",
        answer: "We use adaptive layout tools, responsive design frameworks, and run tests on real device grids to ensure visual and functional consistency across all major brands."
      },
      {
        question: "Do you write native Android code?",
        answer: "Yes. We develop in Kotlin using Jetpack Compose and native library modules for optimal performance."
      },
      {
        question: "Can the Android app function offline?",
        answer: "Yes. We design custom offline syncing layers that store data locally on the device and sync it automatically once an active connection is restored."
      },
      {
        question: "How long does a Google Play Store approval take?",
        answer: "Play Store approvals generally take anywhere from a few hours to 3-5 business days depending on Google's review queue."
      },
      {
        question: "Do you support Android TV or wearable devices?",
        answer: "Yes. We design and build custom native layouts tailored specifically for Android TV interfaces and Wear OS smartwatches."
      }
    ]
  },
  "react-native-app-development": {
    metaTitle: "React Native App Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft develops cross-platform mobile apps using React Native. Get native performance on iOS and Android with a single shared codebase.",
    keywords: ["React Native Development", "Cross-Platform Mobile App", "React Native Developer", "Hybrid App Development", "Mobile App Development Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/react-native-app-development",
    hero: {
      category: "Mobile App Development",
      title: "React Native App Development",
      subtitle: "Cross-Platform Efficiency. Native iOS and Android Performance.",
      description: "We build high-performance mobile applications using React Native. Share up to 90% of your codebase across iOS and Android to cut development costs and speed up time-to-market.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "React Native App Development"
    },
    intro: {
      paragraphs: [
        "Maintaining separate Swift and Kotlin codebases can double your development costs and slow down feature rollouts.",
        "React Native enables cross-platform engineering, combining Javascript efficiency with native UI rendering for high-speed app performance.",
        "We build clean React Native architectures utilizing TypeScript, Redux, and custom native bridge integrations for complex features.",
        "Every application is built to load instantly, render screens smoothly, and feel completely native to both Apple and Google users.",
        "Maximize your budget by building a single cross-platform code base that rolls out updates to iOS and Android users simultaneously."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a single cross-platform codebase that renders high-fidelity, high-performance apps on both iOS and Android."
    },
    capabilities: {
      title: "Our React Native Services",
      subtitle: "We build cross-platform applications that deliver native speed and seamless user interactions.",
      items: [
        {
          title: "Cross-Platform App Development",
          description: "Building multi-platform apps from a single codebase to speed up development schedules.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Cross-Platform Development"
        },
        {
          title: "React Native UI Engineering",
          description: "Crafting high-fidelity UI screens using native UI controls for smooth transitions and gesture controls.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "UI Engineering"
        },
        {
          title: "Custom Native Bridges",
          description: "Writing custom Swift and Kotlin bindings to access specific hardware, cameras, and system tools.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Native Bridges"
        },
        {
          title: "State Management & Core APIs",
          description: "Robust local data caching, Redux/Zustand state setups, and REST/GraphQL backend hooks.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "State Management"
        },
        {
          title: "Hybrid App Integration",
          description: "Embedding React Native views into existing legacy iOS and Android codebases safely.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Hybrid Integration"
        },
        {
          title: "CodePush & Fast Deployment",
          description: "Implementing over-the-air (OTA) updates to push bug fixes directly to users without App Store delay.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "CodePush Setup"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Product Discovery & Cross-Platform Scoping",
          description: "Identifying shared workflows, platform variations, and complex hardware requirements."
        },
        {
          stepNumber: "STEP 2",
          title: "Architecture & Native Bridge Design",
          description: "Mapping database schema, choosing cross-platform libraries, and outlining custom native wrappers."
        },
        {
          stepNumber: "STEP 3",
          title: "Unified UI/UX Design",
          description: "Designing interface layouts that scale and feel natural on both iOS and Android design systems."
        },
        {
          stepNumber: "STEP 4",
          title: "React Native Coding & Sprints",
          description: "Developing core features in TypeScript, building reusable components, and managing state modules."
        },
        {
          stepNumber: "STEP 5",
          title: "Simultaneous OS Verification",
          description: "Testing app logic in parallel across iOS and Android simulators, tablets, and real target devices."
        },
        {
          stepNumber: "STEP 6",
          title: "App Store Deploy & CodePush Setup",
          description: "Configuring App Store profiles and implementing CodePush pipelines for instant updates."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Optimizing mobile engineering speed and cost through cross-platform React Native solutions.",
      items: [
        { number: "50%+", label: "Saved in Development & Maintenance Costs" },
        { number: "90%+", label: "Shared Codebase Across iOS and Android Targets" },
        { number: "4.8★", label: "Average App Store Rating for Cross-Platform Launches" },
        { number: "Instant", label: "OTA Bug Fix Rollouts via CodePush Integration" }
      ]
    },
    whyChoose: {
      title: "Why Choose Creuto for React Native Apps?",
      items: [
        {
          title: "Unified Team & Code",
          description: "One developer team builds and maintains both platforms, cutting overhead and communication lag.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Unified Team"
        },
        {
          title: "Native Execution Speeds",
          description: "We optimize JavaScript thread execution and rendering cycles to keep animations fluid at 60 FPS.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Native Execution Speeds"
        },
        {
          title: "Bridging Complexity",
          description: "Our engineers can write custom native objective-C/Swift/Java bridges when standard plugins fall short.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Bridging Complexity"
        },
        {
          title: "TypeScript Security",
          description: "We build codebases using strict TypeScript definitions to prevent runtime failures.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "TypeScript Security"
        },
        {
          title: "Over-The-Air Updates",
          description: "Push security fixes and text updates instantly to users without waiting for App Store reviews.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "OTA Updates"
        },
        {
          title: "Extensive Ecosystem Support",
          description: "We leverage thousands of pre-tested React packages to speed up feature integration.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Ecosystem Support"
        }
      ]
    },
    faqs: [
      {
        question: "Is React Native performance as good as native Swift or Kotlin?",
        answer: "For 95% of business applications, React Native is indistinguishable from fully native apps. We optimize layouts and bridge configurations to ensure smooth 60 FPS execution."
      },
      {
        question: "Can we share code with our React web application?",
        answer: "Yes. While UI components differ, we can structure project models to share API hooks, state logic, and utility functions with your React web dashboard."
      },
      {
        question: "How does React Native access device hardware?",
        answer: "It accesses hardware via pre-built community packages. If a specific tool is required, we write custom Swift/Kotlin bridges to access device APIs directly."
      },
      {
        question: "Can we migrate an existing native app to React Native?",
        answer: "Yes. We can integrate React Native modules into your existing native app progressively, or rebuild the app from scratch depending on your goals."
      },
      {
        question: "How does CodePush work?",
        answer: "CodePush allows us to deploy JavaScript updates directly to user devices. This means bugs can be fixed and layouts changed without requiring a new store submission."
      }
    ]
  },
  "flutter-app-development": {
    metaTitle: "Flutter App Development Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft develops cross-platform mobile apps using Flutter. Get gorgeous designs and native-speed execution on iOS, Android, and web from a single codebase.",
    keywords: ["Flutter App Development", "Flutter Developer", "Google Flutter", "Cross-Platform Mobile App", "Dart Development Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/flutter-app-development",
    hero: {
      category: "Mobile App Development",
      title: "Flutter App Development",
      subtitle: "Pixel-Perfect Custom UI. Native Execution on Any Screen.",
      description: "We build stunning, natively compiled mobile applications using Google's Flutter framework. Share a single Dart codebase to deliver pixel-perfect designs and fast graphics performance on iOS and Android.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "Flutter App Development"
    },
    intro: {
      paragraphs: [
        "When you need a custom visual layout, native platform UI styles can restrict your designer's creative vision.",
        "Flutter compiles directly to native ARM machine code, bypassing Javascript engines to deliver high performance and complex UI styling.",
        "We build Flutter applications in Dart, creating custom, reusable UI widgets that render identically on Apple and Android devices.",
        "Every layout is designed for performance, leveraging Skia and Impeller graphics engines to ensure smooth transitions and animations.",
        "Partner with a Flutter development team that knows how to build clean architectures, coordinate fast API data syncs, and speed up launch dates."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Deliver a custom, graphics-optimized Flutter application that renders identically and performs at native speeds."
    },
    capabilities: {
      title: "Our Flutter App Development Services",
      subtitle: "We build cross-platform mobile apps that combine visual design with hardware performance.",
      items: [
        {
          title: "Flutter Cross-Platform Development",
          description: "Developing high-fidelity iOS and Android applications from a single, unified Dart code repo.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Flutter Cross-Platform Development"
        },
        {
          title: "Pixel-Perfect UI Rendering",
          description: "Creating highly customized UI components and gestures that look identical across all screens.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Pixel-Perfect UI Rendering"
        },
        {
          title: "Natively Compiled Performance",
          description: "Compiling Dart code directly to machine instructions for fast launch speeds and smooth transitions.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Natively Compiled Performance"
        },
        {
          title: "Custom Platform Integrations",
          description: "Writing custom platform channels to access local hardware, file structures, and native services.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Custom Platform Integrations"
        },
        {
          title: "Offline Data Sync & Storage",
          description: "Implementing secure local databases like Hive or SQLite with automated background sync.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "Offline Data Sync"
        },
        {
          title: "Flutter Web & Desktop Porting",
          description: "Extending your mobile codebase to deploy web dashboards and desktop applications efficiently.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Flutter Web & Desktop Porting"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Discovery & UI/UX Roadmapping",
          description: "Scoping features, locking in custom layout designs, and mapping cross-platform workflows."
        },
        {
          stepNumber: "STEP 2",
          title: "Architecture & Platform Channel Mapping",
          description: "Structuring Dart architectures, database setups, and mapping native hardware interfaces."
        },
        {
          stepNumber: "STEP 3",
          title: "Widget & Screen Design",
          description: "Creating high-fidelity UI screens, animations, and custom widgets to ensure brand consistency."
        },
        {
          stepNumber: "STEP 4",
          title: "Flutter App Engineering",
          description: "Writing clean Dart code in agile sprints, using state libraries like BLoC or Provider."
        },
        {
          stepNumber: "STEP 5",
          title: "Simultaneous Platform Testing",
          description: "Running tests on real iOS and Android devices to verify layouts, API links, and offline syncing."
        },
        {
          stepNumber: "STEP 6",
          title: "App Store Submit & Monitoring",
          description: "Submitting builds to Apple App Store and Google Play, setting up crash analytics trackers."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Accelerating digital products through custom, high-fidelity Flutter apps.",
      items: [
        { number: "120fps", label: "Maximum Rendering Speed Supported on Pro Motion Displays" },
        { number: "1 Codebase", label: "Renders Identically on iOS, Android, and Web" },
        { number: "40%+", label: "Reduction in Time-to-Market for Multi-Platform Launches" },
        { number: "100%", label: "Custom UI Control & Freedom from Native Constraints" }
      ]
    },
    whyChoose: {
      title: "Why Choose Creuto for Flutter Development?",
      items: [
        {
          title: "Expert Dart Developers",
          description: "Our engineers specialize in writing clean, structured, and modular Dart codebases.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Expert Dart Developers"
        },
        {
          title: "Visual Freedom",
          description: "We render custom layouts down to the pixel without native OS style limits.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Visual Freedom"
        },
        {
          title: "Impeller Graphics Tuning",
          description: "We utilize the latest Flutter rendering engines to eliminate visual stutter and lag.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Impeller Graphics"
        },
        {
          title: "BLoC State Architecture",
          description: "We use structured BLoC patterns to keep business logic separated from UI rendering.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "BLoC Architecture"
        },
        {
          title: "Hardware API Channeling",
          description: "We write custom channels to connect to camera hardware, sensors, and local files.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Hardware Channeling"
        },
        {
          title: "Multi-Platform Portability",
          description: "We help you scale from mobile to web and desktop without rewriting your app.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Multi-Platform"
        }
      ]
    },
    faqs: [
      {
        question: "Why choose Flutter over React Native?",
        answer: "Flutter is ideal for custom designs and heavy animations. It compiles to machine code and renders layouts manually, ensuring consistency across devices."
      },
      {
        question: "Does Flutter work on the Web and Desktop?",
        answer: "Yes. A Flutter codebase can compile to responsive web builds and native desktop apps (macOS, Windows, Linux) with minor adjustments."
      },
      {
        question: "What state management patterns do you use?",
        answer: "We use BLoC (Business Logic Component) or Provider patterns. This separates logic from layouts, making code easier to test and scale."
      },
      {
        question: "How does Flutter communicate with native OS features?",
        answer: "It communicates via Platform Channels. If a feature needs native APIs (like Apple Health or Google Fit), we write custom Kotlin and Swift integration wrappers."
      },
      {
        question: "Is Dart easy to maintain?",
        answer: "Yes. Dart is strongly typed and supports object-oriented code, making codebases clean and scalable for enterprise projects."
      }
    ]
  },
  "mobile-app-qa-and-testing": {
    metaTitle: "Mobile App QA & Quality Assurance Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft provides mobile app testing services. Ensure your iOS and Android apps are bug-free, secure, and run smoothly across devices.",
    keywords: ["Mobile App QA", "Mobile App Testing", "iOS Testing", "Android Testing Services", "Automated Mobile Testing", "Quality Assurance Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/mobile-app-qa-and-testing",
    hero: {
      category: "Mobile App Development",
      title: "Mobile App QA & Testing",
      subtitle: "Eliminate Bugs. Ensure Stable, Secure, and High-Performance Mobile Apps.",
      description: "We provide comprehensive mobile app QA and testing. From automated unit testing to manual device audits, we ensure your app performs under heavy load, preserves battery, and runs bug-free.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "Mobile App QA and Testing"
    },
    intro: {
      paragraphs: [
        "A single crash or critical bug can lead to negative app reviews, damaging your brand's reputation and user retention.",
        "We provide comprehensive mobile QA services. We run your applications through rigorous testing stages to identify bugs before launch.",
        "Our testing grid covers real devices, checking for UI alignment issues, network dropouts, battery drain, and memory leaks.",
        "We combine manual usability testing with automated scripts using tools like Appium and XCTest to ensure code reliability.",
        "Deliver bug-free applications that earn user trust, perform well under stress, and get approved by store review teams instantly."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Ensure your mobile applications are stable, secure, and compatible across all major device and OS configurations."
    },
    capabilities: {
      title: "Our Mobile QA & Testing Services",
      subtitle: "We verify mobile app quality through automated pipelines and real-world manual testing.",
      items: [
        {
          title: "Automated Testing Pipelines",
          description: "Writing automated test scripts using Appium, XCTest, and Espresso to check core user flows.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Automated Testing Pipelines"
        },
        {
          title: "Manual Usability Audits",
          description: "Testing screens manually on real iPhones and Androids to check touch targets and UX flows.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "Manual Usability Audits"
        },
        {
          title: "Performance & Stress Tests",
          description: "Verifying app load speeds, memory leaks, and CPU stress under poor network conditions.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Performance & Stress Tests"
        },
        {
          title: "Security & Penetration Testing",
          description: "Auditing local database encryption, token storage, SSL pinning, and API vulnerability risks.",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Security Testing"
        },
        {
          title: "API & Backend Stress Testing",
          description: "Verifying that database syncs, background alerts, and server endpoints respond correctly under high user traffic.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "API Testing"
        },
        {
          title: "Store Pre-Submission Audits",
          description: "Checking guidelines compliance to ensure fast approval on the App Store and Google Play.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Store Pre-Submission Audits"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Scope Definition & Plan Setup",
          description: "Identifying key user flows, target hardware platforms, and security compliance objectives."
        },
        {
          stepNumber: "STEP 2",
          title: "Test Case Development",
          description: "Writing detailed manual test cases and configuring automated test scripts."
        },
        {
          stepNumber: "STEP 3",
          title: "Environment & Data Setup",
          description: "Configuring mock APIs, databases, and device simulators for isolated test environments."
        },
        {
          stepNumber: "STEP 4",
          title: "Execution & Sprints Testing",
          description: "Running tests on device grids, logging bugs, and coordinating with developers for fixes."
        },
        {
          stepNumber: "STEP 5",
          title: "Regression & Performance Audits",
          description: "Re-testing fixed builds, running battery tests, and checking API data sync speeds."
        },
        {
          stepNumber: "STEP 6",
          title: "Sign-Off & Store Launch Support",
          description: "Issuing final test reports and providing support during store launch."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Helping brands secure stable launches and maintain high store ratings.",
      items: [
        { number: "99.9%", label: "Crash-Free Sessions Achieved Post-Testing" },
        { number: "100+", label: "Real Devices Checked Across iOS and Android" },
        { number: "0", label: "Critical Security Failures Left Unresolved" },
        { number: "Fast-Track", label: "App Store Approval Success Rate" }
      ]
    },
    whyChoose: {
      title: "Why Partner with Creuto for Mobile QA?",
      items: [
        {
          title: "Real Device Grids",
          description: "We test on real physical phones, not just simulators, to catch real-world performance issues.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Real Device Grids"
        },
        {
          title: "Automated & Manual Balance",
          description: "We combine automated scripts for speed with manual audits for user feel.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Automated & Manual"
        },
        {
          title: "Deep Security Checkups",
          description: "We review data storage and tokens to prevent leakage and protect user privacy.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Security Checkups"
        },
        {
          title: "Network Stutter Testing",
          description: "We simulate poor network speeds and offline states to verify database stability.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Network Stutter"
        },
        {
          title: "Clear Bug Tracking Reports",
          description: "We log clean reports with screen recordings, logs, and trace steps for fast fixes.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Bug Tracking"
        },
        {
          title: "Store Compliance Experts",
          description: "We check store policies beforehand to ensure smooth approval on your first submit.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Compliance Experts"
        }
      ]
    },
    faqs: [
      {
        question: "Why test on real devices instead of simulators?",
        answer: "Simulators do not reproduce real hardware constraints like battery heat, camera behaviors, background processes, or memory limits. Testing on physical devices is crucial for accurate validation."
      },
      {
        question: "Do you write automated tests?",
        answer: "Yes. We write automated scripts using Appium, XCTest, and Espresso to check core user paths, while using manual tests for visual design and feel."
      },
      {
        question: "What is regression testing?",
        answer: "Regression testing ensures that new features or bug fixes do not introduce new issues to existing parts of the application."
      },
      {
        question: "Do you test for poor internet connections?",
        answer: "Yes. We simulate bandwidth drops and offline states to ensure the app handles data syncs and errors cleanly without crashing."
      },
      {
        question: "Can you help with App Store rejections?",
        answer: "Yes. If your app is rejected, we review the store's feedback, reproduce the issue, and help your developers patch it for approval."
      }
    ]
  },
  "mobile-app-modernization": {
    metaTitle: "Mobile App Modernization Services | Aanandi",
    metaDescription: "Aanandi TechnoSoft modernizes outdated mobile apps, refactoring codebase infrastructure, updating UI/UX, and migrating to modern hybrid frameworks safely.",
    keywords: ["Mobile App Modernization", "App Legacy Refactoring", "UI UX Revamp", "App Migration Services", "Mobile App Development Bhubaneswar"],
    canonical: "https://aananditechnosoft.com/services/mobile-app-modernization",
    hero: {
      category: "Mobile App Development",
      title: "Mobile App Modernization",
      subtitle: "Upgrade Legacy Apps. Revamp UI/UX. Optimize Code Performance.",
      description: "We migrate legacy codebases, upgrade outdated libraries, redesign user interfaces, and port native apps to modern cross-platform frameworks with zero data disruption.",
      imageSrc: "/img/newService/mobile-app/mobile-app.webp",
      imageAlt: "Mobile App Modernization"
    },
    intro: {
      paragraphs: [
        "An outdated mobile app with slow load times, poor security, and old UI design will drive users away to modern competitors.",
        "We help businesses modernize outdated mobile apps. We refactor legacy code, update design systems, and migrate apps to Kotlin, Swift, or Flutter.",
        "Our modernization process is structured. We review old database schemas and code logic, updating them module-by-module to prevent data loss.",
        "We improve loading performance, implement modern security protocols, and revamp the visual interface to match current design standards.",
        "Breathe new life into your application, reduce maintenance overhead, and deliver a fast, modern mobile app that users love."
      ],
      goalTitle: "OUR GOAL",
      goalDescription: "Transform outdated mobile codebases into high-performance, modern applications with zero operational disruption."
    },
    capabilities: {
      title: "Our Mobile Modernization Services",
      subtitle: "We upgrade legacy mobile applications to improve performance, security, and visual appeal.",
      items: [
        {
          title: "Codebase Refactoring",
          description: "Cleaning up legacy codebases, removing obsolete libraries, and updating SDK targets.",
          imageSrc: "/img/newService/mobile-app/1.png",
          imageAlt: "Codebase Refactoring"
        },
        {
          title: "Modern UI/UX Revamp",
          description: "Redesigning old user interfaces to create responsive, accessible, and clean visual layouts.",
          imageSrc: "/img/newService/mobile-app/2.png",
          imageAlt: "UI UX Revamp"
        },
        {
          title: "Hybrid Framework Porting",
          description: "Migrating separate legacy native apps to a unified React Native or Flutter codebase.",
          imageSrc: "/img/newService/mobile-app/3.png",
          imageAlt: "Hybrid Framework Porting"
        },
        {
          title: "Database & Security Upgrades",
          description: "Migrating old database schemas, optimizing local caching, and adding modern token auth (JWT/OAuth).",
          imageSrc: "/img/newService/mobile-app/4.png",
          imageAlt: "Database Security Upgrades"
        },
        {
          title: "API-First Restructuring",
          description: "Replacing rigid custom endpoints with clean REST or GraphQL microservices.",
          imageSrc: "/img/newService/mobile-app/5.png",
          imageAlt: "API Restructuring"
        },
        {
          title: "Performance & Crash Fixes",
          description: "Identifying memory leaks, reducing bundle sizes, and resolving app-crashing issues.",
          imageSrc: "/img/newService/mobile-app/6.png",
          imageAlt: "Performance Optimization"
        }
      ]
    },
    process: {
      title: "Our Process",
      steps: [
        {
          stepNumber: "STEP 1",
          title: "Code Audit & Discovery",
          description: "Reviewing the legacy codebase, dependency chains, performance issues, and UI challenges."
        },
        {
          stepNumber: "STEP 2",
          title: "Modernization Architecture Planning",
          description: "Designing a refactoring roadmap, choosing target frameworks, and planning database migration steps."
        },
        {
          stepNumber: "STEP 3",
          title: "UI/UX Re-designing",
          description: "Creating modern screen mockups, brand guidelines, and responsive layouts."
        },
        {
          stepNumber: "STEP 4",
          title: "Incremental Engineering Sprints",
          description: "Refactoring code module-by-module, updating SDK libraries, and building modern layouts."
        },
        {
          stepNumber: "STEP 5",
          title: "Data Sync & Regression Testing",
          description: "Verifying historical data migration, running stress checks, and re-testing core user flows."
        },
        {
          stepNumber: "STEP 6",
          title: "Store Cutover & Live Support",
          description: "Deploying the upgraded app version to App Store and Google Play, monitoring live crash logs."
        }
      ]
    },
    stats: {
      title: "Quick Stats",
      subtitle: "Improving mobile app performance and reducing development maintenance costs.",
      items: [
        { number: "60%+", label: "Improvement in App Load Speeds and Rendering" },
        { number: "50%+", label: "Reduction in Annual Application Maintenance Costs" },
        { number: "100%", label: "Historical Data and User Profile Security Integrity" },
        { number: "0", label: "Critical Crash Risks Left in the Modernized App" }
      ]
    },
    whyChoose: {
      title: "Why Trust Creuto with Your App Modernization?",
      items: [
        {
          title: "Risk-Controlled Refactoring",
          description: "We modernize code module-by-module to keep business flows and database integrity secure.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Risk Controlled"
        },
        {
          title: "Modern UI/UX Designers",
          description: "We design clean, highly interactive interfaces that match today's mobile standards.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "UI UX Design"
        },
        {
          title: "Framework Experts",
          description: "We have years of experience porting legacy codebases to Swift, Kotlin, Flutter, and React Native.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Framework Experts"
        },
        {
          title: "Data Migration Security",
          description: "We ensure that historical user data, order records, and settings migrate safely without loss.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Data Security"
        },
        {
          title: "Cost-Effective Updates",
          description: "We focus on updating components that bring the most value, avoiding unnecessary rebuild costs.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Cost Effective"
        },
        {
          title: "Dedicated Post-Launch Support",
          description: "We monitor live performance and roll out regular security patches to keep your app compatible.",
          imageSrc: "/img/newService/mobile-app/mobile-app-choose-1.png",
          imageAlt: "Post Launch Support"
        }
      ]
    },
    faqs: [
      {
        question: "Will modernizing the app cause users to lose their stored data?",
        answer: "No. We map and migrate historical databases, local storage (SQLite/Realm), and user settings carefully, ensuring that users stay logged in and keep their data."
      },
      {
        question: "Can you update an app's design without changing the backend logic?",
        answer: "Yes. We can redesign the frontend interfaces and keep the existing backend APIs, which keeps the project fast and budget-friendly."
      },
      {
        question: "Should we modernize our app or rebuild it from scratch?",
        answer: "It depends on the code quality. If the logic is sound, we refactor it; if the codebase is obsolete and uses dead libraries, we recommend a clean rebuild."
      },
      {
        question: "How do you ensure compatibility with new phone screens?",
        answer: "We replace fixed-pixel layouts with auto-scaling responsive designs and test the interface across various notch styles and screen shapes."
      },
      {
        question: "How do you handle SDK target updates required by App Store/Google Play?",
        answer: "We update outdated packages, replace deprecated APIs, and upgrade build profiles (Gradle/Cocoapods) to comply with new target SDK rules."
      }
    ]
  }
};
