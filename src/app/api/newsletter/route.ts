import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ZodError } from "zod"
import { newsletterSchema } from "@/lib/validators"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = newsletterSchema.parse(body)

    // Check for duplicate
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 400 })
    }

    // Insert new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email,
        isActive: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error("Newsletter API Error:", error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
