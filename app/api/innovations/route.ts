import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createInnovationSchema } from '@/lib/validations/innovation'
import { ZodError } from 'zod'

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
    const validatedData = createInnovationSchema.parse(body)
    const innovation = await prisma.innovation.create({
      data: validatedData,
    })
    return NextResponse.json(innovation)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: 'Failed to create innovation' }, { status: 500 })
  }
}
