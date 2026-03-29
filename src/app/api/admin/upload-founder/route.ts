import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const publicDir = path.join(process.cwd(), "public")
    const filePath = path.join(publicDir, "founder.jpg")

    await writeFile(filePath, buffer)

    return NextResponse.json({ success: true, message: "Founder image updated successfully." })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
