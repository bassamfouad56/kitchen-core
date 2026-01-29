// Company Collection Service (Singleton)
import { firestoreService } from "../service";
import { COLLECTIONS, Company } from "../types";

const COLLECTION = COLLECTIONS.COMPANY;
const SINGLETON_ID = "main"; // Fixed ID for singleton document

export const companyService = {
  // Get company info (singleton)
  async get() {
    const company = await firestoreService.findById<Company>(COLLECTION, SINGLETON_ID);
    if (!company) {
      // Try to find any company document
      return firestoreService.findFirst<Company>(COLLECTION);
    }
    return company;
  },

  // Create or update company info
  async upsert(data: Omit<Company, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.upsert<Company>(COLLECTION, SINGLETON_ID, data);
  },

  // Update company info
  async update(data: Partial<Omit<Company, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Company>(COLLECTION, SINGLETON_ID, data);
  },
};
