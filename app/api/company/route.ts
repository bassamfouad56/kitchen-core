import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCompanySchema, updateCompanySchema } from "@/lib/validations/company";
import { ZodError } from "zod";

export async function GET() {
  try {
    const company = await prisma.company.findFirst({
      where: { published: true },
    });
    return NextResponse.json(company);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch company data" },
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
    const validatedData = createCompanySchema.parse(body);
    const company = await prisma.company.create({ data: validatedData });
    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error creating company:", error);
    return NextResponse.json(
      { error: "Failed to create company" },
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
    const company = await prisma.company.findFirst();

    if (company) {
      const validatedData = updateCompanySchema.parse(body);
      const updated = await prisma.company.update({
        where: { id: company.id },
        data: validatedData,
      });
      return NextResponse.json(updated);
    } else {
      const validatedData = createCompanySchema.parse(body);
      const created = await prisma.company.create({ data: validatedData });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Failed to update company" },
      { status: 500 },
    );
  }
}
