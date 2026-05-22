import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // 1. Careers applications count
    const careersPath = path.join(process.cwd(), "careers_applications.json")
    let applications = []
    if (fs.existsSync(careersPath)) {
      try {
        const fileContent = fs.readFileSync(careersPath, "utf8")
        applications = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error parsing careers_applications.json:", err)
      }
    }

    // 2. Contact submissions count
    const contactPath = path.join(process.cwd(), "contact_submissions.json")
    let contacts = []
    if (fs.existsSync(contactPath)) {
      try {
        const fileContent = fs.readFileSync(contactPath, "utf8")
        contacts = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error parsing contact_submissions.json:", err)
      }
    }

    // 3. Call bookings count (fallback to empty list if file doesn't exist yet)
    const bookingsPath = path.join(process.cwd(), "call_bookings.json")
    let bookings = []
    if (fs.existsSync(bookingsPath)) {
      try {
        const fileContent = fs.readFileSync(bookingsPath, "utf8")
        bookings = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error parsing call_bookings.json:", err)
      }
    }

    // 4. Notices count
    const noticesPath = path.join(process.cwd(), "src", "constants", "notices.json")
    let notices = []
    if (fs.existsSync(noticesPath)) {
      try {
        const fileContent = fs.readFileSync(noticesPath, "utf8")
        notices = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error parsing notices.json:", err)
      }
    }

    // 5. Gather all events to populate a unified recent activity feed
    const recentActivity = [
      ...applications.map((app: any) => ({
        id: app.id,
        name: app.fullName || app.name || "Anonymous Candidate",
        type: "Careers",
        title: `Applied for ${app.position || "Developer"}`,
        timestamp: app.createdAt || new Date().toISOString(),
        status: "New",
      })),
      ...contacts.map((c: any) => ({
        id: c.id,
        name: c.name || "Inquirer",
        type: "Contact",
        title: `Inquiry from ${c.company || "General"}`,
        timestamp: c.createdAt || new Date().toISOString(),
        status: "New",
      })),
      ...bookings.map((b: any) => ({
        id: b.id,
        name: b.name || "Client",
        type: "Booking",
        title: `Scheduled Call: ${b.selectedTime || "Consultation"}`,
        timestamp: b.createdAt || new Date().toISOString(),
        status: "New",
      }))
    ]

    // Sort by timestamp descending
    recentActivity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    const sliceActivity = recentActivity.slice(0, 5)

    return NextResponse.json({
      success: true,
      stats: {
        totalApplications: applications.length,
        totalContacts: contacts.length,
        totalBookings: bookings.length,
        totalNotices: notices.length,
      },
      recentActivity: sliceActivity,
    })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
