import type { Metadata } from "next"
import { Syne, DM_Sans, Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp"
import CustomCursor from "@/components/layout/CustomCursor"
import PageTransition from "@/components/layout/PageTransition"
import Providers from "@/components/providers/Providers"

const syne = Syne({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
})

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
})

export const viewport = {
  themeColor: "#1531FF",
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Creuto - AI Products, Mobile Apps & Custom Software Development",
  description: "Creuto is a premium agency specializing in AI products, mobile apps, and custom software development.",
  openGraph: {
    title: "Creuto - AI Products, Mobile Apps & Custom Software Development",
    description: "Creuto is a premium agency specializing in AI products, mobile apps, and custom software development.",
    url: "https://creuto.com",
    siteName: "Creuto",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creuto",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://creuto.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${bricolage.variable} dark`}>
      <body className="bg-bg text-text antialiased selection:bg-blue/30">
        <Providers>
          <CustomCursor />
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  )
}
