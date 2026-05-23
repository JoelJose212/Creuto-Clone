"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CareersDetailHydrationProps {
  html: string
  roleTitle: string
}

export default function CareersDetailHydration({ html, roleTitle }: CareersDetailHydrationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    portfolio: "",
    resume: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  // Capture clicking static "Apply Now" buttons
  useEffect(() => {
    const handleApplyClick = (e: Event) => {
      // Find buttons/anchors with "Apply Now" or links targeting careers/apply.html
      const target = e.target as HTMLElement
      const isApplyButton = 
        target.textContent?.trim().toLowerCase() === "apply now" ||
        target.closest("a")?.getAttribute("href")?.includes("apply.html") ||
        target.closest("button")?.textContent?.trim().toLowerCase() === "apply now"

      if (isApplyButton) {
        e.preventDefault()
        e.stopPropagation()
        setIsModalOpen(true)
      }
    }

    document.addEventListener("click", handleApplyClick, true)
    return () => document.removeEventListener("click", handleApplyClick, true)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev }
        delete copy[name]
        return copy
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "Full Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address"
    }
    if (!formData.resume.trim()) {
      errors.resume = "Resume link (Google Drive / Dropbox / OneDrive) is required"
    } else if (!formData.resume.startsWith("http://") && !formData.resume.startsWith("https://")) {
      errors.resume = "Resume must be a valid HTTP/HTTPS link"
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          role: roleTitle,
        }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        setSubmitSuccess(data.message)
        setApplicationId(data.applicationId)
        setFormData({
          name: "",
          email: "",
          mobile: "",
          portfolio: "",
          resume: "",
          message: "",
        })
      } else {
        setFormErrors({ form: data.error || "Failed to submit application. Please try again." })
      }
    } catch {
      setFormErrors({ form: "Network error. Please check your connection and try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    if (isSubmitting) return
    setIsModalOpen(false)
    setSubmitSuccess(null)
    setApplicationId(null)
    setFormErrors({})
  }

  return (
    <>
      {/* Dangerously render the unlayered static MUI job description */}
      <div dangerouslySetInnerHTML={{ __html: html }} />

      {/* Candidates Talent Application Overlay Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Glassmorphic Form Card */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-xl bg-slate-950/90 border border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col"
              style={{
                boxShadow: "0 0 40px rgba(23, 70, 234, 0.15)",
                fontFamily: "var(--font-bricolage), 'Bricolage Grotesque', sans-serif"
              }}
            >
              {/* Top ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 height-1 bg-blue-600/30 blur-2xl rounded-full" />

              {/* Close Button */}
              <button
                onClick={closeModal}
                disabled={isSubmitting}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800/60 transition-colors text-slate-400 hover:text-white"
                aria-label="Close form"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!submitSuccess ? (
                <>
                  {/* Form Header */}
                  <div className="mb-6 flex-shrink-0">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-white bg-clip-text text-transparent">
                      Join Our Team
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base mt-1">
                      Applying for <span className="text-blue-400 font-semibold">{roleTitle}</span>
                    </p>
                  </div>

                  {/* Form Body - Scrollable if screen is small */}
                  <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1 flex-1">
                    {formErrors.form && (
                      <div className="p-3 bg-red-950/60 border border-red-800/50 rounded-xl text-red-300 text-xs font-semibold">
                        {formErrors.form}
                      </div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Arisudhana Sahu"
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900/60 border ${formErrors.name ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm`}
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-xs mt-1 font-medium">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email and Mobile split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. arisudhana@gmail.com"
                          disabled={isSubmitting}
                          className={`w-full bg-slate-900/60 border ${formErrors.email ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm`}
                        />
                        {formErrors.email && (
                          <p className="text-red-400 text-xs mt-1 font-medium">{formErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="mobile" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          id="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          disabled={isSubmitting}
                          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm"
                        />
                      </div>
                    </div>

                    {/* Resume / CV Link */}
                    <div>
                      <label htmlFor="resume" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Resume Link (Drive/Dropbox/PDF) <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="url"
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/..."
                        disabled={isSubmitting}
                        className={`w-full bg-slate-900/60 border ${formErrors.resume ? 'border-red-500' : 'border-slate-800'} rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm`}
                      />
                      <p className="text-slate-500 text-[10px] mt-1">Please provide a shared viewable link (e.g. from Google Drive, Dropbox, or OneDrive).</p>
                      {formErrors.resume && (
                        <p className="text-red-400 text-xs mt-1 font-medium">{formErrors.resume}</p>
                      )}
                    </div>

                    {/* Portfolio / LinkedIn Link */}
                    <div>
                      <label htmlFor="portfolio" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Portfolio or LinkedIn Link
                      </label>
                      <input
                        type="url"
                        id="portfolio"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        placeholder="https://linkedin.com/in/..."
                        disabled={isSubmitting}
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm"
                      />
                    </div>

                    {/* Cover Note / message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Cover Note / Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us why you want to join Aanandi..."
                        disabled={isSubmitting}
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500/80 transition-all text-sm resize-none"
                      />
                    </div>

                    {/* Submit Section */}
                    <div className="pt-4 flex-shrink-0">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full relative py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-blue-800 disabled:to-indigo-800 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-blue-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Submitting Credentials...</span>
                          </>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Dynamic Success Card Overlay */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-8 flex-1"
                >
                  {/* Animated success badge icon */}
                  <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/30 rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent animate-pulse" />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-blue-400 tracking-tight mb-2">
                    Application Submitted!
                  </h2>
                  <p className="text-slate-400 font-medium text-xs md:text-sm tracking-wide uppercase mb-4">
                    Candidate Code: <span className="text-white font-mono bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">{applicationId}</span>
                  </p>

                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 md:p-6 text-slate-300 text-sm max-w-md mb-6 leading-relaxed">
                    {submitSuccess}
                  </div>

                  <button
                    onClick={closeModal}
                    className="py-3 px-8 bg-slate-900 border border-slate-800 hover:bg-slate-800/60 hover:text-white rounded-xl text-sm font-semibold tracking-wide transition-all"
                  >
                    Return to Job Requirements
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
