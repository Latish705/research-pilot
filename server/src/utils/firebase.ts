import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const FIREBASE_CREDENTIALS = JSON.parse(
  process.env.FIREBASE_CREDENTIALS as string
);

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS),
});

export default admin;
