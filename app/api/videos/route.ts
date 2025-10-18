import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(videos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const video = await prisma.video.create({
      data: {
        titleEn: body.titleEn,
        titleAr: body.titleAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        url: body.url,
        thumbnail: body.thumbnail || null,
        order: body.order || 0,
        published: body.published ?? true,
      },
    })
    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}
