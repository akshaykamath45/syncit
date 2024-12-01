// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWQDvaGoMtURmZSsPZAEeD9Ic84Xk6_kw",
  authDomain: "syncit-real-time-collaboration.firebaseapp.com",
  projectId: "syncit-real-time-collaboration",
  storageBucket: "syncit-real-time-collaboration.firebasestorage.app",
  messagingSenderId: "910538773249",
  appId: "1:910538773249:web:f8071d486bd2e579940100",
  measurementId: "G-B0FFKE4P5M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
