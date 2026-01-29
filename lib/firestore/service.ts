// Firestore Service Layer - Generic CRUD Operations
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  Timestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  writeBatch,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { COLLECTIONS } from "./types";

// ===== UTILITY FUNCTIONS =====

// Convert Firestore timestamps to Date objects for API responses
export function serializeDoc<T extends DocumentData>(
  doc: DocumentSnapshot | QueryDocumentSnapshot,
): T & { id: string } {
  const data = doc.data();
  if (!data) {
    throw new Error("Document does not exist");
  }

  const serialized: Record<string, unknown> = { id: doc.id };

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Timestamp) {
      serialized[key] = value.toDate().toISOString();
    } else {
      serialized[key] = value;
    }
  }

  return serialized as T & { id: string };
}

// Convert Date strings to Firestore Timestamps for writes
export function prepareDocForWrite(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const prepared: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Date) {
      prepared[key] = Timestamp.fromDate(value);
    } else if (typeof value === "string" && isISODateString(value)) {
      prepared[key] = Timestamp.fromDate(new Date(value));
    } else {
      prepared[key] = value;
    }
  }

  return prepared;
}

function isISODateString(str: string): boolean {
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
  return isoDateRegex.test(str);
}

// Generate a unique ID (similar to Prisma's cuid)
export function generateId(): string {
  return doc(collection(db, "_")).id;
}

// ===== GENERIC CRUD OPERATIONS =====

interface FindOptions {
  where?: Array<{ field: string; op: "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in"; value: unknown }>;
  orderBy?: Array<{ field: string; direction: "asc" | "desc" }>;
  limit?: number;
  startAfter?: DocumentSnapshot;
}

// Get all documents from a collection
export async function findMany<T extends DocumentData>(
  collectionName: string,
  options?: FindOptions,
): Promise<Array<T & { id: string }>> {
  const constraints: QueryConstraint[] = [];

  if (options?.where) {
    for (const condition of options.where) {
      constraints.push(where(condition.field, condition.op, condition.value));
    }
  }

  if (options?.orderBy) {
    for (const order of options.orderBy) {
      constraints.push(orderBy(order.field, order.direction));
    }
  }

  if (options?.limit) {
    constraints.push(limit(options.limit));
  }

  if (options?.startAfter) {
    constraints.push(startAfter(options.startAfter));
  }

  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => serializeDoc<T>(doc));
}

// Get a single document by ID
export async function findById<T extends DocumentData>(
  collectionName: string,
  id: string,
): Promise<(T & { id: string }) | null> {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return serializeDoc<T>(snapshot);
}

// Get a single document by a unique field
export async function findByField<T extends DocumentData>(
  collectionName: string,
  field: string,
  value: unknown,
): Promise<(T & { id: string }) | null> {
  const q = query(collection(db, collectionName), where(field, "==", value), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return serializeDoc<T>(snapshot.docs[0]);
}

// Get the first document (for singletons like Company, Founder)
export async function findFirst<T extends DocumentData>(
  collectionName: string,
): Promise<(T & { id: string }) | null> {
  const q = query(collection(db, collectionName), limit(1));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return serializeDoc<T>(snapshot.docs[0]);
}

// Create a new document
export async function create<T extends DocumentData>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T & { id: string }> {
  const now = Timestamp.now();
  const preparedData = prepareDocForWrite({
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  const docRef = await addDoc(collection(db, collectionName), preparedData);
  const newDoc = await getDoc(docRef);

  return serializeDoc<T>(newDoc);
}

// Create a document with a specific ID
export async function createWithId<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T & { id: string }> {
  const now = Timestamp.now();
  const preparedData = prepareDocForWrite({
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, preparedData);
  const newDoc = await getDoc(docRef);

  return serializeDoc<T>(newDoc);
}

// Update a document by ID
export async function update<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>,
): Promise<T & { id: string }> {
  const docRef = doc(db, collectionName, id);
  const preparedData = prepareDocForWrite({
    ...data,
    updatedAt: Timestamp.now(),
  });

  await updateDoc(docRef, preparedData);
  const updatedDoc = await getDoc(docRef);

  if (!updatedDoc.exists()) {
    throw new Error(`Document ${id} not found in ${collectionName}`);
  }

  return serializeDoc<T>(updatedDoc);
}

// Upsert a document (create if not exists, update if exists)
export async function upsert<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T & { id: string }> {
  const docRef = doc(db, collectionName, id);
  const existingDoc = await getDoc(docRef);

  if (existingDoc.exists()) {
    return update<T>(collectionName, id, data);
  } else {
    return createWithId<T>(collectionName, id, data);
  }
}

// Delete a document by ID
export async function remove(
  collectionName: string,
  id: string,
): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// Delete multiple documents
export async function removeMany(
  collectionName: string,
  ids: string[],
): Promise<void> {
  const batch = writeBatch(db);

  for (const id of ids) {
    const docRef = doc(db, collectionName, id);
    batch.delete(docRef);
  }

  await batch.commit();
}

// Count documents in a collection
export async function count(
  collectionName: string,
  options?: Pick<FindOptions, "where">,
): Promise<number> {
  const constraints: QueryConstraint[] = [];

  if (options?.where) {
    for (const condition of options.where) {
      constraints.push(where(condition.field, condition.op, condition.value));
    }
  }

  const q = query(collection(db, collectionName), ...constraints);
  const snapshot = await getDocs(q);

  return snapshot.size;
}

// Batch create multiple documents
export async function createMany<T extends DocumentData>(
  collectionName: string,
  items: Array<Omit<T, "id" | "createdAt" | "updatedAt">>,
): Promise<Array<T & { id: string }>> {
  const batch = writeBatch(db);
  const now = Timestamp.now();
  const docRefs: Array<{ ref: ReturnType<typeof doc>; id: string }> = [];

  for (const item of items) {
    const docRef = doc(collection(db, collectionName));
    const preparedData = prepareDocForWrite({
      ...item,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(docRef, preparedData);
    docRefs.push({ ref: docRef, id: docRef.id });
  }

  await batch.commit();

  // Fetch all created documents
  const results: Array<T & { id: string }> = [];
  for (const { ref } of docRefs) {
    const newDoc = await getDoc(ref);
    if (newDoc.exists()) {
      results.push(serializeDoc<T>(newDoc));
    }
  }

  return results;
}

// Batch update multiple documents
export async function updateMany<T extends DocumentData>(
  collectionName: string,
  updates: Array<{ id: string; data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">> }>,
): Promise<void> {
  const batch = writeBatch(db);
  const now = Timestamp.now();

  for (const { id, data } of updates) {
    const docRef = doc(db, collectionName, id);
    const preparedData = prepareDocForWrite({
      ...data,
      updatedAt: now,
    });
    batch.update(docRef, preparedData);
  }

  await batch.commit();
}

// ===== COLLECTION-SPECIFIC EXPORTS =====

export const firestoreService = {
  // Generic operations
  findMany,
  findById,
  findByField,
  findFirst,
  create,
  createWithId,
  update,
  upsert,
  remove,
  removeMany,
  count,
  createMany,
  updateMany,

  // Collection names
  collections: COLLECTIONS,
};

export default firestoreService;
