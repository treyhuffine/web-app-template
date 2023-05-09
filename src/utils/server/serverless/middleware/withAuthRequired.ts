import { NextApiRequest, NextApiResponse } from 'next';
import { getBearerToken } from 'services/server/firebase/serverless/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/serverless/getValidViewerFromToken';
import { response401UnauthorizedError } from 'utils/server/serverless/http';

type TokenValidationResponse = Awaited<ReturnType<typeof getValidViewerFromToken>>;

export type NextApiRequestWithAuthRequired = NextApiRequest & {
  auth: TokenValidationResponse;
};

export const withAuthRequired =
  (
    handler: (
      request: NextApiRequestWithAuthRequired,
      response: NextApiResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithAuthRequired, response: NextApiResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;
    } catch (error) {
      return response401UnauthorizedError(response, 'You must be logged in');
    }

    return handler(request, response);
  };
