"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function AnnouncementBanner() {
  const message = "A leading product engineering company, creating adaptive software solutions to improve operations, providing businesses with expert development services from across domain."
  
  return (
    <div className="relative z-[60] w-full overflow-hidden bg-[#2563eb] py-2.5">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex items-center gap-12 px-6"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-white">
                {message}
              </span>
              <ArrowUpRight size={14} className="text-white/80" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
