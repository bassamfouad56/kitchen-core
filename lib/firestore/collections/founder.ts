// Founder Collection Service (Singleton)
import { firestoreService } from "../service";
import { COLLECTIONS, Founder } from "../types";

const COLLECTION = COLLECTIONS.FOUNDER;
const SINGLETON_ID = "main"; // Fixed ID for singleton document

export const founderService = {
  // Get founder info (singleton)
  async get() {
    const founder = await firestoreService.findById<Founder>(COLLECTION, SINGLETON_ID);
    if (!founder) {
      // Try to find any founder document
      return firestoreService.findFirst<Founder>(COLLECTION);
    }
    return founder;
  },

  // Create or update founder info
  async upsert(data: Omit<Founder, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.upsert<Founder>(COLLECTION, SINGLETON_ID, data);
  },

  // Update founder info
  async update(data: Partial<Omit<Founder, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Founder>(COLLECTION, SINGLETON_ID, data);
  },
};
