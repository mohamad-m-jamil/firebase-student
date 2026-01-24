// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwdyp0gPBl4DwmOg5aufwMl4CgkI_DId0",
  authDomain: "fir-student-80ba1.firebaseapp.com",
  projectId: "fir-student-80ba1",
  storageBucket: "fir-student-80ba1.firebasestorage.app",
  messagingSenderId: "428053521321",
  appId: "1:428053521321:web:d85ecb4283ac3e9d4b1ab8",
  measurementId: "G-ZPPWLXBKC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);