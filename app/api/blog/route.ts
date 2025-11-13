import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

// GET: List all blog posts with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const published = searchParams.get("published");
    const search = searchParams.get("search");

    const where: Prisma.BlogPostWhereInput = {};

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by tag
    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    // Filter by published status
    if (published !== null && published !== undefined) {
      where.published = published === "true";
    }

    // Search in title and excerpt
    if (search) {
      where.OR = [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleAr: { contains: search, mode: "insensitive" } },
        { excerptEn: { contains: search, mode: "insensitive" } },
        { excerptAr: { contains: search, mode: "insensitive" } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}

// POST: Create new blog post (auth required)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get("admin-session");

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      slug,
      titleEn,
      titleAr,
      excerptEn,
      excerptAr,
      contentEn,
      contentAr,
      featuredImage,
      category,
      tags,
      author,
      readingTime,
      published,
      publishedAt,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = body;

    // Validate required fields
    if (!slug || !titleEn || !excerptEn || !contentEn || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 },
      );
    }

    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        slug,
        titleEn,
        titleAr: titleAr || null,
        excerptEn,
        excerptAr: excerptAr || null,
        contentEn,
        contentAr: contentAr || null,
        featuredImage: featuredImage || null,
        category,
        tags: tags || [],
        author: author || "Kitchen Core Team",
        readingTime: readingTime || 5,
        published: published || false,
        publishedAt: published && publishedAt ? new Date(publishedAt) : null,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        seoKeywords: seoKeywords || [],
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 },
    );
  }
}
