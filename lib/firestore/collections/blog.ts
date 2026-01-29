// Blog Posts Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, BlogPost } from "../types";

const COLLECTION = COLLECTIONS.BLOG_POSTS;

export const blogService = {
  // Get all blog posts
  async findMany(
    filters?: { published?: boolean; category?: string },
    options?: { limit?: number; orderBy?: "publishedAt" | "createdAt" | "views" },
  ) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }

    return firestoreService.findMany<BlogPost>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: options?.orderBy || "publishedAt", direction: "desc" }],
      limit: options?.limit,
    });
  },

  // Get blog post by ID
  async findById(id: string) {
    return firestoreService.findById<BlogPost>(COLLECTION, id);
  },

  // Get blog post by slug
  async findBySlug(slug: string) {
    return firestoreService.findByField<BlogPost>(COLLECTION, "slug", slug);
  },

  // Get published posts
  async findPublished(limit?: number) {
    return this.findMany({ published: true }, { limit, orderBy: "publishedAt" });
  },

  // Get posts by category
  async findByCategory(category: string, limit?: number) {
    return this.findMany({ category, published: true }, { limit });
  },

  // Create a blog post
  async create(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<BlogPost>(COLLECTION, data);
  },

  // Update a blog post
  async update(id: string, data: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<BlogPost>(COLLECTION, id, data);
  },

  // Delete a blog post
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Increment view count
  async incrementViews(id: string) {
    const post = await this.findById(id);
    if (post) {
      return this.update(id, { views: (post.views || 0) + 1 });
    }
    return null;
  },

  // Count blog posts
  async count(filters?: { published?: boolean; category?: string }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },
};
