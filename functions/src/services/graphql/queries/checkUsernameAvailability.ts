import { print } from 'graphql/language/printer';
import gql from 'graphql-tag';
import createClient from '../createClient';
import {
  CheckUsernameAvailabilityQueryVariables,
  CheckUsernameAvailabilityQuery,
} from '../../types/generated';

const QUERY = gql`
  query checkUsernameAvailability($username: String!) {
    usernamesActive(where: { username: { _eq: $username } }) {
      username
    }
    usernamesClaimed(where: { username: { _eq: $username } }) {
      id
      username
    }
  }
`;

const checkUsernameAvailability = (variables: CheckUsernameAvailabilityQueryVariables) => {
  const client = createClient();
  return client.request<CheckUsernameAvailabilityQuery>(print(QUERY), variables);
};

export default checkUsernameAvailability;
