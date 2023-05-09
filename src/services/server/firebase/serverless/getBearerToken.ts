import { NextApiRequest } from 'next';

export const getBearerToken = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];

  return token;
};
