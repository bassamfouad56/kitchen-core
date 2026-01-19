import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get gallery images with their categories
    const images = await prisma.galleryImage.findMany({
      where: { published: true },
      select: {
        id: true,
        titleEn: true,
        category: true,
        image: true,
      },
      orderBy: { order: 'asc' },
    });

    // Group by category
    const categoryCounts = images.reduce((acc, img) => {
      acc[img.category] = (acc[img.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get first 3 images per category for verification
    const samplesByCategory = images.reduce((acc, img) => {
      if (!acc[img.category]) {
        acc[img.category] = [];
      }
      if (acc[img.category].length < 3) {
        acc[img.category].push({
          id: img.id,
          title: img.titleEn,
          image: img.image,
        });
      }
      return acc;
    }, {} as Record<string, Array<{ id: string; title: string; image: string }>>);

    return NextResponse.json({
      success: true,
      totalImages: images.length,
      categoryCounts,
      samplesByCategory,
      expectedCategories: ['MODERN_WOODEN', 'CLASSIC_WOODEN', 'ALUMINUM', 'BEDROOMS'],
    });
  } catch (error) {
    console.error('Debug gallery error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery data', details: String(error) },
      { status: 500 }
    );
  }
}
