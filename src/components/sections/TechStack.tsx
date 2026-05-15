"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionWrapper from "@/components/shared/SectionWrapper"
import { cn } from "@/lib/cn"

const TECH_CATEGORIES = [
  "Front-End",
  "Back-End",
  "Design & Prototyping",
  "Database & ORM",
  "DevOps & Cloud",
  "Mobile Development",
  "Machine Learning & AI",
  "Testing & QA",
] as const

type TechCategory = typeof TECH_CATEGORIES[number]

const TECH_DATA: Record<TechCategory, string[]> = {
  "Front-End": ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "PWA", "WordPress"],
  "Back-End": ["Node.js", "Python", "Java", "C#", "PHP", "Go", "Rust", "Laravel", "Ruby on Rails", "NestJS"],
  "Design & Prototyping": ["Figma", "Adobe XD", "Sketch", "Adobe Illustrator", "Adobe Photoshop", "InVision", "Framer", "Storybook"],
  "Database & ORM": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "DynamoDB", "Cassandra", "Elasticsearch", "Supabase", "Prisma", "Sequelize", "TypeORM", "Mongoose"],
  "DevOps & Cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform"],
  "Mobile Development": ["React Native", "Flutter", "Android", "iOS", "Swift", "Kotlin", "Java"],
  "Machine Learning & AI": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Python", "OpenAI", "LangChain"],
  "Testing & QA": ["Jest", "Cypress", "Selenium", "Postman", "Swagger", "GraphQL", "Apollo"],
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<TechCategory>("Front-End")

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-5xl text-center">
        <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
          OUR TECH STACK
        </span>
        <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
          Technologies we use to elevate experiences.
        </h2>
        <p className="mb-[48px] font-sans text-[16px] font-[300] text-muted">
          Below are the latest tools we consider while crafting the best IT solutions for you!
        </p>

        {/* Tabs */}
        <div className="mb-[40px] flex flex-wrap justify-center gap-[12px]">
          {TECH_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "rounded-full border border-border bg-transparent px-[18px] py-[8px] font-sans text-[13px] font-[500] text-muted transition-colors duration-200 hover:border-[#1531FF] hover:bg-[#1531FF] hover:text-white",
                  isActive && "border-[#1531FF] bg-[#1531FF] text-white"
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Tech Pills */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex flex-wrap justify-center gap-[12px]"
            >
              {TECH_DATA[activeTab].map((tech, i) => (
                <div
                  key={i}
                  className="rounded-[8px] border border-border bg-surface px-[16px] py-[8px] font-sans text-[13px] font-[500] text-text transition-colors duration-200 hover:border-blue hover:text-white"
                >
                  {tech}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  )
}
