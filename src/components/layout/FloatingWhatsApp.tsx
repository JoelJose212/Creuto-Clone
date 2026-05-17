"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function FloatingWhatsApp() {
  const pathname = usePathname()
  
  if (pathname === "/" || pathname === "/ai" || pathname === "/about" || pathname === "/services" || pathname === "/case-studies" || pathname === "/blogs" || pathname?.startsWith("/blogs/") || pathname === "/contact" || pathname === "/careers" || pathname?.startsWith("/careers/")) return null

  return (
    <motion.a
      href="/contact"
      className="fixed bottom-[28px] right-[28px] z-[998] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#2563eb]"
      style={{
        boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      <MessageCircle size={26} color="white" />
    </motion.a>
  )
}
