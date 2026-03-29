import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET property images
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const property = await prisma.property.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    select: { images: true }
  })
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const images = typeof property.images === "string"
    ? JSON.parse(property.images)
    : property.images

  return NextResponse.json({ images })
}

// PUT — replace all images (reorder / remove)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { images } = await req.json()
    if (!Array.isArray(images)) return NextResponse.json({ error: "images must be an array" }, { status: 400 })

    const updated = await prisma.property.update({
      where: { id: params.id },
      data: { images: JSON.stringify(images) }
    })
    return NextResponse.json({ success: true, images })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

// PATCH — append a single new image URL
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { imageUrl } = await req.json()
    if (!imageUrl) return NextResponse.json({ error: "imageUrl required" }, { status: 400 })

    const property = await prisma.property.findFirst({
      where: { id: params.id },
      select: { images: true }
    })
    if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 })

    const existing: string[] = typeof property.images === "string"
      ? JSON.parse(property.images)
      : (property.images as string[])

    const newImages = [...existing, imageUrl]

    await prisma.property.update({
      where: { id: params.id },
      data: { images: JSON.stringify(newImages) }
    })

    return NextResponse.json({ success: true, images: newImages })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
