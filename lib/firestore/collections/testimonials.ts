// Testimonials Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Testimonial } from "../types";

const COLLECTION = COLLECTIONS.TESTIMONIALS;

export const testimonialsService = {
  // Get all testimonials
  async findMany(filters?: { published?: boolean; featured?: boolean }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.featured !== undefined) {
      whereConditions.push({ field: "featured", op: "==", value: filters.featured });
    }

    return firestoreService.findMany<Testimonial>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get testimonial by ID
  async findById(id: string) {
    return firestoreService.findById<Testimonial>(COLLECTION, id);
  },

  // Get featured testimonials
  async findFeatured(limit?: number) {
    return this.findMany({ featured: true, published: true }, { limit });
  },

  // Create a testimonial
  async create(data: Omit<Testimonial, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Testimonial>(COLLECTION, data);
  },

  // Update a testimonial
  async update(id: string, data: Partial<Omit<Testimonial, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Testimonial>(COLLECTION, id, data);
  },

  // Delete a testimonial
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Reorder testimonials
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<Testimonial>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },
};
