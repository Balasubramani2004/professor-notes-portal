// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 // apiKey: "",
  authDomain: "webb-eb803.firebaseapp.com",
  projectId: "webb-eb803",
  storageBucket: "webb-eb803.firebasestorage.app",
  messagingSenderId: "457196810607",
  appId: "1:457196810607:web:0b4af80a19afd9fab8789a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);  // ⭐ storage added
