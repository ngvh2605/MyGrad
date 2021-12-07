import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Replace the following with the config for your own Firebase project
// https://firebase.google.com/docs/web/setup#config-object
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTO1GR8hH_se8ogF_VneMbe0_iWxvhq7k",
  authDomain: "vitgraduation.firebaseapp.com",
  projectId: "vitgraduation",
  storageBucket: "vitgraduation.appspot.com",
  messagingSenderId: "585874350240",
  appId: "1:585874350240:web:f74d3cb3c29c55866629c5",
  measurementId: "G-KSTBQ4RECC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const firestore = getFirestore(app)
export const storage = getStorage(app)
export const database = getDatabase(app)
