import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// First Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA09dIIzv_Zbhn_cyVkf6VHdvF3H436fFA",
  authDomain: "maizedisease.firebaseapp.com",
  projectId: "maizedisease",
  storageBucket: "maizedisease.appspot.com",
  messagingSenderId: "182965644044",
  appId: "1:182965644044:web:53c31371b589188ccab729",
  measurementId: "G-6GF6XM6KJB"
};

// Second Firebase configuration
const superConfig = {
  apiKey: "AIzaSyDeS7FI6TWwZ8EnqjUMsqCrv8PDH9ZOPeE",
  authDomain: "maize-super-user-dashboard.firebaseapp.com",
  projectId: "maize-super-user-dashboard",
  storageBucket: "maize-super-user-dashboard.appspot.com",
  messagingSenderId: "746411405849",
  appId: "1:746411405849:web:8aea67462529405da4f088",
  measurementId: "G-CPHTY4L53P"
};

// Initialize the first Firebase app instance
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

// Initialize the second Firebase app instance
const superApp = initializeApp(superConfig, "superApp");
export const superDb = getFirestore(superApp);
export const superAuth = getAuth(superApp);
export const superStorage = getStorage(superApp);

// email:supersuser@gmail.com
// password:superuser123

// Export the app and superApp instances
export { app, superApp };
