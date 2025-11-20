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
    const metrics = await prisma.engineeringMetric.findMany({
      orderBy: [{ order: "asc" }],
    });
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching engineering metrics:", error);
    return NextResponse.json(
      { error: "Failed to fetch engineering metrics" },
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

    if (!data.number || !data.labelEn || !data.labelAr) {
      return NextResponse.json(
        { error: "Number, English label, and Arabic label are required" },
        { status: 400 },
      );
    }

    const metric = await prisma.engineeringMetric.create({
      data: {
        number: data.number,
        labelEn: data.labelEn,
        labelAr: data.labelAr,
        descriptionEn: data.descriptionEn || null,
        descriptionAr: data.descriptionAr || null,
        icon: data.icon || null,
        order: data.order || 0,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(metric, { status: 201 });
  } catch (error) {
    console.error("Error creating engineering metric:", error);
    return NextResponse.json(
      { error: "Failed to create engineering metric" },
      { status: 500 },
    );
  }
}
