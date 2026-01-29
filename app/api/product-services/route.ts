import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createProductServiceSchema } from "@/lib/validations/product-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/product-services - List all product services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const includeImages = searchParams.get("includeImages") === "true";

    const services = await prisma.productService.findMany({
      where: published === "true" ? { published: true } : undefined,
      include: includeImages
        ? { images: { orderBy: { order: "asc" } } }
        : undefined,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching product services:", error);
    return NextResponse.json(
      { error: "Failed to fetch product services" },
      { status: 500 }
    );
  }
}

// POST /api/product-services - Create a new product service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createProductServiceSchema.parse(body);

    const service = await prisma.productService.create({
      data: validatedData,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating product service:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product service" },
      { status: 500 }
    );
  }
}
