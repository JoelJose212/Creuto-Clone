"use client"

import { useEffect } from "react"

interface ContactHydrationProps {
  processedHtml: string
  styles: string[]
  unlayeredInlineStyles: string[]
}

export default function ContactHydration({
  processedHtml,
  styles,
  unlayeredInlineStyles,
}: ContactHydrationProps) {
  useEffect(() => {
    // 1. Locate all dynamic form inputs in the DOM
    const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
    const mobileInput = document.querySelector('input[name="mobile"]') as HTMLInputElement
    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
    const companyInput = document.querySelector('input[name="company"]') as HTMLInputElement
    const messageInput = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement
    const submitBtn = document.querySelector('button.mui-q5js2p') as HTMLButtonElement
    const formCard = document.querySelector('div.mui-1glgfi8') as HTMLDivElement

    if (!submitBtn || !formCard) {
      console.warn("Could not find dynamic contact submit button or form card.")
      return
    }

    // 2. State-like variables in effect scope to track selections
    let selectedServices: string[] = ["AI/ML"] // AI/ML starts as selected based on mui-gmzzbb class

    // 3. Set up interactive service chip click listeners
    const chipsStack = document.querySelector('.mui-194t1mp')
    if (chipsStack) {
      const chips = Array.from(chipsStack.children) as HTMLDivElement[]
      chips.forEach((chip) => {
        // Initialize from pre-rendered states
        const serviceText = chip.textContent || ""
        if (chip.classList.contains("mui-gmzzbb") && !selectedServices.includes(serviceText)) {
          selectedServices.push(serviceText)
        }

        chip.style.cursor = "pointer"
        chip.addEventListener("click", () => {
          const text = chip.textContent || ""
          if (chip.classList.contains("mui-gmzzbb")) {
            // Toggle inactive
            chip.classList.remove("mui-gmzzbb")
            chip.classList.add("mui-1n7ygct")
            selectedServices = selectedServices.filter((s) => s !== text)
          } else {
            // Toggle active
            chip.classList.remove("mui-1n7ygct")
            chip.classList.add("mui-gmzzbb")
            if (!selectedServices.includes(text)) {
              selectedServices.push(text)
            }
          }
        })
      })
    }

    // 4. Set up Submit interception logic
    submitBtn.addEventListener("click", async () => {
      const name = nameInput ? nameInput.value.trim() : ""
      const mobile = mobileInput ? mobileInput.value.trim() : ""
      const email = emailInput ? emailInput.value.trim() : ""
      const company = companyInput ? companyInput.value.trim() : ""
      const message = messageInput ? messageInput.value.trim() : ""

      // Client validation
      let hasError = false

      if (!name) {
        if (nameInput) nameInput.style.borderColor = "red"
        hasError = true
      } else {
        if (nameInput) nameInput.style.borderColor = ""
      }

      if (!email || !email.includes("@")) {
        if (emailInput) emailInput.style.borderColor = "red"
        hasError = true
      } else {
        if (emailInput) emailInput.style.borderColor = ""
      }

      if (!message) {
        if (messageInput) messageInput.style.borderColor = "red"
        hasError = true
      } else {
        if (messageInput) messageInput.style.borderColor = ""
      }

      if (hasError) {
        alert("Please fill in all required fields marked with * and provide a valid email.")
        return
      }

      // Enter submitting state
      submitBtn.disabled = true
      submitBtn.textContent = "Sending inquiry..."
      submitBtn.style.opacity = "0.7"
      if (nameInput) nameInput.disabled = true
      if (mobileInput) mobileInput.disabled = true
      if (emailInput) emailInput.disabled = true
      if (companyInput) companyInput.disabled = true
      if (messageInput) messageInput.disabled = true

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            mobile,
            email,
            company,
            message,
            services: selectedServices,
          }),
        })

        const result = await response.json()

        if (result.success) {
          // Trigger dynamic success card transition with smooth CSS fade-in
          formCard.style.transition = "opacity 0.3s ease"
          formCard.style.opacity = "0"
          
          setTimeout(() => {
            formCard.innerHTML = `
              <div style="text-align: center; padding: 40px 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
                <!-- Success Animated Badge -->
                <div style="width: 80px; height: 80px; background: rgba(37,99,235,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 class="MuiTypography-root MuiTypography-h4 mui-kkj52s" style="margin-bottom: 4px; font-weight: 700; color: #1e293b;">Inquiry Received!</h2>
                <p class="MuiTypography-root MuiTypography-h6 mui-15a5wks" style="margin-bottom: 24px; color: #475569; font-size: 1.05rem; line-height: 1.6;">
                  Thank you, <strong>${name}</strong>! Sanjana and our product leadership team have received your request and will get in touch with you shortly.
                </p>
                <div style="width: 100%; border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: left;">
                  <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; font-weight: 600;">Submitted Leads Details</p>
                  <div style="background: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; display: flex; flex-direction: column; gap: 10px;">
                    <p style="font-size: 0.95rem; color: #334155; margin: 0;"><strong>Email:</strong> <span style="color:#1e293b">${email}</span></p>
                    <p style="font-size: 0.95rem; color: #334155; margin: 0;"><strong>Company:</strong> <span style="color:#1e293b">${company || "N/A"}</span></p>
                    <p style="font-size: 0.95rem; color: #334155; margin: 0;"><strong>Selected Services:</strong> <span style="color: #1d4ed8; font-weight: 600;">${selectedServices.join(", ")}</span></p>
                  </div>
                </div>
              </div>
            `
            formCard.style.opacity = "1"
          }, 300)
        } else {
          alert(result.error || "Failed to submit inquiry. Please try again.")
          resetSubmitState()
        }
      } catch (err) {
        console.error("Error submitting contact inquiry:", err)
        alert("An unexpected network error occurred. Please try again.")
        resetSubmitState()
      }
    })

    function resetSubmitState() {
      submitBtn.disabled = false
      submitBtn.textContent = "Submit"
      submitBtn.style.opacity = "1"
      if (nameInput) nameInput.disabled = false
      if (mobileInput) mobileInput.disabled = false
      if (emailInput) emailInput.disabled = false
      if (companyInput) companyInput.disabled = false
      if (messageInput) messageInput.disabled = false
    }
  }, [])

  return (
    <>
      {/* Load original compiled CSS stylesheets */}
      {styles.map((href, index) => {
        const processedHref = href.replace(/_next\//g, "cloned_next/")
        const absoluteHref = processedHref.startsWith("/") ? processedHref : `/${processedHref}`
        return <link key={index} rel="stylesheet" href={absoluteHref} />
      })}

      {/* Inject Emotion/MUI global and local inline styling layers */}
      {unlayeredInlineStyles.map((unlayeredCss, index) => (
        <style
          key={`inline-${index}`}
          dangerouslySetInnerHTML={{ __html: unlayeredCss }}
        />
      ))}

      {/* Enforce correct Bricolage Grotesque font family */}
      <style dangerouslySetInnerHTML={{ __html: `
        #aanandi-contact-cloned-page,
        #aanandi-contact-cloned-page h1,
        #aanandi-contact-cloned-page h2,
        #aanandi-contact-cloned-page h3,
        #aanandi-contact-cloned-page h4,
        #aanandi-contact-cloned-page h5,
        #aanandi-contact-cloned-page h6,
        #aanandi-contact-cloned-page p,
        #aanandi-contact-cloned-page span,
        #aanandi-contact-cloned-page li,
        #aanandi-contact-cloned-page a,
        #aanandi-contact-cloned-page button,
        #aanandi-contact-cloned-page label,
        #aanandi-contact-cloned-page div,
        #aanandi-contact-cloned-page .MuiTypography-root {
          font-family: var(--font-bricolage), 'Bricolage Grotesque', sans-serif !important;
        }
      `}} />

      {/* Render the beautifully processed page body inside a scoped container */}
      <div id="aanandi-contact-cloned-page" dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </>
  )
}
