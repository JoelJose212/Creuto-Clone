"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import AnnouncementBanner from "./AnnouncementBanner"



const NAV_LINKS = [
  { name: "Creuto.ai", href: "/ai" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Blogs", href: "/blog" },
  { name: "Careers", href: "/careers" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const BLOG_SLUGS = [
    "how-smes-can-leverage-ai",
    "how-creuto-help-businesses-scale-smartly",
    "why-every-business-owner-should-invest-in-custom-software",
    "the-beginning-of-something-real",
    "your-customers-are-on-mobile",
    "custom-crm",
    "software-partner",
    "custom-software-development",
    "customsoftware-roi",
    "startup"
  ]

  const slug = pathname ? pathname.slice(1) : ""

  if (
    BLOG_SLUGS.includes(slug) ||
    pathname === "/" ||
    pathname === "/ai" ||
    pathname === "/about" ||
    pathname === "/services" ||
    pathname === "/case-studies" ||
    pathname === "/blog" ||
    pathname?.startsWith("/blog/") ||
    pathname === "/contact" ||
    pathname === "/careers" ||
    pathname?.startsWith("/careers/") ||
    pathname?.startsWith("/dashboard")
  ) {
    return null
  }


  return (
    <>
      <AnnouncementBanner />
      <motion.nav
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottomColor: "rgba(229,231,235,0)", backdropFilter: "blur(0px)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          borderBottomColor: scrolled ? "rgba(229,231,235,1)" : "rgba(229,231,235,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          top: scrolled ? "0px" : "42px", // Shift down when banner is visible
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 right-0 z-50 flex h-[80px] items-center border-b border-transparent"
      >
        <div className="container mx-auto flex w-full items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <motion.div layout>
            <Link href="/" className="font-jakarta text-[26px] font-[800] tracking-[-0.03em] text-heading flex items-center">
              <span>Creuto</span>
              <span className="w-1.5 h-1.5 bg-blue rounded-full ml-0.5 mt-2" />
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-jakarta text-[14.5px] font-[600] text-[#4B5563] transition-colors duration-200 hover:text-blue"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/contact"
                className="rounded-full border border-border bg-white px-7 py-2.5 font-jakarta text-[14.5px] font-bold text-heading transition-all hover:border-blue hover:text-blue block"
              >
                Contact Us
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="#"
                className="rounded-full bg-blue px-7 py-2.5 font-jakarta text-[14.5px] font-bold text-white shadow-lg shadow-blue/20 transition-all hover:bg-blue-hover block"
              >
                Book A Call
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center p-2 text-heading lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] overflow-hidden bg-[#ffffff]"
          >
            <div className="flex h-[72px] items-center justify-between px-4">
              <Link href="/" className="font-display text-[22px] font-[800] tracking-[-0.5px]">
                <span className="text-heading">Creu</span>
                <span className="text-blue">to</span>
              </Link>
              <button
                className="flex items-center justify-center p-2 text-heading"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-[24px] pt-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-sans text-[18px] font-medium text-heading"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 flex flex-col items-center gap-4">
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg border border-border bg-transparent px-[24px] py-[12px] font-sans text-[16px] font-medium text-heading transition-colors hover:border-blue"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg bg-blue px-[24px] py-[12px] font-sans text-[16px] font-medium text-[#ffffff] transition-all hover:bg-blue-hover"
                >
                  Book A Call
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
