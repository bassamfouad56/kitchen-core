import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { updateGalleryImageSchema } from '@/lib/validations/gallery'
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
  notFoundResponse,
} from '@/lib/api/response'

// GET single gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const image = await prisma.galleryImage.findUnique({
      where: { id },
    })

    if (!image) {
      return notFoundResponse('Gallery image')
    }

    return successResponse(image)
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return errorResponse('Failed to fetch image')
  }
}

// PUT update gallery image
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
    const validation = updateGalleryImageSchema.safeParse(body)
    if (!validation.success) {
      return validationErrorResponse(validation.error)
    }

    // Check if image exists
    const existing = await prisma.galleryImage.findUnique({
      where: { id },
    })

    if (!existing) {
      return notFoundResponse('Gallery image')
    }

    const image = await prisma.galleryImage.update({
      where: { id },
      data: validation.data,
    })

    return successResponse(image, 'Gallery image updated successfully')
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return errorResponse('Failed to update image')
  }
}

// DELETE gallery image
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

    // Check if image exists
    const existing = await prisma.galleryImage.findUnique({
      where: { id },
    })

    if (!existing) {
      return notFoundResponse('Gallery image')
    }

    await prisma.galleryImage.delete({
      where: { id },
    })

    return successResponse(null, 'Gallery image deleted successfully')
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return errorResponse('Failed to delete image')
  }
}
