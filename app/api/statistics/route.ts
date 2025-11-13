import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const statistics = await prisma.statistic.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(statistics);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const statistic = await prisma.statistic.create({ data: body });
    return NextResponse.json(statistic, { status: 201 });
  } catch (error) {
    console.error("Error creating statistic:", error);
    return NextResponse.json(
      { error: "Failed to create statistic" },
      { status: 500 },
    );
  }
}
