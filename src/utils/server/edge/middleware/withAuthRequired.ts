import { NextRequest, NextResponse } from 'next/server';
import { getBearerToken } from 'services/server/firebase/edge/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/edge/getValidViewerFromToken';
import { response401UnauthorizedError } from 'utils/server/edge/http';

type TokenValidationResponse = Awaited<ReturnType<typeof getValidViewerFromToken>>;

export type NextApiRequestWithAuthRequired = NextRequest & {
  auth: TokenValidationResponse;
};

export const withAuthRequired =
  (
    handler: (
      request: NextApiRequestWithAuthRequired,
      response: NextResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithAuthRequired, response: NextResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;
    } catch (error) {
      return response401UnauthorizedError(request, 'You must be logged in');
    }

    return handler(request, response);
  };
