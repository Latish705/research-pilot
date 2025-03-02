import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.FIREBASE_CREDENTIALS) {
  throw new Error("FIREBASE_CREDENTIALS is not set or is empty.");
}

const FIREBASE_CREDENTIALS = JSON.parse(
  process.env.FIREBASE_CREDENTIALS as string
);

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS),
});

export default admin;
