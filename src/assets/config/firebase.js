// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD44pysBDv6nPSDp7dvYnly8XtQohinyGI",
  authDomain: "escuela-de-futbol-panama.firebaseapp.com",
  projectId: "escuela-de-futbol-panama",
  storageBucket: "escuela-de-futbol-panama.appspot.com",
  messagingSenderId: "571087979620",
  appId: "1:571087979620:web:2a270eaea4dd99eed60b71",
  measurementId: "G-LDR7PX7GBF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)