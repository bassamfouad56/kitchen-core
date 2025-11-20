import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// GET - List all customers with optional filtering
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    // Build filter conditions
    const where: Prisma.CustomerWhereInput = {};

    if (status) {
      where.status = status as Prisma.CustomerWhereInput["status"];
    }

    if (type) {
      where.customerType = type as Prisma.CustomerWhereInput["customerType"];
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    }

    const customers = await prisma.customer.findMany({
      where,
      include: {
        projects: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            category: true,
            year: true,
            published: true,
          },
        },
        _count: {
          select: {
            projects: true,
            interactions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 },
    );
  }
}

// POST - Create new customer
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await request.json();

    // Validation
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "A customer with this email already exists" },
        { status: 400 },
      );
    }

    // Create customer
    const customer = await prisma.customer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        jobTitle: data.jobTitle || null,
        address: data.address || null,
        city: data.city || null,
        country: data.country || null,
        customerType: data.customerType || "INDIVIDUAL",
        status: data.status || "ACTIVE",
        source: data.source || null,
        leadId: data.leadId || null,
        assignedTo: data.assignedTo || null,
        notes: data.notes || null,
        tags: data.tags || [],
        metadata: data.metadata || null,
      },
      include: {
        _count: {
          select: {
            projects: true,
            interactions: true,
          },
        },
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 },
    );
  }
}
