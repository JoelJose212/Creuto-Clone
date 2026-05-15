import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { contactSchema } from "@/lib/validators"
import { sendEmail } from "@/lib/mail"
import { ZodError } from "zod"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = contactSchema.parse(body)

    // 1. Save to Database
    await prisma.contactSubmission.create({
      data: validatedData,
    })

    // 2. Send Emails (Notification to Creuto and Confirmation to User)
    const creutoInbox = process.env.CONTACT_EMAIL || "hello@creuto.com"
    
    // Notification to Creuto
    await sendEmail({
      to: creutoInbox,
      subject: `New Contact Form Submission: ${validatedData.name}`,
      html: `
        <h2>New Inquiry from ${validatedData.name}</h2>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Company:</strong> ${validatedData.company || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
      `,
    })

    // Confirmation to User
    await sendEmail({
      to: validatedData.email,
      subject: "We've received your message - Creuto",
      html: `
        <p>Hi ${validatedData.name},</p>
        <p>Thank you for reaching out to Creuto! We've received your message and our team will be in touch within 24 hours.</p>
        <p>Best regards,<br/>Team Creuto</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours.",
    })
  } catch (error: unknown) {
    console.error("Contact API Error:", error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
