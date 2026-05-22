import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const getFilePath = () => path.join(process.cwd(), "careers_applications.json")

// GET: Fetch all candidates
export async function GET() {
  try {
    const filePath = getFilePath()
    let applications = []

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      applications = JSON.parse(fileContent)
    }

    // Map default status "New" if status is missing
    const sanitized = applications.map((app: any) => ({
      ...app,
      status: app.status || "New",
    }))

    // Sort by createdAt descending
    sanitized.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ success: true, applications: sanitized })
  } catch (error) {
    console.error("Admin Careers GET API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// PUT: Update candidate status
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No applications found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const applications = JSON.parse(fileContent)

    const index = applications.findIndex((app: any) => app.id === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Candidate not found" }, { status: 404 })
    }

    // Update status
    applications[index].status = status
    fs.writeFileSync(filePath, JSON.stringify(applications, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Candidate status updated successfully!" })
  } catch (error) {
    console.error("Admin Careers PUT API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE: Delete a candidate application
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing candidate ID" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No applications found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const applications = JSON.parse(fileContent)

    const filtered = applications.filter((app: any) => app.id !== id)

    if (applications.length === filtered.length) {
      return NextResponse.json({ success: false, error: "Candidate not found" }, { status: 404 })
    }

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Candidate application deleted successfully!" })
  } catch (error) {
    console.error("Admin Careers DELETE API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
