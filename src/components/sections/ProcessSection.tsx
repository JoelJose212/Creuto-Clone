"use client"

import SectionWrapper from "@/components/shared/SectionWrapper"

const STEPS = [
  {
    num: "1",
    title: "Discovery",
    desc: "We establish clear direction by aligning on your vision and business goals through introductory calls and detailed market analysis.",
  },
  {
    num: "2",
    title: "Design & Development",
    desc: "Senior engineers architect and build your solution using structured sprints, modern frameworks, and enterprise-grade standards.",
  },
  {
    num: "3",
    title: "Testing & Deployment",
    desc: "Rigorous QA including automated testing, manual testing, and code reviews with CI/CD pipelines for smooth deployments.",
  },
  {
    num: "4",
    title: "Support, Maintenance & Growth",
    desc: "Post-launch, we stay as your technical partner — monitoring, maintaining, and scaling your product alongside your business.",
  },
]

export default function ProcessSection() {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-7xl">
        <div className="mb-[48px] text-center">
          <span className="mb-[16px] inline-block text-[11px] font-bold uppercase tracking-[0.1em] text-blue">
            HOW WE WORK
          </span>
          <h2 className="mb-[16px] font-display text-[40px] font-[800] leading-[1.1] text-white md:text-[48px]">
            Our Product Development Process.
          </h2>
          <p className="mx-auto max-w-[600px] font-sans text-[16px] font-[300] text-muted">
            At Creuto, we believe that a structured and effective development process is crucial to delivering successful products.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] border border-border sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="group border-b border-border bg-surface px-[28px] py-[40px] transition-colors duration-250 hover:bg-surface-2 md:border-b-0 md:border-r last:border-r-0 last:border-b-0"
            >
              <div className="mb-[24px] flex h-[36px] w-[36px] items-center justify-center rounded-full border border-[rgba(21,49,255,0.4)] bg-transparent">
                <span className="font-display text-[13px] font-[700] text-blue">
                  {step.num}
                </span>
              </div>
              <h3 className="mb-[16px] font-display text-[18px] font-[700] text-white">
                {step.title}
              </h3>
              <p className="font-sans text-[13px] font-[300] leading-[1.7] text-muted">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
