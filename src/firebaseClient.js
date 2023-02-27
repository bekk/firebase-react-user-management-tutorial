// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX_rZwpg3Yprll0smKrprjjYqtGE8bMHE",
  authDomain: "fir-user-management-4f7a0.firebaseapp.com",
  projectId: "fir-user-management-4f7a0",
  storageBucket: "fir-user-management-4f7a0.appspot.com",
  messagingSenderId: "943762913741",
  appId: "1:943762913741:web:86b9ce102e0a45da272c84",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
