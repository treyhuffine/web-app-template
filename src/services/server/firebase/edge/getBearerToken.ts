import { NextRequest } from 'next/server';

export const getBearerToken = (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization') || '';
  const token = authHeader.split(' ')[1];

  return token;
};
