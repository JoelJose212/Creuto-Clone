"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimate() {
  const pathname = usePathname();

  useEffect(() => {
    let observers: IntersectionObserver[] = [];

    function initializeAnimations() {
      // 1. Find all potential section containers on the page
      const pageWrapper = document.getElementById("moolsap-homepage") || document.body;
      
      // Select any top-level direct divs, sections or custom containers
      const possibleSections = Array.from(
        pageWrapper.querySelectorAll(
          "section, .MuiContainer-root, .MuiBox-root, [class*='CTASection'], [class*='HeroSection'], [class*='StatsSection'], [class*='ServicesSection'], [class*='WhyMoolSapSection'], [class*='CaseStudiesSection'], [class*='TestimonialsSection'], [class*='FAQSection']"
        )
      ).filter((el) => {
        // Exclude elements inside the navbar/header or footer
        if (
          el.closest("nav") || 
          el.closest(".MuiAppBar-root") || 
          el.closest("[class*='Navbar']") ||
          el.closest("footer") ||
          el.closest("[class*='Footer']") ||
          el.closest(".mui-a524gp")
        ) {
          return false;
        }
        
        // Filter out small boxes and target actual block sections
        const rect = el.getBoundingClientRect();
        return el.clientHeight > 150 || (el.querySelectorAll("h2, h3, h4, p, .MuiPaper-root").length > 1);
      });

      // Filter unique containers to avoid duplicate observes
      const sections: Element[] = [];
      possibleSections.forEach((sec) => {
        // If it's a sub-element of an already added section, skip it to prevent double animation triggers
        if (!sections.some((s) => s.contains(sec) && s !== sec)) {
          sections.push(sec);
        }
      });

      // If no high-level sections are found, fallback to all divs directly under body/pageWrapper
      if (sections.length === 0) {
        const directDivs = Array.from(pageWrapper.children).filter(
          (child) => child.tagName === "DIV" || child.tagName === "SECTION"
        );
        sections.push(...directDivs);
      }

      // 2. Scan each section and tag animatable elements
      sections.forEach((section, secIdx) => {
        // Find text elements (headings and descriptions)
        const texts = Array.from(
          section.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, .MuiTypography-h1, .MuiTypography-h2, .MuiTypography-h3, .MuiTypography-h4, .MuiTypography-h5, .MuiTypography-h6, .MuiTypography-subtitle1, p:not(.MuiTypography-body1), .MuiTypography-body1:not(li p)"
          )
        ).filter((el) => {
          // Exclude header navbar, footer and elements already inside card-like grids
          if (el.closest("nav") || el.closest(".MuiAppBar-root") || el.closest("footer") || el.closest("[class*='Footer']") || el.closest(".mui-a524gp")) return false;
          // If the element is deep inside a card/paper, we animate the card, not the individual text
          const cardParent = el.closest(".MuiPaper-root, .MuiCard-root, [class*='card'], .reveal-card");
          return !cardParent;
        });

        // Find card-like elements or lists (grid children, paper, chips, process items)
        const cards = Array.from(
          section.querySelectorAll(
            ".MuiPaper-root, .MuiCard-root, [class*='MuiGrid-grid-'], .MuiAccordion-root, .MuiChip-root, [class*='card'], [class*='Card'], .testimonial-card, .process-item, [class*='grid'] > div"
          )
        ).filter((el) => {
          if (el.closest("nav") || el.closest(".MuiAppBar-root") || el.closest("footer") || el.closest("[class*='Footer']") || el.closest(".mui-a524gp")) return false;
          // Avoid tagging nested papers (only tag the outermost card wrapper)
          const parentCard = el.parentElement?.closest(
            ".MuiPaper-root, .MuiCard-root, [class*='MuiGrid-grid-'], [class*='card']"
          );
          return !parentCard;
        });

        // 3. Mark the elements for animation
        texts.forEach((text) => {
          text.classList.add("reveal-text");
        });

        cards.forEach((card) => {
          if (pathname === "/careers") return;
          card.classList.add("reveal-card");
        });

        // 4. Create an IntersectionObserver for this section
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const container = entry.target;
                container.classList.add("is-visible");

                // Stagger texts
                const sectionTexts = container.querySelectorAll(".reveal-text");
                sectionTexts.forEach((el, idx) => {
                  const htmlEl = el as HTMLElement;
                  htmlEl.style.transitionDelay = `${idx * 80}ms`;
                  htmlEl.classList.add("active");
                });

                // Stagger cards/grid items
                const sectionCards = container.querySelectorAll(".reveal-card");
                sectionCards.forEach((el, idx) => {
                  const htmlEl = el as HTMLElement;
                  // Start card stagger after text completes
                  const delay = (sectionTexts.length * 80) + (idx * 100);
                  htmlEl.style.transitionDelay = `${delay}ms`;
                  htmlEl.classList.add("active");
                });

                // Stop observing once animated
                observer.unobserve(container);
              }
            });
          },
          {
            rootMargin: "0px 0px -8% 0px", // Trigger when 8% is visible in the viewport
            threshold: 0.02,
          }
        );

        observer.observe(section);
        observers.push(observer);
      });

    }

    // Run observer initialization after DOM paints
    const timer = setTimeout(() => {
      initializeAnimations();
    }, 300);

    return () => {
      clearTimeout(timer);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  return (
    <style dangerouslySetInnerHTML={{ __html: `
      /* --- PREMIUM SCROLL ANIMATION EFFECTS --- */
      
      .reveal-text {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) !important;
        will-change: transform, opacity;
      }
      
      .reveal-text.active {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .reveal-card {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
        transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) !important;
        will-change: transform, opacity;
      }
      
      .reveal-card.active {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }

    `}} />
  );
}
