import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createBlogPostSchema, blogQuerySchema } from "@/lib/validations/blog";
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api/response";

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
    // Check authentication with NextAuth
    const session = await getServerSession(authOptions);

    if (!session) {
      return errorResponse("Unauthorized", 401);
    }

    const body = await request.json();

    // Validate request body with Zod
    const validation = createBlogPostSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const data = validation.data;

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return errorResponse("A post with this slug already exists", 400);
    }

    // Create the blog post
    const post = await prisma.blogPost.create({
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleAr: data.titleAr || null,
        excerptEn: data.excerptEn,
        excerptAr: data.excerptAr || null,
        contentEn: data.contentEn,
        contentAr: data.contentAr || null,
        featuredImage: data.featuredImage || null,
        category: data.category,
        tags: data.tags,
        author: data.author,
        readingTime: data.readingTime,
        published: data.published,
        publishedAt: data.published && data.publishedAt ? new Date(data.publishedAt) : null,
        seoTitle: data.seoTitle || null,
        seoDescription: data.seoDescription || null,
        seoKeywords: data.seoKeywords,
      },
    });

    return successResponse(post, "Blog post created successfully", 201);
  } catch (error) {
    console.error("Error creating blog post:", error);
    return errorResponse("Failed to create blog post", 500);
  }
}
