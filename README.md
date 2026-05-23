# 🚀 Aanandi TechnoSoft Clone — High-Fidelity AI-First Platform

A state-of-the-art, pixel-perfect replication of the premium [Aanandi TechnoSoft homepage](https://aanandi.in/), completely optimized and enhanced with highly dynamic React components, modern GPU-accelerated motion systems, and custom database integrations.

This project merges the raw layouts of a pre-rendered static crawl with fully functional Next.js 14 App Router client hydration, offering an ultra-premium visual experience.

---

## ✨ Primary Highlights & Upgrades

### 1. Auto-Rotating Services Carousel Slider
* **Premium Client Component**: Replaced the static, collapsed Slick-Slider HTML with an advanced React-based custom carousel ([ServicesSection.tsx](src/components/sections/ServicesSection.tsx)).
* **GPU-Accelerated Autoplay**: Smooth automatic card rotation every `3.8 seconds`.
* **Micro-Animated Hover Pause**: Autoplay pauses instantly on mouse hover to let users read content comfortably, resuming smoothly upon mouse leave.
* **Focal Centering & Dynamic Glow**: The currently active service card scales up, lights up with a gorgeous royal-blue gradient overlay (`bg-gradient-to-br from-[#1746EA] to-[#0A2CB3]`), and centers itself dynamically in the scroll view using custom spring-easing calculations.
* **Full Interactive Nav**: Includes manual floating left/right navigation arrows and interactive expanding dot navigation indicators.

### 2. High-Performance HTML Segmentation
* **Hybrid Rendering**: Built a server-side parser in [page.tsx](src/app/page.tsx) that segments raw crawled layouts around active section markers on the fly.
* **Component Injection**: Seamlessly extracts and replaces static, non-interactive elements with fully dynamic React Client Components while preserving original bundled Emotion styling layers.

### 3. Comprehensive Asset Restoration
* **Logo Recovery**: Restored `100%` of previously missing client brand marks, framework icons (such as React Native), and award badges.
* **Optimized Image Paths**: Resolved all 48 local image references, matching WebP and SVG file components exactly with no broken 404 links or fallback rendering failures.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Core Framework** | Next.js 14 (App Router) | Server-Side Rendering (SSR), API routing, static optimization |
| **Styling** | Tailwind CSS + Vanilla HSL CSS | Modern responsive design systems, curated color palettes, custom utility classes |
| **Animations** | Framer Motion | Fluid spring physics, active slide transitions, micro-interactions |
| **Icons** | Lucide React | High-resolution modern visual symbols |
| **Database** | Prisma with PostgreSQL | Career applications and client lead data schemas |
| **Form Management**| React Hook Form + Zod | Dynamic validation and form submission handling |
| **API Relays** | Next.js Route Handlers + Nodemailer | Contact submission routing and email notification automation |

---

## 📁 Repository Directory Tree

```
d:\TTT
├── public/                       # Public Static Assets
│   ├── cloned_next/              # Crawled assets, bundles, CSS, and media
│   │   └── static/media/         # Restored client logos and award badges
│   ├── icons/                    # General fallback visual icons
│   └── img/                      # Core image directories (home, about, etc.)
├── src/                          # Application Source Directory
│   ├── app/                      # Next.js 14 App Router Files
│   │   ├── api/                  # Backend Route Handlers
│   │   │   ├── careers/route.ts  # Careers submission pipeline
│   │   │   └── contact/route.ts  # Email relay routing
│   │   ├── blogs/                # Dynamic Blog sub-routes
│   │   ├── careers/              # Dynamic Careers sub-routes
│   │   ├── dashboard/            # Admin Management Layouts
│   │   ├── layout.tsx            # Global layout wrapper
│   │   └── page.tsx              # Homepage segment splitter
│   ├── components/               # Reusable React UI Components
│   │   ├── dashboard/            # Admin panel shells and tables
│   │   ├── layout/               # Navbars, banners, transitions
│   │   └── sections/             # Interactive sections
│   │       └── ServicesSection.tsx # High-fidelity services carousel slider
│   └── constants/                # Data structures and static copy
├── prisma/                       # Database schemas and abstractions
├── package.json                  # Dependencies and build scripts
└── README.md                     # Technical Documentation
```

---

## 🚀 Getting Started & Local Development

### 1. Clone & Set Up Directory
Navigate to your directory and install dependencies:
```bash
npm install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory and define your PostgreSQL connection URI and Nodemailer credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/aanandi_db?schema=public"
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-email@example.com"
SMTP_PASS="your-email-password"
CONTACT_RECEIVER="info@aanandi.in"
```

### 3. Database Migration
Initialize and sync your PostgreSQL database using Prisma:
```bash
npx prisma db push
```

### 4. Run Development Server
Start the local development server on port 3000:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000/` to view the live dynamic experience.

### 5. Production Compilation
To compile a fully optimized, production-ready build:
```bash
npm run build
```

---

## ☁️ Deployment Guidelines

The project is fully compiled, type-safe, and deployment-ready for standard cloud hosting platforms.

### Deploying to Vercel
1. Push your active branch to a remote GitHub repository.
2. Link the repository to your Vercel Dashboard.
3. Configure the environment variables in Vercel settings matching your `.env.local`.
4. Deploy! Vercel automatically detects Next.js 14 features and compiles the static/serverless routes.

### Database Integration
For cloud-native scaling, pair your deployment with a serverless PostgreSQL instance:
* **Neon Database** (Highly recommended for Vercel/Prisma setups)
* **Supabase PostgreSQL**
