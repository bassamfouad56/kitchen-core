import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateProductServiceSchema } from "@/lib/validations/product-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// GET /api/product-services/[id] - Get a single product service
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const service = await prisma.productService.findUnique({
      where: { id },
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
    console.error("Error fetching product service:", error);
    return NextResponse.json(
      { error: "Failed to fetch product service" },
      { status: 500 }
    );
  }
}

// PUT /api/product-services/[id] - Update a product service
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateProductServiceSchema.parse(body);

    const service = await prisma.productService.update({
      where: { id },
      data: validatedData,
      include: {
        images: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating product service:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update product service" },
      { status: 500 }
    );
  }
}

// DELETE /api/product-services/[id] - Delete a product service
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Images will be cascade deleted due to onDelete: Cascade in schema
    await prisma.productService.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product service deleted successfully" });
  } catch (error) {
    console.error("Error deleting product service:", error);
    return NextResponse.json(
      { error: "Failed to delete product service" },
      { status: 500 }
    );
  }
}
