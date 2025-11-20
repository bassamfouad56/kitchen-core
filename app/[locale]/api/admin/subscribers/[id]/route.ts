import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const subscriber = await prisma.subscriber.findUnique({
      where: { id },
    });

    if (!subscriber) {
      return NextResponse.json(
        { error: "Subscriber not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Error fetching subscriber:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriber" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if email already exists (excluding current subscriber)
    const existingSubscriber = await prisma.subscriber.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already used by another subscriber" },
        { status: 400 },
      );
    }

    const subscriber = await prisma.subscriber.update({
      where: { id },
      data: {
        email: data.email,
        name: data.name || null,
        verified: data.verified ?? false,
        preferences: data.preferences || null,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Error updating subscriber:", error);
    return NextResponse.json(
      { error: "Failed to update subscriber" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.subscriber.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json(
      { error: "Failed to delete subscriber" },
      { status: 500 },
    );
  }
}
