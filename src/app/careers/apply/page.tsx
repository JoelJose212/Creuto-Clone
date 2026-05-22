"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Upload, 
  Paperclip, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Briefcase, 
  Sparkles, 
  Trash2, 
  Loader2,
  Check
} from "lucide-react"

// Country Code Configuration
const COUNTRY_CODES = [
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+44", label: "GB", flag: "🇬🇧" },
  { code: "+971", label: "AE", flag: "🇦🇪" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+1", label: "CA", flag: "🇨🇦" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+65", label: "SG", flag: "🇸🇬" },
]

// Text fields schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  countryCode: z.string().min(1, "Required"),
  phoneNumber: z.string()
    .min(6, "Phone number must be at least 6 digits")
    .regex(/^\d+$/, "Phone number must contain digits only"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Relevant Experience is required"),
  linkedinProfile: z.string()
    .url("Please enter a valid URL (starting with http:// or https://)")
    .or(z.literal(""))
    .optional(),
  whyCreuto: z.string().min(10, "Please tell us why you want to work at Creuto (at least 10 characters)"),
})

type FormValues = z.infer<typeof formSchema>

export default function ApplyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const positionParam = searchParams.get("position") || ""
  
  // File states
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [coverLetterError, setCoverLetterError] = useState<string | null>(null)
  
  // Drag and drop states
  const [isResumeDragging, setIsResumeDragging] = useState(false)
  const [isCoverDragging, setIsCoverDragging] = useState(false)
  
  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [applicationId, setApplicationId] = useState<string | null>(null)

  // Custom Country Code dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Setup form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      countryCode: "+91",
      phoneNumber: "",
      position: positionParam,
      experience: "",
      linkedinProfile: "",
      whyCreuto: "",
    }
  })

  // Ensure position value updates when positionParam changes
  useEffect(() => {
    if (positionParam) {
      setValue("position", positionParam)
    }
  }, [positionParam, setValue])

  // Handle clicking outside custom country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // File limit helper
  const validateFile = (file: File, isRequired = true): string | null => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]
    
    if (!file) {
      return isRequired ? "Resume file is required" : null
    }

    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds the 5MB limit"
    }

    const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      return "File must be in PDF or DOC/DOCX format"
    }

    return null
  }

  // Handle resume picker
  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const err = validateFile(file, true)
      setResumeError(err)
      if (!err) {
        setResumeFile(file)
      } else {
        setResumeFile(null)
      }
    }
  }

  // Handle cover letter picker
  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const err = validateFile(file, false)
      setCoverLetterError(err)
      if (!err) {
        setCoverLetterFile(file)
      } else {
        setCoverLetterFile(null)
      }
    }
  }

  // Submit Handler
  const onSubmitForm = async (data: FormValues) => {
    // Validate resume explicitly
    if (!resumeFile) {
      setResumeError("Resume file is required")
      return
    }

    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", data.fullName)
      formDataToSend.append("email", data.email)
      formDataToSend.append("mobile", `${data.countryCode} ${data.phoneNumber}`)
      formDataToSend.append("position", data.position)
      formDataToSend.append("experience", data.experience)
      if (data.linkedinProfile) {
        formDataToSend.append("linkedinProfile", data.linkedinProfile)
      }
      formDataToSend.append("whyCreuto", data.whyCreuto)
      formDataToSend.append("resume", resumeFile)
      if (coverLetterFile) {
        formDataToSend.append("coverLetter", coverLetterFile)
      }

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formDataToSend,
      })

      const responseData = await response.json()

      if (response.ok && responseData.success) {
        setSubmitSuccess(responseData.message)
        setApplicationId(responseData.applicationId)
      } else {
        setSubmitError(responseData.error || "Failed to submit application. Please try again.")
      }
    } catch (err) {
      console.error("Network error submitting application:", err)
      setSubmitError("Network error. Please check your internet connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Drag Resume events
  const handleResumeDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsResumeDragging(true)
    } else if (e.type === "dragleave") {
      setIsResumeDragging(false)
    }
  }

  const handleResumeDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResumeDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const err = validateFile(file, true)
      setResumeError(err)
      if (!err) {
        setResumeFile(file)
      } else {
        setResumeFile(null)
      }
    }
  }

  // Drag Cover Letter events
  const handleCoverDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsCoverDragging(true)
    } else if (e.type === "dragleave") {
      setIsCoverDragging(false)
    }
  }

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsCoverDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const err = validateFile(file, false)
      setCoverLetterError(err)
      if (!err) {
        setCoverLetterFile(file)
      } else {
        setCoverLetterFile(null)
      }
    }
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="w-full pt-12 md:pt-14 min-h-[calc(100vh-72px)] bg-white text-slate-800 font-bricolage relative overflow-x-hidden flex flex-col md:flex-row antialiased selection:bg-[#1d4ed8]/20 select-none">
      
      {/* LEFT COLUMN - Creuto Banner / Branding */}
      <div className="w-full md:w-[40%] bg-[#f8fafc] border-b md:border-b-0 md:border-r border-[#e5e7eb] p-8 md:p-12 lg:p-16 flex flex-col justify-between md:sticky md:top-[80px] md:h-[calc(100vh-80px)] overflow-y-auto">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Logo & Back Button */}
          <div className="flex flex-col gap-6">
            <Link 
              href="/careers" 
              className="inline-flex items-center gap-1.5 text-slate-800 hover:text-[#1d4ed8] transition-colors font-jakarta text-[24px] font-[800] tracking-[-0.03em]"
            >
              <span>Creuto</span>
              <span className="w-1.5 h-1.5 bg-[#1d4ed8] rounded-full mt-2" />
            </Link>

            <Link 
              href="/careers" 
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Job Openings</span>
            </Link>
          </div>

          {/* Heading Section */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1d4ed8]">JOIN OUR FORCE</span>
            <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight leading-[1.1] font-bricolage">
              Apply for your next role at CREUTO
            </h1>
            <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed max-w-md">
              Join a team that values ownership, clarity, and long-term thinking. We build cutting-edge adaptive AI products and premium custom systems.
            </p>
          </div>

          {/* Highlight Points */}
          <div className="flex flex-col gap-3 py-2">
            {[
              "Simple and transparent recruitment process",
              "Clear, documented growth expectations",
              "Real opportunities for rapid leadership"
            ].map((point, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#1d4ed8]/10 text-[#1d4ed8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="stroke-[3px]" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-slate-700">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Footer section inside sidebar */}
        <div className="mt-8 md:mt-0 pt-6 border-t border-[#e5e7eb] flex flex-col gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <p>© 2026 CREUTO LABS PVT. LTD.</p>
          <p className="text-[#1d4ed8]">SHIP FAST · OWN THE OUTCOME</p>
        </div>
      </div>

      {/* RIGHT COLUMN - Application Form Pane */}
      <div className="w-full md:w-[60%] bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-start overflow-y-auto">
        {!submitSuccess ? (
          <div className="max-w-xl w-full mx-auto flex flex-col gap-8">
            
            {/* Header info */}
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-bricolage">
                Application Details
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Please complete the dynamic questionnaire below. All fields marked with an asterisk (<span className="text-red-500">*</span>) are mandatory.
              </p>
            </div>

            {/* Error banner */}
            {submitError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-semibold flex items-start gap-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Submission Failed</p>
                  <p className="mt-0.5 text-red-600/90">{submitError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
              
              {/* Row 1: Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="e.g. Arisudhana Sahu"
                  {...register("fullName")}
                  className={`w-full bg-[#f8fafc] border ${errors.fullName ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold`}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Row 2: Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="e.g. arisudhana@gmail.com"
                  {...register("email")}
                  className={`w-full bg-[#f8fafc] border ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {errors.email.message}
                  </span>
                )}
              </div>

              {/* Row 3: Mobile Number & Position split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Mobile Number Container */}
                <div className="flex flex-col gap-1.5 relative">
                  <label htmlFor="phoneNumber" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  
                  <div className="flex gap-2 relative">
                    
                    {/* Custom Country Code Dropdown */}
                    <div ref={dropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="h-full bg-[#f8fafc] border border-[#e5e7eb] rounded-xl px-3 py-3 flex items-center gap-1.5 hover:bg-slate-50 transition-colors text-sm font-semibold"
                      >
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute left-0 top-full mt-1.5 w-40 max-h-56 bg-white border border-[#e5e7eb] rounded-xl shadow-lg z-50 overflow-y-auto p-1 py-1.5">
                          {COUNTRY_CODES.map((item, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(item)
                                setValue("countryCode", item.code)
                                setIsDropdownOpen(false)
                              }}
                              className="w-full px-3 py-2 flex items-center justify-between text-left hover:bg-[#f8fafc] rounded-lg transition-colors text-xs font-bold text-slate-700"
                            >
                              <div className="flex items-center gap-2">
                                <span>{item.flag}</span>
                                <span>{item.label}</span>
                              </div>
                              <span className="text-slate-400 font-semibold">{item.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Phone input */}
                    <input
                      type="tel"
                      id="phoneNumber"
                      placeholder="98765 43210"
                      {...register("phoneNumber")}
                      className={`flex-1 bg-[#f8fafc] border ${errors.phoneNumber ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.phoneNumber.message}
                    </span>
                  )}
                </div>

                {/* Position */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="position" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Job Position (Read-Only)
                  </label>
                  <input
                    type="text"
                    id="position"
                    readOnly
                    disabled
                    placeholder="e.g. MERN Stack Developer"
                    {...register("position")}
                    className="w-full bg-[#f3f4f6] border border-[#e5e7eb] rounded-xl px-4 py-3 text-slate-500 outline-none text-sm font-semibold cursor-not-allowed"
                  />
                  {errors.position && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.position.message}
                    </span>
                  )}
                </div>

              </div>

              {/* Row 4: Relevant Experience & LinkedIn */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Experience */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="experience" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Relevant Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="experience"
                    placeholder="e.g. 3 Years, 6 Months"
                    {...register("experience")}
                    className={`w-full bg-[#f8fafc] border ${errors.experience ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold`}
                  />
                  {errors.experience && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.experience.message}
                    </span>
                  )}
                </div>

                {/* LinkedIn Profile */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="linkedinProfile" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="text"
                    id="linkedinProfile"
                    placeholder="https://linkedin.com/in/username"
                    {...register("linkedinProfile")}
                    className={`w-full bg-[#f8fafc] border ${errors.linkedinProfile ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold`}
                  />
                  {errors.linkedinProfile && (
                    <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} /> {errors.linkedinProfile.message}
                    </span>
                  )}
                </div>

              </div>

              {/* Row 5: Why Creuto? */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="whyCreuto" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Why do you want to work at Creuto? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="whyCreuto"
                  rows={4}
                  placeholder="Share a short summary explaining why you'd be a great addition to the Creuto force..."
                  {...register("whyCreuto")}
                  className={`w-full bg-[#f8fafc] border ${errors.whyCreuto ? 'border-red-500 focus:ring-red-100' : 'border-[#e5e7eb] focus:border-[#1d4ed8] focus:ring-blue-100'} rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:ring-4 transition-all text-sm font-semibold resize-none`}
                />
                {errors.whyCreuto && (
                  <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {errors.whyCreuto.message}
                  </span>
                )}
              </div>

              {/* Row 6: Upload Resume Widget */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Upload Resume (PDF/DOC) <span className="text-red-500">*</span>
                </span>
                
                <div
                  onDragEnter={handleResumeDrag}
                  onDragOver={handleResumeDrag}
                  onDragLeave={handleResumeDrag}
                  onDrop={handleResumeDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 flex items-center justify-between transition-all ${
                    isResumeDragging 
                      ? 'border-[#1d4ed8] bg-blue-50/30' 
                      : resumeError 
                        ? 'border-red-300 bg-red-50/10' 
                        : 'border-[#e5e7eb] bg-[#f8fafc] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${resumeError ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#1d4ed8]'}`}>
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col">
                      {resumeFile ? (
                        <>
                          <span className="text-xs font-bold text-slate-900 max-w-[200px] truncate">{resumeFile.name}</span>
                          <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{formatBytes(resumeFile.size)}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-slate-700">Add Resume File</span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-0.5">PDF or Word doc up to 5MB</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {resumeFile ? (
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <label className="cursor-pointer px-4 py-2 bg-white border border-[#e5e7eb] hover:border-slate-400 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm">
                        Browse
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleResumeChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                {resumeError && (
                  <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {resumeError}
                  </span>
                )}
              </div>

              {/* Row 7: Upload Cover Letter Widget */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Cover Letter (Optional)
                </span>
                
                <div
                  onDragEnter={handleCoverDrag}
                  onDragOver={handleCoverDrag}
                  onDragLeave={handleCoverDrag}
                  onDrop={handleCoverDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 flex items-center justify-between transition-all ${
                    isCoverDragging 
                      ? 'border-[#1d4ed8] bg-blue-50/30' 
                      : coverLetterError 
                        ? 'border-red-300 bg-red-50/10' 
                        : 'border-[#e5e7eb] bg-[#f8fafc] hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${coverLetterError ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                      <Paperclip size={18} />
                    </div>
                    <div className="flex flex-col">
                      {coverLetterFile ? (
                        <>
                          <span className="text-xs font-bold text-slate-900 max-w-[200px] truncate">{coverLetterFile.name}</span>
                          <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{formatBytes(coverLetterFile.size)}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-slate-700">Add Cover Letter</span>
                          <span className="text-[10px] font-semibold text-slate-400 mt-0.5">PDF or Word doc up to 5MB</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {coverLetterFile ? (
                      <button
                        type="button"
                        onClick={() => setCoverLetterFile(null)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      <label className="cursor-pointer px-4 py-2 bg-white border border-[#e5e7eb] hover:border-slate-400 rounded-xl text-xs font-bold text-slate-700 transition-colors shadow-sm">
                        Browse
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCoverLetterChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                {coverLetterError && (
                  <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={12} /> {coverLetterError}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative mt-4 py-3.5 px-6 bg-[#1d4ed8] hover:bg-[#1746ea] disabled:bg-[#1d4ed8]/60 text-white font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-blue-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 text-white" />
                    <span>Submitting Credentials...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
              
            </form>
          </div>
        ) : (
          /* SUCCESS RESPONSE CARD */
          <div className="max-w-md w-full mx-auto flex flex-col items-center justify-center text-center py-12">
            
            {/* Animated Success Badge */}
            <div className="w-20 h-20 bg-[#1d4ed8]/10 border border-[#1d4ed8]/20 rounded-full flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent animate-pulse" />
              <CheckCircle2 className="h-10 w-10 text-[#1d4ed8]" />
            </div>

            {/* Header Success Text */}
            <h2 className="text-3xl font-extrabold text-[#1d4ed8] tracking-tight mb-2">
              Application Submitted!
            </h2>
            
            {/* Application reference code */}
            <div className="mt-1 mb-6 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Candidate ID Reference</span>
              <span className="text-slate-800 font-mono font-bold bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-sm select-all">
                {applicationId}
              </span>
            </div>

            {/* API response summary text */}
            <div className="bg-[#f8fafc] border border-[#e5e7eb] rounded-2xl p-5 md:p-6 text-slate-600 text-xs md:text-sm font-semibold leading-relaxed mb-8 max-w-sm">
              {submitSuccess}
            </div>

            {/* Navigation options */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => router.push("/careers")}
                className="flex-1 py-3 px-6 bg-[#1d4ed8] hover:bg-[#1746ea] text-white rounded-xl text-xs font-bold tracking-wide transition-all shadow-sm text-center"
              >
                Back to Careers
              </button>
              <button
                onClick={() => {
                  setSubmitSuccess(null)
                  setApplicationId(null)
                  setResumeFile(null)
                  setCoverLetterFile(null)
                }}
                className="flex-1 py-3 px-6 bg-white border border-[#e5e7eb] hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold tracking-wide transition-all text-center"
              >
                Apply for Another Role
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
