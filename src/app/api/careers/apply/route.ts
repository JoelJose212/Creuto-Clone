import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { promises as fs } from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]

function getExtension(filename: string): string {
  return path.extname(filename).toLowerCase()
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const mobile = formData.get("mobile") as string
    const position = formData.get("position") as string
    const experience = formData.get("experience") as string
    const linkedinProfile = formData.get("linkedinProfile") as string
    const whyCreuto = formData.get("whyCreuto") as string

    const resumeFile = formData.get("resume") as File | null
    const coverLetterFile = formData.get("coverLetter") as File | null

    // 1. Basic Field Validations
    if (!fullName || !email || !mobile || !position || !experience || !whyCreuto || !resumeFile) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    // 2. Validate Resume File
    if (resumeFile.size === 0) {
      return NextResponse.json(
        { success: false, error: "Resume file is required." },
        { status: 400 }
      )
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: "Resume file size exceeds the 5MB limit." },
        { status: 400 }
      )
    }

    const resumeExt = getExtension(resumeFile.name)
    if (!ALLOWED_EXTENSIONS.includes(resumeExt)) {
      return NextResponse.json(
        { success: false, error: "Resume must be in PDF or DOC/DOCX format." },
        { status: 400 }
      )
    }

    // 3. Validate Cover Letter File (if provided)
    if (coverLetterFile && coverLetterFile.size > 0) {
      if (coverLetterFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: "Cover Letter file size exceeds the 5MB limit." },
          { status: 400 }
        )
      }

      const coverLetterExt = getExtension(coverLetterFile.name)
      if (!ALLOWED_EXTENSIONS.includes(coverLetterExt)) {
        return NextResponse.json(
          { success: false, error: "Cover Letter must be in PDF or DOC/DOCX format." },
          { status: 400 }
        )
      }
    }

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await fs.mkdir(uploadDir, { recursive: true })

    // 4. Save Resume to local storage
    const resumeBytes = await resumeFile.arrayBuffer()
    const resumeBuffer = Buffer.from(resumeBytes)
    const resumeFilename = `${Date.now()}-resume-${resumeFile.name.replace(/\s+/g, "_")}`
    const resumeFilePath = path.join(uploadDir, resumeFilename)
    await fs.writeFile(resumeFilePath, resumeBuffer)
    const resumePath = `/uploads/${resumeFilename}`

    // 5. Save Cover Letter to local storage (if provided)
    let coverLetterPath: string | null = null
    if (coverLetterFile && coverLetterFile.size > 0) {
      const coverLetterBytes = await coverLetterFile.arrayBuffer()
      const coverLetterBuffer = Buffer.from(coverLetterBytes)
      const coverLetterFilename = `${Date.now()}-cover-${coverLetterFile.name.replace(/\s+/g, "_")}`
      const coverLetterFilePath = path.join(uploadDir, coverLetterFilename)
      await fs.writeFile(coverLetterFilePath, coverLetterBuffer)
      coverLetterPath = `/uploads/${coverLetterFilename}`
    }

    // 6. Attempt saving to the database using Prisma
    let applicationId = Math.random().toString(36).substring(2, 9)
    let isSavedToDb = false

    try {
      const application = await prisma.jobApplication.create({
        data: {
          position,
          fullName,
          email,
          mobile,
          experience,
          linkedinProfile: linkedinProfile || null,
          whyCreuto,
          resumePath,
          coverLetterPath,
        },
      })
      applicationId = application.id
      isSavedToDb = true
      console.log(`[API Apply] Saved job application successfully to DB for ${fullName} (${position}).`)
    } catch (dbError) {
      console.error("[API Apply] Database saving failed. Proceeding with JSON backup fallback:", dbError)
    }

    // 7. Save backup copy to local JSON file (audit logging / local development convenience)
    try {
      const backupFilePath = path.join(process.cwd(), "careers_applications.json")
      let backupApplications = []

      const fileExists = await fs.stat(backupFilePath).then(() => true).catch(() => false)
      if (fileExists) {
        try {
          const fileContent = await fs.readFile(backupFilePath, "utf8")
          backupApplications = JSON.parse(fileContent)
        } catch (e) {
          console.error("Error reading JSON backup file, resetting:", e)
        }
      }

      const newBackup = {
        id: applicationId,
        position,
        fullName,
        email,
        mobile,
        experience,
        linkedinProfile: linkedinProfile || null,
        whyCreuto,
        resumePath,
        coverLetterPath,
        savedToDb: isSavedToDb,
        createdAt: new Date().toISOString(),
      }

      backupApplications.push(newBackup)
      await fs.writeFile(backupFilePath, JSON.stringify(backupApplications, null, 2), "utf8")
      console.log(`[API Apply] Backup logged in careers_applications.json successfully.`)
    } catch (jsonError) {
      console.error("[API Apply] Logging application backup to JSON file failed:", jsonError)
    }

    return NextResponse.json({
      success: true,
      message: `Thank you, ${fullName}! Your application for the ${position} position has been successfully submitted. Our recruitment team will review your credentials and contact you shortly.`,
      applicationId,
    })
  } catch (error) {
    console.error("Critical error in Apply Now API route:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Please try again later." },
      { status: 500 }
    )
  }
}
