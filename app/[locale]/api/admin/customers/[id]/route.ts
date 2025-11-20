import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single customer with full details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        projects: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            slug: true,
            category: true,
            location: true,
            year: true,
            area: true,
            budget: true,
            published: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
        },
        interactions: {
          orderBy: { createdAt: "desc" },
          take: 50, // Limit to recent 50 interactions
        },
        _count: {
          select: {
            projects: true,
            interactions: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json(
      { error: "Failed to fetch customer" },
      { status: 500 },
    );
  }
}

// PUT - Update customer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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

    // Check if email is already taken by another customer
    const existingCustomer = await prisma.customer.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "This email is already in use by another customer" },
        { status: 400 },
      );
    }

    // Update customer
    const customer = await prisma.customer.update({
      where: { id },
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

    return NextResponse.json(customer);
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 },
    );
  }
}

// DELETE - Delete customer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    // Check if customer has projects
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found" },
        { status: 404 },
      );
    }

    // Warn if customer has projects (soft warning, still allow deletion)
    if (customer._count.projects > 0) {
      console.warn(
        `Deleting customer ${id} who has ${customer._count.projects} project(s)`,
      );
    }

    await prisma.customer.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 },
    );
  }
}
