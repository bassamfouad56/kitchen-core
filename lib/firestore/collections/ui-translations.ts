// UI Translations Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, UITranslation } from "../types";

const COLLECTION = COLLECTIONS.UI_TRANSLATIONS;

export const uiTranslationsService = {
  // Get all translations
  async findMany(filters?: { published?: boolean; category?: string }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }
    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }

    return firestoreService.findMany<UITranslation>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get translation by ID
  async findById(id: string) {
    return firestoreService.findById<UITranslation>(COLLECTION, id);
  },

  // Get translation by key
  async findByKey(key: string) {
    return firestoreService.findByField<UITranslation>(COLLECTION, "key", key);
  },

  // Get translations by category
  async findByCategory(category: string) {
    return this.findMany({ category, published: true });
  },

  // Get all unique categories
  async getCategories() {
    const translations = await this.findMany({ published: true });
    const categories = [...new Set(translations.map((t) => t.category))];
    return categories.sort();
  },

  // Create a translation
  async create(data: Omit<UITranslation, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<UITranslation>(COLLECTION, data);
  },

  // Update a translation
  async update(id: string, data: Partial<Omit<UITranslation, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<UITranslation>(COLLECTION, id, data);
  },

  // Delete a translation
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Bulk create translations
  async createMany(items: Array<Omit<UITranslation, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.createMany<UITranslation>(COLLECTION, items);
  },

  // Count translations
  async count(filters?: { category?: string }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },
};
