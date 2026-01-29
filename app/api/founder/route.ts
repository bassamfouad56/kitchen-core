import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createFounderSchema, updateFounderSchema } from "@/lib/validations/founder";
import { ZodError } from "zod";

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
      const validatedData = updateFounderSchema.parse(body);
      const updated = await prisma.founder.update({
        where: { id: founder.id },
        data: validatedData,
      });
      return NextResponse.json(updated);
    } else {
      const validatedData = createFounderSchema.parse(body);
      const created = await prisma.founder.create({ data: validatedData });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error updating founder:", error);
    return NextResponse.json(
      { error: "Failed to update founder" },
      { status: 500 },
    );
  }
}
