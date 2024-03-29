// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Authentication SDK
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firestore SDK
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOV1Bq7iylU3h9DAm9ZflRjgj-tt4Y9mw",
  authDomain: "to-do-list-224cb.firebaseapp.com",
  projectId: "to-do-list-224cb",
  storageBucket: "to-do-list-224cb.appspot.com",
  messagingSenderId: "481756041238",
  appId: "1:481756041238:web:75c8126dfb4176af06a537"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Preparing Auth and Firestore to use in Our App
export const auth = getAuth(app);
export const db = getFirestore(app);

// Email&Password Authentication
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Creating User with Authentication
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};