// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cloud-file-manager-a4f50.firebaseapp.com",
  projectId: "cloud-file-manager-a4f50",
  storageBucket: "cloud-file-manager-a4f50.appspot.com",
  messagingSenderId: "251329585586",
  appId: "1:251329585586:web:6ee4eebfe07c2aa3ad04ab",
  measurementId: "G-BHMP9D7LTC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);