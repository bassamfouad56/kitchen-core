import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get single user
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
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

// PUT - Update user
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
    if (!data.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Check if email is already taken by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        email: data.email,
        NOT: { id },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already in use by another user" },
        { status: 400 },
      );
    }

    // Prevent users from changing their own role
    const currentUser = await prisma.user.findUnique({ where: { id } });
    if (
      currentUser?.email === session.user?.email &&
      data.role !== currentUser.role
    ) {
      return NextResponse.json(
        { error: "You cannot change your own role" },
        { status: 403 },
      );
    }

    // Update user
    const user = await prisma.user.update({
      where: { id },
      data: {
        name: data.name || null,
        email: data.email,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE - Delete user
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
    // Get the user to be deleted
    const userToDelete = await prisma.user.findUnique({
      where: { id },
      select: { email: true },
    });

    if (!userToDelete) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prevent self-deletion
    if (userToDelete.email === session.user?.email) {
      return NextResponse.json(
        { error: "You cannot delete yourself" },
        { status: 403 },
      );
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
