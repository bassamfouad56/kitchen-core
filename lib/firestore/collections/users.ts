// Users Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, User, UserRole } from "../types";

const COLLECTION = COLLECTIONS.USERS;

export const usersService = {
  // Get all users
  async findMany(filters?: { role?: UserRole }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.role) {
      whereConditions.push({ field: "role", op: "==", value: filters.role });
    }

    return firestoreService.findMany<User>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "createdAt", direction: "desc" }],
      limit: options?.limit,
    });
  },

  // Get user by ID
  async findById(id: string) {
    return firestoreService.findById<User>(COLLECTION, id);
  },

  // Get user by email
  async findByEmail(email: string) {
    return firestoreService.findByField<User>(COLLECTION, "email", email);
  },

  // Create a user
  async create(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<User>(COLLECTION, data);
  },

  // Update a user
  async update(id: string, data: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<User>(COLLECTION, id, data);
  },

  // Delete a user
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Update user role
  async updateRole(id: string, role: UserRole) {
    return this.update(id, { role });
  },

  // Count users
  async count(filters?: { role?: UserRole }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.role) {
      whereConditions.push({ field: "role", op: "==", value: filters.role });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },
};
