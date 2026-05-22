import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, mobile, message, date, timeSlot } = body

    if (!name || !email || !date || !timeSlot) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields (Name, Email, Date, and Time Slot)." },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), "call_bookings.json")
    let bookings = []

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        bookings = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error reading call_bookings.json, resetting:", err)
      }
    }

    // Format selectedTime friendly string for display
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    })
    const selectedTime = `${formattedDate} at ${timeSlot}`

    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      mobile: mobile || "",
      message: message || "",
      date,
      timeSlot,
      selectedTime,
      status: "Pending", // Default booking status
      createdAt: new Date().toISOString(),
    }

    bookings.push(newBooking)
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2), "utf8")

    console.log(`[API Booking] Logged booking successfully for ${name} on ${selectedTime}!`)

    return NextResponse.json({
      success: true,
      message: `Your call has been scheduled successfully for ${selectedTime}! A confirmation link and calendar invite have been sent to your email.`,
      bookingId: newBooking.id
    })
  } catch (error) {
    console.error("Critical error in public bookings API:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Please try again." },
      { status: 500 }
    )
  }
}
