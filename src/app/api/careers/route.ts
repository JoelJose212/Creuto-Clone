import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, mobile, portfolio, resume, message, role } = body

    // 1. Basic server-side validation
    if (!name || !email || !resume || !role) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Resume link, and Job Role)." },
        { status: 400 }
      )
    }

    // 2. Prepare candidate submission object
    const newApplication = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      mobile: mobile || "",
      portfolio: portfolio || "",
      resume,
      message: message || "",
      role,
      createdAt: new Date().toISOString(),
    }

    // 3. Persist to local JSON file for recruitment tracking
    const filePath = path.join(process.cwd(), "careers_applications.json")
    let applications = []

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        applications = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error reading existing applications:", err)
      }
    }

    applications.push(newApplication)
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2), "utf8")

    console.log(`[API Careers] Successfully saved candidate application from ${name} for ${role}!`)

    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}! Your application for the ${role} position has been successfully logged. Our talent acquisition team will review your credentials and get back to you shortly.`,
      applicationId: newApplication.id,
    })
  } catch (error) {
    console.error("Error handling careers application API:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Please try again later." },
      { status: 500 }
    )
  }
}
