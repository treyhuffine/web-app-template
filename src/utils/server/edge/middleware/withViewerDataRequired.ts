import { NextResponse } from 'next/server';
import { GetViewerByIdQuery } from 'types/generated/server';
import { getBearerToken } from 'services/server/firebase/edge/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/edge/getValidViewerFromToken';
import { getViewerById } from 'services/server/graphql/queries/getViewerById';
import { response401UnauthorizedError } from 'utils/server/edge/http';
import { NextApiRequestWithAuthRequired } from 'utils/server/edge/middleware/withAuthRequired';

export interface NextApiRequestWithViewerRequired extends NextApiRequestWithAuthRequired {
  viewer: NonNullable<GetViewerByIdQuery['usersByPk']>;
}

export const withViewerDataRequired =
  (
    handler: (
      request: NextApiRequestWithViewerRequired,
      response: NextResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithViewerRequired, response: NextResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;

      if (request?.auth?.userId) {
        const userId: string = request.auth.userId as string;
        const viewer = await getViewerById(userId);

        if (!viewer) {
          return response401UnauthorizedError(request, 'Could not find account');
        }

        request.viewer = viewer;
      } else {
        return response401UnauthorizedError(request, 'You must be logged in');
      }
    } catch (error) {
      return response401UnauthorizedError(request, 'Could not find account');
    }

    return handler(request, response);
  };
