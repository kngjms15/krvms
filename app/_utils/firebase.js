// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Jaomu0Ois-smK4Rg_KTbAhXzKqBx9tw",
  authDomain: "krvms-72425.firebaseapp.com",
  projectId: "krvms-72425",
  storageBucket: "krvms-72425.appspot.com",
  messagingSenderId: "241039810941",
  appId: "1:241039810941:web:7acb9b6fc2b52acc65ec14"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };