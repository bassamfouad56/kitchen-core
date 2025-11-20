import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const verified = searchParams.get("verified");

    const where: Prisma.SubscriberWhereInput = {};
    if (verified !== null) where.verified = verified === "true";

    const subscribers = await prisma.subscriber.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

    // Check if email already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email: data.email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 },
      );
    }

    const subscriber = await prisma.subscriber.create({
      data: {
        email: data.email,
        name: data.name || null,
        verified: data.verified ?? false,
        preferences: data.preferences || null,
      },
    });

    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    return NextResponse.json(
      { error: "Failed to create subscriber" },
      { status: 500 },
    );
  }
}
