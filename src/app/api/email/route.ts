import { NextResponse } from "next/server"

// Mock Resend endpoint for form submissions or transactional emails
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { to, subject, html } = body

    // Simulate sending email via Resend
    console.log(`[Resend Mock] Email to ${to} with subject "${subject}" mocked successfully.`)

    return NextResponse.json({ success: true, dummyEventId: "re_mocked123" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
