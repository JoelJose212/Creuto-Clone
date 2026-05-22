"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface CareersDetailHydrationProps {
  children: React.ReactNode
  roleTitle: string
}

export default function CareersDetailHydration({ children, roleTitle }: CareersDetailHydrationProps) {
  const router = useRouter()

  // Capture clicking static "Apply Now" buttons and redirect to the new split-screen Apply Now page
  useEffect(() => {
    const handleApplyClick = (e: Event) => {
      const target = e.target as HTMLElement
      
      // Matches the text content "apply now", custom link attributes or structures
      const isApplyButton = 
        target.textContent?.trim().toLowerCase() === "apply now" ||
        target.closest("a")?.getAttribute("href")?.includes("apply.html") ||
        target.closest("button")?.textContent?.trim().toLowerCase() === "apply now"

      if (isApplyButton) {
        e.preventDefault()
        e.stopPropagation()
        
        // Dynamic client-side routing to the new split-screen Apply page
        router.push(`/careers/apply?position=${encodeURIComponent(roleTitle)}`)
      }
    }

    document.addEventListener("click", handleApplyClick, true)
    return () => document.removeEventListener("click", handleApplyClick, true)
  }, [roleTitle, router])

  return (
    <>
      {/* Render the React Native converted job description */}
      {children}
    </>
  )
}
