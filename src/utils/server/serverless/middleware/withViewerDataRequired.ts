import { NextApiResponse } from 'next';
import { GetViewerByIdQuery } from 'types/generated/server';
import { getBearerToken } from 'services/server/firebase/serverless/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/serverless/getValidViewerFromToken';
import { getViewerById } from 'services/server/graphql/queries/getViewerById';
import { response401UnauthorizedError } from 'utils/server/serverless/http';
import { NextApiRequestWithAuthRequired } from 'utils/server/serverless/middleware/withAuthRequired';

export interface NextApiRequestWithViewerRequired extends NextApiRequestWithAuthRequired {
  viewer: NonNullable<GetViewerByIdQuery['usersByPk']>;
}

export const withViewerDataRequired =
  (
    handler: (
      request: NextApiRequestWithViewerRequired,
      response: NextApiResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithViewerRequired, response: NextApiResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;

      if (request?.auth?.userId) {
        const userId: string = request.auth.userId as string;
        const viewer = await getViewerById(userId);

        if (!viewer) {
          return response401UnauthorizedError(response, 'Could not find account');
        }

        request.viewer = viewer;
      } else {
        return response401UnauthorizedError(response, 'Could not find account');
      }
    } catch (error) {
      return response401UnauthorizedError(response, 'Could not find account');
    }

    return handler(request, response);
  };
