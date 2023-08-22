// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCNDh2MMfxBZ5rIw9kzYlNyzs5KQSsp2I",
  authDomain: "project1-1ff23.firebaseapp.com",
  projectId: "project1-1ff23",
  storageBucket: "project1-1ff23.appspot.com",
  messagingSenderId: "80218518559",
  appId: "1:80218518559:web:26040663b75614af3ad12a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth, db}


