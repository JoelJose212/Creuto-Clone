"use client"

import { useState, useEffect } from "react"

export function useCountUp(end: number, duration: number = 2000, startWhen: boolean = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startWhen) return

    let startTime: number | null = null
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const current = Math.min(Math.floor((progress / duration) * end), end)
      
      setCount(current)

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(animationFrameId)
  }, [end, duration, startWhen])

  return count
}
