import { NextApiResponse } from 'next';
import { GetViewerByIdQuery } from 'types/generated/server';
import { getBearerToken } from 'services/server/firebase/serverless/getBearerToken';
import { getValidViewerFromToken } from 'services/server/firebase/serverless/getValidViewerFromToken';
import { getViewerById } from 'services/server/graphql/queries/getViewerById';
import { NextApiRequestWithAuthOptional } from 'utils/server/serverless/middleware/withAuthOptional';

export interface NextApiRequestWithViewerOptional extends NextApiRequestWithAuthOptional {
  viewer?: GetViewerByIdQuery['usersByPk'] | null;
}

export const withViewerDataOptional =
  (
    handler: (
      request: NextApiRequestWithViewerOptional,
      response: NextApiResponse,
    ) => unknown | Promise<unknown>,
  ) =>
  async (request: NextApiRequestWithViewerOptional, response: NextApiResponse) => {
    try {
      const authToken = getBearerToken(request);
      const decodedToken = await getValidViewerFromToken(authToken);
      request.auth = decodedToken;

      if (request?.auth?.userId) {
        const userId: string = request.auth.userId as string;
        const viewer = await getViewerById(userId);
        request.viewer = viewer;
      } else {
        request.auth = null;
        request.viewer = null;
      }
    } catch (error) {
      // Ignore: this could fail but the user is optional
      request.auth = null;
      request.viewer = null;
    }

    return handler(request, response);
  };
