import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query getCurrentUser($id: uuid!) {
    usersByPk(id: $id) {
      id
      email
      firstName
      lastName
      username
    }
  }
`;
