import { GraphQLClient } from 'graphql-request';
import fetch from 'isomorphic-unfetch';

const ENDPOINT = process.env.GRAPHQL_URL || '/v1/graphql';
const ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET || '';

const client = new GraphQLClient(ENDPOINT, {
  fetch,
  headers: {
    'x-hasura-admin-secret': ADMIN_SECRET,
  },
});

export default client;
