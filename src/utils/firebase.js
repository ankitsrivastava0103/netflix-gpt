// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqcQrzKY0HkI3TslnRx9AhplxPcgv_ZXU",
  authDomain: "netflix-gpt-df625.firebaseapp.com",
  projectId: "netflix-gpt-df625",
  storageBucket: "netflix-gpt-df625.firebasestorage.app",
  messagingSenderId: "358640944768",
  appId: "1:358640944768:web:420b7e6a3804489edd0865",
  measurementId: "G-H6Z9L02LYV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
