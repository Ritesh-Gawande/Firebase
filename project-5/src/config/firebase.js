// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0XPfMVxFW0Rt3aRdBH6UTx86pTKIjIdw",
  authDomain: "vite-contact-9b587.firebaseapp.com",
  projectId: "vite-contact-9b587",
  storageBucket: "vite-contact-9b587.appspot.com",
  messagingSenderId: "141501970633",
  appId: "1:141501970633:web:60ec1addcccf2ea821f518"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);