// Firebase Admin SDK Configuration (Server-side only)
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";
import { getStorage, Storage } from "firebase-admin/storage";

// Check if we have all required environment variables
const hasServiceAccount =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

interface FirebaseAdminServices {
  adminApp: App;
  adminDb: Firestore;
  adminAuth: Auth;
  adminStorage: Storage;
}

function initializeFirebaseAdmin(): FirebaseAdminServices {
  let app: App;

  if (getApps().length === 0) {
    if (hasServiceAccount) {
      // Initialize with service account credentials
      app = initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      // Fallback: Initialize with default credentials (for local dev with emulator)
      console.warn(
        "Firebase Admin: No service account credentials found. Using default initialization."
      );
      app = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    }
  } else {
    app = getApps()[0];
  }

  return {
    adminApp: app,
    adminDb: getFirestore(app),
    adminAuth: getAuth(app),
    adminStorage: getStorage(app),
  };
}

// Initialize on import
const firebaseAdmin = initializeFirebaseAdmin();

export const adminApp = firebaseAdmin.adminApp;
export const adminDb = firebaseAdmin.adminDb;
export const adminAuth = firebaseAdmin.adminAuth;
export const adminStorage = firebaseAdmin.adminStorage;
export { firebaseAdmin };
