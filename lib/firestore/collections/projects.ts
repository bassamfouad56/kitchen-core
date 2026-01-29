// Projects Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Project, ProjectCategory } from "../types";

const COLLECTION = COLLECTIONS.PROJECTS;

export interface ProjectFilters {
  category?: ProjectCategory;
  featured?: boolean;
  published?: boolean;
  customerId?: string;
  leadId?: string;
}

export const projectsService = {
  // Get all projects with optional filters
  async findMany(filters?: ProjectFilters, options?: { limit?: number; orderBy?: "order" | "createdAt" }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }
    if (filters?.featured !== undefined) {
      whereConditions.push({ field: "featured", op: "==", value: filters.featured });
    }
    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.customerId) {
      whereConditions.push({ field: "customerId", op: "==", value: filters.customerId });
    }
    if (filters?.leadId) {
      whereConditions.push({ field: "leadId", op: "==", value: filters.leadId });
    }

    return firestoreService.findMany<Project>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: options?.orderBy || "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get project by ID
  async findById(id: string) {
    return firestoreService.findById<Project>(COLLECTION, id);
  },

  // Get project by slug
  async findBySlug(slug: string) {
    return firestoreService.findByField<Project>(COLLECTION, "slug", slug);
  },

  // Get featured projects
  async findFeatured(limit?: number) {
    return this.findMany({ featured: true, published: true }, { limit });
  },

  // Get projects by category
  async findByCategory(category: ProjectCategory, limit?: number) {
    return this.findMany({ category, published: true }, { limit });
  },

  // Create a new project
  async create(data: Omit<Project, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Project>(COLLECTION, data);
  },

  // Update a project
  async update(id: string, data: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Project>(COLLECTION, id, data);
  },

  // Delete a project
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Count projects
  async count(filters?: ProjectFilters) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }
    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },

  // Reorder projects
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<Project>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },
};
