import { NextApiRequest, NextApiResponse } from 'next';
import { getBearerToken } from 'services/server/firebase/serverless/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/serverless/getValidViewerFromToken';

type TokenValidationResponse = Awaited<ReturnType<typeof getValidViewerFromToken>>;

export interface NextApiRequestWithAuthOptional extends NextApiRequest {
  auth?: TokenValidationResponse | null;
}

export const withAuthOptional =
  (
    handler: (
      request: NextApiRequestWithAuthOptional,
      response: NextApiResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithAuthOptional, response: NextApiResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;
    } catch (error) {
      // Ignore: this could fail but the auth is optional
      request.auth = null;
    }

    return handler(request, response);
  };
