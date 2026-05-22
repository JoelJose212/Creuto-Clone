import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (username === "admin" && password === "admin123") {
      const response = NextResponse.json({ success: true, message: "Authentication successful!" })
      
      // Set the session cookie. Accessible by client checks but scoped to path
      response.cookies.set("creuto_admin_session", "authorized", {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return response
    }

    return NextResponse.json(
      { success: false, error: "Invalid admin credentials." },
      { status: 401 }
    )
  } catch (error) {
    console.error("Auth Login API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal Server Error." },
      { status: 500 }
    )
  }
}
