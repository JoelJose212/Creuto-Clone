import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

const getFilePath = () => path.join(process.cwd(), "call_bookings.json")

// GET: Fetch all booked calls
export async function GET() {
  try {
    const filePath = getFilePath()
    let bookings = []

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      bookings = JSON.parse(fileContent)
    }

    // Map default status "Pending" if missing
    const sanitized = bookings.map((b: any) => ({
      ...b,
      status: b.status || "Pending",
    }))

    // Sort by scheduled date and time descending or creation time descending
    sanitized.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ success: true, bookings: sanitized })
  } catch (error) {
    console.error("Admin Bookings GET API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// PUT: Update booked call status
export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing ID or status" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No bookings found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const bookings = JSON.parse(fileContent)

    const index = bookings.findIndex((b: any) => b.id === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    // Update status
    bookings[index].status = status
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Booking status updated successfully!" })
  } catch (error) {
    console.error("Admin Bookings PUT API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE: Cancel/delete a booked call
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking ID" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No bookings found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const bookings = JSON.parse(fileContent)

    const filtered = bookings.filter((b: any) => b.id !== id)

    if (bookings.length === filtered.length) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Booking entry deleted successfully!" })
  } catch (error) {
    console.error("Admin Bookings DELETE API error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
