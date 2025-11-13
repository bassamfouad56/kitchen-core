import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const founder = await prisma.founder.findFirst({
      where: { published: true },
    });
    return NextResponse.json(founder);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch founder data" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const founder = await prisma.founder.findFirst();

    if (founder) {
      const updated = await prisma.founder.update({
        where: { id: founder.id },
        data: body,
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.founder.create({ data: body });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error("Error updating founder:", error);
    return NextResponse.json(
      { error: "Failed to update founder" },
      { status: 500 },
    );
  }
}
