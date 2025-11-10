import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6YUebdFXP1JdgedhMFk1N3nBcRYB_jCA",
  authDomain: "asisten-guru-ai.firebaseapp.com",
  projectId: "asisten-guru-ai",
  storageBucket: "asisten-guru-ai.firebasestorage.app",
  messagingSenderId: "602319866131",
  appId: "1:602319866131:web:6b7034d8a93833274cf2e6",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
