import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHeB0QNUfXki5fJWMosoMAiNmTi-bFY7E",
  authDomain: "bearlearn-ded08.firebaseapp.com",
  projectId: "bearlearn-ded08",
  storageBucket: "bearlearn-ded08.firebasestorage.app",
  messagingSenderId: "595679283179",
  appId: "1:595679283179:web:eed695782510e6d18ffbae",
  measurementId: "G-91CSKR3FQR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 