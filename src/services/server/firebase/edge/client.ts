import { FlarebaseAuth } from '@marplex/flarebase-auth';

const createClient = () => {
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('FIREBASE_PRIVATE_KEY is not defined in environment variables');
  }
  if (!process.env.FIREBASE_API_KEY) {
    throw new Error('FIREBASE_API_KEY is not defined in environment variables');
  }

  const firebasePrivateKey = JSON.parse(process.env.FIREBASE_PRIVATE_KEY);

  const client = new FlarebaseAuth({
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: firebasePrivateKey.project_id,
    privateKey: firebasePrivateKey.private_key,
    serviceAccountEmail: firebasePrivateKey.client_email,
  });

  return client;
};

const client = createClient();

export default client;
