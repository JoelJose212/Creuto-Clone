"use client"

import { motion } from "framer-motion"
import Link from "next/link"



export default function CTASection() {
  return (
    <section className="bg-[#2563eb] py-[120px] px-[5%] relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-white/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-4xl relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-[24px] inline-block text-[14px] font-bold uppercase tracking-[0.2em] text-white/80"
        >
          LET&apos;S CONNECT
        </motion.span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-[32px] font-jakarta text-[clamp(40px,7vw,72px)] font-[800] leading-[1.05] text-white tracking-tight"
        >
          Connect with Creuto.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-[48px] max-w-[600px] font-jakarta text-[18px] md:text-[22px] font-[500] leading-relaxed text-white/90"
        >
          Schedule a discovery call to discuss your project and see how we can help you scale your business with custom software.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="rounded-full bg-white px-10 py-5 text-[18px] font-bold text-[#2563eb] shadow-xl transition-all hover:bg-[#F3F4F6] hover:shadow-black/10 block"
            >
              Schedule a Call
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/contact"
              className="rounded-full border-2 border-white/30 bg-transparent px-10 py-5 text-[18px] font-bold text-white transition-all hover:bg-white/10 block"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
