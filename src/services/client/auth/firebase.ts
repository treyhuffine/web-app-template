import { getAnalytics } from 'firebase/analytics';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getIsNativePlatform } from 'utils/mobile/getIsNativePlatform';

// NOTE: CHANGE THESE
const DEV_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
  databaseURL: '',
};

const PROD_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
  databaseURL: '',
};

export const firebaseConfig = process.env.APP_STAGE !== 'production' ? DEV_CONFIG : PROD_CONFIG;

let app: FirebaseApp | undefined;

if (!app) {
  app = initializeApp(firebaseConfig);
}

let auth: Auth;
if (getIsNativePlatform()) {
  auth = initializeAuth(app, { persistence: indexedDBLocalPersistence });
} else {
  auth = getAuth(app);
}
const storage = getStorage(app);
const database = getDatabase(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

if (process.env.APP_STAGE !== 'production') {
  console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
}

export { auth, storage, database, analytics };
