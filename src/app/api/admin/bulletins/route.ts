import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import defaultNotices from "@/constants/notices.json"

export const dynamic = "force-dynamic"

const getFilePath = () => path.join(process.cwd(), "careers_notices.json")

// Helper to check admin authorization via cookies
const checkAuth = (request: Request) => {
  const cookieHeader = request.headers.get("cookie") || ""
  const cookies = cookieHeader.split(";").map(c => c.trim())
  const sessionCookie = cookies.find(c => c.startsWith("creuto_admin_session="))
  return sessionCookie && sessionCookie.split("=")[1] === "authorized"
}

// GET: Fetch all bulletins
export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 })
  }

  try {
    const filePath = getFilePath()
    let notices = []

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      notices = JSON.parse(fileContent)
    } else {
      notices = defaultNotices
      fs.writeFileSync(filePath, JSON.stringify(notices, null, 2), "utf8")
    }

    return NextResponse.json({ success: true, bulletins: notices })
  } catch (error) {
    console.error("Admin Bulletins GET error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// POST: Publish a new bulletin notice
export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 })
  }

  try {
    const { title, content, color } = await request.json()

    if (!title || !content || !color) {
      return NextResponse.json({ success: false, error: "Missing required fields: title, content, or color color theme" }, { status: 400 })
    }

    const filePath = getFilePath()
    let notices = []

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      notices = JSON.parse(fileContent)
    } else {
      notices = [...defaultNotices]
    }

    const newNotice = {
      id: `notice-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      color: color
    }

    // Prepend the new notice so it appears first
    notices.unshift(newNotice)
    fs.writeFileSync(filePath, JSON.stringify(notices, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Notice published successfully!", bulletin: newNotice })
  } catch (error) {
    console.error("Admin Bulletins POST error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

// DELETE: Unpin/delete a bulletin notice
export async function DELETE(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing notice ID" }, { status: 400 })
    }

    const filePath = getFilePath()
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "No bulletins found" }, { status: 404 })
    }

    const fileContent = fs.readFileSync(filePath, "utf8")
    const notices = JSON.parse(fileContent)

    const filtered = notices.filter((n: any) => n.id !== id)

    if (notices.length === filtered.length) {
      return NextResponse.json({ success: false, error: "Notice bulletin not found" }, { status: 404 })
    }

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2), "utf8")

    return NextResponse.json({ success: true, message: "Notice bulletin unpinned successfully!" })
  } catch (error) {
    console.error("Admin Bulletins DELETE error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
