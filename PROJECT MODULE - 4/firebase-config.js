// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

 const firebaseConfig = {
    apiKey: "AIzaSyCQ1cgQuydukNEe3ZmLraujPvBjXAT123Y",
    authDomain: "akshita-hospital.firebaseapp.com",
    databaseURL: "https://akshita-hospital-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "akshita-hospital",
    storageBucket: "akshita-hospital.firebasestorage.app",
    messagingSenderId: "663694107461",
    appId: "1:663694107461:web:3f0be7085bcf8a50fbd42c",
    measurementId: "G-K1M8Y2WDW1"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
 