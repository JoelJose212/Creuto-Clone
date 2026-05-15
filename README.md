# Creuto Clone

A high-fidelity, pixel-perfect clone of the Creuto homepage (https://creuto.com/).

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Prisma with PostgreSQL
- **Forms**: React Hook Form + Zod
- **API**: Next.js Route Handlers + Nodemailer

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run migrations: `npx prisma migrate dev`
5. Start development server: `npm run dev`

## Production Build
To create a production build, run:
```bash
npm run build
```
