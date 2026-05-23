"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const ITEMS = [
  {
    label: "Creativity",
    description: "Innovation that drives unique and engaging experiences.",
    image: "/cloned_next/1e28c.jpeg"
  },
  {
    label: "Clarity",
    description: "Clear communication and transparent processes.",
    image: "/cloned_next/2a45c.jpeg"
  },
  {
    label: "Craftsmanship",
    description: "Code engineered for performance and longevity.",
    image: "/cloned_next/Craftmanshipf9e1.jpeg"
  },
  {
    label: "Consistency",
    description: "Reliable results and uniform quality standards.",
    image: "/cloned_next/3a35b.jpeg"
  },
  {
    label: "Confidence",
    description: "Secure, scalable, and robust software solutions.",
    image: "/cloned_next/40bb1.jpeg"
  }
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(1002); // Middle index for seamless bidirectional infinite scrolling
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const delayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const dragInfo = useRef({
    active: false,
    startX: 0,
    offset: 0,
    startIdx: 0,
    moved: false
  });

  const getSlideWidthPx = useCallback(() => {
    if (typeof window === "undefined") return 320;
    const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const width = window.innerWidth;
    
    // Scoped rem widths mapping our CSS variables below
    if (width < 640) return 14 * baseFontSize;
    if (width < 768) return 17 * baseFontSize;
    return 20 * baseFontSize;
  }, []);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => prev + 1);
    }, 4000);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only trigger dragging with left-click or primary touch
    stopAutoplay();
    dragInfo.current = {
      active: true,
      startX: e.clientX,
      offset: 0,
      startIdx: activeIndex,
      moved: false
    };
    
    if (containerRef.current) {
      containerRef.current.style.transition = "none";
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [activeIndex, stopAutoplay]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragInfo.current.active) return;
    const offset = e.clientX - dragInfo.current.startX;
    
    // Check threshold to differentiate drag from tap click
    if (Math.abs(offset) > 5) {
      dragInfo.current.moved = true;
    }
    dragInfo.current.offset = offset;
    
    if (containerRef.current) {
      const slideWidth = getSlideWidthPx();
      const currentIdx = dragInfo.current.startIdx;
      // Precise translation including drag offset
      const baseTranslate = -(currentIdx * slideWidth + slideWidth / 2);
      containerRef.current.style.transform = `translateX(calc(-50% + ${baseTranslate}px + ${offset}px))`;
    }
  }, [getSlideWidthPx]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragInfo.current.active) return;
    dragInfo.current.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    const offset = dragInfo.current.offset;
    const slideWidth = getSlideWidthPx();
    
    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
    }
    
    let targetIdx = dragInfo.current.startIdx;
    if (Math.abs(offset) > slideWidth * 0.2) {
      const numSlides = Math.max(1, Math.round(Math.abs(offset) / slideWidth));
      targetIdx += offset > 0 ? -numSlides : numSlides;
    }
    
    setActiveIndex(targetIdx);

    // Clean up temporary inline drag styles so standard layout takes back control
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = "";
        containerRef.current.style.transform = "";
      }
    }, 750);
    
    // Schedule restart of autoplay
    delayTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 3000);
  }, [getSlideWidthPx, startAutoplay]);

  const handleItemClick = useCallback((index: number) => {
    if (dragInfo.current.moved) return;
    stopAutoplay();
    setActiveIndex(index);
    delayTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 3000);
  }, [startAutoplay, stopAutoplay]);

  // Infinite slider range to allow continuous circular feel
  const slides = [];
  const range = 15;
  for (let idx = activeIndex - range; idx <= activeIndex + range; idx++) {
    const itemIndex = ((idx % ITEMS.length) + ITEMS.length) % ITEMS.length;
    const item = ITEMS[itemIndex];
    const isActive = idx === activeIndex;
    
    slides.push(
      <div
        key={idx}
        className="absolute top-0 flex flex-col items-center justify-start h-full select-none pointer-events-none"
        style={{
          left: `calc(${idx} * var(--slide-width))`,
          width: "var(--slide-width)",
        }}
      >
        {/* Carousel Circular Card */}
        <div
          className="flex flex-col items-center pointer-events-auto transition-transform duration-700 ease-out-quart w-full"
          style={{
            transform: isActive ? "translateY(0)" : "translateY(min(5.5rem, 7.5vw))",
          }}
        >
          {/* Glassmorphic Icon Circle */}
          <button
            onClick={() => handleItemClick(idx)}
            className={`w-[4.5rem] h-[4.5rem] md:w-[6rem] md:h-[6rem] flex items-center justify-center rounded-3xl transition-all duration-700 ease-out-quart cursor-pointer backdrop-blur-md shadow-lg outline-none select-none border border-white/10 ${
              isActive
                ? "bg-white/20 scale-110 shadow-white/10"
                : "bg-white/10 opacity-60 hover:opacity-90 hover:bg-white/15"
            }`}
          >
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-contain pointer-events-none filter drop-shadow-md"
              />
            </div>
          </button>
          
          {/* Item Text Title */}
          <h3
            className={`mt-4 md:mt-5 text-center font-display font-semibold transition-all duration-700 ease-out-quart select-none tracking-tight ${
              isActive
                ? "text-[1.25rem] md:text-[1.6rem] text-white opacity-100 scale-105"
                : "text-[1rem] md:text-[1.2rem] text-white/60 opacity-60"
            }`}
          >
            {item.label}
          </h3>
        </div>

        {/* Active Item Description details */}
        <div
          className="absolute flex flex-col items-center pointer-events-none text-center px-4 w-full transition-all duration-700 ease-out-quart"
          style={{
            top: "min(12.5rem, 16vw)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateY(0)" : "translateY(-1rem)",
            pointerEvents: isActive ? "auto" : "none"
          }}
        >
          <p className="text-[0.9rem] md:text-[1.1rem] text-white/90 font-medium leading-relaxed max-w-[18rem] md:max-w-[22rem] tracking-tight drop-shadow-sm select-none">
            {item.description}
          </p>
          {/* Spotlight bouncy arrow */}
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white/90 mt-2 filter drop-shadow-sm animate-bounce"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="m7 10 5 5 5-5z" />
          </svg>
        </div>

        {/* Sliding Timeline scale vertical tick-marks */}
        <div className="absolute bottom-0 w-full h-[4.5rem] md:h-[6rem] flex select-none pointer-events-none">
          {Array.from({ length: 11 }).map((_, tickIdx) => {
            const isCenterTick = tickIdx === 5;
            return (
              <div
                key={tickIdx}
                className="flex-1 flex justify-center items-end h-full"
              >
                <div
                  className={`w-[2px] transition-all duration-700 ease-out-quart rounded-full ${
                    isCenterTick && isActive
                      ? "h-full bg-white w-[3px] shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                      : isCenterTick
                      ? "h-full bg-white/40"
                      : "h-2/3 bg-white/15"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const transformStyle = `translateX(calc(-50% - (${activeIndex} * var(--slide-width)) - (var(--slide-width) / 2)))`;

  return (
    <>
      <section className="relative bg-[#1746ea] text-white overflow-hidden py-16 md:py-24 flex flex-col items-center">
        {/* Dynamic responsive slide width styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --slide-width: 20rem;
          }
          @media (max-width: 768px) {
            :root {
              --slide-width: 17rem;
            }
          }
          @media (max-width: 640px) {
            :root {
              --slide-width: 14rem;
            }
          }
        `}} />

        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[100px] pointer-events-none z-0" />
        
        {/* Header Block */}
        <div className="relative z-10 w-full max-w-5xl px-6 mb-12 md:mb-16 flex flex-col items-center text-center">
          <span className="px-4 py-1 rounded-full border border-white/20 bg-white/10 text-[0.75rem] md:text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm select-none">
            OUR FRAMEWORK
          </span>
          <h2 className="mt-6 font-display text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] font-bold leading-tight tracking-tight max-w-3xl drop-shadow-sm select-none">
            C Is for AANANDI. C Is How We Build.
          </h2>
          <p className="mt-4 text-[0.95rem] sm:text-[1.1rem] md:text-[1.25rem] text-white/70 max-w-2xl font-medium tracking-tight select-none">
            We built our engineering culture around the Cs that define world-class software.
          </p>
        </div>

        {/* Carousel slider area */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative z-10 w-full h-[22rem] md:h-[28rem] select-none ${
            dragInfo.current.active ? "cursor-grabbing" : "cursor-grab"
          } touch-none`}
        >
          {/* Edge fade linear gradients */}
          <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#1746ea] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#1746ea] to-transparent pointer-events-none z-20" />

          {/* Absolute center dot pointer */}
          <div className="absolute bottom-[4.5rem] md:bottom-[6rem] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-white rounded-full z-20 shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none" />

          {/* Track slider */}
          <div
            ref={containerRef}
            className="absolute top-0 left-1/2 h-full will-change-transform transition-transform duration-700 ease-out-quart"
            style={{
              transform: transformStyle,
              width: 0
            }}
          >
            {slides}
          </div>
        </div>
      </section>
    </>
  );
}
