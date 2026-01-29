import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateServiceSchema } from '@/lib/validations/service'
import { successResponse, errorResponse, validationErrorResponse, notFoundResponse } from '@/lib/api/response'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const service = await prisma.service.findUnique({
      where: { id },
    })
    if (!service) {
      return notFoundResponse('Service')
    }
    return successResponse(service)
  } catch (error) {
    return errorResponse('Failed to fetch service', 500)
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return errorResponse('Unauthorized', 401)
  }

  try {
    const { id } = await params
    const body = await request.json()

    // Validate request body with Zod
    const validation = updateServiceSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    const data = validation.data

    // Check if service exists
    const existing = await prisma.service.findUnique({ where: { id } })
    if (!existing) {
      return notFoundResponse('Service')
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        titleEn: data.titleEn ?? existing.titleEn,
        titleAr: data.titleAr ?? existing.titleAr,
        descriptionEn: data.descriptionEn ?? existing.descriptionEn,
        descriptionAr: data.descriptionAr ?? existing.descriptionAr,
        features: data.features ?? existing.features,
        order: data.order ?? existing.order,
        published: data.published ?? existing.published,
      },
    })
    return successResponse(service, 'Service updated successfully')
  } catch (error) {
    return errorResponse('Failed to update service', 500)
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return errorResponse('Unauthorized', 401)
  }

  try {
    const { id } = await params

    // Check if service exists
    const existing = await prisma.service.findUnique({ where: { id } })
    if (!existing) {
      return notFoundResponse('Service')
    }

    await prisma.service.delete({
      where: { id },
    })
    return successResponse({ deleted: true }, 'Service deleted successfully')
  } catch (error) {
    return errorResponse('Failed to delete service', 500)
  }
}
