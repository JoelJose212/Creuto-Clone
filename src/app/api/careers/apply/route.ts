import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { promises as fs } from "fs"
import path from "path"
import { sendEmail } from "@/lib/mail"


export const dynamic = "force-dynamic"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"]

function getExtension(filename: string): string {
  return path.extname(filename).toLowerCase()
}

function generateApplicantHtml({
  fullName,
  email,
  mobile,
  position,
  experience,
  linkedinProfile,
  whyAanandi,
  resumeUrl,
  coverLetterUrl,
}: {
  fullName: string
  email: string
  mobile: string
  position: string
  experience: string
  linkedinProfile: string | null
  whyAanandi: string
  resumeUrl: string
  coverLetterUrl: string | null
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: #f4f7ff;
          color: #334155;
          margin: 0;
          padding: 24px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #cbd5e1;
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.05), 0 4px 6px -4px rgba(37, 99, 235, 0.05);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          padding: 32px 24px;
          text-align: center;
          color: #ffffff;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .header p {
          margin: 8px 0 0 0;
          font-size: 14px;
          color: #bfdbfe;
          font-weight: 600;
        }
        .content {
          padding: 32px 24px;
        }
        .section-title {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #2563eb;
          margin-bottom: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }
        @media (max-width: 480px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
        .card {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
        }
        .card-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
        }
        .card-value {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
          margin-top: 4px;
          word-break: break-all;
        }
        .card-value a {
          color: #2563eb;
          text-decoration: none;
        }
        .card-value a:hover {
          text-decoration: underline;
        }
        .pitch {
          background-color: #eff6ff;
          border-left: 4px solid #2563eb;
          border-radius: 0 8px 8px 0;
          padding: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: #1e3a8a;
          font-style: italic;
          margin-bottom: 24px;
        }
        .actions {
          text-align: center;
          margin-top: 32px;
          display: flex;
          gap: 12px;
          justify-content: center;
        }
        .btn {
          display: inline-block;
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-primary {
          background-color: #2563eb;
          color: #ffffff !important;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .btn-primary:hover {
          background-color: #1d4ed8;
        }
        .btn-secondary {
          background-color: #f1f5f9;
          color: #475569 !important;
          border: 1px solid #cbd5e1;
        }
        .btn-secondary:hover {
          background-color: #e2e8f0;
        }
        .footer {
          background-color: #f8fafc;
          border-top: 1px solid #cbd5e1;
          padding: 16px;
          text-align: center;
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Applicant Alert</h1>
          <p>Aanandi Recruitment Engine</p>
        </div>
        
        <div class="content">
          <div class="section-title">Candidate Coordinates</div>
          
          <div class="grid">
            <div class="card">
              <div class="card-label">Full Name</div>
              <div class="card-value">${fullName}</div>
            </div>
            <div class="card">
              <div class="card-label">Target Position</div>
              <div class="card-value" style="color: #2563eb; font-weight: 800;">${position}</div>
            </div>
            <div class="card">
              <div class="card-label">Email Address</div>
              <div class="card-value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="card">
              <div class="card-label">Mobile Contact</div>
              <div class="card-value"><a href="tel:${mobile}">${mobile}</a></div>
            </div>
            <div class="card">
              <div class="card-label">Experience Level</div>
              <div class="card-value">${experience}</div>
            </div>
            <div class="card">
              <div class="card-label">LinkedIn Profile</div>
              <div class="card-value">
                ${linkedinProfile ? `<a href="${linkedinProfile}" target="_blank" rel="noopener noreferrer">View LinkedIn</a>` : "Not Provided"}
              </div>
            </div>
          </div>
          
          <div class="section-title">Candidate Pitch ("Why Aanandi?")</div>
          <div class="pitch">
            "${whyAanandi.replace(/\n/g, "<br>")}"
          </div>
          
          <div class="actions">
            <a href="${resumeUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">📂 View Resume PDF</a>
            ${coverLetterUrl ? `<a href="${coverLetterUrl}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">✉️ Cover Letter</a>` : ""}
          </div>
        </div>
        
        <div class="footer">
          This is an automated recruitment system alert. Manage all active candidates at <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/careers" style="color: #2563eb; text-decoration: none; font-weight: 600;">Aanandi Control Deck</a>.
        </div>
      </div>
    </body>
    </html>
  `
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
    const whyAanandi = formData.get("whyAanandi") as string

    const resumeFile = formData.get("resume") as File | null
    const coverLetterFile = formData.get("coverLetter") as File | null

    // 1. Basic Field Validations
    if (!fullName || !email || !mobile || !position || !experience || !whyAanandi || !resumeFile) {
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
          whyCreuto: whyAanandi,
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
        whyAanandi,
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

    // 8. Send notification email to admin asynchronously (non-blocking)
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "joel@aananditechnosoft.com"
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

    if (adminEmail) {
      sendEmail({
        to: adminEmail,
        subject: `[New Applicant] ${fullName} - ${position}`,
        html: generateApplicantHtml({
          fullName,
          email,
          mobile,
          position,
          experience,
          linkedinProfile: linkedinProfile || null,
          whyAanandi,
          resumeUrl: `${siteUrl}${resumePath}`,
          coverLetterUrl: coverLetterPath ? `${siteUrl}${coverLetterPath}` : null,
        }),
      }).catch((err) => console.error("Asynchronous recruitment mail dispatch failed:", err))
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
