// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh4wHpBIorXAhlPHzPgR1HTn2J04vLPLQ",
  authDomain: "ielts-df6b6.firebaseapp.com",
  projectId: "ielts-df6b6",
  storageBucket: "ielts-df6b6.appspot.com",
  messagingSenderId: "760326689178",
  appId: "1:760326689178:web:e7d7152ada2f67a0062a23",
  measurementId: "G-3GK5XVN1WY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and set up the Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function for signing in with Google
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in: ", user);
      return user;
    })
    .catch((error) => {
      console.error("Error during Google sign-in: ", error);
      throw error;
    });
};

// Function for signing in with email and password
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const user = result.user;
      console.log("User signed in with email: ", user);
      return user;
    })
    .catch((error) => {
      console.error("Error during email sign-in: ", error);
      throw error;
    });
};
