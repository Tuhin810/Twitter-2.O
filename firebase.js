// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFn9-gm_p7pJ5Tt9dc6cExe2cmFvh0pw",
  authDomain: "twitter-2-a6942.firebaseapp.com",
  projectId: "twitter-2-a6942",
  storageBucket: "twitter-2-a6942.appspot.com",
  messagingSenderId: "612046248529",
  appId: "1:612046248529:web:afaca4b5f8f1dae37e7670",
  measurementId: "G-KNTHWGRJN2"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };