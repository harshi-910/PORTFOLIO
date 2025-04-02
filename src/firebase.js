import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { useInstantLayoutTransition } from "framer-motion";
import { LampWallDown } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyDocGfCfbEJ-IPAFc1OBQrIqz2sH1yfBy4",
  authDomain: "personal-portfolio-b4ac6.firebaseapp.com",
  projectId: "personal-portfolio-b4ac6",
  storageBucket: "personal-portfolio-b4ac6.appspot.com",
  messagingSenderId: "193279643134",
  appId: "1:193279643134:web:3156d572018b0038a344af",
  measurementId: "G-YN7V8851MR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, db, analytics };



