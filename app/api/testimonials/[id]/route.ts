import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateTestimonialSchema } from '@/lib/validations/testimonial'
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from '@/lib/api/response'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    })

    if (!testimonial) {
      return notFoundResponse('Testimonial')
    }

    return successResponse(testimonial)
  } catch (error) {
    console.error('Error fetching testimonial:', error)
    return errorResponse('Failed to fetch testimonial')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return errorResponse('Unauthorized', 401)
    }

    const { id } = await params
    const body = await request.json()

    // Validate request body
    const validation = updateTestimonialSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    // Check if testimonial exists
    const existing = await prisma.testimonial.findUnique({
      where: { id },
    })

    if (!existing) {
      return notFoundResponse('Testimonial')
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: validation.data,
    })

    return successResponse(testimonial, 'Testimonial updated successfully')
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return errorResponse('Failed to update testimonial')
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return errorResponse('Unauthorized', 401)
    }

    const { id } = await params

    // Check if testimonial exists
    const existing = await prisma.testimonial.findUnique({
      where: { id },
    })

    if (!existing) {
      return notFoundResponse('Testimonial')
    }

    await prisma.testimonial.delete({
      where: { id },
    })

    return successResponse(null, 'Testimonial deleted successfully')
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return errorResponse('Failed to delete testimonial')
  }
}
