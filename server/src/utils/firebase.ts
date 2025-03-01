import * as admin from "firebase-admin";

const Firebase_Credentials = process.env.FIREBASE_CREDENTIALS;

admin.initializeApp({
  credential: admin.credential.cert(Firebase_Credentials!),
});

export default admin;
