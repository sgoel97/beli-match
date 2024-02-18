// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtRVuffLhGrEclezlrDmJ9mLX-qafBoOQ",
  authDomain: "beli-match.firebaseapp.com",
  projectId: "beli-match",
  storageBucket: "beli-match.appspot.com",
  messagingSenderId: "681031852804",
  appId: "1:681031852804:web:5e2a47572749b19a086651",
  measurementId: "G-FS4NG19DTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;