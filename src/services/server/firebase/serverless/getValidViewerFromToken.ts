import admin from 'services/server/firebase/serverless/admin';
import verifyToken from './verifyToken';

export const getValidViewerFromToken = async (token: string) => {
  const auth = admin.auth();

  const verifiedToken = await verifyToken(auth, token);

  return verifiedToken;
};
