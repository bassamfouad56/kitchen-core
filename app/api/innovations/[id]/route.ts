import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const innovation = await prisma.innovation.findUnique({
      where: { id },
    })
    if (!innovation) {
      return NextResponse.json({ error: 'Innovation not found' }, { status: 404 })
    }
    return NextResponse.json(innovation)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch innovation' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const innovation = await prisma.innovation.update({
      where: { id },
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
    return NextResponse.json({ error: 'Failed to update innovation' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.innovation.delete({
      where: { id },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete innovation' }, { status: 500 })
  }
}
