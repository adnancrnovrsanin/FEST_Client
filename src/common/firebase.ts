// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu2ENxyq9uV3yYdeS1X4scYM9mYedmv_8",
  authDomain: "fest-591b4.firebaseapp.com",
  projectId: "fest-591b4",
  storageBucket: "fest-591b4.appspot.com",
  messagingSenderId: "565653076647",
  appId: "1:565653076647:web:5b00f87bda55e02a88b982",
  measurementId: "G-TWFCYRMV5G"
};

// Initialize Firebase
export const getFirebaseApp = () => initializeApp(firebaseConfig);