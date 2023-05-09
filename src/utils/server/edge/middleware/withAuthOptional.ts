import { NextRequest, NextResponse } from 'next/server';
import { getBearerToken } from 'services/server/firebase/edge/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/edge/getValidViewerFromToken';

type TokenValidationResponse = Awaited<ReturnType<typeof getValidViewerFromToken>>;

export interface NextApiRequestWithAuthOptional extends NextRequest {
  auth?: TokenValidationResponse | null;
}

export const withAuthOptional =
  (
    handler: (
      request: NextApiRequestWithAuthOptional,
      response: NextResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithAuthOptional, response: NextResponse) => {
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
