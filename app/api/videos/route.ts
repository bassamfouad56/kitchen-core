import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createVideoSchema } from '@/lib/validations/video'
import { ZodError } from 'zod'

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
    const validatedData = createVideoSchema.parse(body)
    const video = await prisma.video.create({
      data: validatedData,
    })
    return NextResponse.json(video)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 })
  }
}
