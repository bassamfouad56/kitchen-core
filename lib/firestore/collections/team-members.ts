// Team Members Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, TeamMember } from "../types";

const COLLECTION = COLLECTIONS.TEAM_MEMBERS;

export const teamMembersService = {
  // Get all team members
  async findMany(filters?: { published?: boolean }, options?: { limit?: number }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.published !== undefined) {
      whereConditions.push({ field: "published", op: "==", value: filters.published });
    }

    return firestoreService.findMany<TeamMember>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: "order", direction: "asc" }],
      limit: options?.limit,
    });
  },

  // Get team member by ID
  async findById(id: string) {
    return firestoreService.findById<TeamMember>(COLLECTION, id);
  },

  // Create a team member
  async create(data: Omit<TeamMember, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<TeamMember>(COLLECTION, data);
  },

  // Update a team member
  async update(id: string, data: Partial<Omit<TeamMember, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<TeamMember>(COLLECTION, id, data);
  },

  // Delete a team member
  async delete(id: string) {
    return firestoreService.remove(COLLECTION, id);
  },

  // Reorder team members
  async reorder(updates: Array<{ id: string; order: number }>) {
    return firestoreService.updateMany<TeamMember>(
      COLLECTION,
      updates.map(({ id, order }) => ({ id, data: { order } })),
    );
  },
};
