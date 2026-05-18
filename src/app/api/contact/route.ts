import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, mobile, company, message, services } = body

    // 1. Basic server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, and Message)." },
        { status: 400 }
      )
    }

    // 2. Prepare submission object
    const newSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      mobile: mobile || "",
      company: company || "",
      message,
      services: services || [],
      createdAt: new Date().toISOString(),
    }

    // 3. Persist to local JSON file for auditable lead tracking
    const filePath = path.join(process.cwd(), "contact_submissions.json")
    let submissions = []

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        submissions = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error reading existing submissions:", err)
      }
    }

    submissions.push(newSubmission)
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2), "utf8")

    console.log(`[API Leads] Successfully saved new contact inquiry from ${name} (${email})!`)

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been successfully sent to Sanjana and our product leadership team. We will get in touch with you shortly!",
      leadId: newSubmission.id,
    })
  } catch (error) {
    console.error("Error handling contact submission API:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Please try again later." },
      { status: 500 }
    )
  }
}
