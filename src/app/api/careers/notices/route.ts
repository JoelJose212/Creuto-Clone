import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import defaultNotices from "@/constants/notices.json"

export const dynamic = "force-dynamic"

const getFilePath = () => path.join(process.cwd(), "careers_notices.json")

export async function GET() {
  try {
    const filePath = getFilePath()
    let notices = []

    if (fs.existsSync(filePath)) {
      try {
        const fileContent = fs.readFileSync(filePath, "utf8")
        notices = JSON.parse(fileContent)
      } catch (err) {
        console.error("Error reading careers_notices.json:", err)
        notices = defaultNotices
      }
    } else {
      // Seed with default notices
      notices = defaultNotices
      fs.writeFileSync(filePath, JSON.stringify(notices, null, 2), "utf8")
    }

    return NextResponse.json({ success: true, notices })
  } catch (error) {
    console.error("Public Careers Notices GET error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
