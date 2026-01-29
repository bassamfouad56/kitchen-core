import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

// GET /api/product-services/slug/[slug] - Get a product service by slug
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    const service = await prisma.productService.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Product service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching product service by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product service" },
      { status: 500 }
    );
  }
}
