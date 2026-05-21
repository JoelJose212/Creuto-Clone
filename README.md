# 🚀 Creuto Clone — Full-Stack Next.js Platform

A **pixel-perfect**, high-fidelity replication of the [Creuto](https://creuto.com/) AI-first product engineering website — fully migrated to **native Next.js 14, React 18, and TypeScript** with server-side rendering, static site generation, and interactive client hydration.

> **73 statically pre-rendered pages** • **Zero `dangerouslySetInnerHTML` for page content** • **100% native JSX/TSX**

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Technology Stack](#-technology-stack)
- [Route Map](#-route-map)
- [Migration Journey](#-migration-journey)
- [Project Structure](#-project-structure)
- [Component Library](#-component-library)
- [Database Schema](#-database-schema)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌐 Overview

This project started as a static HTML crawl of [creuto.com](https://creuto.com/) and was systematically migrated through **6 engineering phases** into a fully native, type-safe, and production-ready Next.js application.

### Key Achievements

| Metric | Value |
|:---|:---|
| **Total Pages** | 73 (statically generated at build time) |
| **Static Listing Pages** | 8 (`/`, `/about`, `/ai`, `/services`, `/case-studies`, `/blogs`, `/careers`, `/contact`) |
| **Dynamic Detail Pages** | 46 (`11 case studies` + `5 blogs` + `30 career positions`) |
| **API Endpoints** | 4 (`/api/contact`, `/api/careers`, `/api/case-studies`, `/api/newsletter`) |
| **React Components** | 40+ custom components |
| **Build Output** | Zero TypeScript errors, zero warnings |
| **Bundle Size (First Load)** | ~87 kB shared JS |

---

## 🏗 Architecture

The application follows a **server-first architecture** using the Next.js 14 App Router, with selective client-side hydration only where interactivity is required.

```mermaid
graph TB
    subgraph Client["🖥️ Client (Browser)"]
        UI["React 18 UI"]
        FM["Framer Motion"]
        HF["React Hook Form"]
    end

    subgraph Server["⚙️ Next.js 14 App Router"]
        SSG["Static Site Generation (SSG)"]
        API["API Route Handlers"]
        MW["Middleware"]
    end

    subgraph Data["💾 Data Layer"]
        Prisma["Prisma ORM"]
        PG["PostgreSQL"]
        NM["Nodemailer (SMTP)"]
    end

    subgraph Static["📦 Static Assets"]
        CSS["MUI Emotion CSS"]
        IMG["Images & Icons"]
        FONTS["Bricolage Grotesque"]
    end

    UI --> SSG
    UI --> API
    FM --> UI
    HF --> API
    SSG --> Static
    API --> Prisma
    Prisma --> PG
    API --> NM
```

### Rendering Strategy

```mermaid
flowchart LR
    subgraph Build["npm run build"]
        A["Page Components (.tsx)"] --> B["Static HTML Generation"]
        B --> C["73 Pre-rendered Pages"]
    end

    subgraph Runtime["Request Handling"]
        D["GET /page"] --> E{Static or Dynamic?}
        E -->|Static ○| F["Serve Pre-rendered HTML"]
        E -->|SSG ●| G["Serve Pre-generated HTML"]
        E -->|Dynamic ƒ| H["Server-render on Demand"]
    end

    C --> D
```

| Symbol | Rendering Mode | Used For |
|:---:|:---|:---|
| `○` | **Static** — Pre-rendered at build time | Homepage, About, Services, Contact, Listings |
| `●` | **SSG** — Static HTML with `generateStaticParams` | Case Study Details, Blog Posts, Career Pages |
| `ƒ` | **Dynamic** — Server-rendered on demand | API Routes (`/api/*`) |

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
| **SEO** | next-sitemap | 4.2 | Automatic XML sitemap generation |
| **Linting** | ESLint (Next.js Config) | 8.x | Code quality enforcement |

---

## 🗺 Route Map

### Static Pages

| Route | Page Title | Description |
|:---|:---|:---|
| `/` | Home | 14-section interactive homepage with services carousel, testimonials slider, FAQ accordion |
| `/about` | About Us | Company story, team, vision, and mission |
| `/ai` | Creuto AI | AI capabilities showcase with interactive globe |
| `/services` | Services | 6 service categories with 40+ sub-service cards |
| `/case-studies` | Case Studies | Portfolio listing of 11 completed projects |
| `/blogs` | Blogs | Blog listing with 5 published articles |
| `/careers` | Careers | Job board listing 30 open positions |
| `/contact` | Contact Us | Interactive contact form with service chip toggles |
| `/dashboard` | Admin Dashboard | Application management panel |

### Dynamic Detail Pages

| Route Pattern | Count | Content Type | Hydration |
|:---|:---:|:---|:---|
| `/case-studies/[slug]` | 11 | Project deep-dives with metrics and screenshots | Static (no client JS) |
| `/blogs/[slug]` | 5 | Long-form articles and thought leadership | Static (no client JS) |
| `/careers/[slug]` | 30 | Job descriptions with "Apply Now" modal form | Client hydration (`CareersDetailHydration`) |

### API Endpoints

| Endpoint | Method | Purpose |
|:---|:---:|:---|
| `/api/contact` | `POST` | Process contact form submissions → Prisma + Nodemailer |
| `/api/careers` | `POST` | Process job applications → Prisma + Nodemailer |
| `/api/case-studies` | `GET` | Fetch case study metadata from database |
| `/api/newsletter` | `POST` | Newsletter email subscription → Prisma |

---

## 🔄 Migration Journey

The project was migrated from raw HTML to native React/TypeScript in **6 systematic phases**, each verified with a full production build and committed incrementally.

```mermaid
gantt
    title HTML → Native Next.js Migration Phases
    dateFormat X
    axisFormat %s

    section Phase 1
    Tooling and Converter Script     :done, p1, 0, 1

    section Phase 2
    Services Page                    :done, p2a, 1, 2
    Case Studies Listing             :done, p2b, 2, 3
    Blogs Listing                    :done, p2c, 3, 4
    Careers Listing                  :done, p2d, 4, 5

    section Phase 3
    Home Page Styles                 :done, p3, 5, 6

    section Phase 4
    Contact Page + Form              :done, p4, 6, 7

    section Phase 5
    Case Study Details x11           :done, p5a, 7, 8
    Blog Details x5                  :done, p5b, 8, 9
    Career Details x30               :done, p5c, 9, 10

    section Phase 6
    Cleanup and Verification         :active, p6, 10, 11
```

### Phase Summary

| Phase | Scope | Files Changed | Approach |
|:---|:---|:---:|:---|
| **1. Tooling** | Build `convert_page.js` automation script | 2 | Node.js HTML→JSX converter with regex transforms |
| **2. Static Listings** | `/services`, `/case-studies`, `/blogs`, `/careers` | 12 | Inline JSX + extracted CSS stylesheets |
| **3. Home Page** | `/` styles extraction | 3 | CSS-only migration (components already native) |
| **4. Contact Page** | `/contact` with live form | 4 | JSX + preserve `ContactHydration` client component |
| **5. Dynamic Routes** | 46 detail pages across 3 route groups | 55 | Automated mass-conversion to React components |
| **6. Cleanup** | Remove source artifacts | — | Delete extracted HTML/JSON, final verification |

### Conversion Pipeline

```mermaid
flowchart LR
    A["Raw HTML\n(.html files)"] --> B["Extract Body\n+ Styles"]
    B --> C["convert_page.js\nTransformations"]
    C --> D["Native .tsx\nReact Component"]
    C --> E["Unlayered .css\nStylesheet"]
    D --> F["npm run build\n✓ Type-safe\n✓ Static SSG"]
    E --> F
```

**Key transformations performed by the converter:**
- `class` → `className`
- `for` → `htmlFor`
- `tabindex` → `tabIndex`
- `style="..."` strings → `style={{...}}` React objects
- Self-close void tags (`<img>` → `<img />`)
- CamelCase SVG attributes (`stroke-width` → `strokeWidth`)
- Fix `.html` links → Next.js clean routes
- Fix `_next/` asset paths → `/cloned_next/`
- Override entrance animations (`opacity:0` → `opacity:1`)
- Strip Next.js serialization comments

---

## 📁 Project Structure

```
d:\TTT
├── public/
│   ├── cloned_next/              # Crawled CSS bundles and media assets
│   │   └── static/media/        # Client logos, framework icons, award badges
│   ├── icons/                    # General fallback icons
│   └── img/                     # Core images (home, about, services, etc.)
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
│   │   ├── ai/page.tsx          # AI page (native JSX + globe)
│   │   ├── services/            # Services (native JSX + CSS)
│   │   ├── contact/             # Contact form (JSX + ContactHydration)
│   │   ├── dashboard/           # Admin dashboard
│   │   │
│   │   ├── case-studies/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # Dynamic route handler
│   │   │       └── data/        # 11 native React components
│   │   │
│   │   ├── blogs/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # Dynamic route handler
│   │   │       └── data/        # 5 native React components
│   │   │
│   │   ├── careers/
│   │   │   ├── page.tsx         # Listing page (native JSX)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx     # Dynamic route handler
│   │   │       └── data/        # 30 native React components
│   │   │
│   │   └── api/
│   │       ├── contact/route.ts     # Contact form → DB + Email
│   │       ├── careers/route.ts     # Job applications → DB + Email
│   │       ├── case-studies/route.ts # Case study data API
│   │       └── newsletter/route.ts  # Newsletter subscriptions
│   │
│   ├── components/
│   │   ├── sections/            # 24 homepage section components
│   │   ├── layout/              # Navbar, Footer, Hydration wrappers
│   │   ├── dashboard/           # Admin panel components
│   │   ├── providers/           # React Query, theme providers
│   │   ├── shared/              # Reusable shared components
│   │   └── ui/                  # Base UI primitives
│   │
│   └── constants/               # Static data maps and configuration
│
├── convert_page.js              # HTML→JSX automated converter
├── generate_dynamic_pages.js    # Mass dynamic page generator
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
| `Footer` | Server | Global footer with office locations |
| `ContactHydration` | Client | Contact form DOM event handler (chip toggles, validation, POST) |
| `CareersDetailHydration` | Client | Job application modal overlay with form submission |
| `CustomCursor` | Client | Custom animated cursor effect |
| `FloatingWhatsApp` | Client | WhatsApp floating action button |
| `PageTransition` | Client | Framer Motion page transition wrapper |
| `AnnouncementBanner` | Client | Top announcement ribbon |

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
git clone https://github.com/JoelJose212/Creuto-Clone.git
cd Creuto-Clone
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/creuto_db?schema=public"

# Email (Nodemailer SMTP)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-email-password"
CONTACT_RECEIVER="info@creuto.com"
```

### 4. Initialize Database

```bash
npx prisma db push
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build

```bash
npm run build    # Compiles 73 static pages + generates sitemap
npm run start    # Serves production build
```

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your branch to GitHub
2. Import the repository in [Vercel Dashboard](https://vercel.com/dashboard)
3. Configure environment variables matching `.env.local`
4. Deploy — Vercel auto-detects Next.js 14 and optimizes the build

### Database Providers

| Provider | Best For | Pricing |
|:---|:---|:---|
| **Neon** | Serverless PostgreSQL on Vercel | Free tier available |
| **Supabase** | Full PostgreSQL with dashboard | Free tier available |
| **Railway** | Managed PostgreSQL with CLI | Usage-based |
| **PlanetScale** | MySQL-compatible serverless | Free tier available |

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

○  Static    ●  SSG    ƒ  Dynamic
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is a clone/replication built for **educational and portfolio purposes only**. All original brand assets, content, and design belong to [Creuto](https://creuto.com/).

---

<p align="center">
  Built with ❤️ using Next.js 14 • React 18 • TypeScript • Prisma • Tailwind CSS
</p>
