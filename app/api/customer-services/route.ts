import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCustomerServiceSchema } from "@/lib/validations/customer-service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/customer-services - List all customer services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const services = await prisma.customerService.findMany({
      where: published === "true" ? { published: true } : undefined,
      orderBy: { order: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching customer services:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer services" },
      { status: 500 }
    );
  }
}

// POST /api/customer-services - Create a new customer service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createCustomerServiceSchema.parse(body);

    const service = await prisma.customerService.create({
      data: validatedData,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating customer service:", error);
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create customer service" },
      { status: 500 }
    );
  }
}
