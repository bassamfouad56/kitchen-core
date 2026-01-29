import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

// GET /api/customer-services/slug/[slug] - Get a customer service by slug
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    const service = await prisma.customerService.findUnique({
      where: { slug },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Customer service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching customer service by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer service" },
      { status: 500 }
    );
  }
}
