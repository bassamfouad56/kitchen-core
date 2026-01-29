// Services Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Service } from "../types";

const COLLECTION = COLLECTIONS.SERVICES;

export const servicesService = {
  // Get all services
  async findMany(filters?: { published?: boolean }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }

    return firestoreService.findMany<Service>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get service by ID
  async findById(id: string) {
    return firestoreService.findById<Service>(COLLECTION, id);
  },

  // Create a service
  async create(data: Omit<Service, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Service>(COLLECTION, data);
  },

  // Update a service
  async update(id: string, data: Partial<Omit<Service, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Service>(COLLECTION, id, data);
  },

  // Delete a service
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Reorder services
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<Service>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },
};
