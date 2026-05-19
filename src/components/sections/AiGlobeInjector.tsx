"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { GlobePulse } from "@/components/ui/GlobePulse"

export function AiGlobeInjector() {
  const [mountNode, setMountNode] = useState<Element | null>(null)

  useEffect(() => {
    // Wait for the DOM to paint the statically injected HTML
    const timer = setTimeout(() => {
      // Find the specific wrapper div where the globe belongs
      const targetNode = document.querySelector(".gp-wrapper.mui-10l306a")
      
      if (targetNode) {
        // Clear out the legacy static CSS 3D elements
        targetNode.innerHTML = ""
        // Set the mount node to trigger the portal render
        setMountNode(targetNode)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!mountNode) return null

  // Render the interactive Globe directly into the static HTML container
  return createPortal(
    <div className="w-full h-full flex items-center justify-center p-4">
      <GlobePulse className="w-full max-w-[500px]" />
    </div>,
    mountNode
  )
}
