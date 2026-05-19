"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimate() {
  const pathname = usePathname();

  useEffect(() => {
    let observers: IntersectionObserver[] = [];

    function initializeAnimations() {
      // 1. Find all potential section containers on the page
      const pageWrapper = document.getElementById("creuto-homepage") || document.body;
      
      // Select any top-level direct divs, sections or custom containers
      const possibleSections = Array.from(
        pageWrapper.querySelectorAll(
          "section, .MuiContainer-root, .MuiBox-root, [class*='CTASection'], [class*='HeroSection'], [class*='StatsSection'], [class*='ServicesSection'], [class*='WhyCreutoSection'], [class*='CaseStudiesSection'], [class*='TestimonialsSection'], [class*='FAQSection']"
        )
      ).filter((el) => {
        // Exclude elements inside the navbar/header
        if (el.closest("nav") || el.closest(".MuiAppBar-root") || el.closest("[class*='Navbar']")) {
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
          // Exclude header navbar and elements already inside card-like grids
          if (el.closest("nav") || el.closest(".MuiAppBar-root")) return false;
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
          if (el.closest("nav") || el.closest(".MuiAppBar-root")) return false;
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

      // 5. Setup Interactive Accordion Toggling for all FAQs
      setupFAQs();

      function setupFAQs() {
        const faqContainer = document.querySelector(".MuiContainer-root.mui-17mtwhi");
        if (!faqContainer) return;

        const accordions = faqContainer.querySelectorAll(".MuiAccordion-root");
        accordions.forEach((accordion) => {
          const headerButton = accordion.querySelector(".MuiAccordionSummary-root");
          const collapseDiv = accordion.querySelector(".MuiCollapse-root") as HTMLElement;
          const iconWrapper = accordion.querySelector(".MuiAccordionSummary-expandIconWrapper") as HTMLElement;

          if (!headerButton || !collapseDiv) return;

          // Clone the button to cleanly purge any stale static event listeners
          const newButton = headerButton.cloneNode(true) as HTMLElement;
          headerButton.parentNode?.replaceChild(newButton, headerButton);

          newButton.addEventListener("click", (e) => {
            e.preventDefault();
            const isExpanded = newButton.getAttribute("aria-expanded") === "true";

            // Collapse all other siblings
            if (!isExpanded) {
              accordions.forEach((sibling) => {
                sibling.classList.remove("Mui-expanded");
                const sibButton = sibling.querySelector(".MuiAccordionSummary-root");
                const sibCollapse = sibling.querySelector(".MuiCollapse-root") as HTMLElement;
                const sibIcon = sibling.querySelector(".MuiAccordionSummary-expandIconWrapper") as HTMLElement;
                if (sibButton && sibCollapse && sibButton !== newButton) {
                  sibButton.setAttribute("aria-expanded", "false");
                  sibButton.classList.remove("Mui-expanded");
                  sibCollapse.style.height = "0px";
                  sibCollapse.style.visibility = "hidden";
                  sibCollapse.classList.remove("MuiCollapse-entered");
                  sibCollapse.classList.add("MuiCollapse-hidden");
                  sibCollapse.classList.add("mui-abqyn");
                  if (sibIcon) sibIcon.style.transform = "rotate(0deg)";
                }
              });
            }

            // Toggle current Accordion item
            if (isExpanded) {
              accordion.classList.remove("Mui-expanded");
              newButton.setAttribute("aria-expanded", "false");
              newButton.classList.remove("Mui-expanded");
              collapseDiv.style.height = "0px";
              collapseDiv.style.visibility = "hidden";
              collapseDiv.classList.remove("MuiCollapse-entered");
              collapseDiv.classList.add("MuiCollapse-hidden");
              collapseDiv.classList.add("mui-abqyn");
              if (iconWrapper) iconWrapper.style.transform = "rotate(0deg)";
            } else {
              accordion.classList.add("Mui-expanded");
              newButton.setAttribute("aria-expanded", "true");
              newButton.classList.add("Mui-expanded");
              collapseDiv.classList.remove("MuiCollapse-hidden");
              collapseDiv.classList.add("MuiCollapse-entered");
              collapseDiv.classList.remove("mui-abqyn");
              collapseDiv.style.visibility = "visible";

              const wrapperInner = collapseDiv.querySelector(".MuiCollapse-wrapperInner") as HTMLElement;
              const height = wrapperInner ? `${wrapperInner.offsetHeight}px` : "auto";
              collapseDiv.style.height = height;
              if (iconWrapper) iconWrapper.style.transform = "rotate(45deg)";
            }
          });
        });
      }
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
        opacity: 0 !important;
        transform: translateY(24px) !important;
        transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) !important;
        will-change: transform, opacity;
      }
      
      .reveal-text.active {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .reveal-card {
        opacity: 0 !important;
        transform: translateY(40px) scale(0.96) !important;
        transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) !important;
        will-change: transform, opacity;
      }
      
      .reveal-card.active {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }

      /* --- PREMIUM FAQ COLLAPSE ANIMATIONS --- */
      
      .MuiCollapse-root {
        transition: height 350ms cubic-bezier(0.4, 0, 0.2, 1) !important;
        overflow: hidden !important;
      }
      
      .MuiAccordionSummary-expandIconWrapper {
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;
        transform-origin: center center;
      }
    `}} />
  );
}
