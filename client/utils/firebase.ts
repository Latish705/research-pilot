// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth"; // Authentication

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider);

  return user;
};

export const emailPasswordSignIn = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const getCurrentUserToken = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          localStorage.setItem("token", token); // Optional: Save the token for reuse
          resolve(token);
        } catch (error) {
          console.error("Error fetching token:", error);
          reject(null);
        }
      } else {
        resolve(null); // No user is signed in
      }
    });
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User signed in:", user);

    // Get and store the fresh token whenever the auth state changes
    user.getIdToken(true).then((newToken) => {
      console.log("Updated Access Token:", newToken);
      localStorage.setItem("accessToken", newToken); // Store the updated access token
      //@ts-ignore
      localStorage.setItem("refreshToken", user.stsTokenManager.refreshToken); // Store the updated refresh token
    });
  } else {
    console.log("No user signed in");
  }
});

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const signOut = async () => {
  await auth.signOut();
  localStorage.removeItem("token");
};

export { app, auth };
