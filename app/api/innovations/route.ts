import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const innovations = await prisma.innovation.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(innovations)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch innovations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const innovation = await prisma.innovation.create({
      data: {
        titleEn: body.titleEn,
        titleAr: body.titleAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        icon: body.icon || '',
        order: body.order || 0,
        published: body.published ?? true,
      },
    })
    return NextResponse.json(innovation)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create innovation' }, { status: 500 })
  }
}
