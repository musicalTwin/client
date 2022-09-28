import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvSSn6mQdGw5f6HAS4SciKitwiLyko_Tk",
  authDomain: "musicaltwin-37f56.firebaseapp.com",
  projectId: "musicaltwin-37f56",
  storageBucket: "musicaltwin-37f56.appspot.com",
  databaseURL:
    "https://musicaltwin-37f56-default-rtdb.europe-west1.firebasedatabase.app",
  messagingSenderId: "612895950611",
  appId: "1:612895950611:web:9e654ea708f86efc1b7ce6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
