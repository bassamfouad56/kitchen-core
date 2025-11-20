import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - List all before/after items
export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await prisma.beforeAfter.findMany({
      orderBy: [{ order: "asc" }],
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching before/after items:", error);
    return NextResponse.json(
      { error: "Failed to fetch before/after items" },
      { status: 500 },
    );
  }
}

// POST - Create new before/after item
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (
      !data.titleEn ||
      !data.titleAr ||
      !data.beforeImage ||
      !data.afterImage
    ) {
      return NextResponse.json(
        {
          error:
            "English title, Arabic title, before image, and after image are required",
        },
        { status: 400 },
      );
    }

    const item = await prisma.beforeAfter.create({
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        beforeImage: data.beforeImage,
        afterImage: data.afterImage,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating before/after item:", error);
    return NextResponse.json(
      { error: "Failed to create before/after item" },
      { status: 500 },
    );
  }
}
