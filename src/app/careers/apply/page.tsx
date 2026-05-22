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

import AnnouncementBanner from "@/components/layout/AnnouncementBanner"
import "../careersPageStyles.css"

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
    <>
      <div id="creuto-careers-cloned-page">
        <AnnouncementBanner />
        <div className="MuiBox-root mui-143ljvh">
          <div className="MuiContainer-root MuiContainer-maxWidthXl mui-1fgd3v5">
            <div className="MuiBox-root mui-1lekzkb">
              <a aria-label="Go to homepage" style={{"position":"relative","display":"flex","alignItems":"center"} as any} href="/index">
                <svg width="109" height="30" viewBox="0 0 109 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.3578 29.9979C9.06659 29.9979 7.06739 29.5255 5.36239 28.5829C3.65739 27.6381 2.33797 26.3011 1.40189 24.5697C0.46581 22.8382 0 20.8082 0 18.4796C0 16.151 0.468039 14.0988 1.40189 12.3763C2.33574 10.6538 3.65739 9.31899 5.36239 8.37641C7.06739 7.4316 9.06436 6.96143 11.3578 6.96143C13.2277 6.96143 14.8859 7.28676 16.3346 7.93743C17.7833 8.5881 18.9645 9.51732 19.8828 10.7273C20.7988 11.9373 21.376 13.3857 21.6145 15.0725H16.2254C16.0426 13.9539 15.5144 13.0849 14.6452 12.4609C13.7737 11.837 12.6794 11.525 11.36 11.525C9.45216 11.525 7.94552 12.1401 6.8356 13.3679C5.72568 14.5957 5.17295 16.3003 5.17295 18.4819C5.17295 20.6634 5.72791 22.3681 6.8356 23.5959C7.94552 24.8237 9.45216 25.4387 11.36 25.4387C12.6794 25.4387 13.776 25.1267 14.6452 24.5028C15.5166 23.8811 16.0426 23.0098 16.2254 21.8912H21.6145C21.376 23.5602 20.7988 25.0019 19.8828 26.2208C18.9667 27.4397 17.7833 28.3756 16.3346 29.0241C14.8859 29.6747 13.2277 30.0001 11.3578 30.0001V29.9979Z" fill="#1E293B"></path>
                  <path d="M26.0232 29.5589V18.0118H23.5493V13.0626H28.6086V16.3628H29.7631C30.1843 15.1706 30.873 14.286 31.8247 13.7089C32.7786 13.1317 33.8417 12.842 35.014 12.842H36.4159V17.2408H34.7934C33.4361 17.2408 32.4599 17.6173 31.8648 18.3683C31.2697 19.1192 30.9711 20.0997 30.9711 21.3097V29.5589H26.021H26.0232Z" fill="#1E293B"></path>
                  <path d="M45.9325 29.8883C44.1183 29.8883 42.5403 29.5362 41.2031 28.8298C39.8636 28.1235 38.8339 27.1252 38.1096 25.8328C37.3852 24.5403 37.0242 23.0139 37.0242 21.2558C37.0242 19.4976 37.3763 17.9801 38.0828 16.7055C38.7893 15.4309 39.7967 14.4505 41.1073 13.7641C42.4178 13.0778 43.9623 12.7324 45.7408 12.7324C47.5194 12.7324 49.0127 13.0667 50.2786 13.7352C51.5445 14.4037 52.5096 15.3618 53.1804 16.6075C53.8491 17.8531 54.1834 19.3483 54.1834 21.0886V22.7109H41.8918C42.0924 23.7738 42.5337 24.576 43.2112 25.1175C43.8887 25.6589 44.7869 25.9286 45.9058 25.9286C46.804 25.9286 47.506 25.786 48.0097 25.503C48.5134 25.22 48.8767 24.7654 49.0951 24.1414H54.1544C53.8067 25.9375 52.9085 27.3458 51.4598 28.3619C50.0111 29.378 48.168 29.8883 45.9325 29.8883ZM41.972 19.4129H49.3425C49.1776 18.4971 48.7965 17.813 48.2014 17.3651C47.6063 16.9172 46.795 16.6922 45.7676 16.6922C44.7401 16.6922 43.9333 16.9217 43.2937 17.3785C42.6518 17.8375 42.2127 18.5149 41.9742 19.4129H41.972Z" fill="#1E293B"></path>
                  <path d="M63.7248 29.8619C61.36 29.8619 59.5637 29.2535 58.3356 28.0324C57.1076 26.8135 56.4924 25.1512 56.4924 23.0432V13.0625H61.5517V22.0538C61.5517 23.1724 61.8303 24.0014 62.3897 24.5428C62.9491 25.0843 63.7961 25.3539 64.9327 25.3539C66.0694 25.3539 67.0322 25.0554 67.654 24.4604C68.2759 23.8654 68.5901 23.0075 68.5901 21.8889V13.0625H73.6494V24.6097H76.1256V29.5588H71.0663V26.809H69.9118C69.2342 27.7984 68.4274 28.5538 67.4914 29.0775C66.5553 29.5989 65.3005 29.8619 63.7248 29.8619Z" fill="#1E293B"></path>
                  <path d="M83.9639 29.5587C82.6801 29.5587 81.6861 29.2334 80.9796 28.5827C80.2731 27.932 79.9209 26.9382 79.9209 25.599V17.0199H77.1707V13.0602H79.9767V8.11108H84.9267V13.0602H88.5574V17.0199H84.9824V25.599H88.943V29.5587H83.9661H83.9639Z" fill="#1E293B"></path>
                  <path d="M99.3912 29.8881C97.5769 29.8881 95.9901 29.536 94.6328 28.8296C93.2754 28.1233 92.2257 27.125 91.4835 25.8325C90.7413 24.5401 90.3691 23.0248 90.3691 21.2823C90.3691 19.5397 90.7413 18.0289 91.4835 16.7454C92.2257 15.4619 93.2754 14.4725 94.6328 13.7751C95.9901 13.0798 97.5836 12.73 99.4179 12.73C101.252 12.73 102.832 13.0776 104.161 13.7751C105.489 14.4725 106.521 15.4619 107.254 16.7454C107.987 18.0289 108.355 19.5509 108.355 21.309C108.355 23.0672 107.987 24.5668 107.254 25.8593C106.521 27.1517 105.485 28.1455 104.147 28.843C102.81 29.5405 101.223 29.8881 99.3889 29.8881H99.3912ZM99.3912 25.4894C100.657 25.4894 101.622 25.1083 102.293 24.3485C102.962 23.5886 103.296 22.5658 103.296 21.2823C103.296 19.9988 102.962 18.9871 102.293 18.2451C101.624 17.5031 100.657 17.1309 99.3912 17.1309C98.1252 17.1309 97.1267 17.5031 96.4492 18.2451C95.7717 18.9871 95.4306 20.001 95.4306 21.2823C95.4306 22.5636 95.7694 23.5886 96.4492 24.3485C97.1267 25.1083 98.1074 25.4894 99.3912 25.4894Z" fill="#1E293B"></path>
                  <path d="M22.4841 8.39396C20.6187 6.2815 18.225 4.637 15.5037 3.67214C14.7281 3.39582 14.7503 2.29503 15.5393 2.05883L22.3549 0.0355093C22.8742 -0.118245 23.4024 0.244972 23.4425 0.784227L23.9685 7.77225C24.0287 8.58559 23.0257 9.00452 22.4864 8.39396H22.4841Z" fill="#1D4ED8"></path>
                </svg>
              </a>
              <button className="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium mui-4q58yh" tabIndex={0} type="button" aria-label="open close menu">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                  <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z" fill="#1E293B"></path>
                </svg>
              </button>
              <ul className="MuiBox-root mui-sasvsa">
                <li className="MuiBox-root mui-0">
                  <a style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/ai">
                    <span style={{"position":"relative","display":"inline-flex","alignItems":"center"} as any}>
                      <p className="MuiTypography-root MuiTypography-body1 mui-v6rkzo">Creuto</p>
                      <div className="MuiBox-root mui-1itv5e3">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{"display":"inline-block","verticalAlign":"middle"} as any}>
                          <path d="M1.17211 12C0.843566 12 0.563857 11.8762 0.332986 11.6286C0.110995 11.381 0 11.081 0 10.7286C0 10.3762 0.110995 10.0762 0.332986 9.82857C0.563857 9.58095 0.843566 9.45714 1.17211 9.45714C1.50066 9.45714 1.78037 9.58095 2.01124 9.82857C2.24211 10.0762 2.35754 10.3762 2.35754 10.7286C2.35754 11.081 2.24211 11.381 2.01124 11.6286C1.78037 11.8762 1.50066 12 1.17211 12Z" fill="#1746EA"></path>
                          <path d="M6.32549 11.9857C5.41089 11.9857 4.6872 11.7429 4.15442 11.2571C3.63052 10.7714 3.36857 10.1333 3.36857 9.34286C3.36857 8.51429 3.63496 7.87143 4.16774 7.41429C4.70052 6.95714 5.46417 6.72857 6.45869 6.72857H8.98939V6.37143C8.98939 5.22857 8.38557 4.65714 7.17794 4.65714C6.15678 4.65714 5.54409 5.05238 5.33985 5.84286H3.52841C3.67936 4.95714 4.07007 4.27619 4.70052 3.8C5.33985 3.32381 6.1701 3.08571 7.19126 3.08571C8.33673 3.08571 9.21138 3.37143 9.81519 3.94286C10.419 4.50476 10.7209 5.32381 10.7209 6.4V9.87143H11.5867V11.8286H9.70864V10.4714H9.14922C8.87395 10.9476 8.50101 11.319 8.03038 11.5857C7.55976 11.8524 6.99147 11.9857 6.32549 11.9857ZM6.59188 10.4714C7.04475 10.4714 7.45321 10.3762 7.81727 10.1857C8.18134 9.99524 8.46549 9.74286 8.66972 9.42857C8.88283 9.10476 8.98939 8.74762 8.98939 8.35714V8.08571H6.55193C5.57516 8.08571 5.08678 8.47619 5.08678 9.25714C5.08678 9.6381 5.21998 9.9381 5.48637 10.1571C5.75276 10.3667 6.12126 10.4714 6.59188 10.4714Z" fill="#1746EA"></path>
                          <path d="M13.0554 11.8286V3.25714H14.8668V11.8286H13.0554ZM13.9611 2.22857C13.6769 2.22857 13.4327 2.12381 13.2285 1.91429C13.0243 1.69524 12.9222 1.42857 12.9222 1.11429C12.9222 0.809523 13.0198 0.547619 13.2152 0.328571C13.4194 0.109524 13.6681 0 13.9611 0C14.2452 0 14.4894 0.109524 14.6937 0.328571C14.8979 0.538095 15 0.8 15 1.11429C15 1.41905 14.8979 1.68095 14.6937 1.9C14.4983 2.11905 14.2541 2.22857 13.9611 2.22857Z" fill="#1746EA"></path>
                        </svg>
                      </div>
                    </span>
                  </a>
                </li>
                <li className="MuiBox-root mui-0">
                  <a style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/about">About Us</a>
                </li>
                <li className="MuiBox-root mui-hfpty6">
                  <a style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/services">Services</a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13px" height="8px" viewBox="0 0 13 8" fill="none">
                    <path d="M1.5 1.5L6.5 6.5L11.5 1.5" stroke="#1E293B" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </li>
                <li className="MuiBox-root mui-0">
                  <a aria-label="Case Studies" style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/case-studies">Case Studies</a>
                </li>
                <li className="MuiBox-root mui-0">
                  <a style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/blog">Blogs</a>
                </li>
                <li className="MuiBox-root mui-0">
                  <a style={{"textDecoration":"none","color":"#1E293B","fontWeight":500,"fontSize":"0.95rem"} as any} href="/careers">Careers</a>
                </li>
              </ul>
              <div className="MuiBox-root mui-1e9i2bb">
                <button className="MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorPrimary mui-12qv835" tabIndex={0} type="button">Contact Us</button>
                <a className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary mui-knz3q9" tabIndex={0} href="https://calendly.com/creuto/meet" target="_blank" rel="noopener noreferrer">Book A Call</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full pt-[128px] min-h-[calc(100vh-72px)] bg-white text-slate-800 font-bricolage relative overflow-x-hidden flex flex-col md:flex-row antialiased selection:bg-[#1d4ed8]/20 select-none">
        
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
    </>
  )
}
