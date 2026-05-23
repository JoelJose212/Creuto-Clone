"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"



const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
})

type NewsletterFormValues = z.infer<typeof newsletterSchema>

const SERVICES_LINKS = [
  "Custom Software Development",
  "Mobile App Development",
  "Web Development",
  "AI Engineering Services",
  "DevOps & Cloud Engineering",
  "Startup Product Engineering",
]

const COMPANY_LINKS = [
  "About Us",
  "Case Studies",
  "Blog",
  "Careers",
  "Contact",
  "Privacy Policy",
  "Terms & Conditions",
]

const LOCATIONS = [
  {
    country: "India 🇮🇳",
    address: "11th Floor, O-Hub, Chandaka Industrial Estate, Infocity, Bhubaneswar, Odisha 751024.",
  },
  {
    country: "Australia 🇦🇺",
    address: "Level 4, 11 York Street, Sydney Startup Hub, Sydney, NSW – 2000.",
  },
  {
    country: "Dubai 🇦🇪",
    address: "Level 25, AIDP Business Tower, Dubai Marina, United Arab Emirates.",
  },
  {
    country: "New Zealand 🇳🇿",
    address: "50 Beauchamp Street, Wellington, WGN 5028.",
  },
]

const SOCIALS = [
  { 
    name: "Instagram",
    href: "#",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  { 
    name: "Facebook",
    href: "#",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  { 
    name: "Twitter",
    href: "#",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-1 2.17-2.09 3.07a8 8 0 0 1-5.9 10.85 8 8 0 0 1-5.86-1.55c.05.01.1.02.15.02a4.5 4.5 0 0 0 2.73-.83 2.25 2.25 0 0 1-2.1-1.56 2.25 2.25 0 0 0 1.02-.04 2.25 2.25 0 0 1-1.81-2.21v-.03c.31.17.66.27 1.03.28a2.25 2.25 0 0 1-.7-3 8.1 8.1 0 0 0 5.88 2.98 2.25 2.25 0 0 1 3.83-2.06 4.5 4.5 0 0 0 1.43-.55 2.25 2.25 0 0 1-1 1.24 4.5 4.5 0 0 0 1.3-.35 2.25 2.25 0 0 1-1.13 1.17z"/>
      </svg>
    )
  },
  { 
    name: "Linkedin",
    href: "#",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  { 
    name: "Youtube",
    href: "#",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg width="24" height="24" {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2z"/><polyline points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    )
  },
]

export default function Footer() {
  const pathname = usePathname()
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormValues) => {
    setSubmitStatus("idle")
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus("success")
        reset()
      } else {
        setSubmitStatus("error")
        setErrorMessage(result.error || "Failed to subscribe")
      }
    } catch {
      setSubmitStatus("error")
      setErrorMessage("Something went wrong. Please try again.")
    }
  }

  if (pathname?.startsWith("/dashboard")) return null

  return (
    <footer className="border-t border-[#1a1e3a] bg-[#0a0c1a] px-[5%] pb-[32px] pt-[64px]">
      <div className="mx-auto max-w-7xl">
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-[48px] border-b border-[#1a1e3a] pb-[48px] md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="flex flex-col">
            <Link href="/" className="mb-[20px] font-display text-[24px] font-[800] tracking-[-0.5px]">
              <span className="text-[#ffffff]">Creu</span>
              <span className="text-blue">to</span>
            </Link>
            <p className="mb-[32px] max-w-[280px] font-sans text-[14px] font-[300] leading-[1.75] text-[#7b80a8]">
              We don&apos;t just aim to fit in — we strive to stand out. Experience the perfect blend of innovation, excellence, and trust that makes us truly unforgettable. Discover the difference with Aanandi.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <div className="flex flex-row gap-[8px]">
                <input
                  {...register("email")}
                  placeholder="Enter your email"
                  className="w-full flex-1 rounded-[8px] border border-[#1a1e3a] bg-[#0b0d1e] px-[16px] py-[10px] font-sans text-[13px] text-[#ffffff] outline-none transition-colors focus:border-blue"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center rounded-[8px] bg-[#1531FF] px-[18px] py-[10px] font-sans text-[13px] font-[600] text-[#ffffff] transition-colors hover:bg-[#3d57ff] disabled:opacity-70"
                >
                  {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : "Subscribe"}
                </button>
              </div>
              {errors.email && (
                <span className="text-[12px] text-red-500">{errors.email.message}</span>
              )}
              {submitStatus === "success" && (
                <span className="text-[12px] text-green-500">Successfully subscribed!</span>
              )}
              {submitStatus === "error" && (
                <span className="text-[12px] text-red-500">{errorMessage}</span>
              )}
            </form>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="mb-[20px] font-display text-[13px] font-[700] uppercase tracking-[0.06em] text-[#ffffff]">
              Services
            </h4>
            <div className="flex flex-col gap-[10px]">
              {SERVICES_LINKS.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="font-sans text-[13px] font-[300] text-[#7b80a8] transition-colors duration-200 hover:text-[#ffffff]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="mb-[20px] font-display text-[13px] font-[700] uppercase tracking-[0.06em] text-[#ffffff]">
              Company
            </h4>
            <div className="flex flex-col gap-[10px]">
              {COMPANY_LINKS.map((link) => (
                <Link
                  key={link}
                  href="#"
                  className="font-sans text-[13px] font-[300] text-[#7b80a8] transition-colors duration-200 hover:text-[#ffffff]"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Locations */}
          <div>
            <h4 className="mb-[20px] font-display text-[13px] font-[700] uppercase tracking-[0.06em] text-[#ffffff]">
              Locations
            </h4>
            <div className="flex flex-col gap-[20px]">
              {LOCATIONS.map((loc, i) => (
                <div key={i}>
                  <div className="mb-[4px] font-sans text-[14px] font-[500] text-[#ffffff]">
                    {loc.country}
                  </div>
                  <div className="font-sans text-[12px] font-[300] leading-[1.6] text-[#7b80a8]">
                    {loc.address}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col items-start gap-[16px] pt-[28px] md:flex-row md:items-center md:justify-between">
          <div className="font-sans text-[13px] font-[300] text-[#7b80a8]">
            © 2026 Aanandi All Rights Reserved
          </div>
          <div className="flex gap-[24px]">
            <Link href="#" className="font-sans text-[12px] text-[#7b80a8] transition-colors hover:text-[#ffffff]">
              Terms & Conditions
            </Link>
            <Link href="#" className="font-sans text-[12px] text-[#7b80a8] transition-colors hover:text-[#ffffff]">
              Privacy Policy
            </Link>
          </div>
          <div className="flex gap-[12px]">
            {SOCIALS.map((social, i) => {
              const Icon = social.icon
              return (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={social.href}
                    className="flex h-[36px] w-[36px] items-center justify-center rounded-[8px] border border-[#1a1e3a] bg-transparent text-[#7b80a8] transition-colors duration-200 hover:border-blue hover:text-blue"
                  >
                    <Icon width={16} height={16} />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
