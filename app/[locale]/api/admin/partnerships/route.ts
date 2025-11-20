import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - List all partnerships
export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const partnerships = await prisma.partnership.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(partnerships);
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    return NextResponse.json(
      { error: "Failed to fetch partnerships" },
      { status: 500 },
    );
  }
}

// POST - Create new partnership
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.nameEn || !data.nameAr) {
      return NextResponse.json(
        { error: "Both English and Arabic names are required" },
        { status: 400 },
      );
    }

    // Create partnership
    const partnership = await prisma.partnership.create({
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        logo: data.logo || null,
        url: data.url || null,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(partnership, { status: 201 });
  } catch (error) {
    console.error("Error creating partnership:", error);
    return NextResponse.json(
      { error: "Failed to create partnership" },
      { status: 500 },
    );
  }
}
