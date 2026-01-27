// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAin6uxUfXzx007hFyux7iW_58yUMx-ZLw",
  authDomain: "netflixgpt-8d92f.firebaseapp.com",
  projectId: "netflixgpt-8d92f",
  storageBucket: "netflixgpt-8d92f.firebasestorage.app",
  messagingSenderId: "93090865498",
  appId: "1:93090865498:web:b6b5fab48c875ea2fbd363",
  measurementId: "G-1123ZGBG9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();