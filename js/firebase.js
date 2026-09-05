// ===============================
// Firebase Configuration
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// ===============================
// Firebase Config
// ===============================

const firebaseConfig = {
    apiKey: "AIzaSyC3o8KECPKdLq5D7aLQq2hU1LnvaXrJrF0",
    authDomain: "nutricare-26a6a.firebaseapp.com",
    projectId: "nutricare-26a6a",
    storageBucket: "nutricare-26a6a.firebasestorage.app",
    messagingSenderId: "437434771934",
    appId: "1:437434771934:web:ddc7caeaeb3466ebdfd54f"
};

// ===============================
// Initialize Firebase
// ===============================

const app = initializeApp(firebaseConfig);

// ===============================
// Export Services
// ===============================

export const auth = getAuth(app);

export const db = getFirestore(app);