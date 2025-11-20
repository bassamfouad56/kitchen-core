import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const specs = await prisma.technicalSpec.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    return NextResponse.json(specs);
  } catch (error) {
    console.error("Error fetching technical specs:", error);
    return NextResponse.json(
      { error: "Failed to fetch technical specs" },
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

    if (
      !data.titleEn ||
      !data.titleAr ||
      !data.descriptionEn ||
      !data.descriptionAr ||
      !data.icon ||
      !data.category
    ) {
      return NextResponse.json(
        {
          error:
            "English title, Arabic title, descriptions, icon, and category are required",
        },
        { status: 400 },
      );
    }

    const spec = await prisma.technicalSpec.create({
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        icon: data.icon,
        category: data.category,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(spec, { status: 201 });
  } catch (error) {
    console.error("Error creating technical spec:", error);
    return NextResponse.json(
      { error: "Failed to create technical spec" },
      { status: 500 },
    );
  }
}
