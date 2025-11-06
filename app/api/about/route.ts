import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch company information
    const company = await prisma.company.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    // Fetch all published team members
    const teamMembers = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });

    // Fetch founder information
    const founder = await prisma.founder.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      company,
      teamMembers,
      founder,
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    return NextResponse.json(
      { error: "Failed to fetch about data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
