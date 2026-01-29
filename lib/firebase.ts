// Firebase Client SDK Configuration
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

interface FirebaseServices {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
  storage: FirebaseStorage;
}

// Initialize Firebase (singleton pattern)
function initializeFirebase(): FirebaseServices {
  let firebaseApp: FirebaseApp;

  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApps()[0];
  }

  return {
    app: firebaseApp,
    db: getFirestore(firebaseApp),
    auth: getAuth(firebaseApp),
    storage: getStorage(firebaseApp),
  };
}

// Initialize analytics only on client side
let analytics: Analytics | null = null;

async function initializeAnalytics(): Promise<Analytics | null> {
  const firebase = initializeFirebase();
  if (typeof window !== "undefined" && (await isSupported())) {
    analytics = getAnalytics(firebase.app);
  }
  return analytics;
}

// Initialize on import
const firebase = initializeFirebase();

export const app = firebase.app;
export const db = firebase.db;
export const auth = firebase.auth;
export const storage = firebase.storage;
export { firebase, initializeAnalytics };
