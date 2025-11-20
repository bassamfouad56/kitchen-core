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
    const credentials = await prisma.credential.findMany({
      orderBy: [{ order: "asc" }],
    });
    return NextResponse.json(credentials);
  } catch (error) {
    console.error("Error fetching credentials:", error);
    return NextResponse.json(
      { error: "Failed to fetch credentials" },
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

    if (!data.titleEn || !data.titleAr || !data.issuer) {
      return NextResponse.json(
        { error: "English title, Arabic title, and issuer are required" },
        { status: 400 },
      );
    }

    const credential = await prisma.credential.create({
      data: {
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        issuer: data.issuer,
        image: data.image || null,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        year: data.year || null,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(credential, { status: 201 });
  } catch (error) {
    console.error("Error creating credential:", error);
    return NextResponse.json(
      { error: "Failed to create credential" },
      { status: 500 },
    );
  }
}
