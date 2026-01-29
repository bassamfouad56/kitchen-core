// Customers Collection Service
import { firestoreService } from "../service";
import { COLLECTIONS, Customer, CustomerInteraction, CustomerStatus, CustomerType, LeadSource } from "../types";

const COLLECTION = COLLECTIONS.CUSTOMERS;
const INTERACTIONS_COLLECTION = COLLECTIONS.CUSTOMER_INTERACTIONS;

export interface CustomerFilters {
  status?: CustomerStatus;
  customerType?: CustomerType;
  source?: LeadSource;
  assignedTo?: string;
}

export const customersService = {
  // Get all customers
  async findMany(filters?: CustomerFilters, options?: { limit?: number; orderBy?: "createdAt" | "updatedAt" }) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.status) {
      whereConditions.push({ field: "status", op: "==", value: filters.status });
    }
    if (filters?.customerType) {
      whereConditions.push({ field: "customerType", op: "==", value: filters.customerType });
    }
    if (filters?.source) {
      whereConditions.push({ field: "source", op: "==", value: filters.source });
    }
    if (filters?.assignedTo) {
      whereConditions.push({ field: "assignedTo", op: "==", value: filters.assignedTo });
    }

    return firestoreService.findMany<Customer>(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
      orderBy: [{ field: options?.orderBy || "createdAt", direction: "desc" }],
      limit: options?.limit,
    });
  },

  // Get customer by ID
  async findById(id: string) {
    return firestoreService.findById<Customer>(COLLECTION, id);
  },

  // Get customer by email
  async findByEmail(email: string) {
    return firestoreService.findByField<Customer>(COLLECTION, "email", email);
  },

  // Create a customer
  async create(data: Omit<Customer, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<Customer>(COLLECTION, data);
  },

  // Update a customer
  async update(id: string, data: Partial<Omit<Customer, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<Customer>(COLLECTION, id, data);
  },

  // Delete a customer
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

  // Update customer status
  async updateStatus(id: string, status: CustomerStatus) {
    return this.update(id, { status });
  },

  // Count customers
  async count(filters?: CustomerFilters) {
    const whereConditions: Array<{ field: string; op: "=="; value: unknown }> = [];

    if (filters?.status) {
      whereConditions.push({ field: "status", op: "==", value: filters.status });
    }
    if (filters?.customerType) {
      whereConditions.push({ field: "customerType", op: "==", value: filters.customerType });
    }

    return firestoreService.count(COLLECTION, {
      where: whereConditions.length > 0 ? whereConditions : undefined,
    });
  },

  // ===== INTERACTIONS =====

  // Get interactions for a customer
  async getInteractions(customerId: string) {
    return firestoreService.findMany<CustomerInteraction>(INTERACTIONS_COLLECTION, {
      where: [{ field: "customerId", op: "==", value: customerId }],
      orderBy: [{ field: "createdAt", direction: "desc" }],
    });
  },

  // Add interaction
  async addInteraction(data: Omit<CustomerInteraction, "id" | "createdAt" | "updatedAt">) {
    return firestoreService.create<CustomerInteraction>(INTERACTIONS_COLLECTION, data);
  },

  // Update interaction
  async updateInteraction(id: string, data: Partial<Omit<CustomerInteraction, "id" | "createdAt" | "updatedAt">>) {
    return firestoreService.update<CustomerInteraction>(INTERACTIONS_COLLECTION, id, data);
  },

  // Delete interaction
  async deleteInteraction(id: string) {
    return firestoreService.remove(INTERACTIONS_COLLECTION, id);
  },
};
