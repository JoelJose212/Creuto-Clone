"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FAQItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "faq-1",
    num: "01.",
    question: "What services does MOOLSAP provide?",
    answer: "We offer end-to-end custom software development, mobile app development, AI feature integration, MVP development, and scalable digital product engineering for startups, SMEs, and enterprises."
  },
  {
    id: "faq-2",
    num: "02.",
    question: "Can MOOLSAP integrate AI into my existing product or application?",
    answer: "Yes, we specialize in integrating AI capabilities into existing systems. Whether it's adding chatbots, predictive analytics, or computer vision features, we can enhance your product with the latest AI technologies."
  },
  {
    id: "faq-3",
    num: "03.",
    question: "How long does it take to build a custom software or mobile application?",
    answer: "The timeline depends on the project's complexity. A simple MVP might take 4-8 weeks, while a full-scale enterprise solution could take 3-6 months or more. We provide a detailed timeline after the initial discovery phase."
  },
  {
    id: "faq-4",
    num: "04.",
    question: "What industries does MoolSap work with?",
    answer: "We work with a diverse range of industries including Healthcare, Fintech, E-commerce, Education, Real Estate, Logistics, and more. Our team adapts to the specific compliance and operational needs of each sector."
  },
  {
    id: "faq-5",
    num: "05.",
    question: "How do you ensure the quality and stability of the software you deliver?",
    answer: "We follow a rigorous QA process including automated testing, manual testing, and code reviews. We also implement CI/CD pipelines to ensure smooth deployments and maintain high code quality standards throughout development."
  },
  {
    id: "faq-6",
    num: "06.",
    question: "Do you build MVPs for startups?",
    answer: "Yes, we love working with startups! We specialize in building MVPs (Minimum Viable Products) that help you validate your idea quickly and cost-effectively, allowing you to launch and gather user feedback sooner."
  },
  {
    id: "faq-7",
    num: "07.",
    question: "What technologies and AI models do you work with?",
    answer: "We work with modern stacks like React, Next.js, Node.js, Python, Flutter, and React Native. For AI, we utilize OpenAI models, Llama, TensorFlow, PyTorch, and various cloud AI services from AWS and Azure."
  },
  {
    id: "faq-8",
    num: "08.",
    question: "Why should we choose MoolSap for our software or AI project?",
    answer: "We combine technical expertise with business acumen. Our team doesn't just write code; we understand your business goals. We offer transparent communication, agile delivery, and a commitment to building scalable, future-proof solutions."
  }
];

export default function FAQSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIdx(expandedIdx === index ? null : index);
  };

  const col1 = faqData.slice(0, 4);
  const col2 = faqData.slice(4, 8);

  return (
    <section className="faq-section-container">
      <div className="faq-header-wrapper">
        <div className="faq-pill">FAQS</div>
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <p className="faq-subtitle">Got a query? We've solved some of your doubts below.</p>
      </div>

      <div className="faq-grid">
        {/* Left Column (01-04) */}
        <div className="faq-column">
          {col1.map((item, idx) => {
            const globalIdx = idx;
            const isExpanded = expandedIdx === globalIdx;
            return (
              <div
                key={item.id}
                className={`faq-card ${isExpanded ? "active" : ""}`}
                onClick={() => toggleFAQ(globalIdx)}
              >
                <div className="faq-card-header">
                  <h3 className="faq-card-question">
                    <span className="faq-card-num">{item.num}</span> {item.question}
                  </h3>
                  <motion.div
                    className="faq-card-icon"
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Plus className="faq-plus-icon" size={20} />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="faq-card-content-wrapper"
                    >
                      <div className="faq-card-answer">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column (05-08) */}
        <div className="faq-column">
          {col2.map((item, idx) => {
            const globalIdx = idx + 4;
            const isExpanded = expandedIdx === globalIdx;
            return (
              <div
                key={item.id}
                className={`faq-card ${isExpanded ? "active" : ""}`}
                onClick={() => toggleFAQ(globalIdx)}
              >
                <div className="faq-card-header">
                  <h3 className="faq-card-question">
                    <span className="faq-card-num">{item.num}</span> {item.question}
                  </h3>
                  <motion.div
                    className="faq-card-icon"
                    animate={{ rotate: isExpanded ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Plus className="faq-plus-icon" size={20} />
                  </motion.div>
                </div>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                      className="faq-card-content-wrapper"
                    >
                      <div className="faq-card-answer">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .faq-section-container {
          max-width: 1200px;
          margin: 120px auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .faq-header-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 56px;
        }

        .faq-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #0f172a;
          background: rgba(0, 0, 0, 0.03);
          margin-bottom: 20px;
          text-transform: uppercase;
        }

        .faq-title {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          font-size: 2.75rem;
          font-weight: 800;
          line-height: 1.2;
          color: #0f172a;
          margin: 0 0 16px 0;
          letter-spacing: -0.02em;
        }

        .faq-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #64748b;
          margin: 0;
          font-weight: 400;
          max-width: 600px;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 900px) {
          .faq-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .faq-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-card {
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 12px;
          padding: 24px;
          cursor: pointer;
          transition: border-color 200ms ease;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
          box-shadow: none;
        }

        .faq-card:hover {
          background: #ffffff;
          border-color: #cccccc;
        }

        .faq-card.active {
          background: #ffffff;
          border-color: #eeeeee;
          box-shadow: none;
        }

        .faq-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .faq-card-question {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
          font-size: 1.05rem;
          font-weight: 700;
          line-height: 1.5;
          color: #0f172a;
          margin: 0;
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .faq-card-num {
          color: #0f172a;
          font-weight: 800;
          opacity: 0.9;
        }

        .faq-card-icon {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.03);
          color: #0f172a;
          transition: background 300ms ease;
        }

        .faq-card:hover .faq-card-icon {
          background: rgba(0, 0, 0, 0.08);
        }

        .faq-card-content-wrapper {
          overflow: hidden;
        }

        .faq-card-answer {
          padding-top: 16px;
          font-size: 0.92rem;
          line-height: 1.6;
          color: #475569;
          font-weight: 400;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          margin-top: 16px;
        }

        @media (max-width: 600px) {
          .faq-section-container {
            margin: 80px auto;
          }

          .faq-title {
            font-size: 2rem;
          }

          .faq-card {
            padding: 20px;
          }

          .faq-card-question {
            font-size: 0.95rem;
          }
        }
      `}} />
    </section>
  );
}
