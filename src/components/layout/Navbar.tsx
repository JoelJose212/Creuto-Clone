"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import AnnouncementBanner from "./AnnouncementBanner"
import ServicesMegaMenu from "./ServicesMegaMenu"
import { SERVICES_MENU_DATA } from "@/constants/servicesMenuData"

const NAV_LINKS = [
  { name: "MoolSap.ai", href: "/ai" },
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
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileActiveCategoryId, setMobileActiveCategoryId] = useState<string | null>(null)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDesktopDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(false)
    }, 150)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const BLOG_SLUGS = [
    "how-smes-can-leverage-ai",
    "how-moolsap-help-businesses-scale-smartly",
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

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/dashboard")) {
    return null
  }
  return (
    <>
      <AnnouncementBanner />
      <motion.nav
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottomColor: "rgba(229,231,235,0)", backdropFilter: "blur(0px)", top: "48px" }}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          borderBottomColor: scrolled ? "rgba(229,231,235,1)" : "rgba(229,231,235,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          top: "48px", // Keep fixed at 48px below the fixed top announcement banner
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ top: "48px" }}
        className="fixed left-0 right-0 z-50 flex h-[80px] items-center border-b border-transparent"
      >
        <div className="container mx-auto flex w-full items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <motion.div layout>
            <Link href="/" className="flex items-center">
              <img src="/img/moolsap_logo.png" alt="MoolSap Logo" className="h-[36px] w-auto object-contain" />
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="flex h-[80px] items-center cursor-pointer"
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 font-jakarta text-[14.5px] font-[600] transition-colors duration-200 hover:text-blue ${
                        desktopDropdownOpen ? "text-blue" : "text-[#4B5563]"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={15}
                        className={`transition-transform duration-200 ${
                          desktopDropdownOpen ? "rotate-180 text-blue" : "text-[#4A4D75]"
                        }`}
                      />
                    </Link>
                  </div>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-jakarta text-[14.5px] font-[600] text-[#4B5563] transition-colors duration-200 hover:text-blue"
                >
                  {link.name}
                </Link>
              )
            })}
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
                href="/book-a-call"
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

      {/* Desktop Services Mega Menu (fixed-positioned, rendered outside nav) */}
      <AnimatePresence>
        {desktopDropdownOpen && (
          <div
            className="hidden lg:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <ServicesMegaMenu />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100vh", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] overflow-y-auto pb-12 bg-[#ffffff]"
          >
            <div className="flex h-[72px] items-center justify-between px-4 sticky top-0 bg-white z-[70] border-b border-slate-100">
              <Link href="/" className="flex items-center">
                <img src="/img/moolsap_logo.png" alt="MoolSap Logo" className="h-[30px] w-auto object-contain" />
              </Link>
              <button
                className="flex items-center justify-center p-2 text-heading"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-[24px] pt-8 px-6 w-full max-w-md mx-auto">
              {NAV_LINKS.map((link) => {
                if (link.hasDropdown) {
                  return (
                    <div key={link.name} className="w-full flex flex-col items-center">
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center gap-2 font-sans text-[18px] font-medium text-heading focus:outline-none"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${
                            mobileServicesOpen ? "rotate-180 text-blue" : "text-heading"
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="w-full flex flex-col gap-2 mt-3 border-l-2 border-slate-100 pl-4 text-left align-start"
                          >
                            {SERVICES_MENU_DATA.map((category) => {
                              const isCatActive = mobileActiveCategoryId === category.id
                              return (
                                <div key={category.id} className="w-full flex flex-col">
                                  <button
                                    onClick={() => setMobileActiveCategoryId(isCatActive ? null : category.id)}
                                    className={`w-full text-left font-sans text-[15px] font-[600] py-1.5 flex justify-between items-center ${
                                      isCatActive ? "text-blue" : "text-[#4B5563]"
                                    }`}
                                  >
                                    <span>{category.name}</span>
                                    <ChevronDown
                                      size={14}
                                      className={`transition-transform duration-200 shrink-0 ${
                                        isCatActive ? "rotate-180" : ""
                                      }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {isCatActive && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex flex-col gap-2 pl-3 py-1"
                                      >
                                        {category.subServices.map((sub, idx) => (
                                          <Link
                                            key={`${sub.slug}-${idx}`}
                                            href={`/services/${sub.slug}`}
                                            onClick={() => {
                                              setMobileMenuOpen(false)
                                              setMobileServicesOpen(false)
                                              setMobileActiveCategoryId(null)
                                            }}
                                            className="font-sans text-[13.5px] font-medium text-[#6B7280] py-1 hover:text-blue block text-left"
                                          >
                                            → {sub.name}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans text-[18px] font-medium text-heading"
                  >
                    {link.name}
                  </Link>
                )
              })}
              <div className="mt-6 flex flex-col items-center gap-4 w-full">
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-full border border-border bg-transparent py-3 font-sans text-[16px] font-medium text-heading transition-colors hover:border-blue"
                >
                  Contact Us
                </Link>
                <Link
                  href="/book-a-call"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center rounded-full bg-blue py-3 font-sans text-[16px] font-medium text-[#ffffff] transition-all hover:bg-blue-hover"
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
