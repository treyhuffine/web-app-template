import client from './client';

export const getValidViewerFromToken = async (idToken: string) => {
  return client.verifyIdToken(idToken);
};
