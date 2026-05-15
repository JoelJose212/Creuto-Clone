"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[28px] right-[28px] z-[998] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25d366]"
      style={{
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <MessageCircle size={24} color="white" />
    </motion.a>
  )
}
