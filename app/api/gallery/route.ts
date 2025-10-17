import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma, ProjectCategory } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: Prisma.GalleryImageWhereInput = { published: true }
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      where.category = category as ProjectCategory
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(images)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const image = await prisma.galleryImage.create({ data: body })

    return NextResponse.json(image, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create image' }, { status: 500 })
  }
}
