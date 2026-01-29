// Statistics Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Statistic, StatSection } from "../types";

const COLLECTION = COLLECTIONS.STATISTICS;

export const statisticsService = {
  // Get all statistics
  async findMany(filters?: { published?: boolean; section?: StatSection }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.section) {
      whereConditions.push({ field: "section", op: "==", value: filters.section });
    }

    return firestoreService.findMany<Statistic>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get statistics by section
  async findBySection(section: StatSection) {
    return this.findMany({ section, published: true });
  },

  // Get statistic by ID
  async findById(id: string) {
    return firestoreService.findById<Statistic>(COLLECTION, id);
  },

  // Create a statistic
  async create(data: Omit<Statistic, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Statistic>(COLLECTION, data);
  },

  // Update a statistic
  async update(id: string, data: Partial<Omit<Statistic, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Statistic>(COLLECTION, id, data);
  },

  // Delete a statistic
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Reorder statistics
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<Statistic>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },
};
