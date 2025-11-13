import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// GET: Get single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

// PUT: Update post (auth required)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin-session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await request.json();

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If slug is being changed, check if new slug is available
    if (body.slug && body.slug !== slug) {
      const slugTaken = await prisma.blogPost.findUnique({
        where: { slug: body.slug },
      });

      if (slugTaken) {
        return NextResponse.json(
          { error: "This slug is already in use" },
          { status: 400 },
        );
      }
    }

    // Update the post
    const updatedPost = await prisma.blogPost.update({
      where: { slug },
      data: {
        slug: body.slug || slug,
        titleEn: body.titleEn,
        titleAr: body.titleAr || null,
        excerptEn: body.excerptEn,
        excerptAr: body.excerptAr || null,
        contentEn: body.contentEn,
        contentAr: body.contentAr || null,
        featuredImage: body.featuredImage || null,
        category: body.category,
        tags: body.tags || [],
        author: body.author || "Kitchen Core Team",
        readingTime: body.readingTime || 5,
        published: body.published,
        publishedAt:
          body.published && body.publishedAt
            ? new Date(body.publishedAt)
            : null,
        seoTitle: body.seoTitle || null,
        seoDescription: body.seoDescription || null,
        seoKeywords: body.seoKeywords || [],
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

// DELETE: Delete post (auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin-session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;

    // Check if post exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Delete the post
    await prisma.blogPost.delete({
      where: { slug },
    });

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
