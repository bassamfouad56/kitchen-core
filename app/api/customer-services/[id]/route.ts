import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateCustomerServiceSchema } from "@/lib/validations/customer-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// GET /api/customer-services/[id] - Get a single customer service
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    const service = await prisma.customerService.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Customer service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching customer service:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer service" },
      { status: 500 }
    );
  }
}

// PUT /api/customer-services/[id] - Update a customer service
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = updateCustomerServiceSchema.parse(body);

    const service = await prisma.customerService.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error updating customer service:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update customer service" },
      { status: 500 }
    );
  }
}

// DELETE /api/customer-services/[id] - Delete a customer service
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.customerService.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Customer service deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer service:", error);
    return NextResponse.json(
      { error: "Failed to delete customer service" },
      { status: 500 }
    );
  }
}
