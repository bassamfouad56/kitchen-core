import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST - Add interaction to customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: customerId } = await params;

  try {
    const data = await request.json();

    // Validation
    if (!data.type || !data.content) {
      return NextResponse.json(
        { error: "Type and content are required" },
        { status: 400 },
      );
    }

    // Verify customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    // Create interaction
    const interaction = await prisma.customerInteraction.create({
      data: {
        customerId,
        type: data.type,
        subject: data.subject || null,
        content: data.content,
        direction: data.direction || "OUTBOUND",
        outcome: data.outcome || null,
        scheduledFor: data.scheduledFor ? new Date(data.scheduledFor) : null,
        completedAt: data.completedAt ? new Date(data.completedAt) : null,
        createdBy: session.user?.email || null,
        metadata: data.metadata || null,
      },
    });

    return NextResponse.json(interaction, { status: 201 });
  } catch (error) {
    console.error("Error creating interaction:", error);
    return NextResponse.json(
      { error: "Failed to create interaction" },
      { status: 500 },
    );
  }
}
