// Leads Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Lead, LeadInteraction, LeadStatus, LeadSource, LeadPriority, ProjectCategory } from "../types";

const COLLECTION = COLLECTIONS.LEADS;
const INTERACTIONS_COLLECTION = COLLECTIONS.LEAD_INTERACTIONS;

export interface LeadFilters {
  status?: LeadStatus;
  source?: LeadSource;
  priority?: LeadPriority;
  projectType?: ProjectCategory;
  assignedTo?: string;
}

export const leadsService = {
  // Get all leads
  async findMany(filters?: LeadFilters, options?: { limit?: number; orderBy?: "createdAt" | "updatedAt" | "nextFollowUp" }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.status) {
      whereConditions.push({ field: "status", op: "==", value: filters.status });
    }
    if (filters?.source) {
      whereConditions.push({ field: "source", op: "==", value: filters.source });
    }
    if (filters?.priority) {
      whereConditions.push({ field: "priority", op: "==", value: filters.priority });
    }
    if (filters?.projectType) {
      whereConditions.push({ field: "projectType", op: "==", value: filters.projectType });
    }
    if (filters?.assignedTo) {
      whereConditions.push({ field: "assignedTo", op: "==", value: filters.assignedTo });
    }

    return firestoreService.findMany<Lead>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: options?.orderBy || "createdAt", direction: "desc" }],
      limit: options?.limit,
    });
  },

  // Get lead by ID
  async findById(id: string) {
    return firestoreService.findById<Lead>(COLLECTION, id);
  },

  // Get lead by email
  async findByEmail(email: string) {
    return firestoreService.findByField<Lead>(COLLECTION, "email", email);
  },

  // Create a lead
  async create(data: Omit<Lead, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Lead>(COLLECTION, data);
  },

  // Update a lead
  async update(id: string, data: Partial<Omit<Lead, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Lead>(COLLECTION, id, data);
  },

  // Delete a lead
  async delete(id: string) {
    // Also delete all interactions
    const interactions = await this.getInteractions(id);
    if (interactions.length > 0) {
      await firestoreService.removeMany(
        INTERACTIONS_COLLECTION,
        interactions.map((i) => i.id),
      );
    }
    return firestoreService.remove(COLLECTION, id);
  },

  // Update lead status
  async updateStatus(id: string, status: LeadStatus) {
    return this.update(id, { status });
  },

  // Count leads
  async count(filters?: LeadFilters) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.status) {
      whereConditions.push({ field: "status", op: "==", value: filters.status });
    }
    if (filters?.source) {
      whereConditions.push({ field: "source", op: "==", value: filters.source });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },

  // ===== INTERACTIONS =====

  // Get interactions for a lead
  async getInteractions(leadId: string) {
    return firestoreService.findMany<LeadInteraction>(INTERACTIONS_COLLECTION, {
      where: [{ field: "leadId", op: "==", value: leadId }],
      orderBy: [{ field: "createdAt", direction: "desc" }],
    });
  },

  // Add interaction
  async addInteraction(data: Omit<LeadInteraction, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<LeadInteraction>(INTERACTIONS_COLLECTION, data);
  },

  // Update interaction
  async updateInteraction(id: string, data: Partial<Omit<LeadInteraction, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<LeadInteraction>(INTERACTIONS_COLLECTION, id, data);
  },

  // Delete interaction
  async deleteInteraction(id: string) {
    return firestoreService.remove(INTERACTIONS_COLLECTION, id);
  },
};
