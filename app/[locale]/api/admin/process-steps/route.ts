import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - List all process steps
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const processSteps = await prisma.processStep.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(processSteps);
  } catch (error) {
    console.error("Error fetching process steps:", error);
    return NextResponse.json(
      { error: "Failed to fetch process steps" },
      { status: 500 },
    );
  }
}

// POST - Create new process step
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    const processStep = await prisma.processStep.create({
      data: {
        number: data.number,
        titleEn: data.titleEn,
        titleAr: data.titleAr,
        descriptionEn: data.descriptionEn,
        descriptionAr: data.descriptionAr,
        duration: data.duration,
        iconName: data.iconName,
        order: data.order,
        published: data.published ?? true,
      },
    });

    return NextResponse.json(processStep);
  } catch (error) {
    console.error("Error creating process step:", error);
    return NextResponse.json(
      { error: "Failed to create process step" },
      { status: 500 },
    );
  }
}
