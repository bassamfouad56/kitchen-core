import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { iconMap } from "@/lib/icons";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "modern-kitchens-wood";

  try {
    // Test 1: Fetch the product service
    const service = await prisma.productService.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!service) {
      return NextResponse.json({
        success: false,
        error: "Service not found",
        slug,
      });
    }

    // Test 2: Fetch other services
    const otherServices = await prisma.productService.findMany({
      where: {
        published: true,
        id: { not: service.id },
      },
      orderBy: { order: "asc" },
      include: {
        images: {
          take: 1,
          orderBy: { order: "asc" },
        },
      },
    });

    // Test 3: Fetch customer services
    const customerServices = await prisma.customerService.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 5,
    });

    // Test 4: Check icons
    const iconTests = customerServices.map((cs) => ({
      iconName: cs.icon,
      iconExists: !!iconMap[cs.icon],
    }));

    // Test 5: Fetch related projects (this might be the issue)
    let projects = [];
    let projectError = null;
    try {
      projects = await prisma.project.findMany({
        where: {
          category: service.dbCategory,
          published: true,
        },
        orderBy: { order: "asc" },
        take: 6,
      });
    } catch (err) {
      projectError = String(err);
    }

    // Test 6: Check all required fields exist
    const requiredFields = {
      titleEn: service.titleEn,
      titleAr: service.titleAr,
      taglineEn: service.taglineEn,
      taglineAr: service.taglineAr,
      descriptionEn: service.descriptionEn,
      descriptionAr: service.descriptionAr,
      featuresEn: service.featuresEn,
      featuresAr: service.featuresAr,
      benefitsEn: service.benefitsEn,
      benefitsAr: service.benefitsAr,
      heroImage: service.heroImage,
      dbCategory: service.dbCategory,
    };

    return NextResponse.json({
      success: true,
      service: {
        id: service.id,
        slug: service.slug,
        hasImages: service.images.length,
        ...requiredFields,
      },
      otherServicesCount: otherServices.length,
      customerServicesCount: customerServices.length,
      iconTests,
      projectsCount: projects.length,
      projectError,
      availableIcons: Object.keys(iconMap),
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
