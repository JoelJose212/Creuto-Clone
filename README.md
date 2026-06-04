# 🚀 MoolSap Clone — Full-Stack Next.js Platform

A **pixel-perfect**, high-fidelity replication of the [MoolSap](https://moolsap.com/) AI-first product engineering website — fully migrated to **native Next.js 14, React 18, and TypeScript** with server-side rendering, static site generation, dynamic data-driven service pages, and interactive client hydration.

> **90+ statically pre-rendered pages** • **18 dynamic service detail pages** • **6 service categories with 40 sub-services** • **100% native JSX/TSX**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Dynamic Service Pages System](#-dynamic-service-pages-system)
- [Technology Stack](#-technology-stack)
- [Route Map](#-route-map)
- [Project Structure](#-project-structure)
- [Component Library](#-component-library)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Build Output](#-build-output)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

This project started as a static HTML crawl of [moolsap.com](https://moolsap.com/) and was systematically migrated through **multiple engineering phases** into a fully native, type-safe, and production-ready Next.js application with a scalable **data-driven architecture** for service detail pages.

### Key Achievements

| Metric | Value |
|:---|:---|
| **Total Pages** | 90+ (statically generated at build time) |
| **Static Listing Pages** | 9 (`/`, `/about`, `/ai`, `/services`, `/case-studies`, `/blogs`, `/careers`, `/contact`, `/book-a-call`) |
| **Dynamic Service Pages** | 18 data-driven detail pages across 3 service categories |
| **Dynamic Detail Pages** | 46 (`11 case studies` + `5 blogs` + `30 career positions`) |
| **Service Categories** | 6 categories with 40 total sub-service links |
| **API Endpoints** | 4 (`/api/contact`, `/api/careers`, `/api/case-studies`, `/api/newsletter`) |
| **React Components** | 50+ custom components |
| **Constants / Data Files** | 18 typed data configuration files |
| **Build Output** | Zero TypeScript errors, zero warnings |

---

## 🏗 Architecture

The application follows a **server-first architecture** using the Next.js 14 App Router, with selective client-side hydration only where interactivity is required.

```mermaid
graph TB
    subgraph Client["🖥️ Client - Browser"]
        UI["React 18 UI"]
        FM["Framer Motion"]
        HF["React Hook Form"]
        SPC["ServicePageClient"]
    end

    subgraph Server["⚙️ Next.js 14 App Router"]
        SSG["Static Site Generation - SSG"]
        DYN["Dynamic Route Handler - services/slug"]
        API["API Route Handlers"]
        MW["Middleware"]
    end

    subgraph Data["💾 Data Layer"]
        SPD["servicesPageData.ts - 18 pages"]
        SMD["servicesMenuData.ts - 6 categories"]
        Prisma["Prisma ORM"]
        PG["PostgreSQL"]
        NM["Nodemailer - SMTP"]
    end

    subgraph Static["📦 Static Assets"]
        CSS["MUI Emotion CSS + Tailwind"]
        IMG["Images and Icons"]
        FONTS["Bricolage Grotesque"]
    end

    UI --> SSG
    UI --> API
    SPC --> DYN
    FM --> UI
    HF --> API
    SSG --> Static
    DYN --> SPD
    DYN --> SMD
    API --> Prisma
    Prisma --> PG
    API --> NM
```

### Rendering Strategy

| Symbol | Rendering Mode | Used For |
|:---:|:---|:---|
| `○` | **Static** — Pre-rendered at build time | Homepage, About, Services, Contact, Listings |
| `●` | **SSG** — Static HTML with `generateStaticParams` | Case Studies, Blogs, Careers, Service Detail Pages |
| `ƒ` | **Dynamic** — Server-rendered on demand | API Routes (`/api/*`) |

---

## ⚡ Dynamic Service Pages System

The service detail pages use a **scalable, data-driven architecture** that allows adding new pages by simply adding an entry to a TypeScript data file — no new components, routes, or CSS required.

### How It Works

```mermaid
flowchart LR
    A["servicesPageData.ts\n18 page entries"] --> B["services/slug/page.tsx\nDynamic Route Handler"]
    B --> C["ServicePageClient.tsx\nReusable Layout Component"]
    C --> D["servicesStyles.css\nShared Styling"]
    
    E["servicesMenuData.ts\n6 categories, 40 links"] --> B
    
    C --> F["Hero Section\ncentered or side-by-side"]
    C --> G["Intro + Goal Block"]
    C --> H["Capabilities Grid"]
    C --> I["Process Timeline"]
    C --> J["Stats + CTA"]
    C --> K["Why Choose Cards"]
    C --> L["FAQ Accordion"]
    C --> M["Connect Footer"]
```

### Service Page Data Interface

Each service page is defined by a `ServicePageContent` object with the following structure:

```typescript
interface ServicePageContent {
  metaTitle: string;           // SEO page title
  metaDescription: string;     // SEO description
  keywords: string[];          // SEO keywords
  canonical: string;           // Canonical URL
  heroLayout?: 'centered' | 'side-by-side';  // Hero variant
  hero: { category, title, subtitle, description, imageSrc, imageAlt };
  intro: { paragraphs[], goalTitle, goalDescription };
  capabilities: { title, subtitle, items[] };
  process: { title, steps[] };
  stats: { title, subtitle, items[] };
  whyChoose: { title, items[] };
  faqs: { question, answer }[];
}
```

### Hero Layout Variants

| Layout | Used By | Description |
|:---|:---|:---|
| `centered` (default) | Custom Software, Mobile App pages | Full-width centered hero with image below title |
| `side-by-side` | DevOps & Cloud Engineering pages | Split-screen hero with text left, image right |

### Currently Implemented Service Pages (18)

#### Custom Software Development (6 pages)
| Page | Slug |
|:---|:---|
| CRM Development | `crm-development` |
| Legacy Application Modernization | `legacy-application-modernization` |
| MVP Development | `mvp-development` |
| E-commerce Solutions | `e-commerce-solutions` |
| Software Consulting Services | `software-consulting-services` |
| Enterprise Application Development | `enterprise-application-development` |

#### Mobile App Development (6 pages)
| Page | Slug |
|:---|:---|
| iOS App Development | `ios-app-development` |
| Android App Development | `android-app-development` |
| React Native App Development | `react-native-app-development` |
| Flutter App Development | `flutter-app-development` |
| Mobile App QA and Testing | `mobile-app-qa-and-testing` |
| Mobile App Modernization | `mobile-app-modernization` |

#### DevOps & Cloud Engineering (6 pages)
| Page | Slug |
|:---|:---|
| AWS / GCP / Azure Consulting | `aws-gcp-azure-consulting` |
| CI/CD Implementation | `ci-cd-implementation` |
| Kubernetes Implementation | `kubernetes-implementation` |
| Serverless Architecture | `serverless-architecture` |
| Cloud Consulting & Cost Optimisation | `cloud-consulting-cost-optimisation` |
| Infrastructure Management & Monitoring | `infrastructure-management-and-monitoring` |

### Adding a New Service Page

To add a new service page, simply add an entry to `servicesPageData.ts`:

```typescript
// src/constants/servicesPageData.ts
"your-new-service-slug": {
  metaTitle: "Your New Service | MoolSap",
  metaDescription: "...",
  keywords: ["..."],
  canonical: "https://moolsap.com/services/your-new-service-slug",
  heroLayout: "centered", // or "side-by-side"
  hero: { ... },
  intro: { ... },
  capabilities: { ... },
  process: { ... },
  stats: { ... },
  whyChoose: { ... },
  faqs: [ ... ]
}
```

The dynamic route handler at `services/[slug]/page.tsx` automatically:
- Generates static params for all slugs in both `servicesPageData.ts` and `servicesMenuData.ts`
- Renders `ServicePageClient` with the data for known slugs
- Falls back to an "Under Construction" template for slugs without data
- Generates proper SEO metadata from the data

---

## 🛠 Technology Stack

| Layer | Technology | Version | Purpose |
|:---|:---|:---:|:---|
| **Framework** | Next.js (App Router) | 14.2 | SSR, SSG, API routing, file-based routing |
| **UI Library** | React | 18 | Component-based UI rendering |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS + Emotion CSS | 3.4 | Utility-first CSS + MUI component styles |
| **Animations** | Framer Motion | 12.x | Spring physics, layout animations, scroll triggers |
| **3D Globe** | COBE | 2.0 | Interactive WebGL globe visualization |
| **Icons** | Lucide React | 0.454 | Modern SVG icon set |
| **Database** | PostgreSQL + Prisma ORM | 5.22 | Contact submissions, newsletter, case studies |
| **Email** | Nodemailer | 8.x | SMTP email delivery for form submissions |
| **Forms** | React Hook Form + Zod | 7.x / 4.x | Client-side validation and form state management |
| **State** | Zustand | 5.x | Lightweight client state management |
| **Data Fetching** | TanStack React Query | 5.x | Server state management and caching |
| **SEO** | next-sitemap | 4.2 | Automatic XML sitemap generation |
| **Linting** | ESLint (Next.js Config) | 8.x | Code quality enforcement |

---

## 🗺 Route Map

### Static Pages

| Route | Page Title | Description |
|:---|:---|:---|
| `/` | Home | 14-section interactive homepage with services carousel, testimonials slider, FAQ accordion |
| `/about` | About Us | Company story, team, vision, and mission |
| `/ai` | MoolSap AI | AI capabilities showcase with interactive WebGL globe |
| `/services` | Services | 6 service categories with 40 sub-service cards and mega menu |
| `/case-studies` | Case Studies | Portfolio listing of 11 completed projects |
| `/blogs` | Blogs | Blog listing with published articles |
| `/careers` | Careers | Job board listing 30 open positions |
| `/contact` | Contact Us | Interactive contact form with service chip toggles |
| `/book-a-call` | Book A Call | Call scheduling page |
| `/dashboard` | Admin Dashboard | Application management panel |

### Dynamic Service Detail Pages (18)

| Route Pattern | Count | Layout | Hydration |
|:---|:---:|:---|:---|
| `/services/[slug]` — Custom Software | 6 | Centered hero | Client (`ServicePageClient`) |
| `/services/[slug]` — Mobile App | 6 | Centered hero | Client (`ServicePageClient`) |
| `/services/[slug]` — DevOps & Cloud | 6 | Side-by-side hero | Client (`ServicePageClient`) |
| `/services/[slug]` — Other sub-services | 22 | Under Construction fallback | Static (no client JS) |

### Dynamic Content Pages

| Route Pattern | Count | Content Type | Hydration |
|:---|:---:|:---|:---|
| `/case-studies/[slug]` | 11 | Project deep-dives with metrics and screenshots | Static (no client JS) |
| `/blogs/[slug]` | 5 | Long-form articles and thought leadership | Static (no client JS) |
| `/careers/[slug]` | 30 | Job descriptions with "Apply Now" modal form | Client (`CareersDetailHydration`) |

### API Endpoints

| Endpoint | Method | Purpose |
|:---|:---:|:---|
| `/api/contact` | `POST` | Process contact form submissions → Prisma + Nodemailer |
| `/api/careers` | `POST` | Process job applications → Prisma + Nodemailer |
| `/api/case-studies` | `GET` | Fetch case study metadata from database |
| `/api/newsletter` | `POST` | Newsletter email subscription → Prisma |

---

## 📁 Project Structure

```
d:\TTT
├── public/
│   ├── cloned_next/              # Crawled CSS bundles and media assets
│   │   └── static/media/        # Client logos, framework icons, award badges
│   ├── icons/                    # General fallback icons
│   ├── img/                     # Core images (home, about, services, etc.)
│   │   └── newService/          # Service detail page images
│   └── sitemap.xml              # Auto-generated XML sitemap
│
├── prisma/
│   ├── schema.prisma            # Database models (Contact, Newsletter, CaseStudy)
│   └── seed.ts                  # Initial database seed data
│
├── src/
│   ├── app/                     # Next.js 14 App Router
│   │   ├── layout.tsx           # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx             # Homepage (14 native section components)
│   │   ├── homePageStyles.css   # Extracted homepage MUI styles
│   │   ├── globals.css          # Global Tailwind + custom styles
│   │   │
│   │   ├── about/page.tsx       # About Us (native JSX)
│   │   ├── ai/page.tsx          # AI page (native JSX + WebGL globe)
│   │   ├── contact/             # Contact form (JSX + ContactHydration)
│   │   ├── book-a-call/         # Call scheduling page
│   │   ├── admin/               # Admin panel
│   │   │
│   │   ├── services/
│   │   │   ├── page.tsx                  # Services listing (native JSX)
│   │   │   ├── servicesPageStyles.css    # Services listing styles
│   │   │   ├── [slug]/                   # ⚡ Dynamic service detail pages
│   │   │   │   ├── page.tsx              #   Route handler + metadata
│   │   │   │   ├── ServicePageClient.tsx #   Reusable layout component
│   │   │   │   └── servicesStyles.css    #   Shared service page styles
│   │   │   ├── custom-erp-development/   # Static ERP page (original template)
│   │   │   ├── customized-web-development/
│   │   │   ├── web-app-development/
│   │   │   ├── mobile-apps-development/
│   │   │   └── ai-engineering-services/
│   │   │
│   │   ├── case-studies/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/          # 11 dynamic detail pages
│   │   │
│   │   ├── blogs/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/          # 5 dynamic detail pages
│   │   │
│   │   ├── careers/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/          # 30 dynamic career pages
│   │   │
│   │   └── api/
│   │       ├── contact/route.ts     # Contact form → DB + Email
│   │       ├── careers/route.ts     # Job applications → DB + Email
│   │       ├── case-studies/route.ts # Case study data API
│   │       └── newsletter/route.ts  # Newsletter subscriptions
│   │
│   ├── components/
│   │   ├── sections/            # 24 homepage section components
│   │   │   ├── about/           # About page sections
│   │   │   ├── case-studies/    # Case studies sections
│   │   │   └── services/        # Services page sections
│   │   ├── layout/              # Navbar, Footer, ServicesMegaMenu, Hydration wrappers
│   │   ├── careers/             # Career-specific components
│   │   ├── dashboard/           # Admin panel components
│   │   ├── providers/           # React Query, theme providers
│   │   ├── shared/              # Reusable shared components
│   │   └── ui/                  # Base UI primitives
│   │
│   └── constants/               # 18 typed data configuration files
│       ├── servicesPageData.ts  # ⚡ 18 service page content definitions (160KB+)
│       ├── servicesMenuData.ts  # 6 categories, 40 sub-service navigation links
│       ├── caseStudiesData.ts   # Case study metadata
│       ├── services.ts          # Homepage services carousel data
│       ├── servicesData.ts      # Services listing page data
│       ├── servicesFAQ.ts       # Services FAQ content
│       ├── servicesProcess.ts   # Services process steps
│       ├── serviceColors.ts     # Service category color mappings
│       ├── testimonials.ts      # Client testimonials
│       ├── team.ts              # Team member profiles
│       ├── techStack.ts         # Technology stack data
│       ├── whyChoose.ts         # Why choose us data
│       ├── howWeWork.ts         # Process workflow data
│       ├── problems.ts          # Problem statement data
│       ├── rightPartner.ts      # Partnership value props
│       ├── neverDone.ts         # Innovation commitment data
│       ├── announcement.json    # Announcement banner config
│       └── notices.json         # Career notice board data
│
├── next.config.mjs              # Next.js configuration
├── next-sitemap.config.js       # Sitemap generation config
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

---

## 🧩 Component Library

### Homepage Section Components (14 Sections)

| # | Component | Description |
|:---:|:---|:---|
| 1 | `HeroSection` | Animated hero banner with CTA buttons |
| 2 | `MarqueeSection` | Infinite scrolling text ribbon |
| 3 | `BrandsSection` | Client logo trust strip |
| 4 | `ServicesSection` | Auto-rotating services carousel with GPU-accelerated transitions |
| 5 | `CaseStudiesSection` | Featured project cards with hover effects |
| 6 | `IndustriesSection` | Industry vertical showcase |
| 7 | `ProcessSection` | 4-step development process timeline |
| 8 | `WhyChooseSection` | Value proposition cards |
| 9 | `TestimonialsSection` | Infinite sliding testimonial carousel |
| 10 | `FrameworkSection` | Technology framework circular motion display |
| 11 | `StatsSection` | Animated counter statistics |
| 12 | `FAQSection` | Interactive accordion FAQ |
| 13 | `CTASection` | Call-to-action banner |
| 14 | `FooterSection` | Multi-column footer with locations and social links |

### Layout & Interaction Components

| Component | Type | Description |
|:---|:---:|:---|
| `Navbar` | Client | Responsive navigation with mobile hamburger menu |
| `ServicesMegaMenu` | Client | 6-category flyout mega menu for services navigation |
| `Footer` | Server | Global footer with office locations |
| `ServicePageClient` | Client | Reusable dynamic service detail page layout (hero, capabilities, process, stats, FAQ) |
| `ContactHydration` | Client | Contact form DOM event handler (chip toggles, validation, POST) |
| `CareersDetailHydration` | Client | Job application modal overlay with form submission |
| `CustomCursor` | Client | Custom animated cursor effect |
| `FloatingWhatsApp` | Client | WhatsApp floating action button |
| `PageTransition` | Client | Framer Motion page transition wrapper |
| `AnnouncementBanner` | Client | Top announcement ribbon |

### Service Detail Page Layout (`ServicePageClient`)

The `ServicePageClient` component renders 8 distinct sections from data:

| # | Section | Description |
|:---:|:---|:---|
| 1 | **Hero** | Adaptive layout — centered or side-by-side based on `heroLayout` |
| 2 | **Intro** | Multi-paragraph description with optional "Our Goal" highlight block |
| 3 | **Capabilities** | 6-card grid showcasing core service offerings |
| 4 | **Our Process** | 6-step vertical timeline with step markers and connecting lines |
| 5 | **Impact Stats** | 4-column metrics dashboard with CTA buttons |
| 6 | **Why Choose** | 6-card grid with icon, title, and description |
| 7 | **FAQ** | Interactive accordion with animated expand/collapse |
| 8 | **Connect CTA** | Final call-to-action with schedule and contact buttons |

---

## 💾 Database Schema

The application uses **Prisma ORM** with **PostgreSQL** for persistent data storage.

```mermaid
erDiagram
    ContactSubmission {
        String id PK "cuid()"
        String name
        String email
        String company "nullable"
        String message
        DateTime createdAt
    }

    NewsletterSubscriber {
        String id PK "cuid()"
        String email UK
        Boolean isActive "default: true"
        DateTime createdAt
    }

    CaseStudy {
        String id PK "cuid()"
        String slug UK
        String category
        String title
        String description
        String gradient
        String accentColor
        Int sortOrder "default: 0"
        DateTime createdAt
    }
```

| Model | Purpose | API Endpoint |
|:---|:---|:---|
| `ContactSubmission` | Stores contact form submissions (name, email, company, message) | `POST /api/contact` |
| `NewsletterSubscriber` | Email newsletter subscriptions with active/inactive status | `POST /api/newsletter` |
| `CaseStudy` | Case study metadata for dynamic rendering and sorting | `GET /api/case-studies` |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **PostgreSQL** ≥ 14 (local or cloud instance)

### 1. Clone the Repository

```bash
git clone https://github.com/JoelJose212/MoolSap-Clone.git
cd MoolSap-Clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/moolsap_db?schema=public"

# Email (Nodemailer SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-email-password"
CONTACT_RECEIVER="info@moolsap.com"
```

### 4. Initialize Database

```bash
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

### 6. Production Build

```bash
npm run build    # Compiles 90+ static pages + generates sitemap
npm run start    # Serves production build
```

---

## 📊 Build Output

```
Route (app)                              Size      First Load JS
─────────────────────────────────────────────────────────────────
○ /                                      183 B     87.6 kB
○ /about                                 182 B     87.6 kB
○ /ai                                    7.55 kB   94.9 kB
○ /blogs                                 183 B     87.6 kB
● /blogs/[slug]                          142 B     87.5 kB
○ /careers                               183 B     87.6 kB
● /careers/[slug]                        3.32 kB   134 kB
○ /case-studies                          183 B     87.6 kB
● /case-studies/[slug]                   142 B     87.5 kB
○ /contact                               183 B     87.6 kB
○ /dashboard                             13.2 kB   110 kB
○ /services                              183 B     87.6 kB
● /services/[slug]                       — kB      — kB

○  Static    ●  SSG    ƒ  Dynamic
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is a clone/replication built for **educational and portfolio purposes only**. All original brand assets, content, and design belong to [MoolSap](https://moolsap.com/).

---

<p align="center">
  Built with ❤️ using Next.js 14 • React 18 • TypeScript • Prisma • Tailwind CSS
</p>
