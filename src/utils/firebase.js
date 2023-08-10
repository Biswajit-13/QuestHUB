// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCO_DqZEYqpg8pGRYM482XzdMhg8jzAL4o",
    authDomain: "asqit-7ed36.firebaseapp.com",
    projectId: "asqit-7ed36",
    storageBucket: "asqit-7ed36.appspot.com",
    messagingSenderId: "370543113408",
    appId: "1:370543113408:web:d68760fe9c150ee47f2925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);