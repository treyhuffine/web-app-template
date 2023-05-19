import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { UpadateUsernameMutation, UpadateUsernameMutationVariables } from '../../types/generated';
import createClient from '../createClient';

const INSERT_USER = gql`
  mutation upadateUsername($id: uuid!, $username: String!) {
    updateUsersByPk(pkColumns: { id: $id }, _set: { username: $username }) {
      id
      username
    }
    insertUsernamesClaimedOne(
      object: { userId: $id, username: $username, reason: "USER" }
      onConflict: { constraint: usernames_claimed_username_key, updateColumns: updatedAt }
    ) {
      id
    }
    insertUsernameLogsOne(
      object: { userId: $id, currentUsername: $username, action: "ADD" }
      onConflict: { constraint: username_logs_pkey }
    ) {
      id
      currentUsername
    }
  }
`;

const upadateUsername = (variables: UpadateUsernameMutationVariables) => {
  const client = createClient();
  return client.request<UpadateUsernameMutation>(print(INSERT_USER), variables);
};

export default upadateUsername;
