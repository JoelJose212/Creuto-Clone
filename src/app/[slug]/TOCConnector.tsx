"use client";

import { useEffect } from "react";

interface TOCConnectorProps {
  slug: string;
}

export default function TOCConnector({ slug }: TOCConnectorProps) {
  useEffect(() => {
    // 1. Locate the Table of Contents container and list
    const tocContainer = document.querySelector(".mui-rjqn30");
    if (!tocContainer) return;

    const tocUl = tocContainer.querySelector("ul");
    if (!tocUl) return;

    // 2. Locate the main article content container
    const articleBody = document.querySelector(".mui-1uz8ey3");
    if (!articleBody) return;

    // 3. Check and Parse Markdown if it's raw markdown text (as in CustomsoftwareRoi / SoftwarePartner)
    const rawText = articleBody.innerHTML || "";
    if (rawText.includes("## ") || rawText.includes("### ")) {
      const mdText = articleBody.textContent || "";
      const lines = mdText.split("\n");
      
      let htmlResult = "";
      let inList = false;
      let headingIndex = 0;
      
      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          return;
        }
        
        // Parse Headings
        if (trimmed.startsWith("## ")) {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          const text = trimmed.substring(3).trim();
          htmlResult += `<h2 id="${headingIndex++}">${text}</h2>`;
        } else if (trimmed.startsWith("### ")) {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          const text = trimmed.substring(4).trim();
          htmlResult += `<h3 id="sub-${headingIndex++}">${text}</h3>`;
        } else if (trimmed.startsWith("# ")) {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          const text = trimmed.substring(2).trim();
          htmlResult += `<h1>${text}</h1>`;
        } 
        // Parse Lists
        else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          if (!inList) {
            htmlResult += '<ul style="margin-left: 20px; list-style-type: disc;">';
            inList = true;
          }
          const text = trimmed.substring(2).trim();
          htmlResult += `<li>${text}</li>`;
        }
        // Parse Blockquotes
        else if (trimmed.startsWith("> ")) {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          const text = trimmed.substring(2).trim();
          htmlResult += `<blockquote style="border-left: 4px solid #1746EA; padding-left: 16px; margin: 16px 0; font-style: italic; color: #4A5568;"><p>${text}</p></blockquote>`;
        }
        // Normal Paragraph
        else {
          if (inList) {
            htmlResult += "</ul>";
            inList = false;
          }
          htmlResult += `<p style="margin-bottom: 16px; line-height: 1.6; color: #2D3748;">${trimmed}</p>`;
        }
      });
      
      if (inList) {
        htmlResult += "</ul>";
      }
      
      // Inline formatting (Bold, Italic)
      htmlResult = htmlResult.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      htmlResult = htmlResult.replace(/\*([^*]+)\*/g, "<em>$1</em>");
      
      // Replace with beautiful compiled HTML
      articleBody.innerHTML = htmlResult;
    }

    // 4. Retrieve all headings in the article body (which now all have standard tags and IDs)
    const headings = Array.from(articleBody.querySelectorAll("h2"));
    
    // 5. Check and dynamically populate the Table of Contents if it's empty
    let tocItems = Array.from(tocUl.querySelectorAll("li"));
    
    if (tocItems.length === 0 && headings.length > 0) {
      // Clear empty list
      tocUl.innerHTML = "";
      
      headings.forEach((heading, index) => {
        // Assign ID to heading if not present
        if (!heading.id) {
          heading.id = String(index);
        }
        
        // Create matching TOC link item
        const li = document.createElement("li");
        li.className = "MuiTypography-root MuiTypography-body1 mui-i45ggw";
        li.textContent = heading.textContent || "";
        tocUl.appendChild(li);
      });
      
      // Re-query items
      tocItems = Array.from(tocUl.querySelectorAll("li"));
    } else {
      // For existing static lists, ensure all headings are aligned with IDs 0, 1, 2...
      headings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = String(index);
        }
      });
    }

    // 6. Bind scroll click event listeners to the TOC list items
    tocItems.forEach((li, index) => {
      const heading = headings[index];
      if (!heading) return;

      const element = li as HTMLElement;
      element.style.cursor = "pointer";
      
      element.onclick = (e) => {
        e.preventDefault();
        
        const target = document.getElementById(heading.id);
        if (target) {
          const offset = 140; // clearance offset for dynamic top navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };
    });
  }, [slug]);

  return null;
}
