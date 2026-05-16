"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const MotionLink = motion.create(Link)

const NAV_LINKS = [
  { name: "Creuto AI", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Case Studies", href: "#" },
  { name: "Blogs", href: "#" },
  { name: "Careers", href: "#" },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (pathname?.startsWith("/dashboard")) return null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottomColor: "rgba(216,219,230,0)", backdropFilter: "blur(0px)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
          borderBottomColor: scrolled ? "rgba(216,219,230,1)" : "rgba(216,219,230,0)",
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 flex h-[72px] items-center border-b border-transparent"
      >
        <div className="container mx-auto flex w-full items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <motion.div layout>
            <Link href="/" className="font-display text-[22px] font-[800] tracking-[-0.5px]">
              <span className="text-heading">Creu</span>
              <span className="text-blue">to</span>
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-[14px] font-medium text-muted transition-colors duration-200 hover:text-heading"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <MotionLink
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border border-border bg-transparent px-[16px] py-[8px] font-sans text-[14px] font-medium text-heading transition-colors duration-200 hover:border-blue"
            >
              Contact Us
            </MotionLink>
            <MotionLink
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-blue px-[22px] py-[10px] font-sans text-[14px] font-medium text-[#ffffff] transition-colors duration-200 hover:bg-blue-hover"
            >
              Book A Call
            </MotionLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center p-2 text-heading md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
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
