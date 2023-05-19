import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import {
  InsertUserCommunicationPreferencesMutation,
  InsertUserCommunicationPreferencesMutationVariables,
} from '../../types/generated';
import createClient from '../createClient';

const INSERT_USER_COMMUNICATION_PREFERENCES = gql`
  mutation insertUserCommunicationPreferences($id: uuid!) {
    insertUserCommunicationPreferencesOne(
      object: { id: $id }
      onConflict: { constraint: user_communication_preferences_pkey, updateColumns: updatedAt }
    ) {
      id
    }
  }
`;

const insertUserCommunicationPreferences = (
  variables: InsertUserCommunicationPreferencesMutationVariables,
) => {
  const client = createClient();
  return client.request<InsertUserCommunicationPreferencesMutation>(
    print(INSERT_USER_COMMUNICATION_PREFERENCES),
    variables,
  );
};

export default insertUserCommunicationPreferences;
