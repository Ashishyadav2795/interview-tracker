// src/firebase/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvzPQ9Hp4JI1PiKGjIkochhuxxRuulNwI",
  authDomain: "interview-tracker-ff95.firebaseapp.com",
  projectId: "interview-tracker-ff95",
  storageBucket: "interview-tracker-ff95.firebasestorage.app",
  messagingSenderId: "655758422710",
  appId: "1:655758422710:web:4bf52989612a00eb912c17",
  measurementId: "G-00DJW6EJR8",
};

const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);

export default app;