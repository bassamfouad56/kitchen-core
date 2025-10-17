import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma, ProjectCategory } from '@prisma/client'

// GET all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get('published')
    const category = searchParams.get('category')

    const where: Prisma.ProjectWhereInput = {}
    if (published === 'true') where.published = true
    if (category && Object.values(ProjectCategory).includes(category as ProjectCategory)) {
      where.category = category as ProjectCategory
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST create new project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const project = await prisma.project.create({
      data: body,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
