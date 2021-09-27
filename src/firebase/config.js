import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBu5XISm-BYPmMMrZdeWYXu9lwmuuPrVZk",
    authDomain: "react-course-7a750.firebaseapp.com",
    projectId: "react-course-7a750",
    storageBucket: "react-course-7a750.appspot.com",
    messagingSenderId: "364285678064",
    appId: "1:364285678064:web:c6c86dcecb2bd437898d35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth();

export {
    db,
    googleAuthProvider,
    auth
};