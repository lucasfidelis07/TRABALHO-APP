import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA57gCFjUOqVRkHDLL1HMnEubhO9Wm5wNg",
  authDomain: "bddapp-3a0ed.firebaseapp.com",
  projectId: "bddapp-3a0ed",
  storageBucket: "bddapp-3a0ed.appspot.com",
  messagingSenderId: "210956940243",
  appId: "1:210956940243:web:d1085301c11ec4a7633526",
  measurementId: "G-08X9BZ43FR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
