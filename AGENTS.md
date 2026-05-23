# Aanandi TechnoSoft Clone — Agent Guide

> This file is written for AI coding agents. It assumes zero prior knowledge of the project. All facts below are derived directly from the codebase.

---

## 1. Project Overview

**Aanandi TechnoSoft Clone** is a high-fidelity, pixel-perfect replication of the premium [Aanandi TechnoSoft](https://aanandi.in) agency website. It is a **Next.js 14 (App Router)** application that merges pre-rendered static HTML crawls (extracted from the original site) with fully dynamic React components, animations, and database integrations.

The project serves as a marketing and lead-generation platform for an AI-first software development agency. It includes:

- A hybrid rendering engine that injects dynamic React sections into static crawled HTML.
- A fully functional contact form with lead persistence.
- A careers portal with job listings and application submissions.
- A newsletter subscription system backed by PostgreSQL.
- An internal admin dashboard for infrastructure monitoring.

**Primary Language:** TypeScript (TSX)  
**Styling:** Tailwind CSS + vanilla CSS variables  
**Runtime:** Node.js (Next.js 14.2.35)

---

## 2. Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js | 14.2.35 | App Router, SSR, API routes, static optimization |
| **Language** | TypeScript | 5.x | Type-safe development |
| **UI Library** | React | 18.x | Component-based UI |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS |
| **Animations** | Framer Motion | 12.38.0 | Page transitions, scroll effects, micro-interactions |
| **Icons** | Lucide React | 0.454.0 | Modern iconography |
| **Database** | Prisma + PostgreSQL | 5.22.0 | ORM and data persistence |
| **Forms** | React Hook Form + Zod | 7.75.0 / 4.4.3 | Validation and form handling |
| **State** | Zustand | 5.0.13 | Lightweight global state (available, currently minimal use) |
| **Query** | TanStack React Query | 5.100.10 | Server-state management |
| **Email** | Nodemailer | 8.0.7 | SMTP email delivery |
| **Sitemap** | next-sitemap | 4.2.3 | Post-build sitemap generation |

**Font Families (Google Fonts via `next/font`):**
- **Bricolage Grotesque** — Primary display font for cloned page content.
- **Plus Jakarta Sans** — Primary UI font (headings, body).
- **Syne** — Accent/display font.
- **DM Sans** — Secondary body font.

---

## 3. Project Structure

```
.
├── prisma/
│   ├── schema.prisma          # Database schema (PostgreSQL)
│   └── seed.ts                # Seeds case studies from constants
├── public/
│   ├── cloned_next/           # Crawled static assets (CSS, JS, images) from original site
│   ├── favicon/               # Favicon assets
│   ├── icons/                 # General icons
│   ├── img/                   # Core image directories (home, about, services, etc.)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout (fonts, metadata, global providers)
│   │   ├── page.tsx           # Homepage (hybrid crawled + dynamic ServicesSection)
│   │   ├── globals.css        # Global styles, CSS variables, Tailwind directives
│   │   ├── about/             # About page (crawled HTML + dynamic client sections)
│   │   ├── ai/                # AI services page (crawled HTML)
│   │   ├── api/               # API route handlers
│   │   │   ├── careers/route.ts
│   │   │   ├── case-studies/route.ts
│   │   │   ├── contact/route.ts
│   │   │   └── newsletter/route.ts
│   │   ├── blogs/             # Blog listing + dynamic slug pages
│   │   ├── careers/           # Careers listing + dynamic job detail pages
│   │   ├── case-studies/      # Case studies page (crawled + dynamic grid)
│   │   ├── contact/           # Contact page (crawled + hydrated form)
│   │   ├── dashboard/         # Internal admin dashboard
│   │   └── services/          # Services page (crawled + dynamic sections)
│   ├── components/
│   │   ├── dashboard/         # Admin panel UI (layout, sidebar, header, data grid)
│   │   ├── layout/            # Global shell components (Navbar, Footer, CustomCursor, etc.)
│   │   ├── providers/         # React context providers (TanStack Query)
│   │   ├── sections/          # Page section components
│   │   │   ├── about/         # About page sections
│   │   │   ├── case-studies/  # Case studies sections
│   │   │   ├── services/      # Services page sections
│   │   │   └── *.tsx          # Homepage sections (Hero, Services, Stats, etc.)
│   │   └── shared/            # Reusable low-level components (SectionWrapper)
│   ├── constants/             # Static data arrays (services, testimonials, team, etc.)
│   ├── hooks/                 # Custom React hooks (useCountUp)
│   ├── lib/                   # Utility libraries
│   │   ├── cn.ts              # Tailwind class merger (clsx + tailwind-merge)
│   │   ├── mail.ts            # Nodemailer SMTP transport
│   │   ├── prisma.ts          # Prisma client singleton (global in dev)
│   │   └── validators.ts      # Zod schemas (contact, newsletter)
│   └── types/                 # TypeScript type definitions (about, caseStudies, services)
├── package.json
├── tsconfig.json              # TypeScript config with `@/*` path alias
├── next.config.mjs            # Next.js config (transpilePackages: lucide-react)
├── tailwind.config.ts         # Tailwind theme extensions (colors, fonts, animations)
├── postcss.config.mjs         # PostCSS with Tailwind plugin
├── next-sitemap.config.js     # Sitemap generation config
├── .eslintrc.json             # ESLint (next/core-web-vitals, next/typescript)
├── components.json            # shadcn/ui configuration (style: new-york)
└── .env.local.example         # Environment variable template
```

---

## 4. Build and Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production (also generates sitemap via postbuild)
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Database: push schema changes
npx prisma db push

# Database: seed case studies
npx prisma db seed
# or
npx ts-node prisma/seed.ts
```

**Post-build:** `next-sitemap` runs automatically to generate `sitemap.xml` and `robots.txt`.

---

## 5. Runtime Architecture

### 5.1 Hybrid Crawled + Dynamic Rendering

Most marketing pages (`/`, `/about`, `/services`, `/case-studies`, `/contact`, `/blogs`, `/careers`, `/ai`) use a **unique hybrid architecture**:

1. **Source:** Static HTML and CSS were extracted from the original Aanandi TechnoSoft website and saved as `*_extracted_body.html` and `*_extracted_styles.json` files in the project root.
2. **Server-Side Processing:** Each page's `page.tsx` reads these files at runtime, applies regex transformations, and caches the result in a module-level variable.
3. **Transformations Applied:**
   - Convert relative asset paths (`img/`, `icons/`, `_next/`) to absolute paths.
   - Map `.html` navigation links to clean Next.js routes (`/about`, `/services`, etc.).
   - Strip `srcset` attributes.
   - Remove pre-rendered entrance animations (`opacity: 0` → `opacity: 1`, `translateY` → `none`).
   - **Unlayer CSS:** A custom `unlayerCSS()` function strips `@layer mui { ... }` cascade layers so MUI/Emotion styles can override Tailwind's Preflight resets.
4. **Injection:** The processed HTML is rendered via `dangerouslySetInnerHTML` inside a scoped `<div>` (e.g., `#creuto-about-cloned-page`). Original stylesheets and inline styles are injected as `<link>` and `<style>` tags.
5. **Dynamic Components:** Within the crawled layout, specific static sections are replaced with fully interactive React components (e.g., `ServicesSection` carousel on the homepage, `CaseStudiesGridSection` on `/case-studies`).

> **Important:** The `blogs/[slug]` and `careers/[slug]` dynamic routes currently read raw `.html` files from an **absolute Windows path** (`D:\clone\Clone\creuto.com\...`). This is a known portability issue and will fail on non-Windows environments.

### 5.2 Client Components vs. Server Components

- **Server Components:** All `page.tsx` files (except dashboard) are Server Components that handle the crawled HTML parsing.
- **Client Components:** Interactive parts are marked with `"use client"`:
  - `ServicesSection` (carousel)
  - `HeroSection` (3D tilt effect)
  - `Footer` (newsletter form)
  - `Navbar` (mobile menu, scroll effects)
  - `ContactHydration` / `CareersDetailHydration` (form interception)
  - `DashboardLayout` and all dashboard components
  - `AboutPageClient`, `CaseStudiesPageClient`, `ServicesPageClient` (page wrappers with scroll progress)

### 5.3 State Management

- **TanStack Query:** Wrapped in `Providers.tsx` for server-state caching (currently used minimally).
- **Zustand:** Available but currently unused for major state.
- **Local State:** Most interactive components use `useState` and `useEffect`.

---

## 6. Database Schema (Prisma)

**Provider:** PostgreSQL  
**Connection:** `DATABASE_URL` environment variable

```prisma
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  message   String
  createdAt DateTime @default(now())
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

model CaseStudy {
  id          String   @id @default(cuid())
  slug        String   @unique
  category    String
  title       String
  description String
  gradient    String
  accentColor String
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
}
```

**Note:** The `ContactSubmission` and `Careers` APIs also persist data to local JSON files (`contact_submissions.json`, `careers_applications.json`) as a fallback/audit trail, in addition to any database usage.

---

## 7. API Routes

| Route | Method | Description |
|---|---|---|
| `/api/contact` | `POST` | Accepts contact form data, validates, saves to `contact_submissions.json` |
| `/api/careers` | `POST` | Accepts job applications, validates, saves to `careers_applications.json` |
| `/api/newsletter` | `POST` | Validates email with Zod, saves to `NewsletterSubscriber` via Prisma |
| `/api/case-studies` | `GET` | Returns all case studies from Prisma, ordered by `sortOrder` |

---

## 8. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```env
# Required for Prisma
DATABASE_URL="postgresql://user:password@localhost:5432/aanandi_db"

# Required for email sending
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-smtp-user"
SMTP_PASS="your-smtp-password"
SMTP_SECURE="false"
SMTP_FROM="noreply@aanandi.in"

# Contact notification recipient
CONTACT_EMAIL="hello@aanandi.in"

# Public site URL (used for metadata, sitemap, OG tags)
NEXT_PUBLIC_SITE_URL="https://aanandi.in"
```

---

## 9. Code Style Guidelines

### 9.1 TypeScript

- **Strict mode enabled** (`strict: true` in `tsconfig.json`).
- Use explicit types for props and API payloads.
- Path alias `@/*` maps to `./src/*`.

### 9.2 React Conventions

- Use functional components with default exports.
- Client components **must** include `"use client"` at the top.
- Prefer `useEffect` for DOM manipulation and event listeners in hydration components.
- Use `dangerouslySetInnerHTML` only for the crawled HTML injection pattern.

### 9.3 Styling

- **Tailwind CSS** is the primary styling tool.
- Custom CSS variables are defined in `src/app/globals.css` under `:root`.
- **Color tokens:**
  - `--color-bg`: `#ffffff`
  - `--color-blue`: `#2563eb`
  - `--color-heading`: `#111827`
  - `--color-text`: `#374151`
- **Font tokens:**
  - `font-jakarta`, `font-bricolage`, `font-display` — all map to CSS variables.
- Use `cn()` from `@/lib/cn.ts` for conditional class merging.

### 9.4 File Naming

- Components: `PascalCase.tsx`
- Utilities/constants: `camelCase.ts`
- Route files: Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`)

---

## 10. Testing

**There are currently no automated tests in this project.**

If adding tests, the recommended stack would be:
- **Vitest** or **Jest** for unit tests.
- **React Testing Library** for component tests.
- **Playwright** for E2E tests of the crawled page rendering.

---

## 11. Security Considerations

1. **Crawled HTML Injection:** Multiple pages use `dangerouslySetInnerHTML` with raw HTML from disk. The content is trusted (static extracted files), but any future dynamic user input must be sanitized before injection.
2. **File System Access:** API routes write to local JSON files (`contact_submissions.json`, `careers_applications.json`). These files are created at runtime in the project root. Ensure the deployment environment has write permissions and that these files are not committed.
3. **Environment Variables:** SMTP credentials and database URLs must never be committed. `.env.local` is in `.gitignore`.
4. **Prisma Client:** The singleton pattern in `src/lib/prisma.ts` prevents connection exhaustion in development by attaching the client to `globalThis`.
5. **Input Validation:** Contact and newsletter forms use Zod schemas. Careers and contact APIs have basic server-side validation but could benefit from stricter Zod enforcement.

---

## 12. Deployment

### Vercel (Recommended)

1. Push to a Git repository.
2. Link to Vercel Dashboard.
3. Set all environment variables from `.env.local`.
4. Add `postinstall` script (`prisma generate`) is already configured in `package.json`.
5. Deploy.

### Database

For production, use a serverless PostgreSQL provider:
- **Neon** (recommended for Vercel + Prisma)
- **Supabase PostgreSQL**
- **AWS RDS**

Run `npx prisma db push` after deployment to sync the schema.

---

## 13. Known Issues & Agent Notes

1. **Hardcoded Windows Paths:** `blogs/[slug]/page.tsx` and `careers/[slug]/page.tsx` read HTML files from `D:\clone\Clone\creuto.com\...`. These will not work on macOS/Linux. The extracted body/styles pattern used by other pages should be ported here.
2. **Code Duplication:** The `unlayerCSS()` function and crawled HTML processing logic are duplicated across nearly every page (`page.tsx`). Consider extracting to a shared utility (`src/lib/crawledPage.ts`).
3. **No Tests:** The project has zero test coverage. Any new business logic should include tests.
4. **Dashboard is Static:** The `/dashboard` page shows hardcoded mock stats. It is not connected to real infrastructure APIs.
5. **Navbar Hiding:** `Navbar.tsx` explicitly returns `null` on most marketing pages (`/`, `/about`, `/services`, etc.) because the crawled HTML includes its own navigation. The Navbar only appears on pages without crawled content.
6. **AI Page Accordion Script:** The `/ai` page injects a raw `<script>` tag for MUI accordion click handling. This is a workaround for missing React hydration of the crawled content.

---

*Last updated: 2026-05-18*
