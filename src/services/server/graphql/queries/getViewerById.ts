import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { GetViewerByIdQuery } from 'types/generated/server';
import client from 'services/server/graphql/client';

const QUERY = gql`
  query getViewerById($id: uuid!) {
    usersByPk(id: $id) {
      createdAt
      email
      id
      stripeCustomerId
      updatedAt
      fullName
      username
    }
  }
`;

export const getViewerById = async (id: string) => {
  const data = await client.request<GetViewerByIdQuery>(print(QUERY), { id });
  return data?.usersByPk;
};
