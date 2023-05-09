import * as admin from 'firebase-admin';

const verifyToken = async (auth: admin.auth.Auth, token: string) => {
  const decodedToken = await auth.verifyIdToken(token);

  return decodedToken;
};

export default verifyToken;
