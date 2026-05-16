"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { servicesFAQ } from "@/constants/servicesFAQ";

export default function ServicesFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f8f8f8] py-[120px] px-[5%] w-full">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-bricolage text-[10.4px] font-semibold uppercase tracking-[0.15em] text-[#1746ea] mb-[16px]">
          FAQS
        </div>
        
        <h2 className="font-bricolage text-[32px] md:text-[44px] font-bold text-[#23272e] tracking-[-0.88px] leading-[1.1] mb-[16px]">
          Frequently Asked Questions.
        </h2>
        
        <p className="font-bricolage text-[15.2px] font-medium text-[#666666] leading-[1.65] max-w-[640px] mb-[56px]">
          Here are some common things people ask us before building their custom software. If you're still wondering about something, we're just a message away!
        </p>

        <div className="max-w-[840px] w-full flex flex-col">
          {servicesFAQ.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="border-b border-[#e5e7eb]">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center py-[24px] bg-transparent border-none cursor-pointer text-left focus:outline-none group"
                >
                  <span className={`font-bricolage text-[16px] md:text-[18px] font-semibold pr-[24px] transition-colors duration-200 flex-1 ${isOpen ? "text-[#1746ea]" : "text-[#23272e] group-hover:text-[#1746ea]"}`}>
                    {faq.question}
                  </span>
                  <motion.div 
                    className={`w-[32px] h-[32px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 border-[0.8px] shadow-[0_2px_8px_0_rgba(0,0,0,0.02)]
                      ${isOpen ? "bg-[#f0f4ff] border-[rgba(23,70,234,0.3)]" : "bg-[#ffffff] border-[#e5e7eb]"}
                    `}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Plus size={16} className={isOpen ? "text-[#1746ea]" : "text-[#666666]"} />
                  </motion.div>
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
                      <div className="font-bricolage text-[14.4px] font-medium text-[#666666] leading-[1.8] pb-[24px] pr-[48px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
