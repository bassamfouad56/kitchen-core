// Contact Submissions Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, ContactSubmission } from "../types";

const COLLECTION = COLLECTIONS.CONTACT_SUBMISSIONS;

export const contactSubmissionsService = {
  // Get all contact submissions
  async findMany(filters?: { processed?: boolean }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.processed !== undefined) {
      whereConditions.push({ field: "processed", op: "==", value: filters.processed });
    }

    return firestoreService.findMany<ContactSubmission>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "createdAt", direction: "desc" }],
      limit: options?.limit,
    });
  },

  // Get contact submission by ID
  async findById(id: string) {
    return firestoreService.findById<ContactSubmission>(COLLECTION, id);
  },

  // Get unprocessed submissions
  async findUnprocessed(limit?: number) {
    return this.findMany({ processed: false }, { limit });
  },

  // Create a contact submission
  async create(data: Omit<ContactSubmission, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<ContactSubmission>(COLLECTION, {
      ...data,
      processed: false,
    });
  },

  // Update a contact submission
  async update(id: string, data: Partial<Omit<ContactSubmission, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<ContactSubmission>(COLLECTION, id, data);
  },

  // Mark as processed
  async markProcessed(id: string, processedBy: string, notes?: string) {
    return this.update(id, {
      processed: true,
      processedBy,
      processedAt: new Date() as unknown as undefined, // Will be converted to Timestamp
      notes,
    });
  },

  // Delete a contact submission
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Count submissions
  async count(filters?: { processed?: boolean }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.processed !== undefined) {
      whereConditions.push({ field: "processed", op: "==", value: filters.processed });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },
};
