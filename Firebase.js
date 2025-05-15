// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPUgPMR3PcH9DoxbkRN2m7K2e_tF-wLDY",
  authDomain: "appgestionclientes-513b0.firebaseapp.com",
  projectId: "appgestionclientes-513b0",
  storageBucket: "appgestionclientes-513b0.firebasestorage.app",
  messagingSenderId: "1074069582144",
  appId: "1:1074069582144:web:341b4522021168c5bc4aa5"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;