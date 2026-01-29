// Gallery Images Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, GalleryImage, ProjectCategory, GallerySize } from "../types";

const COLLECTION = COLLECTIONS.GALLERY_IMAGES;

export interface GalleryFilters {
  category?: ProjectCategory;
  size?: GallerySize;
  published?: boolean;
}

export const galleryService = {
  // Get all gallery images
  async findMany(filters?: GalleryFilters, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.category) {
      whereConditions.push({ field: "category", op: "==", value: filters.category });
    }
    if (filters?.size) {
      whereConditions.push({ field: "size", op: "==", value: filters.size });
    }
    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }

    return firestoreService.findMany<GalleryImage>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get gallery image by ID
  async findById(id: string) {
    return firestoreService.findById<GalleryImage>(COLLECTION, id);
  },

  // Get images by category
  async findByCategory(category: ProjectCategory, limit?: number) {
    return this.findMany({ category, published: true }, { limit });
  },

  // Create a gallery image
  async create(data: Omit<GalleryImage, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<GalleryImage>(COLLECTION, data);
  },

  // Update a gallery image
  async update(id: string, data: Partial<Omit<GalleryImage, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<GalleryImage>(COLLECTION, id, data);
  },

  // Delete a gallery image
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Reorder gallery images
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<GalleryImage>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },

  // Count gallery images
  async count(filters?: GalleryFilters) {
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
};
