import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import { InsertUserMutation, InsertUserMutationVariables } from '../../types/generated';
import createClient from '../createClient';

const INSERT_USER = gql`
  mutation insertUser(
    $email: String!
    $firebaseId: String!
    $stripeCustomerId: String!
    $identityData: [UserAuthIdentitiesInsertInput!] = {}
    $latestAuthProvider: String!
    $originalAuthProvider: String!
    $fullName: String!
    $city: String = ""
    $country: String = ""
    $fullDetails: jsonb = ""
    $ip: String = ""
    $platform: String = ""
    $region: String = ""
    $timezone: String = ""
    $zip: String = ""
  ) {
    insertUsersOne(
      object: {
        email: $email
        firebaseId: $firebaseId
        stripeCustomerId: $stripeCustomerId
        authIdentities: { data: $identityData }
        latestAuthProvider: $latestAuthProvider
        originalAuthProvider: $originalAuthProvider
        fullName: $fullName
        registrationDetails: {
          data: {
            city: $city
            country: $country
            fullDetails: $fullDetails
            ip: $ip
            platform: $platform
            region: $region
            timezone: $timezone
            zip: $zip
          }
          onConflict: {
            constraint: user_registration_details_user_id_key
            updateColumns: updatedAt
          }
        }
      }
    ) {
      id
      firebaseId
      email
      stripeCustomerId
      updatedAt
      createdAt
    }
  }
`;

const insertUser = (variables: InsertUserMutationVariables) => {
  const client = createClient();
  return client.request<InsertUserMutation>(print(INSERT_USER), variables);
};

export default insertUser;
