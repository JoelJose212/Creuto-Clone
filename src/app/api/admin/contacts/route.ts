import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const getFilePath = () => path.join(process.cwd(), "contact_submissions.json")

// GET: Fetch all contacts
export async function GET() {
  try {
    const filePath = getFilePath()
    let contacts = []

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      contacts = JSON.parse(fileContent)
    }

    // Map default status "New" if status is missing
    const sanitized = contacts.map((c: any) => ({
      ...c,
      status: c.status || "New",
    }))

    // Sort by createdAt descending
    sanitized.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ success: true, contacts: sanitized })
  } catch (error) {
    console.error("Admin Contacts GET API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// PUT: Update contact status
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No contacts found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const contacts = JSON.parse(fileContent)

    const index = contacts.findIndex((c: any) => c.id === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 })
    }

    // Update status
    contacts[index].status = status
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Contact status updated successfully!" })
  } catch (error) {
    console.error("Admin Contacts PUT API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE: Delete a contact submission
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing contact ID" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No contacts found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const contacts = JSON.parse(fileContent)

    const filtered = contacts.filter((c: any) => c.id !== id)

    if (contacts.length === filtered.length) {
      return NextResponse.json({ success: false, error: "Contact not found" }, { status: 404 })
    }

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Contact inquiry deleted successfully!" })
  } catch (error) {
    console.error("Admin Contacts DELETE API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
