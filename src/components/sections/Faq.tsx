"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { cn } from "@/lib/cn"

const FAQS = [
  {
    q: "What services does CREUTO provide?",
    a: "We offer end-to-end custom software development, mobile app development, AI feature integration, MVP development, and scalable digital product engineering for startups, SMEs, and enterprises.",
  },
  {
    q: "Can CREUTO integrate AI into my existing product or application?",
    a: "Yes, we specialize in integrating AI capabilities into existing systems. Whether adding chatbots, predictive analytics, or computer vision, we can enhance your product with the latest AI technologies.",
  },
  {
    q: "How long does it take to build a custom software or mobile application?",
    a: "The timeline depends on complexity. A simple MVP might take 4-8 weeks, while a full-scale enterprise solution could take 3-6 months or more. We provide a detailed timeline after the initial discovery phase.",
  },
  {
    q: "What industries does Creuto work with?",
    a: "We work with Healthcare, Fintech, E-commerce, Education, Real Estate, Logistics, and more. Our team adapts to the specific compliance and operational needs of each sector.",
  },
  {
    q: "How do you ensure the quality and stability of the software you deliver?",
    a: "We follow a rigorous QA process including automated testing, manual testing, and code reviews. We implement CI/CD pipelines to ensure smooth deployments and maintain high code quality throughout.",
  },
  {
    q: "Do you build MVPs for startups?",
    a: "Yes, we love working with startups! We specialize in building MVPs that help you validate your idea quickly and cost-effectively, allowing you to launch and gather user feedback sooner.",
  },
  {
    q: "What technologies and AI models do you work with?",
    a: "We work with React, Next.js, Node.js, Python, Flutter, and React Native. For AI, we utilize OpenAI, Llama, TensorFlow, PyTorch, and cloud AI services from AWS and Azure.",
  },
  {
    q: "Why should we choose Creuto for our software or AI project?",
    a: "We combine technical expertise with business acumen. Our team doesn't just write code — we understand your business goals. We offer transparent communication, agile delivery, and future-proof solutions.",
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px] text-center">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            FAQS
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            Frequently Asked Questions.
          </h2>
          <p className="font-sans text-[16px] font-[300] text-muted">
            Got a query? We&apos;ve solved some of your doubts below.
          </p>
        </div>

        <div className="mx-auto max-w-[800px]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="border-b border-border last:border-0">
                <button
                  onClick={() => toggleOpen(i)}
                  className="flex w-full items-center justify-between gap-[20px] bg-transparent py-[24px] text-left transition-colors hover:text-blue"
                >
                  <span className="font-display text-[17px] font-[600] text-white transition-colors hover:text-blue">
                    {faq.q}
                  </span>
                  <div
                    className={cn(
                      "flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200",
                      isOpen && "border-blue"
                    )}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus size={16} className={isOpen ? "text-blue" : "text-muted"} />
                    </motion.div>
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-[24px] font-sans text-[14px] font-[300] leading-[1.8] text-muted">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
