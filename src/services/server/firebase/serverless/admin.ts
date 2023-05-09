import * as admin from 'firebase-admin';

// TODO: Get keys in environment variables

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_PRIVATE_KEY!)),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export default admin;
